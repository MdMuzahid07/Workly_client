import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const ALWAYS_ALLOW = [
  "/maintenance",
  "/login",
  "/register",
  "/_next",
  "/favicon.ico",
  "/api", // Next.js API routes (if any)
];

const isAdminFromCookie = (request: NextRequest): boolean => {
  try {
    // Match the cookie name used in ReduxProvider: accessToken
    const token = request.cookies.get("accessToken")?.value;
    if (!token) return false;
    const decoded = jwtDecode<{ role?: string }>(token);
    return decoded.role === "ADMIN" || decoded.role === "SUPER_ADMIN";
  } catch {
    return false;
  }
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (ALWAYS_ALLOW.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

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

    if (!res.ok) return NextResponse.next();

    const json = await res.json();
    const inMaintenance: boolean = json?.data?.maintenanceMode ?? false;

    if (inMaintenance && !isAdminFromCookie(request)) {
      const url = request.nextUrl.clone();
      url.pathname = "/maintenance";
      return NextResponse.redirect(url);
    }
  } catch {
    // Fail open: don't block users if our status endpoint is unreachable
    return NextResponse.next();
  } finally {
    clearTimeout(timeout);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
