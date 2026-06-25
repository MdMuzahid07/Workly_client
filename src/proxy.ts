import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // 1. Define public paths that are allowed without logging in
  const publicPaths = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/verify-email",
    "/verification-sent",
    "/reset-password",
    "/auth/google/callback",
    "/legal/accessibility",
    "/legal/user-agreement",
    "/legal/privacy-policy",
    "/legal/cookie-policy",
    "/help-center",
    "/contact-us",
  ];

  // 2. Bypass Next.js internal files, api routes, static assets, and manifest files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") // matches files like favicon.ico, images, robots.txt, etc.
  ) {
    return NextResponse.next();
  }

  const isPublicPath = publicPaths.includes(pathname);

  // If there's no token and it's not a public path, redirect to login
  if (!token && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If there's a token and the user tries to access login or register, redirect to /jobs
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/jobs", request.url));
  }

  return NextResponse.next();
}

// Config to match all routes except static assets, favicon, etc.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
