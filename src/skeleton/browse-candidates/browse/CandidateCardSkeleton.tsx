"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CandidateCardSkeleton = ({
  viewType = "list",
}: {
  viewType?: "grid" | "list";
}) => {
  if (viewType === "grid") {
    return (
      <Card className="overflow-hidden border-none shadow-sm">
        <CardContent className="p-0">
          <div className="relative h-48 w-full">
            <Skeleton className="h-full w-full rounded-none" />
          </div>
          <div className="space-y-3 p-5">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <div className="flex items-center justify-between pt-4">
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            {/* Avatar Skeleton */}
            <Skeleton className="h-16 w-16 rounded-2xl md:h-20 md:w-20" />

            <div className="space-y-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-64" />
              <div className="flex items-center gap-4 pt-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCardSkeleton;
