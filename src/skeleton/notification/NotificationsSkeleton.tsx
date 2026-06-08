"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationsSkeleton() {
  return (
    <div className="animate-pulse space-y-6 px-4 py-8 sm:px-6">
      {/* Filter Tabs */}
      <div className="bg-muted/10 flex h-10 w-full gap-1 rounded-full border p-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 flex-1 rounded-full" />
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="border-l-muted border border-l-4">
            <CardContent className="flex items-start gap-4 p-4 sm:p-5">
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-40 rounded-md" />
                  <Skeleton className="h-3.5 w-16 rounded-md" />
                </div>
                <Skeleton className="h-3.5 w-full rounded-md" />
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
