"use client";

import { EmployerApplicationActivity } from "@/components/dashboard/employer/EmployerApplicationActivity";
import { EmployerDashboardAlerts } from "@/components/dashboard/employer/EmployerDashboardAlerts";
import { EmployerStatGridSkeleton } from "@/components/dashboard/employer/EmployerDashboardSkeleton";
import { EmployerQuickActions } from "@/components/dashboard/employer/EmployerQuickActions";
import { EmployerRecentEmployees } from "@/components/dashboard/employer/EmployerRecentEmployees";
import { EmployerRecentJobs } from "@/components/dashboard/employer/EmployerRecentJobs";
import { EmployerStatCards } from "@/components/dashboard/employer/EmployerStatCards";
import { useEmployerDashboard } from "@/hooks/useEmployerDashboard";
import DashboardOverviewHeader from "../../components/dashboard/dashboard-nav/header/DashboardOverviewHeader";

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
    recentEmployees,
    summary,
    refetchDashboard,
    isRefreshing,
  } = useEmployerDashboard();

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

        {statsBlocking ? (
          <EmployerStatGridSkeleton />
        ) : dashboardReady ? (
          <EmployerStatCards stats={stats} trendCopy={trendCopy} />
        ) : null}

        {dashboardReady ? <EmployerQuickActions /> : null}

        {dashboardReady ? (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <EmployerRecentJobs jobs={recentJobs} isLoading={detailBlocking} />
            <EmployerRecentEmployees
              members={recentEmployees}
              isLoading={detailBlocking}
            />
          </div>
        ) : null}

        {dashboardReady ? (
          <EmployerApplicationActivity
            summary={summary}
            isLoading={detailBlocking}
          />
        ) : null}
      </div>
    </main>
  );
}
