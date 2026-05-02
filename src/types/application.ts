export type ApplicationStatus =
  | "SUBMITTED"
  | "REVIEWING"
  | "SHORTLISTED"
  | "INTERVIEWED"
  | "REJECTED"
  | "OFFERED"
  | "ACCEPTED"
  | "WITHDRAWN";

export interface MyAppliedJob {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt?: string;
  withdrawnAt?: string | null;
  interviewScheduledAt?: string | null;
  job: {
    id: string;
    title: string;
    slug?: string;
    location: string;
    isRemote: boolean;
    salaryMin?: number | null;
    salaryMax?: number | null;
    currency?: string | null;
    jobType: string;
    requirements: string[];
    JobSkill?: Array<{ id: string; skillName: string }>;
    company: {
      id: string;
      name: string;
      slug?: string;
      logoUrl?: string | null;
    };
  };
}

export interface ApplicationSummary {
  total: number;
  inReview: number;
  interviewing: number;
  offer: number;
  accepted: number;
  rejected: number;
  withdrawn: number;
  byStatus: Record<ApplicationStatus, number>;
}
