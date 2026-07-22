export type ApplicationStatus =
  | 'SUBMITTED'
  | 'REVIEWING'
  | 'SHORTLISTED'
  | 'INTERVIEWED'
  | 'REJECTED'
  | 'OFFERED'
  | 'ACCEPTED'
  | 'WITHDRAWN';

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

import { Skill, Education, WorkExperience } from './profile';

export interface EmployerApplication {
  id: string;
  status: ApplicationStatus;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  resumeUrl?: string | null;
  coverLetter?: string | null;
  yearsOfExperience?: number | null;
  currentLocation?: string | null;
  rejectionReason?: string | null;
  interviewScheduledAt?: string | null;
  interviewNotes?: string | null;
  createdAt: string;
  updatedAt?: string;
  job: {
    id: string;
    title: string;
    slug?: string;
    location?: string | null;
    isRemote?: boolean;
  };
  applicant: {
    id: string;
    fullName: string;
    email: string;
    phone?: string | null;
    profile?: {
      avatarUrl?: string | null;
      headline?: string | null;
      location?: string | null;
      education?: Education[] | null;
      workExperiences?: WorkExperience[] | null;
      skills?: Skill[] | null;
    } | null;
  };
}

export interface CompanyApplicationSummary {
  total: number;
  newThisWeek: number;
  inReview: number;
  rejected: number;
  rejectedThisMonth: number;
  byStatus: Record<ApplicationStatus, number>;
}
