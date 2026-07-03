/**
 * Central domain types for job listings and job filters.
 * Used by: LandingFeaturedJobs, FeaturedJobsSlider, job filter components.
 */

export interface JobListing {
  id: string;
  title: string;
  slug?: string;
  jobType?: string;
  type?: string;
  location?: string | null;
  isRemote?: boolean;
  salaryMin?: number | null;
  salaryMax?: number | null;
  createdAt?: string;
  isPremium?: boolean;
  /** Comma-separated skill names (legacy API field) */
  skills?: string;
  companySize?: string;
  viewCount?: number;
  applyCount?: number;
  isSaved?: boolean;
  postedTime?: string;
  industry?: { name: string } | null;
  company?: {
    id?: string;
    name?: string;
    slug?: string;
    logoUrl?: string | null;
    industry?: string | { name: string } | null;
    size?: string;
  };
}

/** Mapped shape used for display in landing / sliders (post-transform from raw API) */
export interface DisplayJob {
  id?: string;
  title: string;
  company: string;
  logoBg: string;
  companyInitial: string;
  location: string;
  salary: string;
  type: string;
  postedTime: string;
  tags: string[];
  isPremium: boolean;
  /** true when data comes from real API, false when using static fallback */
  isReal?: boolean;
}

export interface JobFilters {
  search?: string;
  location?: string;
  jobType?: string | string[];
  experienceRange?: [number, number];
  salaryMin?: number;
  salaryMax?: number;
  category?: string;
  skills?: string[];
  postedWithin?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
