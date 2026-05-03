import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EMPLOYER_ROUTES } from "@/constants/employerRoutes";
import {
  humanizeJobOrApplicationStatus,
  jobStatusToBadgeVariant,
} from "@/lib/employerDashboardFormat";
import type { EmployerDashboardJobRow } from "@/types/employerDashboard";
import { formatDistanceToNow } from "date-fns";
import { FileText } from "lucide-react";
import Link from "next/link";
import { EmployerListRowSkeleton } from "./EmployerDashboardSkeleton";

type EmployerRecentJobsProps = {
  jobs: EmployerDashboardJobRow[];
  isLoading: boolean;
};

export function EmployerRecentJobs({
  jobs,
  isLoading,
}: EmployerRecentJobsProps) {
  return (
    <Card className="bg-card border">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">
          Recent Job Postings
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Latest job openings and their status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <EmployerListRowSkeleton rows={3} />
        ) : jobs.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No jobs yet. Post your first role to start receiving applications.
          </p>
        ) : (
          <ul className="space-y-3" aria-label="Recent job postings">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="hover:bg-muted/50 flex flex-col justify-between gap-3 rounded-xl border p-4 transition-colors sm:flex-row sm:items-center sm:gap-0"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="truncate text-sm font-bold sm:text-base">
                    {job.title}
                  </p>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    {job._count?.applications ?? 0} applications •{" "}
                    {job.createdAt
                      ? formatDistanceToNow(new Date(job.createdAt), {
                          addSuffix: true,
                        })
                      : "Recently posted"}
                  </p>
                </div>
                <Badge
                  variant={jobStatusToBadgeVariant(job.status)}
                  className="self-start rounded-full px-3 py-1 text-xs font-bold sm:self-center"
                >
                  {humanizeJobOrApplicationStatus(job.status)}
                </Badge>
              </li>
            ))}
          </ul>
        )}
        <Link href={EMPLOYER_ROUTES.jobs}>
          <Button variant="outline" className="w-full rounded-full font-bold">
            <FileText className="mr-2 h-4 w-4" aria-hidden />
            View All Jobs
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
