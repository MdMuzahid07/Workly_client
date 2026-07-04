"use client";

import DashboardSavedJobsHeader from "@/components/dashboard/dashboard-nav/header/DashboardSavedJobsHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SavedJobCardSkeleton = () => (
  <Card className="bg-card border-border rounded-2xl border p-5 sm:p-6">
    <CardContent className="p-0">
      <div className="flex animate-pulse flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        {/* Main Info (Logo + Title/Meta) */}
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
          {/* Logo Placeholder */}
          <Skeleton className="h-10 w-10 shrink-0 rounded-xl sm:h-12 sm:w-12 md:h-14 md:w-14" />

          {/* Info details */}
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <Skeleton className="h-5 w-48 rounded" />
              <Skeleton className="h-4.5 w-12 rounded" />
            </div>
            <Skeleton className="h-4 w-28 rounded" />

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Skeleton className="h-3.5 w-20 rounded" />
              <Skeleton className="h-3.5 w-16 rounded" />
              <Skeleton className="h-3.5 w-24 rounded" />
            </div>
          </div>
        </div>

        {/* Divider on Mobile only */}
        <div className="w-full border-t border-gray-100 sm:hidden dark:border-slate-800/60" />

        {/* Right Section (Salary + Actions) */}
        <div className="flex w-full shrink-0 items-center justify-between sm:w-auto sm:flex-col sm:items-end sm:justify-center sm:gap-2.5">
          {/* Salary */}
          <Skeleton className="h-5 w-32 rounded sm:h-6" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full sm:h-8.5 sm:w-8.5" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const SavedJobsViewSkeleton = () => {
  return (
    <div className="min-h-screen pt-8">
      <DashboardSavedJobsHeader />

      <div className="space-y-4 px-3.5 py-4 sm:space-y-6 sm:px-6 sm:py-8">
        {/* Stats Cards Skeleton */}
        <div className="mb-6 grid grid-cols-2 gap-2.5 sm:mb-8 sm:gap-4 lg:gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="bg-card border-border rounded-2xl border">
              <CardContent className="animate-pulse space-y-4 p-3.5 sm:p-4 lg:p-5 xl:p-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-8 rounded-xl sm:h-9 sm:w-9 lg:h-11 lg:w-11" />
                  <Skeleton className="h-4.5 w-16 rounded-full sm:w-20" />
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
              <Skeleton className="h-8 w-24 rounded-full sm:h-10" />
            </div>
          </CardContent>
        </Card>

        {/* Tabs System Skeleton */}
        <div className="flex animate-pulse items-center justify-between">
          <div className="bg-muted/20 border-border flex h-10 w-64 items-center gap-1 rounded-full border p-1">
            <Skeleton className="h-8 w-1/2 rounded-full" />
            <Skeleton className="h-8 w-1/2 rounded-full" />
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Skeleton className="h-4 w-10 rounded" />
            <Skeleton className="h-8 w-[70px] rounded-full" />
          </div>
        </div>

        {/* Jobs List Skeleton */}
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SavedJobCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedJobsViewSkeleton;
