/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Crown, DollarSign, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import ApplyJobHeader from "../../components/main/jobs/applyJob/ApplyJobHeader";
import ApplySuccessMessage from "../../components/main/jobs/applyJob/ApplySuccessMessage";
import JobApplyForm from "../../components/main/jobs/applyJob/JobApplyForm";
import JobInfoCard from "../../components/main/jobs/applyJob/JobInfoCard";
import JobRequirementsSidebar from "../../components/main/jobs/applyJob/JobRequirementsSidebar";
import JobSummaryCard from "../../components/main/jobs/applyJob/JobSummaryCard";
import { Button } from "../../components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import {
  useCreateApplicationMutation,
  useGetMyApplicationSummaryQuery,
} from "../../redux/feature/application/applicationApi";
import { useGetJobByIdQuery } from "../../redux/feature/job/jobApi";
import { useGetProfileQuery } from "../../redux/feature/profile/profileApi";
import { useUploadResumeMutation } from "../../redux/feature/resume/resumeApi";
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

const applicationSchema = z
  .object({
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
    resumeUrl: z.string().optional().or(z.literal("")),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.resumeFile || data.resumeUrl, {
    message: "Please upload a new resume or select an existing one",
    path: ["resumeFile"],
  });

type ApplicationFormData = z.infer<typeof applicationSchema>;

const ApplyJobView = ({ jobId }: ApplyJobViewProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadResume, { isLoading: isUploadingResume }] =
    useUploadResumeMutation();
  const { data: summaryResponse } = useGetMyApplicationSummaryQuery({});
  const [createApplication, { isLoading: isCreatingApplication }] =
    useCreateApplicationMutation();

  const user = useAppSelector((state) => state.auth.user);
  const isPremium = user?.isPremium || false;
  const isJobSeeker = user?.role === "JOB_SEEKER";

  const monthlyCount = summaryResponse?.data?.monthlyCount || 0;
  const limitReached = !isPremium && isJobSeeker && monthlyCount >= 30;
  const closeToLimit = !isPremium && isJobSeeker && monthlyCount >= 25;
  const {
    data: jobData,
    isLoading: isJobLoading,
    isError: isJobError,
  } = useGetJobByIdQuery(jobId, {
    skip: !jobId,
  });
  const { data: profileResponse, isLoading: isProfileLoading } =
    useGetProfileQuery({});

  const userProfile = profileResponse?.data;
  const existingResumes = userProfile?.resumes || [];

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
      resumeUrl: "",
      agreeTerms: false,
    },
  });

  // Pre-fill form when profile is loaded
  useEffect(() => {
    if (userProfile) {
      form.reset({
        fullName: userProfile.fullName || "",
        email: userProfile.email || "",
        phone: userProfile.profile?.phone || "",
        location: userProfile.profile?.location || "",
        currentRole: userProfile.profile?.headline || "",
        experience:
          userProfile.profile?.totalExperienceYears?.toString() || "3",
        portfolio: userProfile.profile?.websiteUrl || "",
        coverLetter: "",
        resumeFile: undefined,
        resumeUrl:
          userProfile.resumes?.find((r: any) => r.isDefault)?.fileUrl || "",
        agreeTerms: false,
      });
    }
  }, [userProfile, form]);

  const handleSubmit = async (data: ApplicationFormData) => {
    try {
      setIsSubmitting(true);
      toast.loading("Submitting your application...", { id: "apply_job" });

      let finalResumeUrl = "";

      if (data.resumeFile) {
        const formData = new FormData();
        formData.append("file", data.resumeFile);
        const resumeResponse = await uploadResume(formData).unwrap();
        if (resumeResponse.success) {
          finalResumeUrl = resumeResponse.data.fileUrl;
        } else {
          throw new Error("Resume upload failed");
        }
      } else if (data.resumeUrl) {
        finalResumeUrl = data.resumeUrl;
      } else {
        toast.error("Please provide a resume", { id: "apply_job" });
        setIsSubmitting(false);
        return;
      }

      const payload = {
        ...data,
        jobId,
        resumeFile: finalResumeUrl,
      };

      const response = await createApplication(payload).unwrap();
      if (response.success) {
        toast.success("Application submitted successfully!", {
          id: "apply_job",
        });
        setSubmitted(true);
      }
    } catch (error: any) {
      console.error("Failed to submit application:", error);
      const message =
        error?.data?.errorSources?.message ||
        error?.data?.message ||
        error?.message ||
        "Failed to submit application";

      toast.error(message, { id: "apply_job" });
    } finally {
      setIsSubmitting(false);
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

  if (isJobLoading || isProfileLoading) {
    return <JobApplyViewSkeleton />;
  }

  if (isJobError || !jobData?.data) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center px-4 py-20">
        <div className="border-border bg-card max-w-md rounded-2xl border p-8 text-center shadow-sm">
          <h1 className="text-foreground text-2xl font-bold">
            Job unavailable
          </h1>
          <p className="text-muted-foreground mt-3 text-sm leading-6">
            This job is no longer accepting applications or is not published.
          </p>
          <Button asChild className="mt-6 rounded-xl px-6 font-bold">
            <Link href="/jobs">Browse active jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-10 pb-20">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:mt-10 lg:px-8">
        <ApplyJobHeader jobTitle={jobData?.data.title} />

        {/* Application Limit Warning */}
        {!isPremium && isJobSeeker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-6 overflow-hidden"
          >
            <div
              className={cn(
                "flex flex-col justify-between gap-4 rounded-2xl border-2 p-4 transition-all md:flex-row md:items-center",
                limitReached
                  ? "border-red-200 bg-red-50 text-red-900"
                  : "border-amber-200 bg-amber-50 text-amber-900",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "shrink-0 rounded-xl p-2",
                    limitReached ? "bg-red-100" : "bg-amber-100",
                  )}
                >
                  {limitReached ? (
                    <ShieldCheck className="h-5 w-5 text-red-600" />
                  ) : (
                    <Crown className="h-5 w-5 text-amber-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold">
                    {limitReached
                      ? "Monthly limit reached (30/30 applications)"
                      : `Application usage: ${monthlyCount}/30 this month`}
                  </p>
                  <p className="text-xs font-medium opacity-80">
                    {limitReached
                      ? "You've used all your free applications for this month. Upgrade to Premium for unlimited access."
                      : "Free users can apply for up to 30 jobs per month. Go Premium for unlimited applications."}
                  </p>
                </div>
              </div>
              {!isPremium && (
                <Button
                  asChild
                  size="sm"
                  variant={limitReached ? "destructive" : "outline"}
                  className="rounded-xl font-bold"
                >
                  <Link href="/pricing">Upgrade to Premium</Link>
                </Button>
              )}
            </div>
          </motion.div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
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
              <div
                className={cn(limitReached && "pointer-events-none opacity-50")}
              >
                <JobApplyForm
                  form={form}
                  EXPERIENCE_OPTIONS={EXPERIENCE_OPTIONS}
                  handleFileChange={handleFileChange}
                  formatFileSize={formatFileSize}
                  handleRemoveFile={handleRemoveFile}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  resumeFile={resumeFile}
                  existingResumes={existingResumes}
                />
                {limitReached && (
                  <div className="mt-4 text-center">
                    <p className="text-sm font-bold text-red-600">
                      You cannot apply for more jobs this month. Please upgrade
                      your plan.
                    </p>
                  </div>
                )}
              </div>
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
