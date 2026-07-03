# Workly — Platform Maintenance Mode

**Document Version:** 1.0  
**Last Updated:** June 2026  
**Feature Status:** Production  
**Scope:** Full-Stack (Express API + Next.js Client)

---

## Overview

Maintenance Mode is a platform-wide availability control that allows administrators to temporarily restrict access to the Workly job portal — for deployments, database migrations, infrastructure updates, or emergency incident response — without requiring any redeployment or code change.

Once toggled **ON** by an administrator, all regular users (candidates and employers) are instantly redirected to a dedicated maintenance page. Administrators retain full, unrestricted access to the platform at all times. The toggle can be reversed from the Admin Settings panel and the platform becomes live again immediately.

---

## Design Goals

| Goal | How It Is Achieved |
|---|---|
| **Zero downtime toggling** | Toggle is persisted in a database row and propagated via an in-memory cache and WebSocket broadcast — no server restart required |
| **100% admin availability** | Both the API gateway and the Next.js routing layer independently verify admin role and bypass the block |
| **Sub-millisecond hot-path cost** | All API requests read from an in-memory singleton cache (30s TTL). DB is hit at most once per 30 seconds across all requests |
| **Real-time UX** | Socket.io broadcasts `maintenance:warning` 10 seconds before enabling and `maintenance:change` immediately on disable so users get graceful notification |
| **Fail-open everywhere** | If any part of the maintenance check itself errors (DB down, cache fail), the request is allowed through — users are never blocked by our own bugs |
| **Edge-aware routing** | Next.js middleware runs on the Edge runtime, checking the status API with a 2-second timeout and fail-open fallback |

---

## Architecture

The feature operates across **two completely independent guard layers**. Both layers must be bypassed for a non-admin to access a restricted resource during maintenance.

```
┌─────────────────────────────────────────────────────────┐
│                     Client Browser                       │
└──────────────────────────┬──────────────────────────────┘
                           │  Page Navigation
                           ▼
┌─────────────────────────────────────────────────────────┐
│            Layer 1 — Next.js middleware.ts              │
│                  (Edge Runtime)                          │
│                                                         │
│  • Runs before every page request                       │
│  • Fetches /api/v1/public/status (2s timeout)           │
│  • Decodes accessToken cookie (jwtDecode — no verify)   │
│  • Redirects non-admins to /maintenance                  │
│  • Fail-open: any error → allow through                 │
└──────────────────────────┬──────────────────────────────┘
                           │  API Requests
                           ▼
┌─────────────────────────────────────────────────────────┐
│          Layer 2 — Express maintenanceModeMiddleware    │
│                   (Node.js Server)                       │
│                                                         │
│  • Runs on EVERY /api/v1/* request                      │
│  • Reads in-memory cache (30s TTL before DB re-sync)    │
│  • Verifies accessToken cookie via jwt.verify()         │
│  • Returns 503 + Retry-After: 3600 for non-admins       │
│  • Bypass list for auth, status, and toggle routes      │
│  • Fail-open: any error → call next()                   │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              PostgreSQL — SystemSettings Row             │
│                  id: "singleton" (1 row forever)        │
│                                                         │
│  maintenanceMode      Boolean   @default(false)         │
│  maintenanceMessage   String    (custom message)        │
│  maintenanceSetAt     DateTime? (when it was enabled)   │
│  maintenanceSetBy     String?   (admin user ID)         │
└─────────────────────────────────────────────────────────┘
```

### Why Two Independent Layers?

Layer 1 (Next.js middleware) provides **user experience** — redirecting the browser before a full page render. It is NOT a security layer because it uses `jwtDecode` (no signature verification) — the Edge runtime cannot run `jsonwebtoken`.

Layer 2 (Express middleware) is the **security layer** — it uses `jwt.verify()` with the full secret to cryptographically validate role claims before serving any API data. This prevents tampered tokens from bypassing the block.

---

## Data Layer

### Singleton Pattern

The `SystemSettings` Prisma model enforces exactly **one configuration row** in the database for all time, forever. This eliminates race conditions and makes all reads/writes deterministic.

