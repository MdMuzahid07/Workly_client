"use client";

import AnalyticsApplicationTrendsChart from "@/components/dashboard/analytics/AnalyticsApplicationTrendsChart";
import AnalyticsDepartmentDistribution from "@/components/dashboard/analytics/AnalyticsDepartmentDistribution";
import AnalyticsHiringFunnelChart from "@/components/dashboard/analytics/AnalyticsHiringFunnelChart";
import AnalyticsJobPerformanceChart from "@/components/dashboard/analytics/AnalyticsJobPerformanceChart";
import AnalyticsOverview from "@/components/dashboard/analytics/AnalyticsOverview";
import DashboardAnalyticsHeader from "@/components/dashboard/dashboard-nav/header/DashboardAnalyticsHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EMPLOYER_ROUTES } from "@/constants/employerRoutes";
import { downloadEmployerAnalyticsCsv } from "@/lib/exportEmployerAnalyticsCsv";
import { useGetEmployerAnalyticsQuery } from "@/redux/feature/company/companyApi";
import { useAppSelector } from "@/redux/hooks";
import type {
  EmployerAnalyticsPayload,
  EmployerAnalyticsPeriod,
} from "@/types/employerAnalytics";
import { Briefcase, FileText, TrendingUp, Users } from "lucide-react";
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
