'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Banknote, CreditCard, Receipt, TrendingUp } from 'lucide-react';

interface FinancialStatsGridProps {
  totalRevenue: number;
  monthlyVolume: number;
  pendingAmount: number;
  pendingCount: number;
  successRate: number;
  currency?: string;
  isLoading?: boolean;
}

const formatBDT = (amount: number) =>
  '৳' + amount.toLocaleString('en-BD', { maximumFractionDigits: 0 });

export function FinancialStatsGrid({
  totalRevenue,
  monthlyVolume,
  pendingAmount,
  pendingCount,
  successRate,
  isLoading = false,
}: FinancialStatsGridProps) {
  const stats = [
    {
      label: 'Total Revenue',
      value: isLoading ? '—' : formatBDT(totalRevenue),
      icon: Banknote,
      color: 'text-primary',
      trend: null,
    },
    {
      label: 'Monthly Volume',
      value: isLoading ? '—' : formatBDT(monthlyVolume),
      icon: TrendingUp,
      color: 'text-emerald-500',
      trend: null,
    },
    {
      label: 'Pending Invoices',
      value: isLoading ? '—' : formatBDT(pendingAmount),
      icon: Receipt,
      color: 'text-amber-500',
      trend: isLoading ? null : `${pendingCount} item${pendingCount !== 1 ? 's' : ''}`,
    },
    {
      label: 'Success Rate',
      value: isLoading ? '—' : `${successRate}%`,
      icon: CreditCard,
      color: 'text-blue-500',
      trend: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="bg-card rounded-xl border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase opacity-70">
              {stat.label}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div
                className={`text-2xl font-bold tracking-tight sm:text-3xl ${isLoading ? 'text-muted-foreground animate-pulse' : ''}`}
              >
                {stat.value}
              </div>
              {stat.trend && (
                <span className="text-muted-foreground text-[9px] font-bold tracking-widest uppercase opacity-60">
                  {stat.trend}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
