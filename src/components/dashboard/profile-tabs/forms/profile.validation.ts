import { z } from "zod";

// --- Enums and Constants ---
export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
  "Self-employed",
] as const;
export const FLUENCY_LEVELS = [
  "Native",
  "Fluent",
  "Conversational",
  "Basic",
] as const;
export const EXPERTISE_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
] as const;

// --- Basic Information Schema ---
export const basicInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  headline: z
    .string()
    .max(100, "Headline cannot exceed 100 characters")
    .optional(),
});

// --- Education Schema ---
export const educationSchema = z.object({
  level: z.string().min(1, "Level of education is required"),
  degree: z.string().min(1, "Degree title is required"),
  institute: z.string().min(1, "Institute name is required"),
  year: z.string().min(1, "Year of passing is required"),
  result: z.string().min(1, "Result/GPA is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  currentlyStudying: z.boolean().optional(),
});

// --- Experience Schema ---
export const experienceSchema = z.object({
  designation: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  currentlyWorking: z.boolean().optional(),
  employmentType: z.enum(EMPLOYMENT_TYPES).default("Full-time"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().optional(),
});

// --- Project Schema ---
export const projectSchema = z.object({
  title: z.string().min(3, "Project title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  projectUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  repoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

// --- Resume Schema ---
export const resumeSchema = z.object({
  name: z.string().min(1, "Resume name is required"),
  file: z.unknown().optional(), // File validation would typically happen on change
  isDefault: z.boolean().optional(),
});

// --- Video Resume Schema ---
export const videoResumeSchema = z
  .object({
    videoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    file: z.unknown().optional(),
  })
  .refine((data) => data.videoUrl || data.file, {
    message: "Either a video URL or a video file is required",
    path: ["videoUrl"],
  });

// --- Certification Schema ---
export const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  organization: z.string().min(1, "Organization is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  expirationDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  file: z.unknown().optional(), // For PDF upload
});

// --- Social Links Schema ---
export const socialLinksSchema = z.object({
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
  facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
});

// --- Address Schema ---
export const addressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

// --- Combined Address Details Schema (for the form) ---
export const addressDetailsSchema = z.object({
  presentAddress: addressSchema.optional(),
  permanentAddress: addressSchema.optional(),
  sameAsPresent: z.boolean().optional(),
});

// --- Volunteer Schema ---
export const volunteerSchema = z.object({
  organization: z.string().min(1, "Organization is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  currentlyVolunteering: z.boolean().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

// --- Award Schema ---
export const awardSchema = z.object({
  title: z.string().min(1, "Award title is required"),
  organization: z.string().min(1, "Organization is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().optional(),
});

// --- Publication Schema ---
export const publicationSchema = z.object({
  title: z.string().min(1, "Publication title is required"),
  publisher: z.string().min(1, "Publisher/Medium is required"),
  date: z.string().min(1, "Date is required"),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().optional(),
});

// --- Reference Schema ---
export const referenceSchema = z.object({
  name: z.string().min(1, "Reference name is required"),
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .optional()
    .or(z.literal("")),
  relationship: z.string().min(1, "Relationship is required"),
});

// --- Soft Skill Schema ---
export const softSkillSchema = z.object({
  skill: z.string().min(1, "Soft skill is required"),
});

// --- Language Schema ---
export const languageSchema = z.object({
  language: z.string().min(1, "Language is required"),
  proficiency: z.enum(["Basic", "Conversational", "Fluent", "Native"]),
});

// --- Job Preference Schema ---
export const jobPreferenceSchema = z.object({
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "FREELANCE"]),
  expectedSalary: z.coerce.number().min(0, "Salary must be a positive number"),
  preferredLocation: z.string().min(1, "Location is required"),
  industry: z.string().min(1, "Industry is required"),
  workExperience: z.string().min(1, "Experience level is required"),
  remoteWork: z.boolean().default(false),
});

// Export types based on schemas
export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type ResumeFormData = z.infer<typeof resumeSchema>;
export type VideoResumeFormData = z.infer<typeof videoResumeSchema>;
export type CertificationFormData = z.infer<typeof certificationSchema>;
export type SocialLinksFormData = z.infer<typeof socialLinksSchema>;
export type AddressDetailsFormData = z.infer<typeof addressDetailsSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type VolunteerFormData = z.infer<typeof volunteerSchema>;
export type AwardFormData = z.infer<typeof awardSchema>;
export type PublicationFormData = z.infer<typeof publicationSchema>;
export type ReferenceFormData = z.infer<typeof referenceSchema>;
export type SoftSkillFormData = z.infer<typeof softSkillSchema>;
export type LanguageFormData = z.infer<typeof languageSchema>;
export type JobPreferenceFormData = z.infer<typeof jobPreferenceSchema>;
