"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { EmployerJobPerformanceRow } from "@/types/employerAnalytics";
import { Eye, Users, ChevronLeft, ChevronRight, Search } from "lucide-react";

interface JobPerformanceChartProps {
  rows: EmployerJobPerformanceRow[];
  totalJobs: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  sortBy: "views" | "applications" | "conversion";
  sortOrder: "asc" | "desc";
  onSortChange: (
    sortBy: "views" | "applications" | "conversion",
    sortOrder: "asc" | "desc",
  ) => void;
  search: string;
  onSearchChange: (search: string) => void;
  isLoading: boolean;
}

export default function AnalyticsJobPerformanceChart({
  rows,
  totalJobs,
  page,
  limit,
  onPageChange,
  sortBy,
  sortOrder,
  onSortChange,
  search,
  onSearchChange,
  isLoading,
}: JobPerformanceChartProps) {
  const totalPages = Math.max(1, Math.ceil(totalJobs / limit));

  const toggleSort = (key: "views" | "applications" | "conversion") => {
    if (sortBy === key) {
      onSortChange(key, sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortChange(key, "desc");
    }
  };

  return (
    <Card className="border-primary/10 bg-background/60 overflow-hidden rounded-2xl border p-6 backdrop-blur-xl">
      {/* Header and Controls */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-foreground text-lg font-bold tracking-tight">
            Job Performance
          </h3>
          <p className="text-muted-foreground text-xs font-medium opacity-60">
            Applications in the selected period; conversion uses lifetime views
            and total applications on each listing
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search Box */}
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 opacity-60" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-muted/20 text-foreground placeholder-muted-foreground focus:border-primary/50 w-full rounded-xl border py-2 pr-3 pl-9 text-xs transition-all outline-none sm:w-48"
            />
          </div>

          {/* Sort Buttons */}
          <div className="bg-muted/30 flex flex-wrap items-center gap-1.5 rounded-xl border p-1">
            <span className="text-muted-foreground px-2 py-1 text-[10px] font-bold uppercase opacity-60">
              Sort by:
            </span>
            {(["views", "applications", "conversion"] as const).map((key) => (
              <Button
                key={key}
                variant="ghost"
                size="sm"
                onClick={() => toggleSort(key)}
                className={`h-7 rounded-lg px-2.5 text-xs font-bold capitalize transition-all ${
                  sortBy === key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {key === "conversion" ? "Conversion" : key}
                {sortBy === key && (
                  <span className="ml-1 text-[10px]">
                    {sortOrder === "desc" ? "↓" : "↑"}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      ) : !rows.length ? (
        <p className="text-muted-foreground py-4 text-center text-sm font-medium opacity-65">
          No jobs found matching your criteria.
        </p>
      ) : (
        <div className="space-y-4">
          {/* Jobs List */}
          {rows.map((job, index) => (
            <div
              key={`${job.title}-${index}`}
              className="bg-card hover:border-primary/20 hover:bg-primary/5 flex flex-col gap-4 rounded-2xl border p-6 transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="bg-primary/10 text-primary flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold">
                    {String((page - 1) * limit + index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-foreground truncate text-left text-base font-semibold">
                    {job.title}
                  </h4>
                </div>
                <Badge
                  className={`shrink-0 border-0 ${
                    job.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "text-secondary-foreground bg-gray-100"
                  }`}
                >
                  {job.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4 border-t pt-4 md:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary rounded-xl p-2.5">
                    <Eye className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase opacity-60">
                      Views
                    </p>
                    <p className="text-foreground mt-0.5 text-sm font-extrabold tabular-nums">
                      {job.views}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary rounded-xl p-2.5">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase opacity-60">
                      Applications
                    </p>
                    <p className="text-foreground mt-0.5 text-sm font-extrabold tabular-nums">
                      {job.applications}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase">
                    <span className="text-muted-foreground opacity-60">
                      Conversion Rate
                    </span>
                    <span className="font-extrabold text-emerald-600">
                      {job.conversionRate}%
                    </span>
                  </div>
                  <div className="bg-muted/40 border-border/10 h-1.5 w-full overflow-hidden rounded-full border">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{
                        width: `${Math.min(job.conversionRate * 10, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="mt-2 flex items-center justify-between border-t pt-4">
            <span className="text-muted-foreground text-xs font-bold uppercase opacity-60">
              Page {page} of {totalPages} ({totalJobs} total jobs)
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1 || isLoading}
                onClick={() => onPageChange(page - 1)}
                className="h-8 rounded-lg"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages || isLoading}
                onClick={() => onPageChange(page + 1)}
                className="h-8 rounded-lg"
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
