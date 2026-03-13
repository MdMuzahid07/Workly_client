/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAppSelector } from "../../../redux/hooks";
import { useGetCategoriesQuery } from "../../../redux/feature/category/categoryApi";
import { useCreateJobMutation } from "../../../redux/feature/job/jobApi";
import WKCheckbox from "../../form/WKCheckbox";
import WKDatePicker from "../../form/WKDatePicker";
import WkForm from "../../form/WkForm";
import WKInput from "../../form/WkInput";
import WKSelect from "../../form/WkSelect";
import WKTextArea from "../../form/WkTextArea";
import { Button } from "../../ui/button";
import CreateJobFromSkillSection from "./CreateJobFromSkillSection";
import StringArrayField from "./StringArrayField";

const jobSchema = z
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
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
        required_error: "Job type is required",
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

    // Skills (JobSkill table - separate from Skill table)
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

    // companyId will be injected from authenticated user (not editable in UI)
    companyId: z.string().min(1, "Company is required"),
    // postedById - from authenticated user
    // slug - generated from title
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

interface CreateNewJobFormProps {
  onClose?: () => void;
  currentStep: number;
  onStepChange: (step: number) => void;
}

// ============================================
// SUBCATEGORY SELECT COMPONENT
// ============================================
const SubcategorySelect = ({ categories }: { categories: any }) => {
  const { watch } = useFormContext<JobFormData>();
  const selectedIndustry = watch("industryId");

  const subcategoryOptions = useMemo(() => {
    if (!categories?.data || !selectedIndustry) return [];

    const category = categories.data.find(
      (cat: any) => cat.id === selectedIndustry,
    );
    return (
      category?.subcategories.map((sub: string) => ({
        value: sub,
        label: sub,
      })) || []
    );
  }, [categories, selectedIndustry]);

  return (
    <WKSelect
      className="w-full"
      name="discipline"
      label="Discipline"
      placeholder={
        selectedIndustry ? "Select discipline" : "Select industry first"
      }
      required
      disabled={!selectedIndustry}
      options={subcategoryOptions}
    />
  );
};

