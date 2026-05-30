"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// 1. MAIN OVERVIEW SKELETON (excluding static header)
export function JobSeekerDashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-4 px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6">
      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        {/* Card 1: Profile Completion */}
        <Card className="bg-card border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </CardContent>
        </Card>

        {/* Card 2: Applications */}
        <Card className="bg-card border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-8 w-12 rounded-md" />
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </CardContent>
        </Card>

        {/* Card 3: Saved Jobs */}
        <Card className="bg-card border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-8 w-10 rounded-md" />
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </CardContent>
        </Card>

        {/* Card 4: Recommended (No numeric value!) */}
        <Card className="bg-card border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-3.5 w-full rounded-md" />
            <Skeleton className="h-3.5 w-5/6 rounded-md" />
            <div className="pt-2">
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Profile Views Chart Skeleton */}
        <Card className="bg-card border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <Skeleton className="h-5 w-32 rounded-md" />
              <Skeleton className="h-3.5 w-44 rounded-md" />
            </div>
            <Skeleton className="h-8 w-24 rounded-lg" />
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <Skeleton className="h-[250px] w-full rounded-xl" />
          </CardContent>
        </Card>

        {/* Job Applications Chart Skeleton */}
        <Card className="bg-card border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <Skeleton className="h-5 w-36 rounded-md" />
              <Skeleton className="h-3.5 w-40 rounded-md" />
            </div>
            <Skeleton className="h-8 w-24 rounded-lg" />
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <Skeleton className="h-[250px] w-full rounded-xl" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="bg-card border shadow-xs">
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-3.5 w-48 rounded-md" />
          </CardHeader>
          <CardContent className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-28 rounded-lg" />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card border shadow-xs">
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-3.5 w-48 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <div className="pt-2">
              <Skeleton className="h-4 w-28 rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 2. PROFILE INSIGHTS SKELETON
