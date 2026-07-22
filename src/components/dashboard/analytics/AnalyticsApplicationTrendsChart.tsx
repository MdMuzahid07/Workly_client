'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { EmployerApplicationTrendBucket } from '@/types/employerAnalytics';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ApplicationTrendsChartProps {
  data: EmployerApplicationTrendBucket[];
  isLoading: boolean;
}

export default function AnalyticsApplicationTrendsChart({
  data,
  isLoading,
}: ApplicationTrendsChartProps) {
  if (isLoading) {
    return (
      <Card className="border-primary/10 bg-background/60 overflow-hidden rounded-2xl border p-6 backdrop-blur-xl">
        <Skeleton className="mb-4 h-7 w-48" />
        <Skeleton className="h-80 w-full" />
      </Card>
    );
  }

  const chartData = data.length
    ? data
    : [{ periodLabel: '—', applications: 0, interviews: 0, hired: 0 }];

  return (
    <Card className="border-primary/10 bg-background/60 overflow-hidden rounded-2xl border p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h3 className="text-foreground text-lg font-bold tracking-tight">Application Trends</h3>
        <p className="text-muted-foreground text-xs font-medium opacity-60">
          Bucketed application volume, scheduled interviews, and hires for the selected period
        </p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="periodLabel"
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
              cursor={{ fill: 'var(--muted)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="applications" fill="#F87171" radius={[8, 8, 0, 0]} />
            <Bar dataKey="interviews" fill="#FABF25" radius={[8, 8, 0, 0]} />
            <Bar dataKey="hired" fill="#2FC55E" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {!data.length && (
        <p className="text-muted-foreground mt-4 text-center text-sm">
          No applications in this period yet.
        </p>
      )}
    </Card>
  );
}