```prisma
// prisma/schema.prisma
model SystemSettings {
  id                   String    @id @default("singleton")
  maintenanceMode      Boolean   @default(false)
  maintenanceMessage   String    @default("We're performing scheduled maintenance...")
  maintenanceSetAt     DateTime?
  maintenanceSetBy     String?
  // ... other platform settings
  updatedAt            DateTime  @updatedAt

  @@map("system_settings")
}
```

All reads and writes use `prisma.systemSettings.upsert({ where: { id: "singleton" } })` — the row is created automatically on first access if it does not exist. No `findFirst()` anywhere in the codebase.

### In-Memory Cache

```
src/lib/maintenanceCache.ts
```

Every API request checks maintenance status. To avoid a DB round-trip on every request, an in-memory module-level singleton stores the last-known state with a **30-second TTL**.

```
Cold Request (cache stale)     → DB upsert → refresh cache → serve from cache
Warm Request (within 30s TTL) → serve from in-memory cache (0 DB cost)
After DB write (toggle)        → cache.set() called synchronously — instant consistency
```

The cache is also invalidated (syncedAt = 0) via `maintenanceCache.invalidate()` if needed, forcing the next request to re-read from DB.

---

## Backend Implementation

### File Structure

```
src/
├── lib/
│   └── maintenanceCache.ts            # In-memory singleton cache (30s TTL)
├── services/
│   └── systemSettings.service.ts      # Cache-first DB reads + writes
├── controllers/
│   ├── admin/
│   │   └── settings.controller.ts     # Admin GET + PATCH /maintenance handlers
│   └── public/
│       └── status.controller.ts       # Public /public/status handler
├── routes/
│   ├── admin/
│   │   └── settings.routes.ts         # Mounted at /admin/settings
│   └── public/
│       └── status.routes.ts           # Mounted at /public/status
└── app/
    └── middleware/
        └── maintenanceMode.middleware.ts  # Express global request guard
```

### Middleware Registration Order

In `src/app.ts`, middleware registration order is critical:

```typescript
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());            // ← MUST be before maintenance middleware
app.use(express.urlencoded(...));
app.use(passport.initialize());
app.use(cors(...));

app.use("/api/v1", maintenanceModeMiddleware, router); // ← After cookieParser
```

`cookieParser()` must run first so `req.cookies.accessToken` is populated when the maintenance middleware reads it.

### Bypass Paths

The following paths are always served regardless of maintenance state:

| Path | Reason |
|---|---|
| `/auth/*` | Admins must be able to log in during maintenance |
| `/public/status` | Status endpoint must respond for the Next.js middleware to work |
| `/admin/settings/maintenance` | Admin must be able to toggle maintenance OFF |

All other paths are protected. The bypass check runs against `req.path` which is relative to the `/api/v1` mount point (e.g. a request to `/api/v1/auth/login` has `req.path === "/auth/login"`).

### Socket.io Broadcast Strategy

When an admin **enables** maintenance mode:
1. `maintenance:warning` is emitted immediately — all connected clients get a toast notification with a 10-second countdown
2. After 10 seconds, `maintenance:change` is emitted with `enabled: true` — clients redirect to `/maintenance`

When an admin **disables** maintenance mode:
- `maintenance:change` is emitted immediately with `enabled: false` — clients receive a "Platform is back online" toast and are redirected to `/`

This grace period prevents abrupt disconnection and gives users time to save their work.

### Public Status Response

`GET /api/v1/public/status` — no authentication required.

```json
{
  "success": true,
  "data": {
    "maintenanceMode": true,
    "message": "We're performing scheduled maintenance. We'll be back shortly."
  }
}
```

Response includes `Cache-Control: public, max-age=5, stale-while-revalidate=10` to reduce hammering the endpoint from multiple browser tabs, while keeping the data fresh enough to be useful.

---

## Frontend Implementation

### File Structure