export function ProfileViewsSkeleton() {
  return (
    <div className="animate-pulse space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Views */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-3 w-32 rounded-md" />
          </CardContent>
        </Card>

        {/* Unique Companies */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-8 w-10 rounded-md" />
            <Skeleton className="h-3 w-40 rounded-md" />
          </CardContent>
        </Card>

        {/* Search Appearances */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <Skeleton className="h-5 w-32 rounded-md" />
              <Skeleton className="h-3.5 w-48 rounded-md" />
            </div>
            <Skeleton className="h-8 w-24 rounded-lg" />
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <Skeleton className="h-[250px] w-full rounded-xl" />
          </CardContent>
        </Card>
      </div>

      {/* Visitors List Skeleton */}
      <Card className="border">
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-48 rounded-md" />
          <Skeleton className="h-3.5 w-72 rounded-md" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 border-b py-3 last:border-0"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-3.5 w-48 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// 3. CV MANAGER SKELETON
export function CVManagerSkeleton() {
  return (
    <div className="animate-pulse space-y-8 px-4 sm:px-6 sm:py-8">
      {/* Title section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1.5">
          <Skeleton className="h-6 w-36 rounded-md" />
          <Skeleton className="h-4 w-56 rounded-md" />
        </div>
        <Skeleton className="h-11 w-44 rounded-full" />
      </div>

      {/* CV Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="border shadow-xs">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-10 rounded-md" />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                  <Skeleton className="h-3.5 w-1/2 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-px w-full" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-3.5 w-24 rounded-md" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Upload Placeholder Card */}
        <Card className="flex h-full min-h-[200px] flex-col items-center justify-center border-2 border-dashed text-center">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="mx-auto h-4 w-28 rounded-md" />
              <Skeleton className="mx-auto h-3.5 w-44 rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Upgrade Hint for Free Users */}
      <div className="from-primary/10 via-background border-primary/10 to-primary/5 relative overflow-hidden rounded-2xl border-2 bg-linear-to-br p-8">
        <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Skeleton className="h-16 w-16 shrink-0 rounded-2xl shadow-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-64 rounded-md" />
              <Skeleton className="h-4 w-[28rem] max-w-full rounded-md" />
            </div>
          </div>
          <Skeleton className="h-14 w-44 shrink-0 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

// 4. PRICING PACKAGES SKELETON
export function JobSeekerPricingSkeleton() {
  return (
    <div className="animate-pulse space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      {/* Subscription Status Card */}
      <Card className="border">
        <CardContent className="space-y-4 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-6 w-48 rounded-md" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-px w-full" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton className="h-3.5 w-24 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Land dream job faster header */}
      <div className="space-y-3 text-center">
        <Skeleton className="mx-auto h-8 w-80 rounded-md" />
        <Skeleton className="mx-auto h-4 w-[36rem] max-w-full rounded-md" />
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card
            key={i}
            className="flex min-h-[450px] flex-col justify-between border"
          >
            <CardHeader className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-28 rounded-md" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full rounded-md" />
              <div className="flex items-baseline gap-1 py-2">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6 pt-0">
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                    <Skeleton className="h-3.5 w-full rounded-md" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-12 w-full animate-pulse rounded-xl" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Comparison Table Skeleton */}
      <div className="space-y-4 pt-10">
        <Skeleton className="h-6 w-48 rounded-md" />
        <Card className="border">
          <CardContent className="p-0">
            <div className="space-y-4 p-6">
              <div className="grid grid-cols-4 gap-4 border-b pb-4">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 gap-4 border-b py-2 last:border-0"
                >
                  <Skeleton className="h-4 w-40 rounded-md" />
                  <Skeleton className="h-4 w-6 rounded-full" />
                  <Skeleton className="h-4 w-6 rounded-full" />
                  <Skeleton className="h-4 w-6 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Skeleton */}
      <div className="space-y-4 pt-10">
        <Skeleton className="h-6 w-36 rounded-md" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border p-5">
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/2 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// 5. BILLING DETAILS SKELETON
export function JobSeekerBillingSkeleton() {
  return (
    <div className="animate-pulse space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Subscription Summary */}
        <Card className="border lg:col-span-1">
          <CardHeader className="border-b pb-4">
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-3.5 w-52 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-24 rounded-md" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-36 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
            <div className="space-y-3 border-y py-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3 w-40 rounded-md" />
              </div>
              <Skeleton className="h-6 w-11 rounded-full" />
            </div>
            <Skeleton className="h-11 w-full rounded-xl" />
          </CardContent>
        </Card>

        {/* Payments Channels */}
        <Card className="border lg:col-span-2">
          <CardHeader className="border-b pb-4">
            <Skeleton className="h-5 w-60 rounded-md" />
            <Skeleton className="h-3.5 w-80 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="space-y-4 border p-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28 rounded-md" />
                      <Skeleton className="h-3 w-20 rounded-md" />
                    </div>
                    <Skeleton className="h-10 w-16 animate-pulse rounded-xl" />
                  </div>
                  <Skeleton className="h-3.5 w-full rounded-md" />
                </Card>
              ))}
            </div>
            <div className="flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
              <Skeleton className="h-16 w-full rounded-xl md:w-3/4" />
              <Skeleton className="h-12 w-full rounded-xl md:w-44" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice History */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-40 rounded-md" />
        </div>
        <Card className="border p-0">
          <CardContent className="p-0">
            <div className="space-y-4 p-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b py-3 last:border-0"
                >
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// 6. JOB VIEW HISTORY SKELETON
export function JobViewHistorySkeleton() {
  return (
    <div className="animate-pulse space-y-6 px-4 sm:px-6 sm:py-8">
      {/* Filter Bar */}
      <Card className="border">
        <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
            <Skeleton className="h-11 w-full max-w-md rounded-full" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-12 rounded-md" />
              <Skeleton className="h-10 w-48 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-11 w-32 rounded-full" />
        </CardContent>
      </Card>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-5 w-48 rounded-md" />
                  <Skeleton className="h-3.5 w-32 rounded-md" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-md" />
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>
              <Skeleton className="h-px w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// 7. FOLLOWED COMPANIES SKELETON
export function FollowedCompaniesSkeleton() {
  return (
    <div className="animate-pulse space-y-6 px-4 sm:px-6 sm:py-8">
      {/* Filter Bar */}
      <Card className="border">
        <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
            <Skeleton className="h-11 w-full max-w-md rounded-full" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-10 w-48 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-11 w-32 rounded-full" />
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden border">
            {/* Mock Banner */}
            <Skeleton className="h-24 w-full" />
            <CardContent className="relative space-y-4 p-6 pt-10">
              {/* Logo position overlaps banner */}
              <div className="absolute -top-8 left-6">
                <Skeleton className="border-background h-16 w-16 rounded-xl border-4" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-40 rounded-md" />
                <Skeleton className="h-3.5 w-24 rounded-md" />
              </div>
              <Skeleton className="h-10 w-full rounded-md" />
              <div className="flex items-center justify-between border-t pt-4">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// 8. JOB SEEKER SETTINGS SKELETON
export function JobSeekerSettingsSkeleton() {
  return (
    <div className="animate-pulse px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Account Section */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-24 rounded-md" />
            <Skeleton className="h-4 w-52 rounded-md" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="border p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-36 rounded-md" />
                      <Skeleton className="h-3 w-28 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-5 rounded-md" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Skeleton className="h-px w-full" />

        {/* Preferences Section */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-36 rounded-md" />
            <Skeleton className="h-4 w-60 rounded-md" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-40 rounded-md" />
                      <Skeleton className="h-3 w-60 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-11 animate-pulse rounded-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. NOTIFICATIONS SKELETON
export function NotificationsSkeleton() {
  return (
    <div className="animate-pulse space-y-6 px-4 py-8 sm:px-6">
      {/* Filter Tabs */}
      <div className="bg-muted/10 flex h-10 w-full max-w-lg gap-1 rounded-full border p-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 flex-1 rounded-full" />
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="border-l-muted border border-l-4">
            <CardContent className="flex items-start gap-4 p-4 sm:p-5">
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-40 rounded-md" />
                  <Skeleton className="h-3.5 w-16 rounded-md" />
                </div>
                <Skeleton className="h-3.5 w-full rounded-md" />
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
