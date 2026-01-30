/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

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
    <Card className="relative overflow-hidden p-6 transition-all">
      <div className="from-primary/5 absolute inset-0 to-transparent opacity-0 transition-opacity hover:opacity-100" />
      <div className="relative space-y-3">
        <div className="flex items-start justify-between">
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <div className="bg-primary/10 text-primary rounded-lg p-2">
            {icon}
          </div>
        </div>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        <div className="flex items-center gap-2 text-sm">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
          <span
            className={
              isPositive
                ? "font-medium text-green-600"
                : "font-medium text-red-600"
            }
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span className="text-muted-foreground">vs last period</span>
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
