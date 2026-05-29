import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Briefcase, Clock, Heart, MapPin } from "lucide-react";
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
          "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-5 transition-all duration-300",
          inDashboard
            ? "bg-card border-border/50"
            : "hover:border-primary/50 bg-card border-gray-100 dark:border-slate-800",
        )}
      >
        <CardContent className="flex flex-1 flex-col p-0">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 p-2 dark:bg-slate-800">
              {job?.company?.logo ? (
                <Image
                  src={job.company.logo}
                  alt={job.company.name}
                  className="h-full w-full object-contain"
                  width={48}
                  height={48}
                />
              ) : (
                <Briefcase className="text-primary/40 h-6 w-6" />
              )}
            </div>
            <HoverHint hint="Save job">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary h-8 w-8 rounded-full text-slate-400 transition-colors"
                onClick={() => handleJobSave(job?.id)}
              >
                <Heart
                  className={`h-4.5 w-4.5 ${job.isSaved ? "fill-rose-500 text-rose-500" : "text-slate-400"}`}
                />
              </Button>
            </HoverHint>
          </div>

          <div className="mb-1">
            <Link
              href={`/jobs/${job?.id}`}
              className="hover:text-primary transition-colors"
            >
              <h3 className="text-foreground line-clamp-1 text-base font-bold">
                {job?.title}
              </h3>
            </Link>
          </div>

          <p className="text-muted-foreground mb-3 text-xs font-medium">
            {job?.company?.name}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
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

          <div className="mb-4 flex flex-col gap-2 border-b border-gray-100 pb-4 dark:border-slate-800">
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <MapPin className="text-primary h-3.5 w-3.5 opacity-70" />
              <span className="truncate">{job?.location}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs capitalize">
              <Clock className="text-primary h-3.5 w-3.5 opacity-70" />
              <span>{job?.jobType.replace("_", " ").toLowerCase()}</span>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
            <div className="text-foreground text-sm font-bold sm:text-base sm:font-black">
              {job?.currency === "USD" ? "$" : job?.currency}
              {job?.salaryMin?.toLocaleString()} -{" "}
              {job?.salaryMax?.toLocaleString()}
            </div>
            <Link href={`/jobs/${job?.id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-primary/5 hover:text-primary h-8 rounded-full px-3 text-xs font-bold"
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
        "group relative overflow-hidden rounded-3xl border transition-all duration-300",
        inDashboard
          ? "bg-card border-border p-6"
          : "hover:border-primary/50 bg-card border-gray-100 px-3 py-5 md:px-12 md:py-14 dark:border-slate-800",
      )}
    >
      <CardContent className="p-0">
        <div className="flex flex-row gap-2 sm:items-center sm:gap-5">
          {/* Left: Company Logo/Icon */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 p-2 sm:h-16 sm:w-16 dark:bg-slate-800">
            {job?.company?.logo ? (
              <Image
                src={job.company.logo}
                alt={job.company.name}
                className="h-full w-full object-contain"
                width={48}
                height={48}
              />
            ) : (
              <Briefcase className="text-primary/40 h-8 w-8" />
            )}
          </div>

          {/* Middle: Job Info */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-1 sm:gap-2">
              <Link
                href={`/jobs/${job?.id}`}
                className="hover:text-primary transition-colors"
              >
                <h3 className="text-foreground truncate text-sm font-bold sm:text-lg">
                  {job?.title}
                </h3>
              </Link>
            </div>

            <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <MapPin className="text-primary h-3.5 w-3.5 opacity-70" />
                <span>{job?.location}</span>
              </div>
              <div className="flex items-center gap-1 capitalize sm:gap-1.5">
                <Clock className="text-primary h-3.5 w-3.5 opacity-70" />
                <span>{job?.jobType.replace("_", " ").toLowerCase()}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Briefcase className="text-primary h-3.5 w-3.5 opacity-70" />
                <span>
                  Published {new Date(job?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1 sm:gap-2">
              {job?.isFeatured && (
                <Badge
                  variant="default"
                  className="bg-primary/10 text-primary hover:bg-primary/20 rounded-md border-0 py-0 text-[10px] font-bold tracking-wider uppercase"
                >
                  Featured
                </Badge>
              )}
              {job?.isRemote && (
                <Badge
                  variant="secondary"
                  className="rounded-md border-0 bg-slate-100 py-0 text-[10px] font-bold tracking-wider text-slate-600 uppercase dark:bg-slate-800 dark:text-slate-300"
                >
                  Remote
                </Badge>
              )}
            </div>
          </div>

          {/* Right: Salary & Actions */}
          <div className="flex flex-col items-end gap-1 sm:gap-3 sm:text-right">
            <div className="flex items-center gap-2">
              <HoverHint hint="Save job">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 hover:text-primary h-9 w-9 rounded-full text-slate-400 transition-colors"
                  onClick={() => handleJobSave(job?.id)}
                >
                  <Heart
                    className={`h-5 w-5 ${job.isSaved ? "fill-rose-500 text-rose-500" : "text-gray-400"}`}
                  />
                </Button>
              </HoverHint>
            </div>

            <div className="text-foreground text-xs font-bold sm:text-xl sm:font-black">
              {job?.currency === "USD" ? "$" : job?.currency}
              {job?.salaryMin?.toLocaleString()} -{" "}
              {job?.salaryMax?.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
