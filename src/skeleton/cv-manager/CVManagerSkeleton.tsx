"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CVManagerSkeleton() {
  return (
    <div className="animate-pulse space-y-4 px-3.5 py-4 sm:space-y-6 sm:px-6 sm:py-8">
      {/* Title section */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-36 rounded-md sm:h-6" />
          <Skeleton className="h-3.5 w-56 rounded-md sm:h-4" />
        </div>
        <Skeleton className="h-9 w-full rounded-full sm:h-11 sm:w-44" />
      </div>

      {/* CV Grid matching live breakpoints */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="bg-card rounded-2xl border shadow-xs">
            <CardContent className="space-y-4 p-3.5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-full sm:h-12 sm:w-12" />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-3.5 w-1/2 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
              </div>
              <Skeleton className="h-px w-full" />
              <div className="flex items-center justify-between pt-1">
                <Skeleton className="h-3.5 w-24 rounded-md" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Upload Placeholder Card */}
        <Card className="flex h-full min-h-[150px] flex-col items-center justify-center rounded-2xl border-2 border-dashed text-center sm:min-h-[200px]">
          <CardContent className="flex flex-col items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <Skeleton className="h-12 w-12 rounded-full sm:h-16 sm:w-16" />
            <div className="space-y-1.5">
              <Skeleton className="mx-auto h-4 w-28 rounded-md" />
              <Skeleton className="mx-auto h-3.5 w-44 rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Upgrade Hint for Free Users */}
      <div className="from-primary/10 via-background border-primary/10 to-primary/5 relative overflow-hidden rounded-2xl border-2 bg-linear-to-br p-4 sm:p-8">
        <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Skeleton className="h-12 w-12 shrink-0 rounded-2xl shadow-lg sm:h-16 sm:w-16" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-64 rounded-md sm:h-6" />
              <Skeleton className="h-3.5 w-md max-w-full rounded-md sm:h-4" />
            </div>
          </div>
          <Skeleton className="h-10 w-44 shrink-0 rounded-2xl sm:h-14" />
        </div>
      </div>
    </div>
  );
}

// 4. PRICING PACKAGES SKELETON
