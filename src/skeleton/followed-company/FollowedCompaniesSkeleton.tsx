"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FollowedCompaniesSkeleton() {
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
