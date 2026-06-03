"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SavedJobsViewSkeleton = () => {
  return (
    <div className="animate-in fade-in-50 container mx-auto space-y-8 px-4 py-6 pt-24">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="h-4 w-80 rounded-md" />
        </div>
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="space-y-3 p-4">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-3 w-32 rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="flex flex-col gap-4 lg:flex-row">
            <Skeleton className="h-10 w-full rounded-md lg:w-1/2" />
            <div className="flex gap-2 overflow-x-auto">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-40 rounded-md" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <Skeleton className="h-4 w-64 rounded-md" />
              <Skeleton className="h-4 w-48 rounded-md" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-32 rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedJobsViewSkeleton;
