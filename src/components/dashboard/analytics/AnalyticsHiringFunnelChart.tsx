"use client";

import { Card } from "@/components/ui/card";
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

const AnalyticsHiringFunnelChart = () => {
  const stages = [
    { name: "Applications", count: 1234, percentage: 100, color: "#f87171" },
    { name: "Screening", count: 456, percentage: 37, color: "#fb923c" },
    { name: "Interviews", count: 189, percentage: 15, color: "#fbbf24" },
    { name: "Final Round", count: 67, percentage: 5, color: "#a3e635" },
    { name: "Offers", count: 34, percentage: 3, color: "#4ade80" },
    { name: "Hired", count: 28, percentage: 2, color: "#22c55e" },
  ];

  const conversionMetrics = [
    { label: "Application to Interview", value: "15%" },
    { label: "Interview to Offer", value: "18%" },
    { label: "Overall Conversion", value: "2.3%" },
  ];

  return (
    <div className="space-y-6">
      {/* Funnel Bar Chart */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Hiring Funnel</h3>
          <p className="text-muted-foreground text-sm">
            Candidate progression through hiring stages
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stages}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                type="number"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value) => `${value} candidates`}
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]} fill="#8884d8">
                {stages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Conversion Rate Summary */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Conversion Metrics</h3>
          <p className="text-muted-foreground text-sm">
            Key conversion rates across hiring stages
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {conversionMetrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border p-4">
              <p className="text-muted-foreground text-sm font-medium">
                {metric.label}
              </p>
              <p className="text-primary mt-2 text-3xl font-bold">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsHiringFunnelChart;
