import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EmployerStatGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="bg-card border">
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function EmployerListRowSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-xl" />
      ))}
    </div>
  );
}

export function EmployerTeamMemberRowSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-xl" />
      ))}
    </div>
  );
}

export default function EmployerDashboardSkeleton() {
  return (
    <div className="space-y-6 px-4 pb-10 sm:px-6 sm:py-8">
      {/* Stat Grid Skeleton */}
      <EmployerStatGridSkeleton />

      {/* Quick Actions Skeleton */}
      <Card className="rounded-xl border">
        <CardContent className="py-6">
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-10 w-32 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Jobs & Employees Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="rounded-xl border">
          <CardHeader className="space-y-2">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <EmployerListRowSkeleton rows={3} />
          </CardContent>
        </Card>

        <Card className="rounded-xl border">
          <CardHeader className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-52" />
          </CardHeader>
          <CardContent>
            <EmployerTeamMemberRowSkeleton rows={4} />
          </CardContent>
        </Card>
      </div>

      {/* Applications Activity Skeleton */}
      <Card className="rounded-xl border">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </CardContent>
      </Card>
    </div>
  );
}
