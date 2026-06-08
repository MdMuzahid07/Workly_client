"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useGetCategoriesQuery } from "@/redux/feature/category/categoryApi";
import {
  useCreateJobMutation,
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "@/redux/feature/job/jobApi";
import { useAppSelector } from "@/redux/hooks";
import WkForm from "@/components/form/WkForm";
import { JobFormData, jobSchema, CreateNewJobFormProps } from "./schema";
import CreateNewJobFormContent from "./CreateNewJobFormContent";

export default function CreateNewJobForm({
  onClose,
  currentStep,
  onStepChange,
  jobId,
  onSuccess,
}: CreateNewJobFormProps) {
  const user = useAppSelector((state) => state.auth.user);
  const companyId = user?.companyId;

  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery(undefined);
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  const { data: existingJobData, isLoading: isJobLoading } = useGetJobByIdQuery(
    jobId as string,
    {
      skip: !jobId,
    },
  );

  const existingJob = existingJobData?.data;

  const handleSubmit = async (data: JobFormData) => {
    try {
      if (!companyId) {
        toast.error(
          "No company linked to your account. Please complete your company profile.",
        );
        return;
      }

      let isoDeadline = "";
      try {
        if (data.applicationDeadline) {
          isoDeadline = new Date(data.applicationDeadline).toISOString();
        }
      } catch {
        console.error("Invalid deadline date:", data.applicationDeadline);
      }

      const apiPayload: Record<string, unknown> = {
        title: data.title,
        discipline: data.discipline,
        industryId: data.industryId,
        companyId,
        jobType: data.jobType,
        experienceLevel: data.experienceLevel,
        location: data.location,
        isRemote: data.isRemote,
        description: data.description,
        requirements: data.requirements,
        salaryMin: data.salaryMin || null,
        salaryMax: data.salaryMax || null,
        currency: data.currency,
        benefits: data.benefits || [],
        contactEmail: data.contactEmail,
        applicationDeadline: isoDeadline || null,
        maxApplications: data.maxApplications || null,
        autoCloseApplications: data.autoCloseApplications,
        status: data.status,
        isFeatured: data.isFeatured,
        skillsRequired: data.skillsRequired || [],
      };

      if (jobId) {
        const result = await updateJob({ id: jobId, ...apiPayload }).unwrap();
        toast.success(result?.message || "Job updated successfully!");
      } else {
        const result = await createJob(apiPayload).unwrap();
        toast.success(result?.message || "Job created successfully!");
      }

      // Clear draft storage
      localStorage.removeItem("workly_post_job_draft");
      localStorage.removeItem("workly_post_job_step");

      if (onSuccess) {
        onSuccess({
          title: data.title,
          jobType: data.jobType,
          location: data.location,
          status: data.status,
          isUpdate: !!jobId,
        });
      } else {
        onStepChange(1);
        onClose?.();
      }
    } catch (error) {
      console.error("Job operation error:", error);
      const err = error as {
        data?: { error?: { message?: string }; message?: string };
      };
      toast.error(
        err?.data?.error?.message ||
          err?.data?.message ||
          `Failed to ${jobId ? "update" : "create"} job. Please try again.`,
      );
    }
  };

  const defaultValues: Partial<JobFormData> = useMemo(() => {
    if (jobId && existingJob) {
      return {
        title: existingJob.title || "",
        discipline: existingJob.discipline || "",
        jobType: existingJob.jobType || "FULL_TIME",
        experienceLevel: existingJob.experienceLevel || "",
        industryId: existingJob.industryId || existingJob.industry?.id || "",
        location: existingJob.location || "",
        companyId: existingJob.companyId || companyId || "",
        isRemote: existingJob.isRemote || false,
        salaryMin: existingJob.salaryMin || null,
        salaryMax: existingJob.salaryMax || null,
        currency: existingJob.currency || "BDT",
        description: existingJob.description || "",
        requirements: existingJob.requirements || [],
        benefits: existingJob.benefits || [],
        contactEmail: existingJob.contactEmail || "",
        applicationDeadline: existingJob.applicationDeadline
          ? new Date(existingJob.applicationDeadline)
              .toISOString()
              .split("T")[0]
          : "",
        maxApplications: existingJob.maxApplications || 100,
        isFeatured: existingJob.isFeatured || false,
        autoCloseApplications: existingJob.autoCloseApplications || true,
        status: existingJob.status || "DRAFT",
        skillsRequired: existingJob.JobSkill || [],
      };
    }

    return {
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
  }, [jobId, existingJob, companyId]);

  return (
    <WkForm<JobFormData>
      onSubmit={handleSubmit}
      defaultValues={!jobId ? (defaultValues as JobFormData) : undefined}
      values={jobId ? (defaultValues as JobFormData) : undefined}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      resolver={zodResolver(jobSchema)}
    >
      {isJobLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
        </div>
      ) : (
        <CreateNewJobFormContent
          onClose={onClose}
          currentStep={currentStep}
          onStepChange={onStepChange}
          jobId={jobId}
          categories={categories}
          categoriesLoading={categoriesLoading}
          isCreating={isCreating}
          isUpdating={isUpdating}
        />
      )}
    </WkForm>
  );
}
