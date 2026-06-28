"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ProfileSkeleton = () => {
  return (
    <div className="bg-background min-h-screen pt-3 pb-12 sm:pt-4 sm:pb-16 lg:pt-6 lg:pb-20">
      <div className="space-y-4 px-3 sm:space-y-6 sm:px-6 lg:space-y-8 lg:px-8">
        {/* Header Profile Card Skeleton */}
        <Card className="border-border/80 bg-card relative gap-0 overflow-hidden rounded-2xl border p-0">
          <div className="bg-muted relative h-32 w-full animate-pulse sm:h-20" />

          <CardContent className="relative p-3 sm:p-4 md:p-6">
            {/* Mobile View Skeleton */}
            <div className="flex animate-pulse flex-col items-center text-center sm:hidden">
              <div className="relative -mt-14 mb-4 shrink-0">
                <Skeleton className="border-background h-24 w-24 rounded-full border-[3px]" />
                <div className="bg-muted border-background absolute right-1 bottom-1 h-6 w-6 rounded-full border-2" />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-6 w-36 rounded-md" />
                <Skeleton className="h-4 w-52 rounded-md" />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
            </div>

            {/* Tablet/Desktop View Skeleton */}
            <div className="-mt-10 mb-0 hidden animate-pulse sm:flex sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <Skeleton className="border-background h-20 w-20 shrink-0 rounded-full border-4" />
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-6 w-40 rounded-md" />
                  <Skeleton className="h-4 w-60 rounded-md" />
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Skeleton className="h-7 w-32 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>
            </div>

            {/* Desktop progress bar and alert box below the row */}
            <div className="border-border/50 mt-4 hidden animate-pulse space-y-3 border-t pt-4 sm:block">
              <Skeleton className="h-1.5 w-full rounded-full" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </CardContent>
        </Card>

        {/* Tabs Skeleton */}
        <div className="scrollbar-none mb-4 w-full overflow-x-auto sm:mb-6">
          <div className="bg-muted/30 border-border/50 flex h-10 min-w-max gap-1 rounded-full border p-1 whitespace-nowrap lg:grid lg:h-12 lg:min-w-0 lg:grid-cols-4 lg:whitespace-normal">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                className="h-full w-28 flex-shrink-0 rounded-full lg:w-full lg:flex-shrink-1"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content Area */}
          <div className="space-y-8 lg:col-span-8">
            {/* Basic Information Card Skeleton */}
            <Card className="ring-border/50 border-0 shadow-sm ring-1">
              <CardContent className="px-4 pt-0 pb-4 sm:px-6 sm:pb-6">
                <div className="border-t pt-3 sm:pt-4">
                  <div className="mb-6 flex items-center justify-between">
                    <Skeleton className="h-5 w-40 rounded-md" />
                    <Skeleton className="h-7 w-12 rounded-md" />
                  </div>
                  <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-3 w-20 rounded-md" />
                        <Skeleton className="h-5 w-full rounded-md" />
                      </div>
                    ))}
                    <div className="space-y-2 md:col-span-2">
                      <Skeleton className="h-3 w-32 rounded-md" />
                      <Skeleton className="h-16 w-full rounded-md" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Section Skeleton */}
            <Card className="ring-border/50 border-0 shadow-sm ring-1">
              <CardContent className="px-4 pt-0 pb-4 sm:px-6 sm:pb-6">
                <div className="border-t pt-3 sm:pt-4">
                  <div className="mb-6 flex items-center justify-between">
                    <Skeleton className="h-5 w-32 rounded-md" />
                    <div className="flex gap-2">
                      <Skeleton className="h-7 w-12 rounded-md" />
                      <Skeleton className="h-7 w-12 rounded-md" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-24 w-full rounded-xl" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8 lg:col-span-4">
            {/* Profile Progress Card */}
            <Card className="ring-border/50 border-0 shadow-sm ring-1">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32 rounded-md" />
                  <Skeleton className="h-5 w-8 rounded-md" />
                </div>
                <Skeleton className="h-3 w-full rounded-full" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-full rounded-md" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions / Tips */}
            <Card className="bg-primary/5 border-0">
              <CardContent className="space-y-3 p-6 text-center">
                <Skeleton className="mx-auto h-12 w-12 rounded-full" />
                <Skeleton className="mx-auto h-4 w-48 rounded-md" />
                <Skeleton className="mx-auto h-3 w-64 rounded-md" />
                <Skeleton className="mx-auto h-9 w-32 rounded-lg" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
