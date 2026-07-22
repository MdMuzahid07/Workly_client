'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { EmployerDepartmentSlice } from '@/types/employerAnalytics';
import { Users } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
  departments: EmployerDepartmentSlice[];
  isLoading: boolean;
}

export default function AnalyticsDepartmentDistribution({ departments, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <Skeleton className="mb-4 h-7 w-56" />
          <Skeleton className="h-80 w-full" />
        </Card>
        <Card className="p-6">
          <Skeleton className="mb-4 h-7 w-56" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  const chartData = departments.length
    ? departments.map((d) => ({
        name: d.name,
        applicants: d.count,
        percentage: d.percentage,
        color: d.color,
      }))
    : [
        {
          name: 'No data',
          applicants: 1,
          percentage: 0,
          color: 'var(--muted)',
        },
      ];

  const totalApplicants = departments.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Discipline distribution</h3>
          <p className="text-muted-foreground text-sm">
            Application volume by job discipline (proxy for team focus areas)
          </p>
        </div>

        <div className="relative flex h-80 w-full items-center justify-center">
          <div className="pointer-events-none absolute flex flex-col items-center justify-center text-center">
            <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase opacity-60">
              Total
            </span>
            <span className="text-3xl font-extrabold tracking-tight tabular-nums">
              {totalApplicants}
            </span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={departments.length > 1 ? 2 : 0}
                dataKey="applicants"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
                formatter={(value, name) => [
                  departments.length ? `${value} applications` : '0 applications',
                  departments.length ? name : 'No data',
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Discipline overview</h3>
          <p className="text-muted-foreground text-sm">Share of applications per discipline</p>
        </div>

        {!departments.length ? (
          <p className="text-muted-foreground text-sm">
            No application data to group by discipline in this period.
          </p>
        ) : (
          <div className="space-y-3">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-lg p-2" style={{ backgroundColor: `${dept.color}20` }}>
                    <Users className="h-5 w-5" style={{ color: dept.color }} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{dept.name}</p>
                    <p className="text-muted-foreground text-sm">{dept.count} applications</p>
                  </div>
                </div>
                <span className="text-muted-foreground shrink-0 text-sm font-semibold tabular-nums">
                  {dept.percentage}%
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="bg-muted mt-6 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total applications</span>
            <span className="text-2xl font-bold tabular-nums">{totalApplicants}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
