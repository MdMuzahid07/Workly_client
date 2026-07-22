import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardSkeleton() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header Skeleton */}
      <div className="bg-card border-b py-6">
        <div className="mx-auto flex max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <Skeleton className="h-7 w-48 sm:w-64" />
            <Skeleton className="h-4 w-60 sm:w-80" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="hidden h-10 w-24 rounded-lg sm:block" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-card rounded-xl border shadow-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-2 h-8 w-16" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions & Activity Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Quick Actions Panel */}
          <Card className="bg-card rounded-xl border shadow-none xl:col-span-1">
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-52" />
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-muted/10 flex items-center justify-between rounded-xl border p-4"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-4" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Activity Logs / Moderation & Registrations */}
          <div className="grid grid-cols-1 gap-6 xl:col-span-2">
            {/* Job Moderation Queue */}
            <Card className="bg-card rounded-xl border shadow-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-60" />
                </div>
                <Skeleton className="h-8 w-20 rounded-md" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-muted/10 flex items-center justify-between rounded-xl border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-36 sm:w-48" />
                        <Skeleton className="h-3 w-28 sm:w-36" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Registrations */}
            <Card className="bg-card rounded-xl border shadow-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-44" />
                  <Skeleton className="h-4 w-52" />
                </div>
                <Skeleton className="h-8 w-16 rounded-md" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-muted/10 flex items-center justify-between rounded-xl border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-28 sm:w-36" />
                        <Skeleton className="h-3 w-40 sm:w-48" />
                      </div>
                    </div>
                    <div className="space-y-1.5 text-right">
                      <Skeleton className="ml-auto h-3 w-16" />
                      <Skeleton className="ml-auto h-4 w-12 rounded-full" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
