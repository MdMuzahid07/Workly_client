/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompanyBenefit } from '@/types/company-benefit';
import { ApiCompanyData, CompanyProfile } from '@/types/company-profile';

/**
 * Formats a date string for use in HTML date input fields
 * @param dateString - ISO date string or any valid date format
 * @returns Formatted date string (YYYY-MM-DD) or empty string if invalid
 */
export const formatDateForInput = (dateString?: string): string => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toISOString().split('T')[0];
  } catch {
    return dateString;
  }
};

/**
 * Parses benefits from API response and ensures proper structure
 * @param benefits - Raw benefits array from API
 * @returns Properly structured CompanyBenefit array
 */
export const parseBenefitsFromApi = (benefits: any[]): CompanyBenefit[] => {
  if (!benefits || !Array.isArray(benefits)) return [];

  return benefits.map((benefit: any) => ({
    id: benefit.id || `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: benefit.title || '',
    description: benefit.description || '',
    category: benefit.category || '',
    icon: benefit.icon || 'award',
    isActive: benefit.isActive ?? true,
    createdAt: benefit.createdAt ? new Date(benefit.createdAt) : undefined,
    updatedAt: benefit.updatedAt ? new Date(benefit.updatedAt) : undefined,
  }));
};

/**
 * Prepares benefits for API payload by removing unnecessary fields
 * @param benefits - CompanyBenefit array
 * @returns Cleaned benefits array for API submission
 */
export const prepareBenefitsForApi = (benefits: CompanyBenefit[]): any[] => {
  return benefits.map((benefit) => ({
    title: benefit.title,
    description: benefit.description || undefined,
    category: benefit.category || undefined,
    icon: benefit.icon || undefined,
    isActive: benefit.isActive,
  }));
};

/**
 * Extracts industry ID from various industry field formats
 * @param industry - Industry field (string ID or object with ID)
 * @returns Industry ID string or undefined
 */
export const extractIndustryId = (industry: any): string | undefined => {
  if (!industry) return undefined;

  if (typeof industry === 'string') {
    return industry;
  }

  if (typeof industry === 'object' && industry.id) {
    return industry.id;
  }

  return undefined;
};

/**
 * Maps API company data to frontend CompanyProfile structure
 * @param company - Raw company data from API
 * @returns Properly structured CompanyProfile
 */
export const mapApiDataToProfile = (company: ApiCompanyData): CompanyProfile => {
  return {
    id: company.id,
    name: company.name || '',
    slug: company.slug || '',
    description: company.description || '',
    industry: company.industry || null,
    size: company.size || '',
    location: company.location || '',
    websiteUrl: company.websiteUrl || '',
    contactEmail: company.contactEmail || '',
    contactPhone: company.contactPhone || '',
    founded: formatDateForInput(company.founded),
    logoUrl: company.logoUrl || '',
    coverUrl: company.coverUrl || '',
    isVerified: company.isVerified || false,
    verifiedAt: company.verifiedAt || null,
    mission: company.mission || '',
    values: company.values || [],
    benefits: parseBenefitsFromApi(company.benefits || []),
    socialLinks: company.socialLinks || [],
    stats: {
      totalTeamMembers: company._count?.employees || 0,
      totalJobs: company._count?.jobs || 0,
      totalApplications: 0,
      profileViews: 0,
    },
  };
};

/**
 * Calculates profile completion percentage based on filled fields
 * @param profile - Company profile to evaluate
 * @returns Completion percentage (0-100)
 */
export const calculateProfileCompletion = (profile: CompanyProfile | null): number => {
  if (!profile) return 0;
  let completedFields = 0;
  const totalFields = 11; // Major fields we care about

  if (profile.description) completedFields++;
  if (profile.mission) completedFields++;
  if (profile.logoUrl) completedFields++;
  if (profile.coverUrl) completedFields++;
  if (profile.location) completedFields++;
  if (profile.websiteUrl) completedFields++;
  if (profile.size) completedFields++;
  if (profile.industry) completedFields++;
  if (profile.values && profile.values.length > 0) completedFields++;
  if (profile.benefits && profile.benefits.length > 0) completedFields++;

  return (completedFields / totalFields) * 100;
};
