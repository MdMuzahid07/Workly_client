'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '../../../components/ui/card';

const CompanyCardSkeleton = () => {
  return (
    <Card className="bg-card cursor-pointer rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />

          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <Skeleton className="h-5 w-32 rounded-md" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0 pt-0 sm:px-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-4 w-28 rounded-md" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-4 w-36 rounded-md" />
            </div>
          </div>

          <div className="flex items-center justify-between border-b pt-4 pb-7 sm:border-t sm:border-b-0 sm:border-gray-100 sm:pb-0">
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-6 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCardSkeleton;
