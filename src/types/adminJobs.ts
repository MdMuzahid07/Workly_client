export type AdminJobStatus = "ACTIVE" | "CLOSED" | "EXPIRED" | "DRAFT";

export interface AdminJobRow {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  category: string;
  posted: string;
  expires: string | null;
  views: number;
  applications: number;
  status: AdminJobStatus;
}

export interface AdminJobStats {
  totalActiveJobs: number;
  newToday: number;
  totalApplications: number;
  expiringSoon: number;
}
