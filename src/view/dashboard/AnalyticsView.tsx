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
    <div className="min-h-screen">
      <DashboardAnalyticsHeader
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      <div className="container mx-auto space-y-6 px-4 sm:px-6 sm:py-8">
        <AnalyticsOverview timeRange={timeRange} />

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="applications">
              <FileText className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Applications</span>
            </TabsTrigger>
            <TabsTrigger value="jobs">
              <Briefcase className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="departments">
              <Users className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Departments</span>
            </TabsTrigger>
            <TabsTrigger value="funnel">
              <TrendingUp className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Funnel</span>
            </TabsTrigger>
          </TabsList>

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
