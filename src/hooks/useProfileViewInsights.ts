"use client";

import { TimePeriod } from "@/components/dashboard/charts/TimePeriodFilter";
import {
  useGetProfileViewStatsQuery,
  useGetRecentVisitorsQuery,
} from "@/redux/feature/profileView/profileViewApi";
import { useState } from "react";

export const PERIOD_LABELS: Record<TimePeriod, string> = {
  "7days": "Last 7 days",
  "14days": "Last 14 days",
  lastMonth: "Last month",
  "3months": "Last 3 months",
  overall: "All time",
};

/**
 * Shared hook that owns period state and fires both
 * backend queries (stats + visitors) whenever the period changes.
 * Used by both ProfileViewsView (full page) and any other consumer.
 */
export function useProfileViewInsights(defaultPeriod: TimePeriod = "7days") {
  const [period, setPeriod] = useState<TimePeriod>(defaultPeriod);

  const {
    data: statsResponse,
    isLoading: isStatsLoading,
    isFetching: isStatsFetching,
  } = useGetProfileViewStatsQuery({ period });

  const {
    data: visitorsResponse,
    isLoading: isVisitorsLoading,
    isFetching: isVisitorsFetching,
  } = useGetRecentVisitorsQuery({ period });

  const stats = statsResponse?.data ?? {
    totalViews: 0,
    periodViews: 0,
    viewsLastMonth: 0,
    uniqueCompaniesCount: 0,
    chartData: [],
    period: defaultPeriod,
  };
  const visitors = visitorsResponse?.data ?? [];

  // ================= Derived metrics =================
  const periodViews: number = stats.periodViews ?? stats.totalViews ?? 0;
  const prevPeriodViews: number = stats.viewsLastMonth ?? 0;

  const percentageChange =
    prevPeriodViews > 0
      ? ((periodViews - prevPeriodViews) / prevPeriodViews) * 100
      : periodViews > 0
        ? 100
        : 0;

  const isPositive = percentageChange >= 0;

  const isInitialLoading = isStatsLoading || isVisitorsLoading;
  const isRefreshing = isStatsFetching || isVisitorsFetching;
  const isChartRefreshing = isStatsFetching && !isStatsLoading;

  return {
    // Period control
    period,
    setPeriod,
    periodLabel: PERIOD_LABELS[period],

    // Raw data
    stats,
    visitors,

    // Derived
    periodViews,
    percentageChange,
    isPositive,

    // Loading states
    isInitialLoading,
    isRefreshing,
    isChartRefreshing,
    isVisitorsFetching,
    isVisitorsLoading,
  };
}
