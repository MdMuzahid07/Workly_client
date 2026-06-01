"use client";

import { EmployerApplicationActivity } from "@/components/dashboard/employer/EmployerApplicationActivity";
import { EmployerDashboardAlerts } from "@/components/dashboard/employer/EmployerDashboardAlerts";
import { EmployerQuickActions } from "@/components/dashboard/employer/EmployerQuickActions";
import { EmployerRecentTeamMembers } from "@/components/dashboard/employer/EmployerRecentTeamMembers";
import { EmployerRecentJobs } from "@/components/dashboard/employer/EmployerRecentJobs";
import { EmployerStatCards } from "@/components/dashboard/employer/EmployerStatCards";
import { useEmployerDashboard } from "@/hooks/useEmployerDashboard";
import EmployerDashboardSkeleton from "@/skeleton/dashboard/employer/dashboard/EmployerDashboardSkeleton";
import DashboardOverviewHeader from "../../../../components/dashboard/dashboard-nav/header/DashboardOverviewHeader";

/**
 * Employer landing dashboard — compositional UI with data logic in useEmployerDashboard.
 */
export default function EmployerDashboardView() {
  const {
    dashboardReady,
    noCompanyAssigned,
    partialError,
    headerData,
    stats,
    trendCopy,
    statsBlocking,
    detailBlocking,
    recentJobs,
    recentTeamMembers,
    summary,
    refetchDashboard,
    isRefreshing,
  } = useEmployerDashboard();

  if (!dashboardReady || statsBlocking) {
    return (
      <main id="employer-dashboard-main" className="min-h-screen pt-16">
        <DashboardOverviewHeader companyData={headerData} />
        <EmployerDashboardSkeleton />
      </main>
    );
  }

  return (
    <main id="employer-dashboard-main" className="min-h-screen pt-16">
      {isRefreshing ? (
        <p className="sr-only" role="status" aria-live="polite">
          Refreshing dashboard data
        </p>
      ) : null}
      <DashboardOverviewHeader companyData={headerData} />

      <div className="space-y-6 px-4 pb-10 sm:px-6 sm:py-8">
        <EmployerDashboardAlerts
          noCompanyAssigned={noCompanyAssigned}
          partialError={partialError}
          onRetry={refetchDashboard}
        />

        <EmployerStatCards stats={stats} trendCopy={trendCopy} />

        <EmployerQuickActions />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <EmployerRecentJobs jobs={recentJobs} isLoading={detailBlocking} />
          <EmployerRecentTeamMembers
            members={recentTeamMembers}
            isLoading={detailBlocking}
          />
        </div>

        <EmployerApplicationActivity
          summary={summary}
          isLoading={detailBlocking}
        />
      </div>
    </main>
  );
}
