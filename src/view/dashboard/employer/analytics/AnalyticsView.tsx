"use client";

import AnalyticsApplicationTrendsChart from "@/components/dashboard/analytics/AnalyticsApplicationTrendsChart";
import AnalyticsDepartmentDistribution from "@/components/dashboard/analytics/AnalyticsDepartmentDistribution";
import AnalyticsHiringFunnelChart from "@/components/dashboard/analytics/AnalyticsHiringFunnelChart";
import AnalyticsJobPerformanceChart from "@/components/dashboard/analytics/AnalyticsJobPerformanceChart";
import AnalyticsOverview from "@/components/dashboard/analytics/AnalyticsOverview";
import DashboardAnalyticsHeader from "@/components/dashboard/dashboard-nav/header/DashboardAnalyticsHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EMPLOYER_ROUTES } from "@/constants/employerRoutes";
import { downloadEmployerAnalyticsCsv } from "@/lib/exportEmployerAnalyticsCsv";
import { useGetEmployerAnalyticsQuery } from "@/redux/feature/company/companyApi";
import { useAppSelector } from "@/redux/hooks";
import type {
  EmployerAnalyticsPayload,
  EmployerAnalyticsPeriod,
} from "@/types/employerAnalytics";
import {
  Briefcase,
  CheckCircle2,
  Crown,
  FileText,
  Lock,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

export default function AnalyticsView() {
  const { user } = useAppSelector((s) => s.auth);
  const [timeRange, setTimeRange] = useState<EmployerAnalyticsPeriod>("30d");

  const skip = !user?.id;

  const {
    data: envelope,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetEmployerAnalyticsQuery(timeRange, {
    skip,
    refetchOnMountOrArgChange: true,
  });

  const analytics = useMemo(
    () => envelope?.data as EmployerAnalyticsPayload | undefined,
    [envelope],
  );

  const handleExport = useCallback(() => {
    if (!analytics) return;
    downloadEmployerAnalyticsCsv(
      analytics,
      `employer-analytics-${analytics.period}.csv`,
    );
  }, [analytics]);

  const chartLoading = isLoading || isFetching;

  if (user && !user.isPremium) {
    return (
      <div className="mt-16 flex min-h-[calc(100vh-64px)] items-center justify-center p-4 sm:p-8">
        <Card className="max-w-3xl overflow-hidden border">
          <CardContent className="p-12 text-center">
            <div className="bg-primary/10 mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full">
              <TrendingUp className="text-primary h-12 w-12" />
            </div>
            <div className="mb-4 flex items-center justify-center gap-2">
              <Lock className="text-muted-foreground h-5 w-5" />
              <h1 className="text-foreground text-4xl font-black tracking-tight">
                Premium Analytics
              </h1>
            </div>
            <p className="text-muted-foreground mx-auto mb-10 max-w-lg text-lg leading-relaxed font-medium">
              Gain deep insights into your hiring funnel, job performance, and
              department distribution. Data-driven decisions start with Premium.
            </p>

            <div className="mb-10 grid grid-cols-1 gap-6 text-left md:grid-cols-2">
              {[
                {
                  title: "Application Trends",
                  desc: "Track hiring velocity over time",
                },
                {
                  title: "Job Performance",
                  desc: "Compare view-to-apply conversion rates",
                },
                {
                  title: "Department Analytics",
                  desc: "Analyze hiring across your organization",
                },
                {
                  title: "Hiring Funnel",
                  desc: "Identify and fix bottlenecks in your process",
                },
              ].map((feature, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="bg-primary/20 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    <CheckCircle2 className="text-primary h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-foreground text-sm font-black">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-xs font-medium">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground h-14 rounded-2xl px-10 text-lg font-black shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Upgrade to Premium
                <Crown className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-muted-foreground h-14 rounded-2xl px-10 text-lg font-bold"
              >
                Explore Features
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-16 min-h-screen">
      <DashboardAnalyticsHeader
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        onExportReport={handleExport}
        exportDisabled={!analytics || chartLoading}
      />
      <div className="space-y-6 px-4 pb-10 sm:px-6 sm:py-8">
        {skip && (
          <p className="text-muted-foreground text-sm">
            Sign in as an employer to view analytics.
          </p>
        )}

        {isError && !skip && (
          <div
            className="border-destructive/20 bg-destructive/5 text-destructive flex flex-col gap-3 rounded-xl border p-4 text-sm sm:flex-row sm:items-center sm:justify-between"
            role="alert"
          >
            <p>Unable to load analytics for your company.</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </div>
        )}

        {analytics?.hasCompany === false && !isError && (
          <div
            className="flex flex-col gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-950 sm:flex-row sm:items-center sm:justify-between dark:text-amber-100"
            role="status"
          >
            <p>
              Your account is not linked to a company yet. Create or complete
              your company profile to track hiring analytics.
            </p>
            <Button type="button" variant="outline" size="sm" asChild>
              <Link href={EMPLOYER_ROUTES.companyProfile}>Company profile</Link>
            </Button>
          </div>
        )}

        <AnalyticsOverview
          summary={analytics?.summary}
          isLoading={isLoading && !analytics}
        />

        <Tabs defaultValue="applications" className="space-y-8">
          <div className="scrollbar-none text-foreground -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <TabsList className="bg-muted/40 border-border grid h-10 w-full grid-cols-2 rounded-full border p-0 sm:grid-cols-4">
              <TabsTrigger
                value="applications"
                className="data-[state=active]:bg-primary/10 group data-[state=active]:text-primary flex items-center justify-center gap-2.5 rounded-full px-4 py-2 text-sm font-bold tracking-tight transition-all duration-300"
              >
                <FileText className="text-muted-foreground group-data-[state=active]:text-primary h-4.5 w-4.5 transition-colors" />
                <span>Applications</span>
              </TabsTrigger>
              <TabsTrigger
                value="jobs"
                className="data-[state=active]:bg-primary/10 group data-[state=active]:text-primary flex items-center justify-center gap-2.5 rounded-full px-4 py-2 text-sm font-bold tracking-tight transition-all duration-300"
              >
                <Briefcase className="text-muted-foreground group-data-[state=active]:text-primary h-4.5 w-4.5 transition-colors" />
                <span>Jobs</span>
              </TabsTrigger>
              <TabsTrigger
                value="departments"
                className="data-[state=active]:bg-primary/10 group data-[state=active]:text-primary flex items-center justify-center gap-2.5 rounded-full px-4 py-2 text-sm font-bold tracking-tight transition-all duration-300"
              >
                <Users className="text-muted-foreground group-data-[state=active]:text-primary h-4.5 w-4.5 transition-colors" />
                <span>Departments</span>
              </TabsTrigger>
              <TabsTrigger
                value="funnel"
                className="data-[state=active]:bg-primary/10 group data-[state=active]:text-primary flex items-center justify-center gap-2.5 rounded-full px-4 py-2 text-sm font-bold tracking-tight transition-all duration-300"
              >
                <TrendingUp className="text-muted-foreground group-data-[state=active]:text-primary h-4.5 w-4.5 transition-colors" />
                <span>Funnel</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="applications">
            <AnalyticsApplicationTrendsChart
              data={analytics?.applicationTrends ?? []}
              isLoading={chartLoading && !analytics}
            />
          </TabsContent>

          <TabsContent value="jobs">
            <AnalyticsJobPerformanceChart
              rows={analytics?.jobPerformance ?? []}
              isLoading={chartLoading && !analytics}
            />
          </TabsContent>

          <TabsContent value="departments">
            <AnalyticsDepartmentDistribution
              departments={analytics?.departments ?? []}
              isLoading={chartLoading && !analytics}
            />
          </TabsContent>

          <TabsContent value="funnel">
            <AnalyticsHiringFunnelChart
              stages={analytics?.funnelStages ?? []}
              conversionMetrics={analytics?.conversionMetrics ?? []}
              isLoading={chartLoading && !analytics}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
