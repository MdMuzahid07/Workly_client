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
import { useGetProfileViewStatsQuery } from "@/redux/feature/profileView/profileViewApi";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { TimePeriod, TimePeriodFilter } from "./TimePeriodFilter";

const chartConfig = {
  views: {
    label: "Profile Views",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ProfileViewsChart({
  data: initialData,
}: {
  data?: { date: string; count: number }[];
}) {
  const [period, setPeriod] = useState<TimePeriod>("7days");
  const { data: statsData, isLoading } = useGetProfileViewStatsQuery(
    { period },
    { skip: !!initialData },
  );

  const chartData = useMemo(() => {
    const rawData = initialData || statsData?.data?.chartData || [];
    if (rawData.length === 0) return [];

    let processedData = [...rawData];

    // Pad missing days for daily views
    if (period === "7days" || period === "14days" || period === "lastMonth") {
      const daysToPad = period === "7days" ? 7 : period === "14days" ? 14 : 30;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dataMap = new Map();
      rawData.forEach((item: { date: string; count: number }) => {
        const d = new Date(item.date);
        d.setHours(0, 0, 0, 0);
        dataMap.set(d.getTime(), item.count);
      });

      const padded = [];
      for (let i = daysToPad - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        padded.push({
          date: d.toISOString(),
          count: dataMap.get(d.getTime()) || 0,
        });
      }
      processedData = padded;
    } else if (processedData.length === 1) {
      // For overall or 3months if only 1 data point exists, add a 0 point before it to draw a line
      const singleDate = new Date(processedData[0].date);
      const prevDate = new Date(singleDate);
      if (period === "3months") prevDate.setDate(prevDate.getDate() - 7);
      else prevDate.setMonth(prevDate.getMonth() - 1);

      processedData = [
        { date: prevDate.toISOString(), count: 0 },
        processedData[0],
      ];
    }

    return processedData.map((item: { date: string; count: number }) => {
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
        views: item.count,
      };
    });
  }, [initialData, statsData, period]);

  const totalViews = chartData.reduce(
    (acc: number, curr: { views: number }) => acc + curr.views,
    0,
  );

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Profile Views</CardTitle>
          <CardDescription>
            Views in the selected period:{" "}
            <span className="text-primary font-bold">
              {isLoading && !initialData ? "..." : totalViews}
            </span>
          </CardDescription>
        </div>
        {!initialData && (
          <TimePeriodFilter value={period} onChange={setPeriod} />
        )}
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {isLoading && !initialData ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-muted-foreground text-sm">Loading stats...</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-muted-foreground text-sm">
              No views found for this period.
            </p>
          </div>
        ) : (
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
                dot={{ r: 4, fill: "var(--color-views)", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "var(--color-views)", strokeWidth: 0 }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
