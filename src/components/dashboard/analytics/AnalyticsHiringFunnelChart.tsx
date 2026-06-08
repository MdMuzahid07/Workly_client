"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  EmployerConversionMetric,
  EmployerFunnelStage,
} from "@/types/employerAnalytics";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  stages: EmployerFunnelStage[];
  conversionMetrics: EmployerConversionMetric[];
  isLoading: boolean;
}

export default function AnalyticsHiringFunnelChart({
  stages,
  conversionMetrics,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <Skeleton className="mb-4 h-7 w-40" />
          <Skeleton className="h-80 w-full" />
        </Card>
        <Card className="p-6">
          <Skeleton className="mb-4 h-7 w-48" />
          <div className="grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  const chartData = stages.length
    ? stages
    : [
        {
          name: "No data",
          count: 0,
          percentage: 0,
          color: "#94a3b8",
        },
      ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Hiring Funnel</h3>
          <p className="text-muted-foreground text-sm">
            Application counts by status for applications created in this period
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                type="number"
                stroke="var(--muted-foreground)"
                style={{ fontSize: "12px" }}
                allowDecimals={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke="var(--muted-foreground)"
                style={{ fontSize: "12px" }}
                width={110}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                cursor={{ fill: "var(--muted)" }}
                formatter={(value) => [`${value} applications`, "Count"]}
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]} fill="#8884d8">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Conversion Metrics</h3>
          <p className="text-muted-foreground text-sm">
            Derived rates from the selected period funnel
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {(conversionMetrics.length ? conversionMetrics : []).map((metric) => (
            <div key={metric.label} className="rounded-lg border p-4">
              <p className="text-muted-foreground text-sm font-medium">
                {metric.label}
              </p>
              <p className="text-primary mt-2 text-3xl font-bold tabular-nums">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
