"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobSeekerDashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-3 px-3 py-3 sm:space-y-6 sm:px-6 sm:py-6 lg:px-8 lg:py-6">
      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        {/* Card 1: Profile Completion */}
        <Card className="bg-card border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1 sm:p-6 sm:pb-2">
            <Skeleton className="h-3.5 w-16 rounded-md sm:w-28" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-1.5 p-3 pt-0 sm:p-6 sm:pt-0">
            <Skeleton className="h-6 w-12 rounded-md sm:h-8 sm:w-16" />
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3.5 w-16 rounded-md sm:h-4 sm:w-20" />
          </CardContent>
        </Card>

        {/* Card 2: Applications */}
        <Card className="bg-card border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1 sm:p-6 sm:pb-2">
            <Skeleton className="h-3.5 w-16 rounded-md sm:w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-1.5 p-3 pt-0 sm:p-6 sm:pt-0">
            <Skeleton className="h-6 w-10 rounded-md sm:h-8 sm:w-12" />
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3.5 w-20 rounded-md sm:h-4 sm:w-28" />
          </CardContent>
        </Card>

        {/* Card 3: Saved Jobs */}
        <Card className="bg-card border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1 sm:p-6 sm:pb-2">
            <Skeleton className="h-3.5 w-16 rounded-md sm:w-20" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-1.5 p-3 pt-0 sm:p-6 sm:pt-0">
            <Skeleton className="h-6 w-8 rounded-md sm:h-8 sm:w-10" />
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3.5 w-16 rounded-md sm:h-4 sm:w-24" />
          </CardContent>
        </Card>

        {/* Card 4: Recommended */}
        <Card className="bg-card border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1 sm:p-6 sm:pb-2">
            <Skeleton className="h-3.5 w-20 rounded-md sm:w-28" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-1.5 p-3 pt-0 sm:p-6 sm:pt-0">
            <Skeleton className="h-6 w-24 rounded-md sm:h-8 sm:w-32" />
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3.5 w-24 rounded-md sm:h-4 sm:w-32" />
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
          <CardHeader className="pb-3">
            <Skeleton className="h-5 w-28 rounded-md" />
            <Skeleton className="h-3.5 w-56 rounded-md" />
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-2 sm:gap-3">
            <Skeleton className="h-[76px] w-full rounded-xl sm:h-24" />
            <Skeleton className="h-[76px] w-full rounded-xl sm:h-24" />
            <Skeleton className="h-[76px] w-full rounded-xl sm:h-24" />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card border shadow-xs">
          <CardHeader className="pb-3">
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-3.5 w-56 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="divide-y rounded-lg border">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-7 w-7 rounded-md" />
                  <Skeleton className="h-4 w-28 rounded-md sm:w-36" />
                </div>
                <Skeleton className="h-5 w-8 rounded-full" />
              </div>
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-7 w-7 rounded-md" />
                  <Skeleton className="h-4 w-20 rounded-md sm:w-24" />
                </div>
                <Skeleton className="h-5 w-8 rounded-full" />
              </div>
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-8 w-36 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 2. PROFILE INSIGHTS SKELETON
