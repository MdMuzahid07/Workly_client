"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetMyCompanyApplicationSummaryQuery } from "@/redux/feature/application/applicationApi";
import {
  useGetCompanyOverviewStatisticsQuery,
  useGetMyCompanyQuery,
} from "@/redux/feature/company/companyApi";
import { useGetMyJobsQuery } from "@/redux/feature/job/jobApi";
import { useAppSelector } from "@/redux/hooks";
import { formatDistanceToNow } from "date-fns";
import {
  Briefcase,
  Building2,
  Eye,
  FileText,
  Plus,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import DashboardOverviewHeader from "../../components/dashboard/dashboard-nav/header/DashboardOverviewHeader";

interface EmployerJob {
  id: string;
  title: string;
  status: string;
  createdAt?: string | Date | null;
  _count?: {
    applications?: number;
  };
}

interface CompanyOverview {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
  totalEmployees: number;
}

interface CompanyHeaderData {
  name: string;
  industry: string;
  location: string;
}

interface CompanyApplicationSummary {
  total: number;
  newThisWeek: number;
  inReview: number;
  rejected: number;
  rejectedThisMonth: number;
  byStatus: Record<string, number>;
}

const statusToBadgeVariant = (status: string) => {
  if (status === "ACTIVE" || status === "OFFERED" || status === "ACCEPTED") {
    return "default" as const;
  }

  if (status === "CLOSED" || status === "REJECTED" || status === "WITHDRAWN") {
    return "secondary" as const;
  }

  return "outline" as const;
};

const humanizeStatus = (status: string) => {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const EmployerDashboardView = () => {
  const { user } = useAppSelector((state) => state.auth) || {};
  const shouldFetch = Boolean(user?.id);

  const {
    data: companyResult,
    isLoading: companyLoading,
    isError: companyError,
  } = useGetMyCompanyQuery(undefined, {
    skip: !shouldFetch,
  });

  const {
    data: overviewResult,
    isLoading: overviewLoading,
    isError: overviewError,
  } = useGetCompanyOverviewStatisticsQuery(undefined, {
    skip: !shouldFetch,
  });

  const {
    data: summaryResult,
    isLoading: summaryLoading,
    isError: summaryError,
  } = useGetMyCompanyApplicationSummaryQuery(undefined, {
    skip: !shouldFetch,
  });

  const {
    data: jobsResult,
    isLoading: jobsLoading,
    isError: jobsError,
  } = useGetMyJobsQuery({ page: 1, limit: 3 }, { skip: !shouldFetch });

  const company = companyResult?.data;
  const overview = overviewResult?.data as CompanyOverview | undefined;
  const summary = summaryResult?.data as CompanyApplicationSummary | undefined;
  const recentJobs = (
    Array.isArray(jobsResult?.data) ? jobsResult.data : []
  ) as EmployerJob[];

  const isLoading =
    companyLoading || overviewLoading || summaryLoading || jobsLoading;
  const hasError = companyError || overviewError || summaryError || jobsError;

  const stats = {
    totalJobs: overview?.totalJobs ?? 0,
    activeJobs: overview?.activeJobs ?? 0,
    totalApplications: overview?.totalApplications ?? 0,
    totalEmployees: overview?.totalEmployees ?? 0,
    pendingApplications: overview?.pendingApplications ?? 0,
  };

  const headerData: CompanyHeaderData = {
    name: company?.name ?? "Employer dashboard",
    industry: company?.industry?.name ?? "Employer",
    location: company?.location ?? "",
  };

  return (
    <div className="min-h-screen pt-16">
      <DashboardOverviewHeader companyData={headerData} />

      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        {hasError && (
          <div className="border-destructive/20 bg-destructive/5 text-destructive rounded-xl border p-4 text-sm">
            Unable to load dashboard data. Please refresh the page or contact
            support.
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          <Card className="bg-card border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Total Jobs
              </CardTitle>
              <Briefcase className="text-muted-foreground h-4 w-4 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {isLoading ? "—" : stats.totalJobs}
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                {isLoading
                  ? "Loading stats..."
                  : `${stats.totalJobs} jobs posted`}
              </p>
              <Link href="/employer/jobs">
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs font-medium"
                >
                  Manage jobs
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Active Jobs
              </CardTitle>
              <TrendingUp className="text-muted-foreground h-4 w-4 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {isLoading ? "—" : stats.activeJobs}
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                {isLoading
                  ? "Loading stats..."
                  : `${stats.activeJobs} currently active`}
              </p>
              <Link href="/employer/new-job-post">
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs font-medium"
                >
                  Post new job
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Applications
              </CardTitle>
              <Eye className="text-muted-foreground h-4 w-4 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {isLoading ? "—" : stats.totalApplications}
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                {isLoading
                  ? "Loading stats..."
                  : `${stats.pendingApplications} pending review`}
              </p>
              <Link href="/employer/applications">
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs font-medium"
                >
                  View applications
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium sm:text-sm">
                Employees
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-primary text-2xl font-bold">
                {isLoading ? "—" : stats.totalEmployees}
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                {isLoading ? "Loading stats..." : "Active team members"}
              </p>
              <Link href="/employer/employees">
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs font-medium"
                >
                  View employees
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border transition-shadow">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Quick Actions
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Shortcuts to common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/employer/post-job" className="w-full sm:w-auto">
              <Button className="w-full rounded-full font-bold shadow-sm sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </Link>
            <Link href="/employer/applications" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full rounded-full font-bold sm:w-auto"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Browse Candidates
              </Button>
            </Link>
            <Link href="/employer/company-profile" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full rounded-full font-bold sm:w-auto"
              >
                <Building2 className="mr-2 h-4 w-4" />
                Edit Company Profile
              </Button>
            </Link>
            <Link href="/employer/analytics" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full rounded-full font-bold sm:w-auto"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Recent Job Postings
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Latest job openings and their status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <p className="text-muted-foreground text-sm">
                  Loading recent jobs…
                </p>
              ) : recentJobs.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No recent jobs found.
                </p>
              ) : (
                recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="hover:bg-muted/50 flex flex-col justify-between gap-3 rounded-xl border p-4 transition-colors sm:flex-row sm:items-center sm:gap-0"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="truncate text-sm font-bold sm:text-base">
                        {job.title}
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        {job._count?.applications ?? 0} applications •{" "}
                        {job.createdAt
                          ? formatDistanceToNow(new Date(job.createdAt), {
                              addSuffix: true,
                            })
                          : "Recently posted"}
                      </p>
                    </div>
                    <Badge
                      variant={statusToBadgeVariant(job.status)}
                      className="self-start rounded-full px-3 py-1 text-xs font-bold sm:self-center"
                    >
                      {humanizeStatus(job.status)}
                    </Badge>
                  </div>
                ))
              )}
              <Link href="/employer/jobs">
                <Button
                  variant="outline"
                  className="w-full rounded-full font-bold"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View All Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Application Activity
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Review the latest company-level application trends.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <p className="text-muted-foreground text-sm">
                  Loading application summary…
                </p>
              ) : summary ? (
                <div className="grid gap-3">
                  <div className="rounded-xl border p-4">
                    <p className="text-sm font-semibold">In review</p>
                    <p className="text-primary text-2xl font-bold">
                      {summary.inReview}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border p-4">
                      <p className="text-muted-foreground text-xs tracking-[0.12em] uppercase">
                        New this week
                      </p>
                      <p className="text-xl font-bold">{summary.newThisWeek}</p>
                    </div>
                    <div className="rounded-xl border p-4">
                      <p className="text-muted-foreground text-xs tracking-[0.12em] uppercase">
                        Rejected this month
                      </p>
                      <p className="text-xl font-bold">
                        {summary.rejectedThisMonth}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl border p-4">
                    <p className="text-sm font-semibold">Status breakdown</p>
                    <div className="mt-3 grid gap-2">
                      {(
                        Object.entries(summary.byStatus || {}) as [
                          string,
                          number,
                        ][]
                      ).map(([status, count]) => (
                        <div
                          key={status}
                          className="bg-muted flex items-center justify-between gap-3 rounded-lg p-3 text-sm"
                        >
                          <span>{humanizeStatus(status)}</span>
                          <span className="font-semibold">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No application summary available yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboardView;
