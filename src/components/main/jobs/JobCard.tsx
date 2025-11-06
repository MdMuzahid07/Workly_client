import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Clock, DollarSign, ExternalLink, Heart, MapPin } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useToggleSaveUnsaveJobMutation } from "../../../redux/feature/profile/profileApi";
import HoverHint from "../../shared/HoverHint";
import { Badge } from "../../ui/badge";

interface JobProps {
  job: {
    id: string;
    title: string;
    company: { name: string };
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
  };
}

const JobCard = ({ job }: JobProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [toggleSaveUnsaveJobMutation, { isLoading: isSaving }] =
    useToggleSaveUnsaveJobMutation();

  const handleJobSave = async (jobId: string) => {
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

  return (
    <Card
      className={`bg-primary/2 sm:bg-card w-full rounded-2xl border-0 shadow-none drop-shadow-none transition-all duration-200`}
    >
      <CardHeader className="px-0 pb-3 md:px-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              {job?.isFeatured && (
                <Badge
                  variant="secondary"
                  className="rounded-full text-xs font-medium"
                >
                  Featured
                </Badge>
              )}
              {job?.isRemote && (
                <Badge
                  variant="destructive"
                  className="rounded-full text-xs font-medium"
                >
                  Remote
                </Badge>
              )}
            </div>
            <h3 className="text-foreground mb-2 text-lg leading-tight font-semibold text-balance">
              {job?.title}
            </h3>
            <div className="text-muted-foreground flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
              <span className="font-medium">{job?.company?.name}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{job?.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(job?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0 md:px-4 md:pb-4">
        <div className="mb-4 flex items-center gap-2">
          <DollarSign className="text-primary h-4 w-4" />
          <span className="text-foreground text-lg font-semibold">
            {job?.currency} {job?.salaryMin} - {job?.salaryMax}
          </span>
          <span className="text-muted-foreground text-sm">
            {job?.jobType === "hourly" ? "/hour" : "fixed price"}
          </span>
        </div>

        <p className="text-foreground mb-4 text-sm leading-relaxed text-pretty">
          {job?.requirements}
        </p>

        <div className="flex flex-wrap gap-2">
          {job?.JobSkill?.map((skill) => (
            <Badge
              key={skill.id}
              variant="outline"
              className="bg-muted/50 hover:bg-muted rounded-full text-xs font-normal"
            >
              {skill.skillName}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-border border-b px-0 pb-7 md:border-t md:border-b-0 md:px-4 md:pt-4 md:pb-0">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex gap-2">
            <Button
              size="sm"
              className="cursor-pointer rounded-full font-medium"
            >
              Apply Now
            </Button>
            <Link href={`/jobs/${job?.id}`}>
              <Button
                size="sm"
                variant="outline"
                className="dark:hover:bg-primary dark:hover:text-background cursor-pointer rounded-full"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                View Details
              </Button>
            </Link>
          </div>
          <HoverHint hint="Save job">
            <Button
              size="sm"
              variant="ghost"
              className="cursor-pointer rounded-full p-2"
              onClick={() => handleJobSave(job?.id)}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Save job</span>
            </Button>
          </HoverHint>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
