export type EmployerAnalyticsPeriod = "7d" | "30d" | "90d" | "1y";

export interface EmployerAnalyticsSummary {
  totalApplications: number;
  totalApplicationsChangePct: number;
  activeJobs: number;
  activeJobsChangePct: number;
  newCandidates: number;
  newCandidatesChangePct: number;
  hiredThisPeriod: number;
  hiredThisPeriodChangePct: number;
}

export interface EmployerApplicationTrendBucket {
  periodLabel: string;
  applications: number;
  interviews: number;
  hired: number;
}

export interface EmployerJobPerformanceRow {
  title: string;
  views: number;
  applications: number;
  conversionRate: number;
  status: string;
}

export interface EmployerDepartmentSlice {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface EmployerFunnelStage {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface EmployerConversionMetric {
  label: string;
  value: string;
}

export interface EmployerAnalyticsPayload {
  period: EmployerAnalyticsPeriod;
  /** False when the employer account is not linked to a company yet */
  hasCompany?: boolean;
  summary: EmployerAnalyticsSummary;
  applicationTrends: EmployerApplicationTrendBucket[];
  jobPerformance: EmployerJobPerformanceRow[];
  departments: EmployerDepartmentSlice[];
  funnelStages: EmployerFunnelStage[];
  conversionMetrics: EmployerConversionMetric[];
}
