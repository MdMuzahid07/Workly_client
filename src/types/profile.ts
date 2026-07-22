/**
 * Central domain types for job-seeker profile data.
 * Used by: ProfileSidebar, SkillsManager, EducationList, ExperienceList,
 *          ProjectList, PortfolioSection, VolunteerSection, AdditionalInfo,
 *          SavedProfileCard.
 */

export interface Skill {
  id?: string;
  skillName: string;
  /** Discriminates hard vs. soft skills */
  type?: 'HARD' | 'SOFT';
  experienceYears?: number | null;
  /** Legacy alias used by some API responses */
  skill?: string;
}

export interface Language {
  id?: string;
  language: string;
  proficiency?: string;
}

export interface Education {
  id?: string;
  level?: string;
  degree?: string;
  /** Institution alias: "institution" or "institute" */
  institution?: string;
  institute?: string;
  year?: string | number;
  result?: string;
}

export interface Certification {
  id?: string;
  name?: string;
  issuingOrg?: string;
  organization?: string;
  issueDate?: string | null;
  expiryDate?: string | null;
  expirationDate?: string | null;
}

export interface WorkExperience {
  id?: string;
  jobTitle?: string;
  designation?: string;
  company?: string;
  startDate?: string | null;
  endDate?: string | null;
  currentlyWorking?: boolean;
  current?: boolean;
  employmentType?: string;
  description?: string;
}

export interface Project {
  id?: string;
  title?: string;
  description?: string;
  technologies?: string[];
  projectUrl?: string | null;
}

export interface Award {
  id?: string;
  title?: string;
  issuer?: string;
  organization?: string;
  issueDate?: string | null;
  date?: string | null;
}

export interface Publication {
  id?: string;
  title?: string;
  publisher?: string;
  publishDate?: string | null;
  date?: string | null;
}

export interface Reference {
  id?: string;
  name?: string;
  relationship?: string;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface VolunteerWork {
  id?: string;
  role?: string;
  organization?: string;
  startDate?: string | null;
  endDate?: string | null;
  currentlyVolunteering?: boolean;
  current?: boolean;
  description?: string;
}

/** Social link keys for the portfolio / online-presence section */
export interface ProfileSocialLinks {
  linkedin?: string;
  github?: string;
  website?: string;
  twitter?: string;
  facebook?: string;
}

export type Availability = 'immediate' | '2_weeks' | '1_month' | 'not_available';

/** Raw user record as returned by the API — used in ProfileSidebar and SavedProfileCard */
export interface UserProfileData {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  isVerified?: boolean;
  role?: string;
  savedAt?: string;
  profile?: {
    avatarUrl?: string | null;
    bio?: string | null;
    headline?: string | null;
    location?: string | null;
    phone?: string | null;
    totalExperienceYears?: number;
    resumeUrl?: string | null;
    videoResumeUrl?: string | null;
    linkedInUrl?: string | null;
    websiteUrl?: string | null;
    githubUrl?: string | null;
    twitterUrl?: string | null;
    facebookUrl?: string | null;
    skills?: Skill[];
    education?: Education[];
    preference?: {
      availability?: string;
      expectedSalary?: number;
      tags?: string[];
    };
  };
}

export interface Resume {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  isDefault: boolean;
  uploadDate: string;
  type?: string;
}
