"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FollowedCompaniesSkeleton() {
  return (
    <div className="animate-pulse space-y-4 px-3.5 py-4 sm:space-y-6 sm:px-6 sm:py-8">
      {/* Filter Bar */}
      <Card className="bg-card rounded-2xl border">
        <CardContent className="flex flex-col gap-3 p-3.5 sm:p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <Skeleton className="h-9 w-full max-w-md rounded-full sm:h-10" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-32 rounded-full sm:w-48" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Companies Grid matching live breakpoints */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className="bg-card flex flex-col justify-between overflow-hidden rounded-2xl border"
          >
            <CardContent className="flex flex-1 flex-col justify-between space-y-4 p-4 sm:p-6">
              <div>
                {/* Header: Logo & Unfollow button */}
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <Skeleton className="h-12 w-12 shrink-0 rounded-xl sm:h-16 sm:w-16 sm:rounded-2xl" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-5 w-32 rounded-md sm:w-40" />
                      <Skeleton className="h-3.5 w-24 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-20 shrink-0 rounded-full" />
                </div>

                {/* Description */}
                <div className="mt-4 space-y-1.5">
                  <Skeleton className="h-3.5 w-full rounded-md" />
                  <Skeleton className="h-3.5 w-3/4 rounded-md" />
                </div>
              </div>

              <div>
                {/* Location & Date */}
                <div className="border-border/40 mt-4 grid grid-cols-2 gap-3 border-t pt-3 sm:mt-6 sm:gap-4 sm:pt-4">
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-12 rounded-md" />
                    <Skeleton className="h-3.5 w-20 rounded-md" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-14 rounded-md" />
                    <Skeleton className="h-3.5 w-20 rounded-md" />
                  </div>
                </div>

                {/* Bottom row */}
                <div className="mt-4 flex items-center justify-between gap-3 sm:mt-6">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-4 w-20 rounded-md" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// 8. JOB SEEKER SETTINGS SKELETON