// ============================================
// MAIN FORM COMPONENT
// ============================================
const CreateNewJobForm = ({
  onClose,
  currentStep,
  onStepChange,
}: CreateNewJobFormProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const companyId = user?.companyId;

  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery(undefined);
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();

  const handleSubmit = async (data: JobFormData) => {
    try {
      if (!companyId) {
        toast.error(
          "No company linked to your account. Please complete your company profile.",
        );
        return;
      }

      console.log("=== Job Form Submitted ===");
      console.log("Form Data:", JSON.stringify(data, null, 2));

      // Transform data for API submission
      const apiPayload = {
        // Basic Information
        title: data.title,
        discipline: data.discipline,
        industryId: data.industryId,
        companyId,
        jobType: data.jobType,
        experienceLevel: data.experienceLevel,
        location: data.location,
        isRemote: data.isRemote,

        // Job Details
        description: data.description,
        requirements: data.requirements,

        // Compensation
        salaryMin: data.salaryMin || null,
        salaryMax: data.salaryMax || null,
        currency: data.currency,
        benefits: data.benefits || [],

        // Application Settings
        contactEmail: data.contactEmail,
        applicationDeadline: new Date(data.applicationDeadline).toISOString(),
        maxApplications: data.maxApplications || null,
        autoCloseApplications: data.autoCloseApplications,

        // Status
        status: data.status,
        isFeatured: data.isFeatured,

        // Skills - Will be created in JobSkill table
        skillsRequired: data.skillsRequired || [],
      };

      console.log("API Payload:", JSON.stringify(apiPayload, null, 2));

      // Call API
      const result = await createJob(apiPayload).unwrap();

      console.log("API Response:", result);
      console.log("========================");

      // Show success message
      toast.success(result?.message || "Job created successfully!");

      // Reset to first step
      onStepChange(1);

      // Close modal if provided
      onClose?.();
    } catch (error: any) {
      console.error("Job creation error:", error);
      toast.error(
        error?.data?.error?.message ||
          error?.data?.message ||
          "Failed to create job. Please try again.",
      );
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      onStepChange(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const defaultValues: Partial<JobFormData> = {
    title: "",
    discipline: "",
    jobType: "FULL_TIME",
    experienceLevel: "",
    industryId: "",
    location: "",
    companyId: companyId || "",
    isRemote: false,
    salaryMin: null,
    salaryMax: null,
    currency: "BDT",
    description: "",
    requirements: [
      "Bachelor's degree in relevant field or equivalent experience",
      "Strong communication skills in English",
      "Proven problem-solving abilities",
      "Ability to work independently and in a team",
      "Adaptability to changing priorities and deadlines",
      "Strong work ethic and professional attitude",
      "Willingness to learn and develop new skills",
      "Ability to handle multiple tasks simultaneously",
    ],
    benefits: [
      "Performance bonuses and yearly increments",
      "Festival bonuses (Eid bonuses)",
      "Provident fund contribution",
      "Medical insurance for employee and family",
      "Life insurance coverage",
      "Transportation or conveyance allowance",
      "Lunch or meal allowance",
      "Paid time off and sick leave",
    ],
    contactEmail: "",
    applicationDeadline: "",
    maxApplications: 100,
    isFeatured: false,
    autoCloseApplications: true,
    status: "DRAFT",
    skillsRequired: [],
  };

  return (
    <WkForm<JobFormData>
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      resolver={zodResolver(jobSchema)}
    >
      <div className="space-y-8">
        {/* ============================================ */}
        {/* STEP 1: BASIC INFORMATION */}
        {/* ============================================ */}
        {currentStep === 1 && (
          <div className="animate-in fade-in-50 space-y-6 duration-300">
            <div>
              <h2 className="text-foreground text-lg font-semibold">
                Basic Information
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {`Let's`} start with the essential details about this position
              </p>
            </div>

            <div className="space-y-4">
              {/* Title & Job Type */}
              <div className="grid gap-4 sm:grid-cols-2">
                <WKInput
                  name="title"
                  label="Job Title"
                  placeholder="e.g., Senior Software Engineer"
                  required
                />

                <WKSelect
                  name="jobType"
                  label="Job Type"
                  placeholder="Select type"
                  className="w-full"
                  required
                  options={[
                    { value: "FULL_TIME", label: "Full-time" },
                    { value: "PART_TIME", label: "Part-time" },
                    { value: "CONTRACT", label: "Contract" },
                    { value: "INTERNSHIP", label: "Internship" },
                    { value: "FREELANCE", label: "Freelance" },
                    { value: "REMOTE", label: "Remote" },
                  ]}
                />
              </div>

              {/* Experience Level & Location */}
              <div className="grid gap-4 sm:grid-cols-2">
                <WKSelect
                  className="w-full"
                  name="experienceLevel"
                  label="Experience Level"
                  placeholder="Select level"
                  required
                  options={[
                    { value: "Entry", label: "Entry Level" },
                    { value: "Mid", label: "Mid-level" },
                    { value: "Senior", label: "Senior" },
                    { value: "Lead", label: "Lead" },
                    { value: "Executive", label: "Executive" },
                  ]}
                />

                <WKInput
                  name="location"
                  label="Location"
                  placeholder="e.g., Dhaka, Bangladesh"
                  required
                />
              </div>

              {/* Industry & Discipline */}
              <div className="grid gap-4 sm:grid-cols-2">
                <WKSelect
                  className="w-full"
                  name="industryId"
                  label="Industry"
                  placeholder={
                    categoriesLoading ? "Loading..." : "Select Industry"
                  }
                  required
                  options={
                    categories?.data?.map((cat: any) => ({
                      value: cat.id,
                      label: cat.name,
                    })) || []
                  }
                />
                <SubcategorySelect categories={categories} />
              </div>

              {/* Remote Checkbox */}
              <WKCheckbox name="isRemote" label="This is a remote position" />
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* STEP 2: JOB DETAILS */}
        {/* ============================================ */}
        {currentStep === 2 && (
          <div className="animate-in fade-in-50 space-y-6 duration-300">
            <div>
              <h2 className="text-foreground text-lg font-semibold">
                Job Details
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Describe the role and what {`you're`} looking for
              </p>
            </div>

            <div className="space-y-4">
              {/* Description */}
              <WKTextArea
                name="description"
                label="Job Description"
                placeholder="Provide a detailed description of the role, responsibilities, and what makes this opportunity unique..."
                required
                rows={6}
              />

              {/* Requirements */}
              <StringArrayField
                fieldName="requirements"
                label="Requirements"
                placeholder="Enter a requirement..."
                required
              />

              {/* Skills Section - JobSkill table */}
              <CreateJobFromSkillSection />
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* STEP 3: COMPENSATION & BENEFITS */}
        {/* ============================================ */}
        {currentStep === 3 && (
          <div className="animate-in fade-in-50 space-y-6 duration-300">
            <div>
              <h2 className="text-foreground text-lg font-semibold">
                Compensation & Benefits
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Define the salary range and benefits package
              </p>
            </div>

            <div className="space-y-4">
              {/* Salary Range */}
              <div className="grid gap-4 sm:grid-cols-3">
                <WKInput
                  name="salaryMin"
                  label="Minimum Salary"
                  type="number"
                  placeholder="e.g., 50000"
                />

                <WKInput
                  name="salaryMax"
                  label="Maximum Salary"
                  type="number"
                  placeholder="e.g., 80000"
                />

                <WKSelect
                  className="w-full"
                  name="currency"
                  label="Currency"
                  placeholder="Select"
                  required
                  options={[
                    { value: "BDT", label: "BDT (৳)" },
                    { value: "USD", label: "USD ($)" },
                    { value: "EUR", label: "EUR (€)" },
                    { value: "GBP", label: "GBP (£)" },
                    { value: "INR", label: "INR (₹)" },
                  ]}
                />
              </div>

              {/* Benefits */}
              <StringArrayField
                fieldName="benefits"
                label="Benefits"
                placeholder="Enter a benefit..."
              />
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* STEP 4: APPLICATION SETTINGS */}
        {/* ============================================ */}
        {currentStep === 4 && (
          <div className="animate-in fade-in-50 space-y-6 duration-300">
            <div>
              <h2 className="text-foreground text-lg font-semibold">
                Application Settings
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Configure how candidates can apply
              </p>
            </div>

            <div className="space-y-4">
              {/* Contact Email & Deadline */}
              <div className="grid gap-4 sm:grid-cols-2">
                <WKInput
                  name="contactEmail"
                  label="Contact Email"
                  type="email"
                  placeholder="hr@company.com"
                  required
                />

                <WKDatePicker
                  name="applicationDeadline"
                  label="Application Deadline"
                  required
                  min={getTodayDate()}
                />
              </div>

              {/* Max Applications */}
              <WKInput
                name="maxApplications"
                label="Maximum Applications"
                type="number"
                placeholder="e.g., 100"
              />

              {/* Additional Options */}
              <div className="bg-muted/30 space-y-3 rounded-lg border p-4">
                <p className="text-foreground text-sm font-medium">
                  Additional Options
                </p>

                <WKCheckbox
                  name="isFeatured"
                  label="Mark as featured job (appears at the top of listings)"
                />

                <WKCheckbox
                  name="autoCloseApplications"
                  label="Automatically close applications when maximum is reached"
                />
              </div>

              {/* Status Selection */}
              <div className="bg-primary/5 border-primary/20 space-y-3 rounded-lg border p-4">
                <p className="text-foreground text-sm font-medium">
                  Publication Status
                </p>
                <WKSelect
                  className="w-full"
                  name="status"
                  label="Job Status"
                  placeholder="Select status"
                  required
                  options={[
                    { value: "DRAFT", label: "Save as Draft" },
                    { value: "ACTIVE", label: "Publish Immediately" },
                  ]}
                />
                <p className="text-muted-foreground text-xs">
                  Draft jobs {`won't`} be visible to candidates until you
                  publish them.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* NAVIGATION BUTTONS */}
        {/* ============================================ */}
        <div className="border-border flex items-center justify-between gap-3 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={currentStep === 1 ? onClose : handlePrevious}
            className="min-w-24"
          >
            {currentStep === 1 ? "Cancel" : "Previous"}
          </Button>

          <div className="flex gap-2">
            {currentStep < 4 ? (
              <Button type="button" onClick={handleNext} className="min-w-24">
                Next Step
              </Button>
            ) : (
              <Button type="submit" className="min-w-32" disabled={isCreating}>
                {isCreating ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create Job Posting"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </WkForm>
  );
};

export default CreateNewJobForm;
