import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Bookmark, Briefcase, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useToggleSaveUnsaveJobMutation } from "../../../redux/feature/profile/profileApi";
import HoverHint from "../../shared/HoverHint";
import { Badge } from "../../ui/badge";

interface JobProps {
  job: {
    id: string;
    title: string;
    company: { name: string; logo?: string };
    location: string;
    salaryMin: number;
    salaryMax: number;
    currency: string;
    jobType: string;
    createdAt: string;
    requirements: string;
    JobSkill: Array<{ id: string; skillName: string }>;
    isFeatured: boolean;
    isRemote: boolean;
    isSaved?: boolean;
  };
  viewType?: "grid" | "list";
  inDashboard?: boolean;
}

const JobCard = ({ job, viewType = "list", inDashboard = false }: JobProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [toggleSaveUnsaveJobMutation, { isLoading: isSaving }] =
    useToggleSaveUnsaveJobMutation();

  const handleJobSave = async (jobId: string) => {
    try {
      toast.loading("Updating job status...", { id: "save_job" });
      const response = await toggleSaveUnsaveJobMutation(jobId).unwrap();
      if (response.success && response.data.action === "saved") {
        toast.success("Job saved successfully", { id: "save_job" });
      }
      if (response.success && response.data.action === "unsaved") {
        toast.success("Job unsaved successfully", { id: "save_job" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  if (viewType === "grid") {
    return (
      <Card
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-3 transition-all duration-300 sm:p-4 lg:p-5",
          inDashboard
            ? "bg-card border-border/50"
            : "hover:border-primary/50 bg-card border-gray-100 hover:shadow-sm dark:border-slate-800",
        )}
      >
        <CardContent className="flex flex-1 flex-col p-0">
          {/* Top row: logo + bookmark */}
          <div className="mb-2.5 flex items-start justify-between sm:mb-3 lg:mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 p-1.5 sm:h-10 sm:w-10 sm:p-2 lg:h-12 lg:w-12 dark:bg-slate-800">
              {job?.company?.logo ? (
                <Image
                  src={job.company.logo}
                  alt={job.company.name}
                  className="h-full w-full object-contain"
                  width={48}
                  height={48}
                />
              ) : (
                <Briefcase className="text-primary/40 h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </div>
            <HoverHint hint={job.isSaved ? "Unsave job" : "Save job"}>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 rounded-full transition-colors sm:h-8 sm:w-8",
                  job.isSaved
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "hover:bg-primary/10 hover:text-primary text-slate-400",
                )}
                onClick={() => handleJobSave(job?.id)}
              >
                <Bookmark
                  className={cn(
                    "h-3.5 w-3.5 transition-all duration-200 sm:h-4 sm:w-4",
                    job.isSaved ? "fill-primary" : "",
                  )}
                />
              </Button>
            </HoverHint>
          </div>

          {/* Title */}
          <Link
            href={`/jobs/${job?.id}`}
            className="hover:text-primary mb-0.5 transition-colors"
          >
            <h3 className="text-foreground line-clamp-1 text-sm leading-snug font-bold sm:text-base">
              {job?.title}
            </h3>
          </Link>

          {/* Company */}
          <p className="text-muted-foreground mb-2 text-[11px] font-medium sm:mb-2.5 sm:text-xs lg:mb-3">
            {job?.company?.name}
          </p>

          {/* Badges — only shown when present */}
          {(job?.isFeatured || job?.isRemote) && (
            <div className="mb-2 flex flex-wrap gap-1 sm:mb-2.5 lg:mb-4">
              {job?.isFeatured && (
                <Badge
                  variant="default"
                  className="bg-primary/10 text-primary rounded-md border-0 py-0 text-[9px] font-bold tracking-wider uppercase"
                >
                  Featured
                </Badge>
              )}
              {job?.isRemote && (
                <Badge
                  variant="secondary"
                  className="rounded-md border-0 bg-slate-100 py-0 text-[9px] font-bold tracking-wider text-slate-600 uppercase dark:bg-slate-800 dark:text-slate-300"
                >
                  Remote
                </Badge>
              )}
            </div>
          )}

          {/* Location & Type */}
          <div className="mb-2 flex flex-col gap-1 border-b border-gray-100 pb-2 sm:mb-3 sm:gap-1.5 sm:pb-3 lg:mb-4 lg:pb-4 dark:border-slate-800">
            <div className="text-muted-foreground flex items-center gap-1 text-[11px] sm:gap-1.5 sm:text-xs">
              <MapPin className="text-primary h-3 w-3 shrink-0 opacity-70 sm:h-3.5 sm:w-3.5" />
              <span className="truncate">{job?.location}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1 text-[11px] capitalize sm:gap-1.5 sm:text-xs">
              <Clock className="text-primary h-3 w-3 shrink-0 opacity-70 sm:h-3.5 sm:w-3.5" />
              <span>{job?.jobType.replace("_", " ").toLowerCase()}</span>
            </div>
          </div>

          {/* Salary + Details */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
            <div className="text-foreground text-xs font-bold whitespace-nowrap sm:text-sm lg:text-base lg:font-black">
              {job?.currency === "USD" ? "$" : job?.currency}
              {job?.salaryMin?.toLocaleString()}–
              {job?.salaryMax?.toLocaleString()}
            </div>
            <Link href={`/jobs/${job?.id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-primary/5 hover:text-primary h-7 rounded-full px-2.5 text-[11px] font-bold sm:h-8 sm:px-3 sm:text-xs"
              >
                Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-all duration-300",
        inDashboard
          ? "bg-card border-border p-6"
          : "hover:border-primary/50 bg-card border-gray-100 px-3 py-3 hover:shadow-sm sm:px-4 sm:py-3.5 md:px-5 md:py-4 lg:px-10 lg:py-8 dark:border-slate-800",
      )}
    >
      <CardContent className="p-0">
        <div className="flex flex-row items-start gap-2.5 sm:gap-3 md:gap-4 lg:gap-5">
          {/* Left: Company Logo/Icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50 p-1.5 sm:h-11 sm:w-11 sm:p-2 md:h-12 md:w-12 lg:h-16 lg:w-16 dark:bg-slate-800">
            {job?.company?.logo ? (
              <Image
                src={job.company.logo}
                alt={job.company.name}
                className="h-full w-full object-contain"
                width={48}
                height={48}
              />
            ) : (
              <Briefcase className="text-primary/40 h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
            )}
          </div>

          {/* Middle: Job Info */}
          <div className="min-w-0 flex-1">
            {/* Title row */}
            <Link
              href={`/jobs/${job?.id}`}
              className="hover:text-primary transition-colors"
            >
              <h3 className="text-foreground mb-0.5 truncate text-sm leading-snug font-bold sm:text-base lg:text-lg">
                {job?.title}
              </h3>
            </Link>
            <p className="text-muted-foreground mb-1 text-[11px] font-medium sm:text-xs lg:hidden">
              {job?.company?.name}
            </p>

            {/* Meta row */}
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] sm:text-xs lg:gap-x-4 lg:text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="text-primary h-3 w-3 opacity-70 lg:h-3.5 lg:w-3.5" />
                <span className="max-w-[100px] truncate sm:max-w-none">
                  {job?.location}
                </span>
              </div>
              <div className="flex items-center gap-1 capitalize">
                <Clock className="text-primary h-3 w-3 opacity-70 lg:h-3.5 lg:w-3.5" />
                <span>{job?.jobType.replace("_", " ").toLowerCase()}</span>
              </div>
              <div className="hidden items-center gap-1 sm:flex">
                <Briefcase className="text-primary h-3 w-3 opacity-70 lg:h-3.5 lg:w-3.5" />
                <span>
                  Published {new Date(job?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Badges */}
            {(job?.isFeatured || job?.isRemote) && (
              <div className="mt-1.5 flex flex-wrap gap-1 lg:mt-3 lg:gap-2">
                {job?.isFeatured && (
                  <Badge
                    variant="default"
                    className="bg-primary/10 text-primary hover:bg-primary/20 rounded-md border-0 py-0 text-[9px] font-bold tracking-wider uppercase lg:text-[10px]"
                  >
                    Featured
                  </Badge>
                )}
                {job?.isRemote && (
                  <Badge
                    variant="secondary"
                    className="rounded-md border-0 bg-slate-100 py-0 text-[9px] font-bold tracking-wider text-slate-600 uppercase lg:text-[10px] dark:bg-slate-800 dark:text-slate-300"
                  >
                    Remote
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Right: Salary & Actions */}
          <div className="flex shrink-0 flex-col items-end gap-1 lg:gap-3">
            <HoverHint hint={job.isSaved ? "Unsave job" : "Save job"}>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 rounded-full transition-colors sm:h-8 sm:w-8 lg:h-9 lg:w-9",
                  job.isSaved
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "hover:bg-primary/10 hover:text-primary text-slate-400",
                )}
                onClick={() => handleJobSave(job?.id)}
              >
                <Bookmark
                  className={cn(
                    "h-3.5 w-3.5 transition-all duration-200 sm:h-4 sm:w-4 lg:h-5 lg:w-5",
                    job.isSaved ? "fill-primary" : "",
                  )}
                />
              </Button>
            </HoverHint>

            <div className="text-foreground text-right text-xs font-bold whitespace-nowrap sm:text-sm lg:text-base lg:font-extrabold">
              {job?.currency === "USD" ? "$" : job?.currency}
              {job?.salaryMin?.toLocaleString()}–
              {job?.salaryMax?.toLocaleString()}
            </div>

            <Link
              href={`/jobs/${job?.id}`}
              className="hidden sm:block lg:hidden"
            >
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-primary/5 hover:text-primary h-6 rounded-full px-2.5 text-[11px] font-bold"
              >
                Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
