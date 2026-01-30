"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ApplicationCardSkeleton = () => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>

        <Skeleton className="h-px w-full" />

        <Skeleton className="h-4 w-40" />

        <div className="flex flex-wrap gap-2 pt-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 w-full rounded-full" />
          <Skeleton className="h-9 w-full rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

const MyAppliedJobsSkeleton = () => {
  return (
    <div className="bg-primary/2 min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 md:mt-16 lg:px-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-card border-border">
              <CardContent className="space-y-2 p-4 text-center">
                <Skeleton className="mx-auto h-8 w-14" />
                <Skeleton className="mx-auto h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Skeleton className="h-10 w-full rounded-full" />
          </div>

          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <ApplicationCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppliedJobsSkeleton;
