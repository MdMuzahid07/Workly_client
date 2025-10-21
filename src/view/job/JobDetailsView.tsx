/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bookmark,
  Building,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Heart,
  MapPin,
  Share2,
  Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import JobDetailsSidebar from "../../components/main/jobs/jobDetails/JobDetailsSidebar";
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

  const [toggleSaveUnsaveJobMutation, { isLoading: isSaving }] =
    useToggleSaveUnsaveJobMutation();

  const handleJobSave = async () => {
    try {
      toast.loading("Updating job status...", { id: "save_job" });

      const response = await toggleSaveUnsaveJobMutation(jobId).unwrap();

      console.log(response);

      if (response.success && response.data.action === "saved") {
        toast.success("Job saved successfully", { id: "save_job" });
      }

      if (response.success && response.data.action === "unsaved") {
        toast.success("Job unsaved successfully", { id: "save_job" });
      }
    } catch (err) {
      toast.error("Failed to update job status", { id: "save_job" });
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
    <div className="bg-primary/2 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:mt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      {job.isFeatured && (
                        <Badge variant="default">Featured</Badge>
                      )}
                      {job.isRemote && (
                        <Badge variant="destructive">Remote</Badge>
                      )}
                    </div>
                    <CardTitle className="text-foreground mb-2 text-2xl font-bold">
                      {job.title}
                    </CardTitle>
                    <div className="text-foreground mb-4 flex flex-wrap items-center gap-2">
                      <div className="flex items-center">
                        <Building className="mr-2 h-4 w-4" />
                        <span className="font-medium">
                          {job.company?.name || "Company"}
                        </span>
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{getTimeAgo(job.createdAt)}</span>
                      </div>
                    </div>
                    <div className="text-foreground/80 flex flex-wrap items-center gap-4 text-sm">
                      {job.salaryMin && job.salaryMax && (
                        <div className="flex items-center">
                          <DollarSign className="mr-1 h-4 w-4" />
                          <span className="text-foreground/80 text-lg font-semibold">
                            {job.currency || "$"}
                            {job.salaryMin.toLocaleString()} -{" "}
                            {job.salaryMax.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        <span className="capitalize">
                          {job.jobType.replace(/_/g, " ").toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-foreground/80 leading-relaxed whitespace-pre-line">
                  {job.requirements}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 sm:grid-cols-2">
              {job.discipline && (
                <Card>
                  <CardHeader>
                    <CardTitle>Discipline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="text-base">
                      {job.discipline}
                    </Badge>
                  </CardContent>
                </Card>
              )}

              {job.experienceLevel && (
                <Card>
                  <CardHeader>
                    <CardTitle>Experience Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{job.experienceLevel}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {job.JobSkill && job.JobSkill.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.JobSkill.map((skill: any) => (
                      <Badge
                        key={skill.id}
                        variant={skill.isRequired ? "default" : "secondary"}
                        className={
                          skill.isRequired
                            ? "bg-primary text-card"
                            : "text-foreground/80"
                        }
                      >
                        {skill.skillName}
                        {skill.experienceYears > 0 && (
                          <span className="ml-1 text-xs opacity-80">
                            ({skill.experienceYears}+ yrs)
                          </span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {job.Benefits && job.Benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.Benefits.map((benefit: any) => (
                      <li key={benefit.id} className="flex items-start">
                        <span className="bg-primary mt-2 mr-3 h-2 w-2 rounded-full"></span>
                        <div className="flex-1">
                          <p className="text-foreground/90 font-medium">
                            {benefit.title}
                          </p>
                          {benefit.description && (
                            <p className="text-foreground/60 mt-1 text-sm">
                              {benefit.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Application Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {job.contactEmail && (
                  <p className="text-foreground/70">
                    <span className="font-medium">Contact Email:</span>{" "}
                    <a
                      href={`mailto:${job.contactEmail}`}
                      className="text-primary hover:underline"
                    >
                      {job.contactEmail}
                    </a>
                  </p>
                )}
                {job.applicationDeadline && (
                  <p className="text-foreground/70">
                    <span className="font-medium">Application Deadline:</span>{" "}
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                  </p>
                )}
                {job.maxApplications && (
                  <p className="text-foreground/60 text-sm">
                    Maximum applications: {job.maxApplications}
                  </p>
                )}
                <div className="text-foreground/60 mt-4 flex items-center gap-2 text-sm">
                  <span className="flex items-center gap-0.5">
                    <Eye className="mr-1 h-4 w-4" /> {job.viewCount || 0} views
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <FileText className="mr-1 h-4 w-4" /> {job.applyCount || 0}{" "}
                    applications
                  </span>
                </div>
              </CardContent>
            </Card>
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
