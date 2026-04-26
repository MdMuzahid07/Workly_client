"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CandidateDetailsSkeleton = () => {
  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Banner Skeleton */}
      <Skeleton className="h-64 w-full lg:h-80" />

      <div className="relative mx-auto -mt-32 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Header Card Skeleton */}
            <Card className="border-none shadow-lg">
              <CardHeader className="p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <Skeleton className="h-24 w-24 rounded-2xl md:h-32 md:w-32" />
                    <div className="flex-1 space-y-4">
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>
                      <Skeleton className="h-10 w-64" />
                      <Skeleton className="h-6 w-48" />
                      <div className="flex gap-4 pt-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <Skeleton className="h-10 w-10 rounded-xl" />
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Skeleton className="h-12 w-32 rounded-full" />
                  <Skeleton className="h-12 w-36 rounded-full" />
                </div>
              </CardHeader>
            </Card>

            {/* Content Sections Skeletons */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-none shadow-sm">
                <CardHeader>
                  <Skeleton className="h-7 w-48" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar Skeletons */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-lg">
              <div className="space-y-4 p-8 text-center">
                <Skeleton className="mx-auto h-12 w-12 rounded-full" />
                <Skeleton className="mx-auto h-6 w-32" />
                <Skeleton className="mx-auto h-4 w-full" />
                <Skeleton className="h-11 w-full rounded-full" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsSkeleton;
