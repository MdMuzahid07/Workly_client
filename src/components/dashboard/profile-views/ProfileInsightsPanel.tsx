"use client";

import { ProfileViewsChart } from "@/components/dashboard/charts/ProfileViewsChart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProfileViewInsights } from "@/hooks/useProfileViewInsights";
import ProfileViewsSkeleton from "@/skeleton/dashboard/job-seeker/profile-views/ProfileViewsSkeleton";
import { formatDistanceToNow } from "date-fns";
import { Eye, Search, TrendingDown, TrendingUp, Users } from "lucide-react";

/**
 * ProfileInsightsPanel
 *
 * Self-contained, reusable panel that shows:
 *  - Stats cards (period views, unique companies, all-time total)
 *  - Area chart with period filter
 *  - Recent visitors list filtered by period
 *
 * Used on the dedicated /dashboard/profile-views page.
 * The chart-only widget (ProfileViewsChart) is used on the main dashboard.
 */
export function ProfileInsightsPanel() {
  const {
    period,
    setPeriod,
    periodLabel,
    stats,
    visitors,
    periodViews,
    percentageChange,
    isPositive,
    isInitialLoading,
    isRefreshing,
    isChartRefreshing,
    isVisitorsFetching,
    isVisitorsLoading,
  } = useProfileViewInsights("7days");

  if (isInitialLoading) {
    return <ProfileViewsSkeleton />;
  }

  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* ================= Stats Cards ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Period Views */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Views ({periodLabel})
            </CardTitle>
            <Eye className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-primary text-2xl font-bold transition-opacity ${
                isRefreshing ? "opacity-50" : "opacity-100"
              }`}
            >
              {periodViews.toLocaleString()}
            </div>
            {period !== "overall" && (
              <p className="text-muted-foreground flex items-center gap-1 text-xs">
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={`font-medium ${
                    isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {percentageChange.toFixed(1)}%
                </span>{" "}
                vs previous period
              </p>
            )}
          </CardContent>
        </Card>

        {/* Unique Companies */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Companies
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-primary text-2xl font-bold transition-opacity ${
                isRefreshing ? "opacity-50" : "opacity-100"
              }`}
            >
              {stats.uniqueCompaniesCount ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              Employers who viewed your profile
            </p>
          </CardContent>
        </Card>

        {/* Total All-Time Views */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total All-Time Views
            </CardTitle>
            <Search className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-primary text-2xl font-bold transition-opacity ${
                isRefreshing ? "opacity-50" : "opacity-100"
              }`}
            >
              {(stats.totalViews ?? 0).toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">
              Since you joined Workly
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ================= Chart (controlled by hook's period state) ================= */}
      <div className="grid grid-cols-1 gap-6">
        <ProfileViewsChart
          data={stats.chartData ?? []}
          isLoading={isChartRefreshing}
          period={period}
          onPeriodChange={setPeriod}
        />
      </div>

      {/* ================= Visitors List ================= */}
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Visitors</CardTitle>
              <CardDescription>
                Companies and recruiters who viewed your profile —{" "}
                <span className="font-semibold">{periodLabel}</span>
              </CardDescription>
            </div>
            {isVisitorsFetching && !isVisitorsLoading && (
              <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-border divide-y">
            {visitors.length > 0 ? (
              visitors.map((view) => {
                const viewer = view.viewer;
                const company = viewer?.company;
                const profile = viewer?.profile;

                return (
                  <div
                    key={view.id}
                    className="flex flex-col justify-between gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:py-5"
                  >
                    <div className="flex items-start gap-3 sm:items-center">
                      <Avatar className="h-10 w-10 rounded-lg sm:h-12 sm:w-12">
                        <AvatarImage
                          src={company?.logoUrl || profile?.avatarUrl || ""}
                          alt={viewer?.fullName || "Recruiter"}
                        />
                        <AvatarFallback className="rounded-lg text-sm font-bold">
                          {(viewer?.fullName || "RC").slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5 sm:space-y-1">
                        <h4 className="text-foreground text-sm font-bold sm:text-base">
                          {viewer?.fullName || "Anonymous"}
                        </h4>
                        <p className="text-muted-foreground text-xs font-semibold sm:text-sm">
                          {company?.name ||
                            viewer?.email ||
                            "Independent Recruiter"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end sm:gap-4">
                      <span className="text-muted-foreground text-xs font-semibold sm:text-sm">
                        {formatDistanceToNow(
                          new Date(
                            view.viewedAt || view.createdAt || new Date(),
                          ),
                          { addSuffix: true },
                        )}
                      </span>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1 font-bold">
                        Viewed
                      </Badge>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center">
                <Eye className="text-muted-foreground/30 mx-auto mb-3 h-10 w-10" />
                <p className="text-muted-foreground text-sm font-medium">
                  No views found for this period.
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Try selecting a longer time range.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
