import { useGetMyCompanyApplicationSummaryQuery } from '@/redux/feature/application/applicationApi';
import {
  useGetCompanyOverviewStatisticsQuery,
  useGetMyCompanyQuery,
} from '@/redux/feature/company/companyApi';
import { useGetMyJobsQuery } from '@/redux/feature/job/jobApi';
import { useAppSelector } from '@/redux/hooks';
import { buildApplicationsTrendSubtitle, comparePeriodCopy } from '@/lib/employerDashboardFormat';
import type {
  CompanyApplicationSummary,
  CompanyOverviewStatistics,
  EmployerDashboardJobRow,
  EmployerCompanyHeader,
} from '@/types/employerDashboard';
import { useCallback, useMemo } from 'react';

const RECENT_JOBS_PAGE = {
  page: 1,
  limit: 5,
  sortBy: 'createdAt' as const,
  sortOrder: 'desc' as const,
};

/**
 * Aggregates employer dashboard server state behind one hook:
 * gated queries (company first), derived copy, unified refetch, loading flags.
 */
export function useEmployerDashboard() {
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = Boolean(user?.id);

  const companyQuery = useGetMyCompanyQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  const company = companyQuery.data?.data;
  const dashboardReady = Boolean(isAuthenticated && companyQuery.isSuccess && company?.id);

  const overviewQuery = useGetCompanyOverviewStatisticsQuery(undefined, {
    skip: !dashboardReady,
    refetchOnMountOrArgChange: true,
  });

  const summaryQuery = useGetMyCompanyApplicationSummaryQuery(undefined, {
    skip: !dashboardReady,
    refetchOnMountOrArgChange: true,
  });

  const jobsQuery = useGetMyJobsQuery(RECENT_JOBS_PAGE, {
    skip: !dashboardReady,
    refetchOnMountOrArgChange: true,
  });

  const overview = overviewQuery.data?.data as CompanyOverviewStatistics | undefined;
  const summary = summaryQuery.data?.data as CompanyApplicationSummary | undefined;
  const recentJobs = (
    Array.isArray(jobsQuery.data?.data) ? jobsQuery.data.data : []
  ) as EmployerDashboardJobRow[];

  const trends = overview?.trends;
  const recentTeamMembers = overview?.recentTeamMembers ?? [];

  const stats = useMemo(
    () => ({
      totalJobs: overview?.totalJobs ?? 0,
      activeJobs: overview?.activeJobs ?? 0,
      totalApplications: overview?.totalApplications ?? 0,
      totalTeamMembers: overview?.totalTeamMembers ?? 0,
      pendingApplications: overview?.pendingApplications ?? 0,
    }),
    [overview],
  );

  const trendCopy = useMemo(() => {
    const jobsTrendLine = trends
      ? comparePeriodCopy(
          trends.jobsCreatedLast30Days,
          trends.jobsCreatedPrevious30Days,
          'from prior 30 days',
          'No new postings in the last 60 days',
        )
      : '—';

    const applicationsTrendLine = buildApplicationsTrendSubtitle(summary, trends);

    const teamMembersTrendLine = trends
      ? comparePeriodCopy(
          trends.teamMembersJoinedLast90Days,
          trends.teamMembersJoinedPrevious90Days,
          'new in last 90 days vs prior quarter',
          'No new members in the last 180 days',
        )
      : '—';

    return { jobsTrendLine, applicationsTrendLine, teamMembersTrendLine };
  }, [summary, trends]);

  const headerData: EmployerCompanyHeader = useMemo(
    () => ({
      name: company?.name ?? 'Employer dashboard',
      industry: company?.industry?.name ?? 'Company',
      location: company?.location ?? '',
    }),
    [company],
  );

  /** Skeleton only on true first load — background refetches keep stale UI (better UX). */
  const statsBlocking = companyQuery.isLoading || (dashboardReady && overviewQuery.isLoading);

  const detailBlocking = dashboardReady && (jobsQuery.isLoading || summaryQuery.isLoading);

  const partialError =
    dashboardReady && (overviewQuery.isError || summaryQuery.isError || jobsQuery.isError);

  const noCompany = isAuthenticated && companyQuery.isError;

  const refetchDashboard = useCallback(() => {
    void companyQuery.refetch();
    if (!dashboardReady) return;
    void Promise.all([overviewQuery.refetch(), summaryQuery.refetch(), jobsQuery.refetch()]);
  }, [companyQuery, dashboardReady, jobsQuery, overviewQuery, summaryQuery]);

  return {
    isAuthenticated,
    dashboardReady,
    noCompanyAssigned: noCompany,
    partialError,

    headerData,

    stats,
    trendCopy,
    overview,
    summary,
    recentJobs,
    recentTeamMembers,

    statsBlocking,
    detailBlocking,

    refetchDashboard,

    // Expose granular status for UX (e.g. silent background refresh)
    isRefreshing:
      dashboardReady &&
      (companyQuery.isFetching ||
        overviewQuery.isFetching ||
        jobsQuery.isFetching ||
        summaryQuery.isFetching),
  };
}
