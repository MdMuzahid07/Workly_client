'use client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const JobCardSkeleton = () => {
  return (
    <Card className="bg-primary/2 sm:bg-card w-full rounded-2xl border-0 shadow-none drop-shadow-none">
      <CardHeader className="px-0 pb-3 md:px-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>

            <Skeleton className="mb-2 h-6 w-4/5 rounded-md" />

            <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
              <Skeleton className="h-4 w-32 rounded-md" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0 md:px-4 md:pb-4">
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>

        <div className="mb-4 space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-18 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </CardContent>

      <CardFooter className="border-border border-b px-0 pb-7 md:border-t md:border-b-0 md:px-4 md:pt-4 md:pb-0">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCardSkeleton;
