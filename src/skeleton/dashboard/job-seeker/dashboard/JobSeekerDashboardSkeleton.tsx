"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobSeekerDashboardSkeleton() {
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
