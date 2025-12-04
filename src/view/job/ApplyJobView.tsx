/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, MapPin } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ApplyJobHeader from "../../components/main/jobs/applyJob/ApplyJobHeader";
import ApplySuccessMessage from "../../components/main/jobs/applyJob/ApplySuccessMessage";
import JobApplyForm from "../../components/main/jobs/applyJob/JobApplyForm";
import JobInfoCard from "../../components/main/jobs/applyJob/JobInfoCard";
import JobRequirementsSidebar from "../../components/main/jobs/applyJob/JobRequirementsSidebar";
import JobSummaryCard from "../../components/main/jobs/applyJob/JobSummaryCard";
import { useCreateApplicationMutation } from "../../redux/feature/application/applicationSlice";
import { useGetJobByIdQuery } from "../../redux/feature/job/jobApi";
import { useUploadSingleFileMutation } from "../../redux/feature/upload/uploadApi";
import JobApplyViewSkeleton from "../../skeleton/job/JobApplyViewSkeleton";

interface ApplyJobViewProps {
  jobId: string;
}

const EXPERIENCE_OPTIONS = [
  { value: "0", label: "6 months plus" },
  { value: "1", label: "1-2 years" },
  { value: "3", label: "3-4 years" },
  { value: "5", label: "5-6 years" },
  { value: "7", label: "7-10 years" },
  { value: "10", label: "10+ years" },
];

const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(2, "Location is required"),
  currentRole: z.string().min(2, "Current role is required"),
  experience: z.string().min(1, "Years of experience is required"),
  portfolio: z
    .string()
    .url("Please enter a valid portfolio URL")
    .optional()
    .or(z.literal("")),
  coverLetter: z
    .string()
    .min(20, "Cover letter must be at least 20 characters"),
  resumeFile: z.instanceof(File).optional(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const ApplyJobView = ({ jobId }: ApplyJobViewProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadSingleFile, { isLoading, error, isSuccess }] =
    useUploadSingleFileMutation();
  const [createApplication, { isLoading: isCreatingApplication }] =
    useCreateApplicationMutation();
  const { data: jobData, isLoading: isJobLoading } = useGetJobByIdQuery(jobId, {
    skip: !jobId,
  });

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      currentRole: "",
      experience: "3",
      portfolio: "",
      coverLetter: "",
      resumeFile: undefined,
      agreeTerms: false,
    },
  });

  const handleSubmit = async (data: ApplicationFormData) => {
    try {
      if (!data.resumeFile) {
        console.error("Resume file is required");
        return;
      }

      const formData = new FormData();
      formData.append("file", data.resumeFile);

      const resume = await uploadSingleFile(formData).unwrap();

      const payload = {
        ...data,
        jobId,
        resumeFile: resume.data.url,
      };

      if (resume.success) {
        const response = await createApplication(payload).unwrap();
        if (response.success) {
          setSubmitted(true);
        }
      }
    } catch (error) {
      console.error("Failed to upload resume file:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      form.setValue("resumeFile", file);
    }
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    form.setValue("resumeFile", undefined);
  };

  const formatSalaryRange = (min: number, max: number) =>
    `$${min.toLocaleString()} - $${max.toLocaleString()}`;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isJobLoading) {
    return <JobApplyViewSkeleton />;
  }

  return (
    <div className="bg-primary/2 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:mt-16 lg:px-8">
        <ApplyJobHeader jobTitle={jobData?.data.title} />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <JobSummaryCard job={jobData} />

            <div className="grid gap-3 sm:grid-cols-2">
              <JobInfoCard
                icon={MapPin}
                label="LOCATION"
                value={jobData?.data.location}
              />
              <JobInfoCard
                icon={DollarSign}
                label="SALARY RANGE"
                value={formatSalaryRange(
                  jobData?.data.salaryMin || 0,
                  jobData?.data.salaryMax || 0,
                )}
              />
            </div>

            {!submitted ? (
              <JobApplyForm
                form={form}
                EXPERIENCE_OPTIONS={EXPERIENCE_OPTIONS}
                handleFileChange={handleFileChange}
                formatFileSize={formatFileSize}
                handleRemoveFile={handleRemoveFile}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                resumeFile={resumeFile}
              />
            ) : (
              <ApplySuccessMessage />
            )}
          </div>

          <JobRequirementsSidebar jobData={jobData?.data} />
        </div>
      </div>
    </div>
  );
};

export default ApplyJobView;
