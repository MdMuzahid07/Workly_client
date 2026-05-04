export type AdminJobSeekerStatus = "Hired" | "Looking" | "Active" | "Suspended";

export interface AdminJobSeekerRow {
  id: string; // userId
  name: string;
  avatar: string;
  email: string;
  location: string;
  status: AdminJobSeekerStatus;
  experience: string;
  primarySkill: string;
  joinedDate: string;
  socials: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

export interface AdminJobSeekerStats {
  totalJobSeekers: number;
  activeResumes: number;
  portfoliosShared: number;
  highMatchRate: number; // percent
}
