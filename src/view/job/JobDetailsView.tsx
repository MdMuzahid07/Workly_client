/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  Building,
  Clock,
  DollarSign,
  FileText,
  Globe,
  Heart,
  MapPin,
  Share2,
  Shield,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import JobDetailsSidebar from "../../components/main/jobs/jobDetails/JobDetailsSidebar";
import getIconComponent from "../../helper/getIconComponent";
import getTimeAgo from "../../helper/getTimeAgo";
import { useGetJobByIdQuery } from "../../redux/feature/job/jobApi";
import { useToggleSaveUnsaveJobMutation } from "../../redux/feature/profile/profileApi";
import JobDetailsSkeleton from "../../skeleton/job/JobDetailsSkeleton";

const JobDetailsView = () => {
  const params = useParams();
  const jobId = params.id as string;

  const {
    data: response,
    isLoading,
    error,
  } = useGetJobByIdQuery(jobId, {
    skip: !jobId,
  });

  console.log(response);

  const [toggleSaveUnsaveJobMutation, { isLoading: isSaving }] =
    useToggleSaveUnsaveJobMutation();

  const handleJobSave = async () => {
    try {
      toast.loading("Updating job status...", { id: "save_job" });

      const response = await toggleSaveUnsaveJobMutation(jobId).unwrap();

      if (response.success && response.data.action === "saved") {
        toast.success("Job saved successfully", { id: "save_job" });
      }

      if (response.success && response.data.action === "unsaved") {
        toast.success("Job unsaved successfully", { id: "save_job" });
      }
    } catch (err: any) {
      toast.error(
        err?.data?.errorSources?.message ||
          err?.data?.message ||
          "Failed to update job status",
        { id: "save_job" },
      );
      console.error("Failed to save/unsave job:", err);
    }
  };

  if (isLoading) {
    return <JobDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-destructive text-lg">
          Error loading job details. Please try again.
        </div>
      </div>
    );
  }

  if (!response?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Job not found</div>
      </div>
    );
  }

  const job = response.data || {};

  return (
    <div className="bg-background min-h-screen">
      {/* Dynamic Banner Section */}
      <div className="relative h-64 w-full overflow-hidden lg:h-80">
        <Image
          src={job.company?.coverUrl || "/placeholder-banner.jpg"}
          alt={job.title}
          fill
          className="object-cover"
          priority
        />
        <div className="from-background via-background/40 absolute inset-0 bg-linear-to-t to-transparent" />
      </div>

      <div className="relative mx-auto -mt-32 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Premium Header Card */}
            <Card className="border-primary/10 bg-background/60 overflow-hidden border backdrop-blur-xl">
              <CardHeader className="p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="bg-card border-primary/10 relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border p-2 shadow-2xl md:h-24 md:w-24">
                      <Image
                        src={job.company?.logoUrl || "/placeholder-logo.png"}
                        alt={job.company?.name}
                        fill
                        className="rounded-2xl object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {job.isFeatured && (
                          <Badge className="border-none bg-amber-500/10 text-amber-600">
                            Featured
                          </Badge>
                        )}
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary border-none"
                        >
                          {job.jobType?.replace(/_/g, " ").toLowerCase() ||
                            "Full Time"}
                        </Badge>
                        {job.isRemote && (
                          <Badge
                            variant="destructive"
                            className="border-none bg-rose-500/10 text-rose-600"
                          >
                            Remote
                          </Badge>
                        )}
                      </div>
                      <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
                        {job.title}
                      </h1>
                      <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
                        <div className="flex items-center gap-1.5">
                          <Building className="h-4 w-4" />
                          <span className="text-foreground font-semibold">
                            {job.company?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>{getTimeAgo(job.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl border-gray-200"
                      onClick={handleJobSave}
                      disabled={isSaving}
                    >
                      <Heart
                        className={`h-5 w-5 ${job.isSaved ? "fill-rose-500 text-rose-500" : "text-gray-400"}`}
                      />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl border-gray-200"
                    >
                      <Share2 className="h-5 w-5 text-gray-400" />
                    </Button>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-primary/5 flex items-center gap-3 rounded-2xl p-4">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
                      <DollarSign className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                        Salary Range
                      </p>
                      <p className="text-foreground font-bold">
                        {job.currency || "$"}
                        {job.salaryMin?.toLocaleString()} -{" "}
                        {job.salaryMax?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="bg-primary/5 flex items-center gap-3 rounded-2xl p-4">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
                      <Users className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                        Experience
                      </p>
                      <p className="text-foreground font-bold">
                        {job.experienceLevel || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-primary/5 flex items-center gap-3 rounded-2xl p-4">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
                      <FileText className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                        Deadline
                      </p>
                      <p className="text-foreground font-bold">
                        {job.applicationDeadline
                          ? new Date(
                              job.applicationDeadline,
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Job Content Sections */}
            <div className="space-y-6">
              {/* Description */}
              <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="text-primary h-5 w-5" />
                    Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-foreground/80 leading-relaxed wrap-break-word whitespace-pre-line">
                    {job.description}
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="text-primary h-5 w-5" />
                      Requirements & Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {job.requirements.map((req: string, index: number) => (
                        <li
                          key={index}
                          className="bg-primary/5 flex items-start gap-3 rounded-xl p-4"
                        >
                          <div className="bg-primary/20 mt-1 flex h-2 w-2 shrink-0 rounded-full" />
                          <span className="text-foreground/80 text-sm leading-relaxed wrap-break-word">
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Required Skills */}
              {job.JobSkill && job.JobSkill.length > 0 && (
                <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="text-primary h-5 w-5" />
                      Required Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {job.JobSkill.map((skill: any) => (
                        <div
                          key={skill.id}
                          className={`flex items-center gap-2 rounded-xl border px-4 py-2 transition-all hover:shadow-md ${
                            skill.isRequired
                              ? "bg-primary/10 border-primary/20 text-primary"
                              : "bg-secondary/50 border-secondary-foreground/10 text-muted-foreground"
                          }`}
                        >
                          <span className="font-semibold">
                            {skill.skillName}
                          </span>
                          {skill.experienceYears > 0 && (
                            <Badge
                              variant="outline"
                              className="h-5 border-current/20 bg-current/5 px-1.5 text-[10px] lowercase"
                            >
                              {skill.experienceYears}+ years
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Benefits & Perks */}
              {(job.Benefits?.length > 0 || job.benefits?.length > 0) && (
                <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="text-primary h-5 w-5" />
                      Benefits & Perks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {job.Benefits?.length > 0
                        ? job.Benefits.map((benefit: any) => {
                            const { icon: Icon, color } = getIconComponent(
                              benefit.icon,
                            );
                            return (
                              <div
                                key={benefit.id}
                                className="bg-primary/5 hover:bg-primary/10 flex items-start gap-4 rounded-2xl p-4 transition-all"
                              >
                                <div
                                  className={`${color} flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white`}
                                >
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="text-foreground leading-tight font-bold">
                                    {benefit.title}
                                  </h4>
                                  <p className="text-muted-foreground mt-1 text-xs">
                                    {benefit.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        : job.benefits.map((benefit: string, index: number) => (
                            <div
                              key={index}
                              className="bg-primary/5 flex items-start gap-3 rounded-xl p-4"
                            >
                              <div className="bg-primary/20 mt-1 flex h-2 w-2 shrink-0 rounded-full" />
                              <span className="text-foreground/80 text-sm">
                                {benefit}
                              </span>
                            </div>
                          ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* About Company Summary */}
              <Card className="border-primary/10 bg-background/50 overflow-hidden border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="text-primary h-5 w-5" />
                    About the Company
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80 line-clamp-3 leading-relaxed wrap-break-word">
                    {job.company?.description ||
                      "High-growth company looking for exceptional talent."}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    {job.company?._count?.employees && (
                      <div className="flex items-center gap-1.5 text-sm font-medium">
                        <Users className="text-primary h-4 w-4" />
                        <span>{job.company._count.employees}+ Employees</span>
                      </div>
                    )}
                    {job.company?.websiteUrl && (
                      <div className="flex items-center gap-1.5 text-sm font-medium">
                        <Globe className="text-primary h-4 w-4" />
                        <a
                          href={job.company.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          Website
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <JobDetailsSidebar
            job={job}
            onSave={handleJobSave}
            isSaving={isSaving}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsView;
