'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const JobApplyViewSkeleton = () => {
  return (
    <div className="bg-background min-h-screen pt-10 pb-20">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:mt-10 lg:px-8">
        {/* Header Skeleton */}
        <div className="bg-card animate-pulse rounded-xl border p-4 sm:p-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full sm:h-12 sm:w-12" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 rounded sm:h-7" />
              <Skeleton className="h-4 w-48 rounded sm:w-64" />
            </div>
          </div>
        </div>

        {/* Application Limit Warning Skeleton */}
        <div className="mt-6 flex animate-pulse flex-col justify-between gap-4 rounded-2xl border border-amber-200/50 bg-amber-50/30 p-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 shrink-0 rounded-xl bg-amber-200/50" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40 rounded bg-amber-200/50" />
              <Skeleton className="h-3 w-64 rounded bg-amber-200/50 sm:w-80" />
            </div>
          </div>
          <Skeleton className="h-9 w-full rounded-xl bg-amber-200/50 md:w-32" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-6 lg:col-span-2">
            {/* Summary Card Skeleton */}
            <Card className="bg-card rounded-xl border p-2 shadow-none sm:p-4">
              <CardContent className="animate-pulse space-y-4 p-4 sm:p-6">
                <div>
                  <Skeleton className="h-7 w-64 rounded sm:w-80" />
                  <div className="mt-3 flex items-center gap-2">
                    <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Skeleton className="h-6 w-28 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </CardContent>
            </Card>

            {/* Info Cards Skeleton */}
            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="bg-card rounded-xl border shadow-none">
                <CardContent className="flex animate-pulse items-start gap-4 p-5">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-16 rounded" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card rounded-xl border shadow-none">
                <CardContent className="flex animate-pulse items-start gap-4 p-5">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20 rounded" />
                    <Skeleton className="h-4 w-36 rounded" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form Skeleton */}
            <Card className="bg-card rounded-2xl border shadow-none">
              <div className="border-border/50 animate-pulse space-y-2 border-b p-6 sm:px-8">
                <Skeleton className="h-6 w-48 rounded" />
                <Skeleton className="mt-2 h-4 w-64 rounded" />
              </div>
              <CardContent className="animate-pulse space-y-6 p-6 sm:p-8">
                {/* Personal Info */}
                <div className="space-y-4">
                  <Skeleton className="h-5 w-40 rounded" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28 rounded" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28 rounded" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                </div>

                <Skeleton className="h-px w-full" />

                {/* Professional Info */}
                <div className="space-y-4">
                  <Skeleton className="h-5 w-48 rounded" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 rounded" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 rounded" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40 rounded" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>

                <Skeleton className="h-px w-full" />

                {/* Resume section */}
                <div className="space-y-4">
                  <Skeleton className="h-5 w-32 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                  </div>
                  <div className="space-y-2 pt-4">
                    <div className="flex items-center justify-center py-2">
                      <Skeleton className="h-px w-full" />
                    </div>
                    <Skeleton className="h-4 w-40 rounded" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>

                <Skeleton className="h-px w-full" />

                {/* Cover Letter */}
                <div className="space-y-4">
                  <Skeleton className="h-5 w-28 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-64 rounded" />
                    <Skeleton className="h-32 w-full rounded-md" />
                  </div>
                </div>

                {/* Checkbox and Submit */}
                <div className="flex items-center gap-3 pt-6">
                  <Skeleton className="h-5 w-5 shrink-0 rounded" />
                  <Skeleton className="h-4 w-3/4 rounded sm:w-1/2" />
                </div>
                <Skeleton className="mt-4 h-12 w-full rounded-xl" />
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            {/* Requirements Skeleton */}
            <Card className="border-primary/10 bg-background/60 shadow-primary/5 rounded-2xl border shadow-lg backdrop-blur-xl">
              <div className="border-border/50 animate-pulse border-b px-6 py-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                  <Skeleton className="h-5 w-32 rounded" />
                </div>
              </div>
              <CardContent className="animate-pulse space-y-5 p-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full rounded" />
                      <Skeleton className="h-4 w-5/6 rounded" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Benefits & Perks Skeleton */}
            <Card className="border-primary/10 bg-background/60 shadow-primary/5 rounded-2xl border shadow-lg backdrop-blur-xl">
              <div className="border-border/50 animate-pulse border-b px-6 py-4">
                <Skeleton className="h-6 w-40 rounded" />
              </div>
              <CardContent className="animate-pulse space-y-5 p-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full rounded" />
                      {i % 2 === 0 && <Skeleton className="h-4 w-4/5" />}
                    </div>
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
