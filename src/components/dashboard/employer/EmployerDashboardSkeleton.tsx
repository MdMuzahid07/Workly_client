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

export function EmployerEmployeeRowSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-xl" />
      ))}
    </div>
  );
}
