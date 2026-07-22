'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, TrendingUp, Users, Zap } from 'lucide-react';

interface PlanItem {
  price?: number | string;
  subscriberCount?: number;
  [key: string]: unknown;
}

interface PlanStatsGridProps {
  plans?: PlanItem[];
}

export function PlanStatsGrid({ plans = [] }: PlanStatsGridProps) {
  const totalActiveSubscriptions = plans.reduce(
    (acc: number, plan: PlanItem) => acc + (Number(plan.subscriberCount) || 0),
    0,
  );

  const totalMRR = plans.reduce(
    (acc: number, plan: PlanItem) =>
      acc + (Number(plan.price) || 0) * (Number(plan.subscriberCount) || 0),
    0,
  );

  const stats = [
    {
      label: 'Active Subscriptions',
      value: totalActiveSubscriptions.toLocaleString(),
      icon: Users,
      color: 'text-primary',
    },
    {
      label: 'Monthly Recurr. Revenue',
      value: `৳${totalMRR.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-emerald-500',
    },
    {
      label: 'Platform Conversion',
      value: '5.8%',
      icon: Zap,
      color: 'text-amber-500',
    },
    {
      label: 'Local Market Reach',
      value: '64 Districts',
      icon: Globe,
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="bg-card rounded-xl border p-3.5 shadow-xs sm:p-6">
          <CardHeader className="flex flex-row items-center justify-between p-0 pb-1 sm:pb-2">
            <CardTitle className="text-muted-foreground truncate text-[10px] font-bold tracking-wider uppercase opacity-70 sm:text-xs">
              {stat.label}
            </CardTitle>
            <stat.icon className={`h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent className="p-0 pt-1 sm:pt-2">
            <div className="text-lg font-extrabold tracking-tight sm:text-3xl">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
