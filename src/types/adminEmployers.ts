export type AdminEmployerStatus = 'Verified' | 'Pending' | 'Suspended';

export interface AdminEmployerRow {
  id: string; // companyId
  companyName: string;
  slug: string;
  logo: string;
  industry: string;
  ownerId: string | null;
  ownerName: string;
  ownerEmail: string;
  status: AdminEmployerStatus;
  activeJobs: number;
  joinedDate: string;
  isCompanyVerified: boolean;
  isOwnerActive: boolean;
  failedLoginAttempts: number;
  lockedUntil: string | null;
}

export interface AdminEmployerStats {
  totalEmployers: number;
  verifiedCompanies: number;
  pendingVerification: number;
  activeJobs: number;
}
