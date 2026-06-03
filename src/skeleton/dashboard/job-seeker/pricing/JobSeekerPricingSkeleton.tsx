"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobSeekerPricingSkeleton() {
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
