import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function SavedProfilesSkeleton() {
  return (
    <div className="space-y-6 px-4 sm:px-6 sm:py-8">
      {/* Stats Summary Skeletons */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card
            key={i}
            className={`bg-card border shadow-xs ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
          >
            <CardContent className="flex items-center justify-between p-3.5 sm:p-4">
              <div className="flex-1 space-y-1.5 pr-2">
                <Skeleton className="h-3.5 w-16 sm:w-20" />
                <Skeleton className="h-6 w-10 sm:h-8 sm:w-12" />
              </div>
              <Skeleton className="h-9 w-9 rounded-full sm:h-10 sm:w-10" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Bar Skeleton */}
      <Card className="bg-card rounded-xl border">
        <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
            <Skeleton className="h-11 w-full max-w-md rounded-full" />
            <Skeleton className="h-10 w-48 rounded-full" />
          </div>
          <Skeleton className="h-11 w-44 rounded-full" />
        </CardContent>
      </Card>

      {/* Profiles Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="bg-card space-y-4 rounded-xl border p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-44" />
                </div>
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-12 w-full rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-36 rounded-full" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
