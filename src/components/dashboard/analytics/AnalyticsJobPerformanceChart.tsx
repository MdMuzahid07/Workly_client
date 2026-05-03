"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { EmployerJobPerformanceRow } from "@/types/employerAnalytics";
import { Eye, Users } from "lucide-react";

interface JobPerformanceChartProps {
  rows: EmployerJobPerformanceRow[];
  isLoading: boolean;
}

export default function AnalyticsJobPerformanceChart({
  rows,
  isLoading,
}: JobPerformanceChartProps) {
  if (isLoading) {
    return (
      <Card className="border-primary/10 bg-background/60 overflow-hidden rounded-2xl border p-6 backdrop-blur-xl">
        <Skeleton className="mb-4 h-7 w-40" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      </Card>
    );
  }

  const displayRows = rows.length ? rows : [];

  return (
    <Card className="border-primary/10 bg-background/60 overflow-hidden rounded-2xl border p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h3 className="text-foreground text-lg font-bold tracking-tight">
          Job Performance
        </h3>
        <p className="text-muted-foreground text-xs font-medium opacity-60">
          Applications in the selected period; conversion uses lifetime views
          and total applications on each listing
        </p>
      </div>

      {!displayRows.length ? (
        <p className="text-muted-foreground text-sm">
          Post jobs to see views, applications, and conversion here.
        </p>
      ) : (
        <div className="space-y-4">
          {displayRows.map((job, index) => (
            <div
              key={`${job.title}-${index}`}
              className="hover:bg-primary/5 hover:border-primary/20 flex flex-col gap-3 rounded-xl border border-transparent p-4 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-primary/40 font-mono text-xs font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="min-w-0 flex-1 truncate text-sm font-bold tracking-tight">
                  {job.title}
                </h4>
                <Badge className="border-none bg-emerald-500/10 text-[10px] font-bold text-emerald-600 uppercase">
                  {job.status}
                </Badge>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold tracking-wider uppercase">
                  <span className="text-muted-foreground opacity-60">
                    Conversion Rate
                  </span>
                  <span className="text-emerald-600 tabular-nums">
                    {job.conversionRate}%
                  </span>
                </div>
                <div className="bg-muted/30 h-1.5 w-full overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                    style={{
                      width: `${Math.min(job.conversionRate * 10, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Eye className="text-muted-foreground h-4 w-4" aria-hidden />
                  <span className="font-medium tabular-nums">{job.views}</span>
                  <span className="text-muted-foreground">views</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Users
                    className="text-muted-foreground h-4 w-4"
                    aria-hidden
                  />
                  <span className="font-medium tabular-nums">
                    {job.applications}
                  </span>
                  <span className="text-muted-foreground">applications</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
