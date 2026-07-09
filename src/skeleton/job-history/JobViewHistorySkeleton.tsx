"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobViewHistorySkeleton() {
  return (
    <div className="space-y-6 px-3.5 py-4 sm:space-y-6 sm:px-6 sm:py-8">
      {/* Filter Bar Skeleton */}
      <Card className="bg-card rounded-2xl border">
        <CardContent className="flex animate-pulse flex-col gap-3 p-3.5 sm:p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            {/* Search Input Skeleton */}
            <div className="relative w-full max-w-md flex-1">
              <Skeleton className="h-9 w-full rounded-full sm:h-10" />
            </div>

            {/* Filter Row Skeleton */}
            <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-start">
              <div className="flex flex-1 items-center gap-2 md:flex-initial">
                <Skeleton className="hidden h-4 w-10 rounded sm:inline-block" />
                <Skeleton className="h-8 w-full rounded-full sm:h-10 md:w-48" />
              </div>
            </div>
          </div>
          <Skeleton className="h-8 w-24 shrink-0 rounded-full sm:h-10 sm:w-28" />
        </CardContent>
      </Card>

      {/* Jobs Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="bg-card border-border rounded-2xl border p-5 sm:p-6"
          >
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
                      {i % 2 === 0 && (
                        <Skeleton className="h-4.5 w-12 rounded" />
                      )}
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
        ))}
      </div>
    </div>
  );
}