```
src/
├── middleware.ts                          # Next.js Edge routing guard
├── app/
│   └── maintenance/
│       └── page.tsx                      # Maintenance landing page
├── provider/
│   └── MaintenanceModeProvider.tsx       # Socket.io real-time redirect handler
└── redux/
    └── feature/
        └── system/
            └── systemApi.ts              # RTK Query slice (injected into baseApi)
```

### Next.js Edge Middleware (`src/middleware.ts`)

Runs before every page navigation request. The matcher excludes static assets to keep performance overhead negligible:

```typescript
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

**Decision flow:**
```
Request arrives
    │
    ├─ pathname in ALWAYS_ALLOW? (/maintenance, /login, etc.)
    │       └─ YES → NextResponse.next()
    │
    ├─ Fetch /api/v1/public/status (2s AbortController timeout)
    │       └─ Fetch error/timeout → NextResponse.next() (fail-open)
    │
    ├─ maintenanceMode === false?
    │       └─ YES → NextResponse.next()
    │
    ├─ isAdmin from accessToken cookie? (jwtDecode only — Edge limitation)
    │       └─ YES → NextResponse.next()
    │
    └─ Redirect to /maintenance
```

> **Security Note:** `jwtDecode` is used in the Edge middleware only because the Edge runtime does not support Node.js crypto primitives required by `jsonwebtoken`. The backend Express middleware uses `jwt.verify()` (with full cryptographic signature validation) as the actual security guard.

### Real-Time Socket Provider (`src/provider/MaintenanceModeProvider.tsx`)

Mounted inside `SocketProvider` in `src/app/layout.tsx`:

```
ReduxProvider
  └─ SocketProvider
       └─ MaintenanceModeProvider   ← listens for maintenance:warning + maintenance:change
            └─ {children}
