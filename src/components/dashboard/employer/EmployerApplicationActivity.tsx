import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { humanizeJobOrApplicationStatus } from "@/lib/employerDashboardFormat";
import type { CompanyApplicationSummary } from "@/types/employerDashboard";

type EmployerApplicationActivityProps = {
  summary: CompanyApplicationSummary | undefined;
  isLoading: boolean;
};

export function EmployerApplicationActivity({
  summary,
  isLoading,
}: EmployerApplicationActivityProps) {
  return (
    <Card className="bg-card border">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">
          Application activity
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Pipeline health at a glance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        ) : summary ? (
          <>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(
                [
                  ["In review", summary.inReview],
                  ["New this week", summary.newThisWeek],
                  ["Rejected (total)", summary.rejected],
                  ["Rejected this month", summary.rejectedThisMonth],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="rounded-xl border p-4">
                  <p className="text-muted-foreground text-xs tracking-wide uppercase">
                    {label}
                  </p>
                  <p className="text-primary text-2xl font-bold tabular-nums">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-sm font-semibold">Status breakdown</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {Object.entries(summary.byStatus || {}).map(
                  ([status, count]) => (
                    <div
                      key={status}
                      className="bg-muted flex items-center justify-between gap-3 rounded-lg p-3 text-sm"
                    >
                      <span>{humanizeJobOrApplicationStatus(status)}</span>
                      <span className="font-semibold tabular-nums">
                        {count}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground text-sm">
            No application summary available yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
