import { CompanyBenefit } from "./company-benefit";

/**
 * Social media link interface
 */
export interface SocialLink {
  id?: string;
  platform: string;
  url: string;
}

/**
 * Company statistics interface
 */
export interface CompanyStats {
  totalTeamMembers: number;
  totalJobs: number;
  totalApplications: number;
  profileViews: number;
}

/**
 * Main company profile interface used throughout the application
 */
export interface CompanyProfile {
  id: string;
  name: string;
  slug: string;
  description: string;
  industry: string | { id: string; name: string } | null;
  size: string;
  location: string;
  websiteUrl: string;
  contactEmail: string;
  contactPhone: string;
  founded: string;
  logoUrl: string;
  coverUrl: string;
  isVerified: boolean;
  verifiedAt: string | null;
  mission?: string;
  values?: string[];
  benefits?: CompanyBenefit[];
  socialLinks?: SocialLink[];
  stats?: CompanyStats;
  _count?: {
    employees?: number;
    jobs?: number;
  };
}

/**
 * API response structure for company data
 */
export interface ApiCompanyData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  industry?: { id: string; name: string } | null;
  size?: string;
  location?: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  founded?: string;
  logoUrl?: string;
  coverUrl?: string;
  isVerified?: boolean;
  verifiedAt?: string | null;
  mission?: string;
  values?: string[];
  benefits?: CompanyBenefit[];
  socialLinks?: SocialLink[];
  _count?: {
    employees?: number;
    jobs?: number;
  };
}

/**
 * Default empty company profile
 */
export const DEFAULT_PROFILE: CompanyProfile = {
  id: "",
  name: "",
  slug: "",
  description: "",
  industry: null,
  size: "",
  location: "",
  websiteUrl: "",
  contactEmail: "",
  contactPhone: "",
  founded: "",
  logoUrl: "",
  coverUrl: "",
  isVerified: false,
  verifiedAt: null,
  mission: "",
  values: [],
  benefits: [],
  socialLinks: [],
  stats: {
    totalTeamMembers: 0,
    totalJobs: 0,
    totalApplications: 0,
    profileViews: 0,
  },
};
