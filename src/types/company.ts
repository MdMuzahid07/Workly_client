/**
 * Central domain types for company listings used on the landing page
 * and browse-companies views.
 * Used by: LandingFeaturedCompanies, FeaturedJobsSlider (company slider).
 */

export interface CompanyListing {
  id: string;
  name: string;
  slug?: string | null;
  industry?: string | { name: string } | null;
  location?: string | null;
  description?: string | null;
  logoUrl?: string | null;
  openJobs?: number;
  _count?: { jobs?: number; employees?: number };
}

/** Mapped shape after transforming raw API data for display */
export interface DisplayCompany {
  name: string;
  slug: string;
  industry: string;
  location: string;
  jobsCount: string;
  initial: string;
  logoBg: string;
  tagline: string;
  /** true when data comes from real API, false when using static fallback */
  isReal?: boolean;
}

export interface CompanyFilters {
  search?: string;
  industry?: string;
  location?: string;
  size?: string;
  page?: number;
  limit?: number;
}
