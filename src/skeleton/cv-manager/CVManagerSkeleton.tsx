"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CVManagerSkeleton() {
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
              <Skeleton className="h-4 w-md max-w-full rounded-md" />
            </div>
          </div>
          <Skeleton className="h-14 w-44 shrink-0 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

// 4. PRICING PACKAGES SKELETON
