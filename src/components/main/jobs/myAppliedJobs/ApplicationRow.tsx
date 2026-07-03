import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
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
      <TableCell className="py-3 pl-3 sm:py-4 sm:pl-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-muted text-muted-foreground group-hover:bg-background relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border p-0 text-[10px] font-semibold transition-colors sm:h-10 sm:w-10">
            {app.job.company.logoUrl ? (
              <Image
                src={app.job.company.logoUrl}
                alt={app.job.company.name}
                className="h-full w-full rounded-lg object-cover"
                fill
              />
            ) : (
              <Building2 className="h-4 w-4 opacity-40 sm:h-5 sm:w-5" />
            )}
          </div>
          <div className="flex min-w-0 flex-col">
            <Link
              href={jobHref}
              className="text-foreground group-hover:text-primary line-clamp-1 text-xs font-bold transition-colors sm:text-sm"
            >
              {app.job.title}
            </Link>
            <span className="text-muted-foreground line-clamp-1 text-[10px] font-medium tracking-tight uppercase sm:text-[11px]">
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
      <TableCell className="px-2 py-3 sm:px-4 sm:py-4">
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={`rounded-full border px-2.5 py-0.5 text-[9px] font-bold tracking-wider whitespace-nowrap uppercase sm:px-3 sm:py-1 sm:text-[10px] ${getStatusColor(app.status)}`}
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
      <TableCell className="py-3 pr-3 text-right sm:py-4 sm:pr-6">
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
          <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
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
            {(() => {
              const isWithdrawable =
                (app.status === "SUBMITTED" || app.status === "REVIEWING") &&
                !isWithdrawing;
              return (
                <DropdownMenuItem
                  onClick={(e) => {
                    if (!isWithdrawable) {
                      e.preventDefault();
                      return;
                    }
                    onWithdraw(app.id);
                  }}
                  className={cn(
                    "flex h-10 w-full items-center justify-between rounded-lg font-medium transition-colors",
                    isWithdrawable
                      ? "text-destructive focus:text-destructive hover:bg-destructive/5 focus:bg-destructive/5 cursor-pointer"
                      : "text-muted-foreground/50 focus:text-muted-foreground/50 pointer-events-none cursor-default opacity-60 select-none hover:bg-transparent focus:bg-transparent",
                  )}
                >
                  <span>
                    {isWithdrawing ? "Withdrawing..." : "Withdraw Application"}
                  </span>
                  {!isWithdrawable && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="bg-destructive/10 text-destructive hover:bg-destructive/20 ring-destructive/5 pointer-events-auto ml-2 flex h-5 w-5 shrink-0 cursor-help items-center justify-center rounded-full text-xs font-black ring-2 transition-all select-none"
                        >
                          !
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="left"
                        className="bg-destructive text-destructive-foreground pointer-events-auto max-w-[220px] rounded-lg border-none p-2.5 text-xs font-semibold shadow-xl"
                      >
                        {app.status === "WITHDRAWN"
                          ? "This application has already been withdrawn."
                          : "Cannot withdraw once shortlisted or processed by the employer."}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </DropdownMenuItem>
              );
            })()}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
