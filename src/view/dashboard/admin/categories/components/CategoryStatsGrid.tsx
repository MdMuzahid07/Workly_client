"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, LayoutGrid, Tag, TrendingUp } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

interface CategoryStatsGridProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  summary?: any;
  isLoading?: boolean;
}

export function CategoryStatsGrid({
  summary,
  isLoading,
}: CategoryStatsGridProps) {
  const stats = [
    {
      label: "Total Categories",
      value: summary?.totalCategories?.toLocaleString() || "0",
      icon: LayoutGrid,
      color: "text-primary",
    },
    {
      label: "Active Roles",
      value: summary?.activeJobs?.toLocaleString() || "0",
      icon: Briefcase,
      color: "text-emerald-500",
    },
    {
      label: "Total Applications",
      value: summary?.totalApplications?.toLocaleString() || "0",
      icon: Tag,
      color: "text-blue-500",
    },
    {
      label: "Avg Apps/Category",
      value: summary?.averageApplicationsPerCategory?.toLocaleString() || "0",
      icon: TrendingUp,
      color: "text-amber-500",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="bg-card rounded-xl border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">
              {stat.label}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold tracking-tight sm:text-3xl">
                {stat.value}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
