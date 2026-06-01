"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ProfileSkeleton = () => {
  return (
    <div className="bg-background mt-16 min-h-screen pt-8 pb-20">
      <div className="space-y-8 px-4 md:px-6">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-8 w-12" />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="w-full">
          <div className="bg-muted/30 flex h-14 w-full max-w-2xl items-center gap-4 rounded-xl p-1.5 shadow-sm">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-full flex-1 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content Area */}
          <div className="space-y-8 lg:col-span-8">
            {/* Basic Information Card Skeleton */}
            <Card className="ring-border/50 border-0 shadow-sm ring-1">
              <CardContent className="p-6">
                <div className="mb-8 flex items-center justify-between">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  ))}
                  <div className="space-y-2 md:col-span-2">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Section Skeleton */}
            <Card className="ring-border/50 border-0 shadow-sm ring-1">
              <CardContent className="p-6">
                <div className="mb-8 flex items-center justify-between">
                  <Skeleton className="h-6 w-32" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                  ))}
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
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-8" />
                </div>
                <Skeleton className="h-3 w-full rounded-full" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions / Tips */}
            <Card className="bg-primary/5 border-0">
              <CardContent className="space-y-3 p-6 text-center">
                <Skeleton className="mx-auto h-12 w-12 rounded-full" />
                <Skeleton className="mx-auto h-4 w-48" />
                <Skeleton className="mx-auto h-3 w-64" />
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
