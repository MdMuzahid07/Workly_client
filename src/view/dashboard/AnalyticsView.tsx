"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, FileText, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import AnalyticsApplicationTrendsChart from "../../components/dashboard/analytics/AnalyticsApplicationTrendsChart";
import AnalyticsDepartmentDistribution from "../../components/dashboard/analytics/AnalyticsDepartmentDistribution";
import AnalyticsHiringFunnelChart from "../../components/dashboard/analytics/AnalyticsHiringFunnelChart";
import AnalyticsJobPerformanceChart from "../../components/dashboard/analytics/AnalyticsJobPerformanceChart";
import AnalyticsOverview from "../../components/dashboard/analytics/AnalyticsOverview";
import DashboardAnalyticsHeader from "../../components/dashboard/dashboard-nav/header/DashboardAnalyticsHeader";

const AnalyticsView = () => {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="mt-16 min-h-screen">
      <DashboardAnalyticsHeader
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        <AnalyticsOverview timeRange={timeRange} />

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
            <AnalyticsApplicationTrendsChart timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="jobs">
            <AnalyticsJobPerformanceChart timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="departments">
            <AnalyticsDepartmentDistribution />
          </TabsContent>

          <TabsContent value="funnel">
            <AnalyticsHiringFunnelChart />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsView;
