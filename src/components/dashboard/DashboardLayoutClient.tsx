"use client";

import { UserRole } from "@/redux/feature/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import AdminSidebar from "./dashboard-nav/AdminSidebar";
import EmployerSidebar from "./dashboard-nav/EmployerSidebar";
import JobSeekerSidebar from "./dashboard-nav/JobSeekerSidebar";

export default function DashboardLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, accessToken } = useAppSelector((state) => state.auth) || {};

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isEmployer = user?.role === UserRole.EMPLOYER;
  const isAdmin = user?.role === UserRole.ADMIN;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isJobSeeker =
    user?.role === UserRole.JOB_SEEKER || (!isEmployer && !isAdmin);

  const isEmployerPath = pathname?.startsWith("/employer");
  const isDashboardPath = pathname?.startsWith("/dashboard");
  const isAdminPath = pathname?.startsWith("/admin");

  useEffect(() => {
    if (!isMounted) return;

    // Check for token in localStorage (Redux Persist stores auth there)
    const hasStoredToken =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    const hasToken = accessToken || hasStoredToken;

    // Check if user exists (check for email or id since login might not include id)
    const hasUser = user && (user.email || user.id);

    // If no user and no token, user is not authenticated - redirect to home
    if (!hasUser && !hasToken) {
      router.replace("/");
      return;
    }

    // If user exists, handle role-based redirects
    if (hasUser) {
      if (isEmployerPath && !isEmployer) {
        router.replace(isAdmin ? "/admin" : "/dashboard");
        return;
      }
      if (isDashboardPath && (isEmployer || isAdmin)) {
        router.replace(isEmployer ? "/employer" : "/admin");
        return;
      }
      if (isAdminPath && !isAdmin) {
        router.replace(isEmployer ? "/employer" : "/dashboard");
        return;
      }
    }
  }, [
    isMounted,
    user,
    user?.email,
    user?.id,
    user?.role,
    accessToken,
    isEmployer,
    isEmployerPath,
    isDashboardPath,
    router,
    isAdmin,
    isAdminPath,
  ]);

  // Timeout fallback: if we've been loading for more than 3 seconds and no user, redirect
  useEffect(() => {
    if (!isMounted) return;

    const timeout = setTimeout(() => {
      const hasStoredToken =
        typeof window !== "undefined" && localStorage.getItem("accessToken");
      const hasUser = user && (user.email || user.id);
      if (!hasUser && !hasStoredToken) {
        router.replace("/");
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isMounted, user, router]);

  // Show loading during SSR or before mount
  if (!isMounted) {
    return (
      <div className="bg-primary/2 flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Check if user should be authenticated (has token but user not loaded yet = rehydrating)
  const hasStoredToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const hasUser = user && (user.email || user.id);
  const isRehydrating = hasStoredToken && !hasUser;

  // If rehydrating, show loading; if no token and no user, redirect will happen in useEffect
  if (!hasUser) {
    if (isRehydrating) {
      return (
        <div className="bg-primary/2 flex min-h-screen items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      );
    }
    // No token - redirecting (useEffect will handle it)
    return (
      <div className="bg-primary/2 flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  if (isEmployerPath) {
    return (
      <div className="bg-background min-h-screen">
        <EmployerSidebar
          isOpen={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
        />
        <div className="bg-background min-w-0 lg:pl-64">
          <main className="min-h-screen w-full min-w-0">{children}</main>
        </div>
      </div>
    );
  }

  if (isAdminPath) {
    return (
      <div className="bg-background min-h-screen">
        <AdminSidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
        <div className="bg-background min-w-0 lg:pl-64">
          <main className="min-h-screen w-full min-w-0">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <JobSeekerSidebar
        isOpen={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="bg-background min-w-0 lg:pl-64">
        <main className="min-h-screen w-full min-w-0">{children}</main>
      </div>
    </div>
  );
}
