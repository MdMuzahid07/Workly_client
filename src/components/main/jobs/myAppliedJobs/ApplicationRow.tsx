import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { ApplicationStatus, MyAppliedJob } from "@/types/application";
import { Building2, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const getStatusColor = (status: ApplicationStatus) => {
  switch (status) {
    case "SUBMITTED":
      return "bg-yellow-100/50 text-yellow-700 border-yellow-200/50 dark:bg-yellow-900/20 dark:text-yellow-500";
    case "REVIEWING":
    case "SHORTLISTED":
      return "bg-blue-100/50 text-blue-700 border-blue-200/50 dark:bg-blue-900/20 dark:text-blue-500";
    case "INTERVIEWED":
      return "bg-purple-100/50 text-purple-700 border-purple-200/50 dark:bg-purple-900/20 dark:text-purple-500";
    case "OFFERED":
      return "bg-green-100/50 text-green-700 border-green-200/50 dark:bg-green-900/20 dark:text-green-500";
    case "ACCEPTED":
      return "bg-emerald-100/50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-900/20 dark:text-emerald-500";
    case "REJECTED":
      return "bg-red-100/50 text-red-700 border-red-200/50 dark:bg-red-900/20 dark:text-red-500";
    case "WITHDRAWN":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const getStatusLabel = (status: ApplicationStatus) => {
  const labels: Record<ApplicationStatus, string> = {
    SUBMITTED: "Submitted",
    REVIEWING: "Reviewing",
    SHORTLISTED: "Shortlisted",
    INTERVIEWED: "Interviewing",
    REJECTED: "Rejected",
    OFFERED: "Offer Received",
    ACCEPTED: "Accepted",
    WITHDRAWN: "Withdrawn",
  };

  return labels[status];
};

export const ApplicationRow = ({
  app,
  isWithdrawing,
  onWithdraw,
}: {
  app: MyAppliedJob;
  isWithdrawing?: boolean;
  onWithdraw: (applicationId: string) => void;
}) => {
  const jobHref = `/jobs/${app.job.id}`;
  const companyHref = app.job.company.slug
    ? `/companies/${app.job.company.slug}`
    : undefined;
  const location = `${app.job.location}${app.job.isRemote ? " (Remote)" : ""}`;

  return (
    <TableRow className="group hover:bg-muted/40 border-none transition-colors">
      <TableCell className="py-4 pl-6">
        <div className="flex items-center gap-4">
          <div className="bg-muted text-muted-foreground group-hover:bg-background relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border p-1.5 text-[10px] font-semibold transition-colors">
            {app.job.company.logoUrl ? (
              <Image
                src={app.job.company.logoUrl}
                alt={app.job.company.name}
                className="h-full w-full object-contain"
                fill
              />
            ) : (
              <Building2 className="h-5 w-5 opacity-40" />
            )}
          </div>
          <div className="flex flex-col">
            <Link
              href={jobHref}
              className="text-foreground group-hover:text-primary text-sm font-bold transition-colors"
            >
              {app.job.title}
            </Link>
            <span className="text-muted-foreground text-[11px] font-medium tracking-tight uppercase">
              {app.job.company.name}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden py-4 md:table-cell">
        <span className="text-muted-foreground text-sm font-medium">
          {location}
        </span>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={`rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${getStatusColor(app.status)}`}
          >
            {getStatusLabel(app.status)}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="hidden py-4 text-right md:table-cell">
        <span className="text-muted-foreground text-sm font-semibold">
          {new Date(app.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </TableCell>
      <TableCell className="py-4 pr-6 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:bg-muted h-8 w-8 rounded-full p-0"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 rounded-xl p-2">
            <DropdownMenuItem
              asChild
              className="h-10 cursor-pointer rounded-lg font-medium"
            >
              <Link href={jobHref}>View Job</Link>
            </DropdownMenuItem>
            {companyHref && (
              <DropdownMenuItem
                asChild
                className="h-10 cursor-pointer rounded-lg font-medium"
              >
                <Link href={companyHref}>Company Details</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              disabled={app.status === "WITHDRAWN" || isWithdrawing}
              onClick={() => onWithdraw(app.id)}
              className="text-destructive focus:text-destructive h-10 cursor-pointer rounded-lg font-medium"
            >
              {isWithdrawing ? "Withdrawing..." : "Withdraw Application"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
