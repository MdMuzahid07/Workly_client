"use client";

import { useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
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

  const isEmployer = user?.role === "EMPLOYER" || (user?.role as number) === 1;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isJobSeeker =
    user?.role === "JOB_SEEKER" || (user?.role as number) === 0 || !isEmployer;

  const isEmployerPath = pathname?.startsWith("/employer");
  const isDashboardPath = pathname?.startsWith("/dashboard");

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
        router.replace("/dashboard");
        return;
      }
      if (isDashboardPath && isEmployer) {
        router.replace("/employer");
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
        <div className="bg-background lg:pl-64">
          <main className="min-h-screen w-full">{children}</main>
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
      <div className="bg-background lg:pl-64">
        <main className="min-h-screen w-full">{children}</main>
      </div>
    </div>
  );
}