```

The provider uses the `useSocket()` hook from `SocketProvider` to access the active socket connection. It only registers event listeners if a socket connection exists. Admin users receive no redirects — only the cache invalidation side-effect to keep their RTK Query data fresh.

### RTK Query Integration (`src/redux/feature/system/systemApi.ts`)

Uses `baseApi.injectEndpoints()` to extend the existing `baseApi` without creating a separate store slice:

| Hook | Method | Endpoint | Auth |
|---|---|---|---|
| `useGetPublicStatusQuery()` | GET | `/public/status` | None |
| `useGetAdminSettingsQuery()` | GET | `/admin/settings` | Admin only |
| `useToggleMaintenanceModeMutation()` | PATCH | `/admin/settings/maintenance` | Admin only |

All three endpoints are tagged `"admin"` so invalidating that tag refreshes all related queries simultaneously.

### Maintenance Page (`src/app/maintenance/page.tsx`)

Static server component with `robots: "noindex"` metadata. Uses only CSS animations (no client JavaScript) so it renders correctly even if the JavaScript bundle fails to load — which is exactly the situation you might be in during a failed deployment.

---

## Admin Control Panel

### Enabling / Disabling

Navigate to: **Admin Dashboard → Settings → Platform Vital Controls → Maintenance Mode**

The toggle switch calls `PATCH /api/v1/admin/settings` which routes through `adminService.updateSystemSettings()`. This service:
1. Writes to DB via `prisma.systemSettings.upsert()`
2. Immediately syncs the in-memory cache via `maintenanceCache.set()`
3. Emits Socket.io events to all connected clients

### Data Saved on Enable

```json
{
  "maintenanceMode": true,
  "maintenanceMessage": "We're performing scheduled maintenance...",
  "maintenanceSetAt": "2026-06-27T14:30:00.000Z",
  "maintenanceSetBy": "admin-user-id-here"
}
```

`maintenanceSetAt` and `maintenanceSetBy` are cleared to `null` when maintenance is disabled, creating a clean audit trail.

---

## Security Considerations

| Threat | Mitigation |
|---|---|
| Tampered JWT claiming ADMIN role | Express middleware uses `jwt.verify()` with full secret — forged tokens are rejected |
| Client-side bypass via devtools | The API layer enforces maintenance independently from the UI layer |
| Admin locked out during maintenance | `/auth/*` is in the bypass list; admin role detected from JWT allows full access |
| Maintenance check bringing down the server | Fail-open design: any error in the check calls `next()` — the check never blocks |
| Race condition on DB write | Singleton `id: "singleton"` + Prisma `upsert` makes all writes idempotent |
| Browser tab not receiving socket event | `keepUnusedDataFor: 30` on RTK Query + the middleware polling the status endpoint on every navigation acts as a fallback |

---

## Environment Variables

| Variable | Used In | Description |
|---|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | `src/middleware.ts` | Backend base URL for status fetch |
| `JWT_SECRET` | `src/app/middleware/maintenanceMode.middleware.ts` | Secret for `jwt.verify()` in admin bypass check |

---

## Database Migration

The feature requires three new columns on the `system_settings` table. Run this once on your PostgreSQL database:

```sql
ALTER TABLE "system_settings"
  ADD COLUMN IF NOT EXISTS "maintenanceMessage" TEXT NOT NULL DEFAULT 'We''re performing scheduled maintenance. We''ll be back shortly.',
  ADD COLUMN IF NOT EXISTS "maintenanceSetAt"   TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS "maintenanceSetBy"   TEXT;
```

Or via Prisma:

```bash
cd Web/Workly_Server
npx prisma db push
```

> **Note:** The `id` column was changed from `uuid()` to `"singleton"` (a fixed string value). If your database already has a row with a UUID id, you will need to manually update it:
> ```sql
> UPDATE "system_settings" SET id = 'singleton' WHERE id != 'singleton';
> ```

---

## Request/Response Reference

### `GET /api/v1/public/status`
**Auth required:** None  
**Cache-Control:** `public, max-age=5, stale-while-revalidate=10`

```json
// Maintenance OFF
{ "success": true, "data": { "maintenanceMode": false, "message": null } }

// Maintenance ON
{ "success": true, "data": { "maintenanceMode": true, "message": "We're performing scheduled maintenance..." } }
```

### `GET /api/v1/admin/settings`
**Auth required:** ADMIN or SUPER_ADMIN

Returns the full `SystemSettings` row including `maintenanceMode`, `maintenanceMessage`, `maintenanceSetAt`, `maintenanceSetBy`, plus all other platform flags.

### `PATCH /api/v1/admin/settings`
**Auth required:** ADMIN or SUPER_ADMIN  
**Body:**

```json
{
  "maintenanceMode": true
}
```

Triggers cache sync + Socket.io broadcast. Returns the full updated settings object.

### HTTP Error During Maintenance

Any API call from a non-admin during maintenance receives:

```
HTTP/1.1 503 Service Unavailable
Retry-After: 3600
Content-Type: application/json

{
  "success": false,
  "maintenanceMode": true,
  "message": "We're performing scheduled maintenance. We'll be back shortly."
}
```

---

## Socket.io Events Reference

| Event | Direction | Payload | When |
|---|---|---|---|
| `maintenance:warning` | Server → All Clients | `{ gracePeriodMs: 10000, message: string }` | Immediately when maintenance is enabled |
| `maintenance:change` | Server → All Clients | `{ enabled: boolean, message: string \| null }` | 10s after enable, or immediately on disable |

---

## Testing Checklist

- [ ] Toggle maintenance ON from Admin Settings
- [ ] Verify non-admin browser tab shows toast warning within 1 second
- [ ] Verify non-admin is redirected to `/maintenance` after 10 seconds
- [ ] Verify admin tab is NOT redirected — retains full access
- [ ] Open a new browser tab (not logged in) and navigate to any page → should redirect to `/maintenance`
- [ ] Attempt direct API call during maintenance: `curl http://localhost:5000/api/v1/jobs` → should return 503
- [ ] Attempt API call with admin JWT during maintenance → should return 200
- [ ] Toggle maintenance OFF from Admin Settings
- [ ] Verify non-admin browser receives "Platform is back online" toast
- [ ] Verify non-admin is redirected back to `/` automatically
- [ ] Navigate to `/maintenance` when maintenance is OFF → Next.js middleware should pass through and show 404
