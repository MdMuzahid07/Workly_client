import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const ALWAYS_ALLOW = [
  "/maintenance",
  "/login",
  "/register",
  "/forgot-password",
  "/verify-email",
  "/verification-sent",
  "/reset-password",
  "/_next",
  "/favicon.ico",
  "/api",
];

const PROTECTED_ROUTES = [
  "/jobs",
  "/companies",
  "/browse-candidates",
  "/create-company",
  "/saved-jobs",
  "/applied-jobs",
  "/messages",
  "/notifications",
  "/dashboard",
  "/employer",
  "/admin",
];

const getTokenFromCookie = (request: NextRequest): string | undefined => {
  return request.cookies.get("accessToken")?.value;
};

const isAdminFromToken = (token?: string): boolean => {
  if (!token) return false;
  try {
    const decoded = jwtDecode<{ role?: string }>(token);
    return decoded.role === "ADMIN" || decoded.role === "SUPER_ADMIN";
  } catch {
    return false;
  }
};

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Skip static/public assets and bypass paths
  if (
    ALWAYS_ALLOW.some((p) => pathname === p || pathname.startsWith(p + "/"))
  ) {
    return NextResponse.next();
  }

  const token = getTokenFromCookie(request);

  // 2. Enforce Authentication on Protected Routes
  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (isProtected && !token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = `?callbackUrl=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(loginUrl);
  }

  // 3. System Maintenance Interception
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);

  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/v1/public/status`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      const inMaintenance: boolean = json?.data?.maintenanceMode ?? false;

      if (inMaintenance && !isAdminFromToken(token)) {
        const maintUrl = request.nextUrl.clone();
        maintUrl.pathname = "/maintenance";
        return NextResponse.redirect(maintUrl);
      }
    }
  } catch {
    // Fail open if maintenance endpoint is unreachable
  } finally {
    clearTimeout(timeout);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
