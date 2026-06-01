import { EMPLOYER_ROUTES } from "@/constants/employerRoutes";
import { Briefcase, Eye, TrendingUp, Users } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";

type EmployerStatCardsProps = {
  stats: {
    totalJobs: number;
    activeJobs: number;
    totalApplications: number;
    totalEmployees: number;
    pendingApplications: number;
  };
  trendCopy: {
    jobsTrendLine: string;
    applicationsTrendLine: string;
    employeesTrendLine: string;
  };
};

export function EmployerStatCards({
  stats,
  trendCopy,
}: EmployerStatCardsProps) {
  return (
    <div
      className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
      aria-label="Hiring overview statistics"
    >
      <StatCard
        testId="stat-jobs-total"
        title="Total Jobs"
        value={stats.totalJobs}
        description={trendCopy.jobsTrendLine}
        icon={<Briefcase className="h-4 w-4" />}
        ctaHref={EMPLOYER_ROUTES.jobs}
        ctaLabel="Manage jobs"
      />
      <StatCard
        testId="stat-jobs-active"
        title="Active Jobs"
        value={stats.activeJobs}
        description={
          stats.activeJobs > 0 ? "Currently hiring" : "No active listings"
        }
        icon={<TrendingUp className="h-4 w-4" />}
        ctaHref={EMPLOYER_ROUTES.postJob}
        ctaLabel="Post new job"
      />
      <StatCard
        testId="stat-applications"
        title="Applications"
        value={stats.totalApplications}
        description={`${stats.pendingApplications} pending · ${trendCopy.applicationsTrendLine}`}
        icon={<Eye className="h-4 w-4" />}
        ctaHref={EMPLOYER_ROUTES.applications}
        ctaLabel="View applications"
      />
      <StatCard
        testId="stat-employees"
        title="Employees"
        value={stats.totalEmployees}
        description={trendCopy.employeesTrendLine}
        icon={<Users className="h-4 w-4" />}
        ctaHref={EMPLOYER_ROUTES.employees}
        ctaLabel="View employees"
      />
    </div>
  );
}
