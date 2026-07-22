'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { EmployerAnalyticsSummary } from '@/types/employerAnalytics';
import { Briefcase, CheckCircle, FileText, TrendingDown, TrendingUp, Users } from 'lucide-react';
import React, { type ReactNode } from 'react';

function formatInt(n: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);
}

interface MetricCardProps {
  title: string;
  value: string;
  changePct: number;
  icon: ReactNode;
}

function MetricCard({ title, value, changePct, icon }: MetricCardProps) {
  const isFlat = changePct === 0;
  const isUp = changePct > 0;

  return (
    <Card className="bg-background/60 group relative overflow-hidden rounded-2xl border p-6 transition-all">
      <div className="bg-primary/5 group-hover:bg-primary/10 absolute top-0 right-0 -mt-8 -mr-8 h-24 w-24 rounded-full blur-3xl transition-colors" />
      <div className="relative space-y-4">
        <div className="flex items-start justify-between">
          <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase opacity-60">
            {title}
          </p>
          <div className="bg-primary/10 group-hover:bg-primary group-hover:border-primary/20 rounded-xl border border-transparent p-2.5 transition-all">
            {React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
              className: 'h-5 w-5 text-primary group-hover:text-white transition-colors',
            })}
          </div>
        </div>
        <div>
          <p className="text-3xl font-bold tracking-tight tabular-nums">{value}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${
                isFlat
                  ? 'bg-muted text-muted-foreground'
                  : isUp
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : 'bg-rose-500/10 text-rose-600'
              }`}
            >
              {!isFlat &&
                (isUp ? (
                  <TrendingUp className="h-3 w-3" aria-hidden />
                ) : (
                  <TrendingDown className="h-3 w-3" aria-hidden />
                ))}
              <span>{isFlat ? '0%' : `${changePct > 0 ? '+' : ''}${changePct}%`}</span>
            </div>
            <span className="text-muted-foreground font-medium opacity-60">vs last period</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function AnalyticsOverview({
  summary,
  isLoading,
}: {
  summary: EmployerAnalyticsSummary | undefined;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        aria-busy="true"
        aria-label="Loading analytics summary"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="rounded-2xl border p-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-4 h-9 w-20" />
            <Skeleton className="mt-3 h-4 w-32" />
          </Card>
        ))}
      </div>
    );
  }

  const s = summary ?? {
    totalApplications: 0,
    totalApplicationsChangePct: 0,
    activeJobs: 0,
    activeJobsChangePct: 0,
    newCandidates: 0,
    newCandidatesChangePct: 0,
    hiredThisPeriod: 0,
    hiredThisPeriodChangePct: 0,
  };

  const metrics: MetricCardProps[] = [
    {
      title: 'Total Applications',
      value: formatInt(s.totalApplications),
      changePct: s.totalApplicationsChangePct,
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: 'Active Jobs',
      value: formatInt(s.activeJobs),
      changePct: s.activeJobsChangePct,
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: 'New Candidates',
      value: formatInt(s.newCandidates),
      changePct: s.newCandidatesChangePct,
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Hired This Period',
      value: formatInt(s.hiredThisPeriod),
      changePct: s.hiredThisPeriodChangePct,
      icon: <CheckCircle className="h-5 w-5" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" aria-label="Hiring KPI summary">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}
