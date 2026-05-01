"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetApplicationStatsQuery } from "@/redux/feature/application/applicationApi";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TimePeriod, TimePeriodFilter } from "./TimePeriodFilter";

const chartConfig = {
  applications: {
    label: "Applications",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function JobApplicationsChart() {
  const [period, setPeriod] = useState<TimePeriod>("7days");
  const { data: statsData, isLoading } = useGetApplicationStatsQuery({
    period,
  });

  const chartData = useMemo(() => {
    if (!statsData?.data) return [];

    return statsData.data.map((item: { date: string; count: number }) => {
      const dateObj = new Date(item.date);
      let label = "";

      switch (period) {
        case "overall":
          label = dateObj.toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit",
          });
          break;
        case "3months":
          label = `W${Math.ceil(dateObj.getDate() / 7)} ${dateObj.toLocaleDateString("en-US", { month: "short" })}`;
          break;
        default:
          label = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
      }

      return {
        date: label,
        applications: item.count,
      };
    });
  }, [statsData, period]);

  const totalApplications = chartData.reduce(
    (acc: number, curr: { date: string; applications: number }) =>
      acc + curr.applications,
    0,
  );

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Job Applications
          </CardTitle>
          <CardDescription>
            Total applications:{" "}
            <span className="font-bold text-emerald-600">
              {isLoading ? "..." : totalApplications}
            </span>
          </CardDescription>
        </div>
        <TimePeriodFilter value={period} onChange={setPeriod} />
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {isLoading ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-muted-foreground text-sm">Loading stats...</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-muted-foreground text-sm">
              No applications found for this period.
            </p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="applications"
                    labelFormatter={(value) => value}
                  />
                }
              />
              <Bar
                dataKey="applications"
                fill={chartConfig.applications.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
