"use client";

import DashboardAppliedJobsHeader from "@/components/dashboard/dashboard-nav/header/DashboardAppliedJobsHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MyAppliedJobsSkeleton = () => {
  return (
    <div className="min-h-screen pt-8">
      <DashboardAppliedJobsHeader />

      <div className="space-y-4 px-3.5 py-4 sm:space-y-6 sm:px-6 sm:py-8">
        {/* Application Stats Skeleton */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4 xl:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-card border-border">
              <CardContent className="animate-pulse space-y-4 p-3.5 sm:p-4 lg:p-5 xl:p-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-8 rounded-xl sm:h-9 sm:w-9 lg:h-11 lg:w-11" />
                </div>
                <div className="mt-3 space-y-2 sm:mt-4 lg:mt-5">
                  <Skeleton className="h-6 w-12 sm:h-7 sm:w-16 lg:h-8" />
                  <Skeleton className="h-4 w-20 sm:w-24 lg:w-28" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Bar Skeleton */}
        <Card className="bg-card rounded-2xl border">
          <CardContent className="flex animate-pulse flex-col gap-3 p-3.5 sm:p-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full max-w-md flex-1">
              <Skeleton className="h-9 w-full rounded-full sm:h-10" />
            </div>
            <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3 md:w-auto">
              <Skeleton className="h-8 w-24 rounded-full sm:h-10" />
              <Skeleton className="h-8 w-28 rounded-full sm:h-10" />
              <Skeleton className="h-8 w-24 rounded-full sm:h-10" />
            </div>
          </CardContent>
        </Card>

        {/* Results Table Skeleton */}
        <Card className="bg-card overflow-hidden rounded-xl border">
          <div className="bg-muted/5 animate-pulse border-b px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-36 rounded" />
                <Skeleton className="h-3 w-48 rounded" />
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3.5 w-8 rounded" />
                  <Skeleton className="h-8 w-[70px] rounded-full" />
                </div>
                <Skeleton className="h-7 w-20 rounded-full" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] md:min-w-full">
              <thead className="bg-muted/10">
                <tr className="border-b">
                  <th className="py-3 pl-3 text-left sm:py-4 sm:pl-6">
                    <Skeleton className="h-3 w-24 rounded" />
                  </th>
                  <th className="hidden py-4 text-left md:table-cell">
                    <Skeleton className="h-3 w-16 rounded" />
                  </th>
                  <th className="py-3 text-center sm:py-4">
                    <Skeleton className="mx-auto h-3 w-12 rounded" />
                  </th>
                  <th className="hidden py-4 text-right md:table-cell">
                    <Skeleton className="ml-auto h-3 w-20 rounded" />
                  </th>
                  <th className="py-3 pr-3 text-right sm:py-4 sm:pr-6">
                    <Skeleton className="ml-auto h-3 w-12 rounded" />
                  </th>
                </tr>
              </thead>
              <tbody className="animate-pulse divide-y">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="border-b">
                    {/* Company & Role */}
                    <td className="py-4 pl-3 sm:pl-6">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                        <div className="min-w-0 flex-1 space-y-2">
                          <Skeleton className="h-4.5 w-36 rounded sm:w-48" />
                          <Skeleton className="h-3.5 w-24 rounded" />
                        </div>
                      </div>
                    </td>
                    {/* Location */}
                    <td className="hidden py-4 md:table-cell">
                      <Skeleton className="h-4 w-28 rounded" />
                    </td>
                    {/* Status */}
                    <td className="py-4 text-center">
                      <Skeleton className="mx-auto h-6 w-20 rounded-full" />
                    </td>
                    {/* Date Applied */}
                    <td className="hidden py-4 text-right md:table-cell">
                      <Skeleton className="ml-auto h-4 w-24 rounded" />
                    </td>
                    {/* Actions */}
                    <td className="py-4 pr-3 text-right sm:pr-6">
                      <Skeleton className="ml-auto h-8 w-8 rounded-full" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyAppliedJobsSkeleton;
