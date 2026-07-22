/**
 * Employer dashboard domain types.
 * Mirrors the API contract from GET /company/overview-statistics and related endpoints.
 */

export interface EmployerDashboardTrends {
  jobsCreatedLast30Days: number;
  jobsCreatedPrevious30Days: number;
  applicationsLast7Days: number;
  applicationsPrevious7Days: number;
  teamMembersJoinedLast90Days: number;
  teamMembersJoinedPrevious90Days: number;
}

export interface RecentTeamMember {
  id: string;
  fullName: string;
  role: string;
  createdAt: string;
  lastLogin: string | null;
}

/** Response body `data` from GET /company/overview-statistics */
export interface CompanyOverviewStatistics {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
  totalTeamMembers: number;
  recentTeamMembers?: RecentTeamMember[];
  trends?: EmployerDashboardTrends;
}

export interface EmployerDashboardJobRow {
  id: string;
  title: string;
  status: string;
  createdAt?: string | Date | null;
  _count?: {
    applications?: number;
  };
}

export interface EmployerCompanyHeader {
  name: string;
  industry: string;
  location: string;
}

/** Response body `data` from GET /application/my-company-summary */
export interface CompanyApplicationSummary {
  total: number;
  newThisWeek: number;
  inReview: number;
  rejected: number;
  rejectedThisMonth: number;
  byStatus: Record<string, number>;
}

export const COMPANY_USER_ROLE_LABELS: Record<string, string> = {
  EMPLOYER: 'Employer',
  JOB_SEEKER: 'Job seeker',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Super admin',
} as const;
