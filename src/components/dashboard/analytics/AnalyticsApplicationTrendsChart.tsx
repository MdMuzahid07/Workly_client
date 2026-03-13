"use client";

import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ApplicationTrendsChartProps {
  timeRange: string;
}

const AnalyticsApplicationTrendsChart = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  timeRange,
}: ApplicationTrendsChartProps) => {
  const data = [
    { month: "Jan", applications: 220, interviews: 85, hired: 32 },
    { month: "Feb", applications: 215, interviews: 78, hired: 28 },
    { month: "Mar", applications: 145, interviews: 52, hired: 18 },
    { month: "Apr", applications: 280, interviews: 105, hired: 42 },
    { month: "May", applications: 195, interviews: 68, hired: 24 },
    { month: "Jun", applications: 240, interviews: 92, hired: 35 },
  ];

  return (
    <Card className="border-primary/10 bg-background/60 overflow-hidden rounded-2xl border p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h3 className="text-foreground text-lg font-bold tracking-tight">
          Application Trends
        </h3>
        <p className="text-muted-foreground text-xs font-medium opacity-60">
          Monthly application flow and conversion metrics
        </p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar dataKey="applications" fill="#F87171" radius={[8, 8, 0, 0]} />
            <Bar dataKey="interviews" fill="#FABF25" radius={[8, 8, 0, 0]} />
            <Bar dataKey="hired" fill="#2FC55E" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AnalyticsApplicationTrendsChart;
