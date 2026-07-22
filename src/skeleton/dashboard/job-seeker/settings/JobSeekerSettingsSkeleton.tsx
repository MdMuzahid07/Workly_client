'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function JobSeekerSettingsSkeleton() {
  return (
    <div className="animate-pulse px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Account Section */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-24 rounded-md" />
            <Skeleton className="h-4 w-52 rounded-md" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="border p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-36 rounded-md" />
                      <Skeleton className="h-3 w-28 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-5 rounded-md" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Skeleton className="h-px w-full" />

        {/* Preferences Section */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-36 rounded-md" />
            <Skeleton className="h-4 w-60 rounded-md" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-40 rounded-md" />
                      <Skeleton className="h-3 w-60 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-11 animate-pulse rounded-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. NOTIFICATIONS SKELETON
