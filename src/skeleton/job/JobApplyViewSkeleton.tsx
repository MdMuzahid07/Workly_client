"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const JobApplyViewSkeleton = () => {
  return (
    <div className="bg-primary/2 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:mt-16 lg:px-8">
        <div className="space-y-3">
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-4 w-40" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardContent className="space-y-4 p-6">
                <Skeleton className="h-6 w-60" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>

            <div className="grid gap-3 sm:grid-cols-2">
              <Card>
                <CardContent className="space-y-3 p-6">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-36" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-3 p-6">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-36" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="space-y-8 p-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-24 w-full" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-4 w-64" />
                </div>

                <div className="flex justify-end">
                  <Skeleton className="h-10 w-32" />
                </div>
              </CardContent>
            </Card>
          </div>

          <aside>
            <Card>
              <CardContent className="space-y-4 p-6">
                <Skeleton className="h-6 w-40" />

                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                  <Skeleton className="h-4 w-3/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/6" />
                </div>

                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobApplyViewSkeleton;
