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
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TimePeriod, TimePeriodFilter } from "./TimePeriodFilter";

const chartConfig = {
  applications: {
    label: "Applications",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

// Mock data generator
const generateData = (period: TimePeriod) => {
  const data = [];
  const end = new Date();
  const start = new Date();
  let items = 7;
  let intervalType = "day"; // day, week, month

  switch (period) {
    case "7days":
      items = 7;
      start.setDate(end.getDate() - 6);
      intervalType = "day";
      break;
    case "14days":
      items = 14;
      start.setDate(end.getDate() - 13);
      intervalType = "day";
      break;
    case "lastMonth":
      items = 30;
      start.setDate(end.getDate() - 29);
      intervalType = "day";
      break;
    case "3months":
      items = 12; // approx 12 weeks
      start.setDate(end.getDate() - 84);
      intervalType = "week";
      break;
    case "overall":
      items = 12; // last 12 months
      start.setMonth(end.getMonth() - 11);
      intervalType = "month";
      break;
  }

  for (let i = 0; i < items; i++) {
    const date = new Date(start);
    if (intervalType === "week") {
      date.setDate(start.getDate() + i * 7);
    } else if (intervalType === "month") {
      date.setMonth(start.getMonth() + i);
    } else {
      date.setDate(start.getDate() + i);
    }

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: intervalType === "month" ? undefined : "numeric",
        year: period === "overall" ? "2-digit" : undefined,
      }),
      applications: Math.floor(Math.random() * 5), // fewer applications than views
    });
  }
  return data;
};

export function JobApplicationsChart() {
  const [period, setPeriod] = useState<TimePeriod>("7days");
  const chartData = generateData(period);
  const totalApplications = chartData.reduce(
    (acc, curr) => acc + curr.applications,
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
              {totalApplications}
            </span>
          </CardDescription>
        </div>
        <TimePeriodFilter value={period} onChange={setPeriod} />
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
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
      </CardContent>
    </Card>
  );
}
