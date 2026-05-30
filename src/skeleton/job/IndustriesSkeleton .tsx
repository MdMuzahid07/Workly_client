"use client";

import { Skeleton } from "@/components/ui/skeleton";

const IndustriesSkeleton = () => {
  return (
    <div className="container mx-auto mt-4 p-4 md:mt-7 xl:p-0">
      <div className="flex gap-3 overflow-hidden">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="w-auto">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default IndustriesSkeleton;
