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
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { TimePeriod, TimePeriodFilter } from "./TimePeriodFilter";

const chartConfig = {
  views: {
    label: "Profile Views",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

// Mock data generators
const generateData = (period: TimePeriod) => {
  const data = [];
  const end = new Date();
  const start = new Date();
  let items = 7;

  switch (period) {
    case "7days":
      items = 7;
      start.setDate(end.getDate() - 7);
      break;
    case "14days":
      items = 14;
      start.setDate(end.getDate() - 14);
      break;
    case "lastMonth":
      items = 30;
      start.setDate(end.getDate() - 30);
      break;
    case "3months":
      items = 12; // weeks
      start.setDate(end.getDate() - 90);
      break;
    case "overall":
      items = 12; // months
      start.setMonth(end.getMonth() - 12);
      break;
  }

  for (let i = 0; i < items; i++) {
    const date = new Date(start);
    if (period === "3months") {
      date.setDate(start.getDate() + i * 7);
    } else if (period === "overall") {
      date.setMonth(start.getMonth() + i);
    } else {
      date.setDate(start.getDate() + i);
    }

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: period === "overall" ? "2-digit" : undefined,
      }),
      views: Math.floor(Math.random() * 50) + 10,
    });
  }
  return data;
};

export function ProfileViewsChart() {
  const [period, setPeriod] = useState<TimePeriod>("7days");
  const chartData = generateData(period);

  const totalViews = chartData.reduce((acc, curr) => acc + curr.views, 0);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Profile Views</CardTitle>
          <CardDescription>
            Total views:{" "}
            <span className="text-primary font-bold">{totalViews}</span>
          </CardDescription>
        </div>
        <TimePeriodFilter value={period} onChange={setPeriod} />
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-views)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-views)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="views"
              type="natural"
              fill="url(#fillViews)"
              fillOpacity={0.4}
              stroke="var(--color-views)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
