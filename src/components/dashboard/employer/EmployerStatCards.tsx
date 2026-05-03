import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMPLOYER_ROUTES } from "@/constants/employerRoutes";
import { Briefcase, Eye, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: ReactNode;
  ctaHref: string;
  ctaLabel: string;
  testId?: string;
};

function StatCard({
  title,
  value,
  description,
  icon,
  ctaHref,
  ctaLabel,
  testId,
}: StatCardProps) {
  return (
    <Card className="bg-card border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          id={testId ? `${testId}-title` : undefined}
          className="text-xs font-medium sm:text-sm"
        >
          {title}
        </CardTitle>
        <span className="text-muted-foreground shrink-0" aria-hidden>
          {icon}
        </span>
      </CardHeader>
      <CardContent>
        <p
          className="text-primary text-2xl font-bold tabular-nums"
          aria-labelledby={testId ? `${testId}-title` : undefined}
        >
          {value}
        </p>
        <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
          {description}
        </p>
        <Link href={ctaHref}>
          <Button
            variant="link"
            className="h-auto p-0 text-xs font-medium"
            aria-describedby={testId ? `${testId}-title` : undefined}
          >
            {ctaLabel}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

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
