"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const JobApplyViewSkeleton = () => {
  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:mt-10 lg:px-8">
        {/* Header Skeleton */}
        <div className="border-border/50 bg-card flex flex-col justify-between gap-6 rounded-xl border p-4 sm:p-6 md:flex-row md:items-center lg:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Skeleton className="h-16 w-16 shrink-0 rounded-xl" />
            <div className="space-y-3">
              <Skeleton className="h-8 w-64 md:w-80" />
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex w-full items-center gap-3 md:mt-0 md:w-auto">
            <Skeleton className="h-10 w-full rounded-xl md:w-28" />
            <Skeleton className="h-10 w-full rounded-xl md:w-10" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-6 lg:col-span-2">
            {/* Summary Card Skeleton */}
            <Card className="bg-card rounded-xl border p-2 shadow-none sm:p-4">
              <CardContent className="space-y-4 p-0">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </CardContent>
            </Card>

            {/* Info Cards Skeleton */}
            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="bg-card rounded-xl border shadow-none">
                <CardContent className="flex items-start gap-4 p-5">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                  <div className="w-full space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card rounded-xl border shadow-none">
                <CardContent className="flex items-start gap-4 p-5">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                  <div className="w-full space-y-2">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form Skeleton */}
            <Card className="bg-card rounded-2xl border shadow-none">
              <div className="border-border/50 space-y-2 border-b p-6 sm:px-8">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
              <CardContent className="space-y-6 p-6 sm:p-8">
                {/* Personal Info */}
                <div className="space-y-4">
                  <Skeleton className="h-5 w-40" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                </div>

                <Skeleton className="h-px w-full" />

                {/* Professional Info */}
                <div className="space-y-4">
                  <Skeleton className="h-5 w-48" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>

                <Skeleton className="h-px w-full" />

                {/* Resume section */}
                <div className="space-y-4">
                  <Skeleton className="h-5 w-32" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                  </div>
                  <div className="space-y-2 pt-4">
                    <div className="flex items-center justify-center py-2">
                      <Skeleton className="h-px w-full" />
                    </div>
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>

                <Skeleton className="h-px w-full" />

                {/* Cover Letter */}
                <div className="space-y-4">
                  <Skeleton className="h-5 w-28" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-32 w-full rounded-md" />
                  </div>
                </div>

                {/* Checkbox and Submit */}
                <div className="flex items-center gap-3 pt-6">
                  <Skeleton className="h-5 w-5 shrink-0 rounded" />
                  <Skeleton className="h-4 w-3/4 sm:w-1/2" />
                </div>
                <Skeleton className="mt-4 h-12 w-full rounded-xl" />
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            {/* Sidebar Skeletons */}
            <Card className="bg-card rounded-xl border shadow-none">
              <div className="flex flex-row items-center gap-3 p-4 pb-2 sm:p-6 sm:pb-4">
                <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
                <Skeleton className="h-5 w-32" />
              </div>
              <CardContent className="space-y-4 p-4 pt-0 sm:p-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="mt-2 h-2 w-2 shrink-0 rounded-full" />
                    <div className="grow space-y-2">
                      <Skeleton className="h-4 w-full" />
                      {i % 2 === 0 && <Skeleton className="h-4 w-4/5" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card rounded-xl border shadow-none">
              <div className="flex flex-row items-center gap-3 p-4 pb-2 sm:p-6 sm:pb-4">
                <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
                <Skeleton className="h-5 w-36" />
              </div>
              <CardContent className="space-y-4 p-4 pt-0 sm:p-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 shrink-0 rounded" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobApplyViewSkeleton;
