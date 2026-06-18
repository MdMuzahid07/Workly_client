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
      <CardContent className="space-y-3 sm:space-y-4">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[4.5rem] rounded-xl sm:h-24" />
            ))}
          </div>
        ) : summary ? (
          <>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
              {(
                [
                  ["In review", summary.inReview],
                  ["New this week", summary.newThisWeek],
                  ["Rejected (total)", summary.rejected],
                  ["Rejected this month", summary.rejectedThisMonth],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="rounded-xl border p-3 sm:p-4">
                  <p className="text-muted-foreground text-[10px] leading-tight tracking-wide uppercase sm:text-xs">
                    {label}
                  </p>
                  <p className="text-primary mt-1 text-xl font-bold tabular-nums sm:text-2xl">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border p-3 sm:p-4">
              <p className="text-xs font-semibold sm:text-sm">
                Status breakdown
              </p>
              <div className="mt-2 grid gap-1.5 sm:mt-3 sm:grid-cols-2 sm:gap-2">
                {Object.entries(summary.byStatus || {}).map(
                  ([status, count]) => (
                    <div
                      key={status}
                      className="bg-muted flex items-center justify-between gap-2 rounded-lg p-2 text-xs sm:p-3 sm:text-sm"
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
