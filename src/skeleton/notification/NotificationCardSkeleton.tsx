"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const NotificationCardSkeleton = () => {
  return (
    <Card className="bg-white transition-all">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="rounded-full p-2">
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-1 flex items-center space-x-2">
                  <Skeleton className="h-4 w-40 rounded-md" />
                  <Skeleton className="h-2 w-2 rounded-full" />
                </div>

                <div className="mb-2 space-y-1">
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                </div>

                <div className="mb-2 flex flex-wrap gap-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>

                <Skeleton className="h-3 w-16 rounded-md" />
              </div>

              <div className="ml-4 flex items-center space-x-1">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCardSkeleton;
