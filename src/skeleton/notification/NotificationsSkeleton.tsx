'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function NotificationsSkeleton() {
  return (
    <div className="animate-pulse space-y-4 px-3.5 py-4 sm:space-y-6 sm:px-6 sm:py-8">
      {/* Filter Tabs Skeleton */}
      <div className="bg-card border-border/60 flex h-auto w-full gap-1 rounded-2xl border p-1 shadow-2xs sm:h-11">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 flex-1 rounded-xl sm:h-9" />
        ))}
      </div>

      {/* Notifications List Skeleton */}
      <div className="space-y-3 sm:space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="bg-card rounded-2xl border shadow-xs">
            <CardContent className="flex items-start gap-3 p-3.5 sm:gap-4 sm:p-5">
              <Skeleton className="h-10 w-10 shrink-0 rounded-xl sm:h-11 sm:w-11" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-36 rounded-md sm:w-48" />
                  <Skeleton className="h-3.5 w-16 rounded-md" />
                </div>
                <Skeleton className="h-3.5 w-full rounded-md" />
                <Skeleton className="h-3.5 w-3/4 rounded-md" />
                <Skeleton className="mt-1 h-3 w-24 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
