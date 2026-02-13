/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useGetCategoriesQuery } from "../../../redux/feature/category/categoryApi";
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
    title: z.string().min(3, "Job title must be at least 3 characters"),
    discipline: z.string().min(1, "Discipline is required"),
    industryId: z.string().min(1, "Industry is required"),
    jobType: z.string().min(1, "Job type is required"),
    experienceLevel: z.string().min(1, "Experience level is required"),
    location: z.string().min(1, "Location is required"),
    isRemote: z.boolean().default(false),
    salaryMin: z.coerce.number().min(0, "Minimum salary must be 0 or more"),
    salaryMax: z.coerce.number().min(0, "Maximum salary must be 0 or more"),
    currency: z.string().min(1, "Currency is required"),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters"),
    requirements: z
      .array(z.string())
      .min(1, "At least one requirement is required"),
    benefits: z.array(z.string()).optional().default([]),
    contactEmail: z.string().email("Invalid email address"),
    applicationDeadline: z.string().min(1, "Application deadline is required"),
    maxApplications: z.coerce
      .number()
      .min(1, "Max applications must be at least 1"),
    isFeatured: z.boolean().default(false),
    autoCloseApplications: z.boolean().default(true),
    skillsRequired: z
      .array(
        z.object({
          skillId: z.string(),
          experienceYears: z.coerce.number(),
          level: z.string(),
        }),
      )
      .optional()
      .default([]),
  })
  .refine((data) => data.salaryMax >= data.salaryMin, {
    message: "Maximum salary must be greater than or equal to minimum salary",
    path: ["salaryMax"],
  });

export type JobFormData = z.infer<typeof jobSchema>;

interface CreateNewJobFormProps {
  onClose?: () => void;
  currentStep: number;
  onStepChange: (step: number) => void;
}

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

const CreateNewJobForm = ({
  onClose,
  currentStep,
  onStepChange,
}: CreateNewJobFormProps) => {
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery(undefined);

  const handleSubmit = (data: JobFormData) => {
    console.log("=== Job Form Submitted ===");
    console.log("Form Data:", data);
    console.log("Step:", currentStep);
    console.log("========================");

    // Show success message
    toast.success("Job form data logged to console!");

    // Reset to first step
    onStepChange(1);

    // Close modal if provided
    onClose?.();
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
    jobType: "",
    experienceLevel: "",
    industryId: "",
    location: "",
    isRemote: false,
    salaryMin: 0,
    salaryMax: 0,
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
        {/* Step 1: Basic Information */}
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
                  ]}
                />
              </div>

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
                  ]}
                />

                <WKInput
                  name="location"
                  label="Location"
                  placeholder="e.g., Dhaka, Bangladesh"
                  required
                />
              </div>

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

              <WKCheckbox name="isRemote" label="This is a remote position" />
            </div>
          </div>
        )}

        {/* Step 2: Job Details */}
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
              <WKTextArea
                name="description"
                label="Job Description"
                placeholder="Provide a detailed description of the role, responsibilities, and what makes this opportunity unique..."
                required
                rows={6}
              />

              <StringArrayField
                fieldName="requirements"
                label="Requirements"
                placeholder="Enter a requirement..."
                required
              />

              <CreateJobFromSkillSection />
            </div>
          </div>
        )}

        {/* Step 3: Compensation & Benefits */}
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
              <div className="grid gap-4 sm:grid-cols-3">
                <WKInput
                  name="salaryMin"
                  label="Minimum Salary"
                  type="text"
                  placeholder="e.g., 50000"
                  required
                />

                <WKInput
                  name="salaryMax"
                  label="Maximum Salary"
                  type="text"
                  placeholder="e.g., 80000"
                  required
                />

                <WKSelect
                  className="w-full"
                  name="currency"
                  label="Currency"
                  placeholder="Select"
                  required
                  options={[
                    { value: "BDT", label: "BDT" },
                    { value: "USD", label: "USD" },
                    { value: "EUR", label: "EUR" },
                  ]}
                />
              </div>

              <StringArrayField
                fieldName="benefits"
                label="Benefits"
                placeholder="Enter a benefit..."
              />
            </div>
          </div>
        )}

        {/* Step 4: Application Settings */}
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

              <WKInput
                name="maxApplications"
                label="Maximum Applications"
                type="text"
                placeholder="e.g., 100"
              />

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
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
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
              <Button type="submit" className="min-w-32">
                Create Job Posting
              </Button>
            )}
          </div>
        </div>
      </div>
    </WkForm>
  );
};

export default CreateNewJobForm;
