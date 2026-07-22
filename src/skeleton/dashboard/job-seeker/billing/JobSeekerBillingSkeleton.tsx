'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function JobSeekerBillingSkeleton() {
  return (
    <div className="animate-pulse space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Subscription Summary */}
        <Card className="border lg:col-span-1">
          <CardHeader className="border-b pb-4">
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-3.5 w-52 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-24 rounded-md" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-36 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
            <div className="space-y-3 border-y py-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3 w-40 rounded-md" />
              </div>
              <Skeleton className="h-6 w-11 rounded-full" />
            </div>
            <Skeleton className="h-11 w-full rounded-xl" />
          </CardContent>
        </Card>

        {/* Payments Channels */}
        <Card className="border lg:col-span-2">
          <CardHeader className="border-b pb-4">
            <Skeleton className="h-5 w-60 rounded-md" />
            <Skeleton className="h-3.5 w-80 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="space-y-4 border p-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28 rounded-md" />
                      <Skeleton className="h-3 w-20 rounded-md" />
                    </div>
                    <Skeleton className="h-10 w-16 animate-pulse rounded-xl" />
                  </div>
                  <Skeleton className="h-3.5 w-full rounded-md" />
                </Card>
              ))}
            </div>
            <div className="flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
              <Skeleton className="h-16 w-full rounded-xl md:w-3/4" />
              <Skeleton className="h-12 w-full rounded-xl md:w-44" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice History */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-40 rounded-md" />
        </div>
        <Card className="border p-0">
          <CardContent className="p-0">
            <div className="space-y-4 p-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b py-3 last:border-0"
                >
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// 6. JOB VIEW HISTORY SKELETON
