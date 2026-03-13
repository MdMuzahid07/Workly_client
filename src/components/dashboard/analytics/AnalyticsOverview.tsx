/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";

import { Card } from "@/components/ui/card";
import {
  Briefcase,
  CheckCircle,
  FileText,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  trend: "up" | "down";
}

function MetricCard({ title, value, change, icon, trend }: MetricCardProps) {
  const isPositive = trend === "up";

  return (
    <Card className="bg-background/60 group relative overflow-hidden rounded-2xl border p-6 transition-all">
      <div className="bg-primary/5 group-hover:bg-primary/10 absolute top-0 right-0 -mt-8 -mr-8 h-24 w-24 rounded-full blur-3xl transition-colors" />
      <div className="relative space-y-4">
        <div className="flex items-start justify-between">
          <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase opacity-60">
            {title}
          </p>
          <div className="bg-primary/10 group-hover:bg-primary group-hover:shadow-primary/20 rounded-xl p-2.5 transition-all group-hover:shadow-lg">
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              React.cloneElement(icon as React.ReactElement<any>, {
                className:
                  "h-5 w-5 text-primary group-hover:text-white transition-colors",
              })
            }
          </div>
        </div>
        <div>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${
                isPositive
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-rose-500/10 text-rose-600"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>
                {isPositive ? "+" : ""}
                {change}%
              </span>
            </div>
            <span className="text-muted-foreground font-medium opacity-60">
              vs last period
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

interface AnalyticsOverviewProps {
  timeRange: string;
}

const AnalyticsOverview = ({ timeRange }: AnalyticsOverviewProps) => {
  const metrics = [
    {
      title: "Total Applications",
      value: "1,234",
      change: 12.5,
      trend: "up" as const,
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Active Jobs",
      value: "45",
      change: 8.2,
      trend: "up" as const,
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: "New Candidates",
      value: "892",
      change: 15.3,
      trend: "up" as const,
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Hired This Month",
      value: "23",
      change: -3.1,
      trend: "down" as const,
      icon: <CheckCircle className="h-5 w-5" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
};

export default AnalyticsOverview;
