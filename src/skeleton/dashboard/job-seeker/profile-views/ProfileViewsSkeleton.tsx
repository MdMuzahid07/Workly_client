"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileViewsSkeleton() {
  return (
    <div className="animate-pulse space-y-6 px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-4 xl:gap-6">
        {/* Total Views */}
        <Card className="bg-card rounded-2xl border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3.5 pb-1 sm:p-4 sm:pb-1.5 lg:p-5 lg:pb-2 xl:p-6 xl:pb-2">
            <Skeleton className="h-3.5 w-20 rounded-md sm:w-24" />
            <Skeleton className="h-3.5 w-3.5 rounded-full sm:h-4 sm:w-4" />
          </CardHeader>
          <CardContent className="space-y-2 p-3.5 pt-0 sm:p-4 sm:pt-0 lg:p-5 lg:pt-0 xl:p-6 xl:pt-0">
            <Skeleton className="h-6 w-12 rounded-md sm:h-8 sm:w-16" />
            <Skeleton className="h-3 w-24 rounded-md sm:w-32" />
          </CardContent>
        </Card>

        {/* Unique Companies */}
        <Card className="bg-card rounded-2xl border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3.5 pb-1 sm:p-4 sm:pb-1.5 lg:p-5 lg:pb-2 xl:p-6 xl:pb-2">
            <Skeleton className="h-3.5 w-20 rounded-md sm:w-28" />
            <Skeleton className="h-3.5 w-3.5 rounded-full sm:h-4 sm:w-4" />
          </CardHeader>
          <CardContent className="space-y-2 p-3.5 pt-0 sm:p-4 sm:pt-0 lg:p-5 lg:pt-0 xl:p-6 xl:pt-0">
            <Skeleton className="h-6 w-10 rounded-md sm:h-8 sm:w-10" />
            <Skeleton className="h-3 w-28 rounded-md sm:w-40" />
          </CardContent>
        </Card>

        {/* Search Appearances */}
        <Card className="bg-card col-span-2 rounded-2xl border shadow-xs lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3.5 pb-1 sm:p-4 sm:pb-1.5 lg:p-5 lg:pb-2 xl:p-6 xl:pb-2">
            <Skeleton className="h-3.5 w-24 rounded-md sm:w-32" />
            <Skeleton className="h-3.5 w-3.5 rounded-full sm:h-4 sm:w-4" />
          </CardHeader>
          <CardContent className="space-y-2 p-3.5 pt-0 sm:p-4 sm:pt-0 lg:p-5 lg:pt-0 xl:p-6 xl:pt-0">
            <Skeleton className="h-6 w-8 rounded-md sm:h-8 sm:w-8" />
            <Skeleton className="h-3 w-20 rounded-md sm:w-24" />
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
