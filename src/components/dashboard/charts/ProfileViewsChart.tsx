'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useGetProfileViewStatsQuery } from '@/redux/feature/profileView/profileViewApi';
import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { TimePeriod, TimePeriodFilter } from './TimePeriodFilter';

const chartConfig = {
  views: {
    label: 'Profile Views',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

interface ProfileViewsChartProps {
  /**
   * External chart data from a parent-managed fetch.
   * When provided the chart skips its own query.
   */
  data?: { date: string; count: number }[];
  /** Whether the external data is currently refreshing */
  isLoading?: boolean;
  /**
   * Controlled period from a parent.
   * Pair with onPeriodChange to put the chart in controlled mode.
   * Omit both to use the chart standalone (it manages its own period + query).
   */
  period?: TimePeriod;
  onPeriodChange?: (period: TimePeriod) => void;
}

function buildChartData(
  rawData: { date: string; count: number }[],
  period: TimePeriod,
): { date: string; views: number }[] {
  if (!rawData || rawData.length === 0) return [];

  let processedData = [...rawData];

  // Pad missing days so the full date range is always visible
  if (period === '7days' || period === '14days' || period === 'lastMonth') {
    const daysToPad = period === '7days' ? 7 : period === '14days' ? 14 : 30;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dataMap = new Map<number, number>();
    rawData.forEach((item) => {
      const d = new Date(item.date);
      d.setHours(0, 0, 0, 0);
      dataMap.set(d.getTime(), item.count);
    });

    const padded: { date: string; count: number }[] = [];
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
    // Guarantee at least 2 points so recharts can draw a line
    const singleDate = new Date(processedData[0].date);
    const prevDate = new Date(singleDate);
    if (period === '3months') prevDate.setDate(prevDate.getDate() - 7);
    else prevDate.setMonth(prevDate.getMonth() - 1);
    processedData = [{ date: prevDate.toISOString(), count: 0 }, processedData[0]];
  }

  return processedData.map((item) => {
    const dateObj = new Date(item.date);
    let label = '';

    switch (period) {
      case 'overall':
        label = dateObj.toLocaleDateString('en-US', {
          month: 'short',
          year: '2-digit',
        });
        break;
      case '3months':
        label = `W${Math.ceil(dateObj.getDate() / 7)} ${dateObj.toLocaleDateString('en-US', { month: 'short' })}`;
        break;
      default:
        label = dateObj.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
    }

    return { date: label, views: item.count };
  });
}

export function ProfileViewsChart({
  data: externalData,
  isLoading: externalLoading = false,
  period: externalPeriod,
  onPeriodChange,
}: ProfileViewsChartProps) {
  // ================= Uncontrolled (standalone) state =================
  const [internalPeriod, setInternalPeriod] = useState<TimePeriod>('7days');

  const isControlled = externalPeriod !== undefined && onPeriodChange !== undefined;
  const period = isControlled ? externalPeriod : internalPeriod;
  const setPeriod = isControlled ? onPeriodChange : setInternalPeriod;

  // Only fires a query when no external data is provided (standalone mode)
  const { data: statsData, isFetching: internalFetching } = useGetProfileViewStatsQuery(
    { period },
    { skip: externalData !== undefined },
  );

  const isLoading = externalData !== undefined ? externalLoading : internalFetching;

  const chartData = useMemo(() => {
    const rawData = externalData ?? statsData?.data?.chartData ?? [];
    return buildChartData(rawData, period);
  }, [externalData, statsData?.data?.chartData, period]);

  const totalViews = chartData.reduce((acc, curr) => acc + curr.views, 0);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Profile Views</CardTitle>
          <CardDescription>
            Views in the selected period:{' '}
            <span className="text-primary font-bold">{isLoading ? '...' : totalViews}</span>
          </CardDescription>
        </div>
        <TimePeriodFilter value={period} onChange={setPeriod} />
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {isLoading ? (
          <div className="flex h-[250px] items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
              <p className="text-muted-foreground text-sm">Loading stats...</p>
            </div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-muted-foreground text-sm italic">No views found for this period.</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
              <defs>
                <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-views)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-views)" stopOpacity={0.1} />
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
                content={<ChartTooltipContent labelFormatter={(value) => value} indicator="dot" />}
              />
              <Area
                dataKey="views"
                type="natural"
                fill="url(#fillViews)"
                fillOpacity={0.4}
                stroke="var(--color-views)"
                stackId="a"
                dot={{ r: 4, fill: 'var(--color-views)', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: 'var(--color-views)', strokeWidth: 0 }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
