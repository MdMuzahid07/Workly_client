import { z } from "zod";

export const jobSchema = z
  .object({
    // Basic Info - Step 1
    title: z
      .string()
      .min(3, "Job title must be at least 3 characters")
      .max(255, "Job title must not exceed 255 characters"),
    discipline: z
      .string()
      .min(1, "Discipline is required")
      .max(255, "Discipline must not exceed 255 characters"),
    industryId: z.string().min(1, "Industry is required"),
    jobType: z.enum(
      [
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "INTERNSHIP",
        "FREELANCE",
        "REMOTE",
      ],
      {
        error: "Job type is required",
      },
    ),
    experienceLevel: z
      .string()
      .min(1, "Experience level is required")
      .max(50, "Experience level must not exceed 50 characters"),
    location: z
      .string()
      .min(1, "Location is required")
      .max(255, "Location must not exceed 255 characters"),
    isRemote: z.boolean().default(false),

    // Job Details - Step 2
    description: z
      .string()
      .min(20, "Description must be at least 20 characters"),
    requirements: z
      .array(z.string())
      .min(1, "At least one requirement is required")
      .default([]),

    // Skills
    skillsRequired: z
      .array(
        z.object({
          skillName: z.string().min(1, "Skill name is required").max(100),
          experienceYears: z.coerce
            .number()
            .min(0, "Experience must be 0 or more"),
          priority: z
            .enum(["HIGH", "MEDIUM", "LOW", "GOOD_TO_HAVE"])
            .default("MEDIUM"),
          isRequired: z.boolean().default(true),
          description: z.string().optional(),
        }),
      )
      .optional()
      .default([]),

    // Compensation - Step 3
    salaryMin: z.coerce
      .number()
      .min(0, "Minimum salary must be 0 or more")
      .optional()
      .nullable(),
    salaryMax: z.coerce
      .number()
      .min(0, "Maximum salary must be 0 or more")
      .optional()
      .nullable(),
    currency: z
      .string()
      .max(3, "Currency code must be 3 characters")
      .default("BDT"),
    benefits: z.array(z.string()).optional().default([]),

    // Application Settings - Step 4
    contactEmail: z
      .string()
      .email("Invalid email address")
      .max(255, "Email must not exceed 255 characters"),
    applicationDeadline: z.string().min(1, "Application deadline is required"),
    maxApplications: z.coerce
      .number()
      .min(1, "Max applications must be at least 1")
      .optional()
      .nullable(),
    autoCloseApplications: z.boolean().default(true),

    // Status & Features
    status: z.enum(["DRAFT", "ACTIVE", "CLOSED", "EXPIRED"]).default("DRAFT"),
    isFeatured: z.boolean().default(false),
    companyId: z.string().min(1, "Company is required"),
  })
  .refine(
    (data) => {
      if (data.salaryMax && data.salaryMin) {
        return data.salaryMax >= data.salaryMin;
      }
      return true;
    },
    {
      message: "Maximum salary must be greater than or equal to minimum salary",
      path: ["salaryMax"],
    },
  );

export type JobFormData = z.infer<typeof jobSchema>;

export interface CreateNewJobFormProps {
  onClose?: () => void;
  currentStep: number;
  onStepChange: (step: number) => void;
  jobId?: string;
  onSuccess?: (jobData: {
    title: string;
    jobType: string;
    location: string;
    status: string;
    isUpdate: boolean;
  }) => void;
}
