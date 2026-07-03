import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ApplicationStatus, MyAppliedJob } from "@/types/application";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  MoreVertical,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const getStatusConfig = (status: ApplicationStatus) => {
  switch (status) {
    case "SUBMITTED":
      return {
        badge:
          "bg-yellow-500/10 text-yellow-600 border-yellow-200/50 dark:border-yellow-900/30",
        icon: Clock,
        label: "Submitted",
      };
    case "REVIEWING":
    case "SHORTLISTED":
      return {
        badge:
          "bg-blue-500/10 text-blue-600 border-blue-200/50 dark:border-blue-900/30",
        icon: AlertCircle,
        label: status === "SHORTLISTED" ? "Shortlisted" : "Reviewing",
      };
    case "INTERVIEWED":
      return {
        badge:
          "bg-purple-500/10 text-purple-600 border-purple-200/50 dark:border-purple-900/30",
        icon: Clock,
        label: "Interviewing",
      };
    case "OFFERED":
      return {
        badge:
          "bg-green-500/10 text-green-600 border-green-200/50 dark:border-green-900/30",
        icon: CheckCircle,
        label: "Offer Received",
      };
    case "ACCEPTED":
      return {
        badge:
          "bg-emerald-500/10 text-emerald-600 border-emerald-200/50 dark:border-emerald-900/30",
        icon: CheckCircle,
        label: "Accepted",
      };
    case "REJECTED":
      return {
        badge:
          "bg-red-500/10 text-red-600 border-red-200/50 dark:border-red-900/30",
        icon: XCircle,
        label: "Rejected",
      };
    case "WITHDRAWN":
      return {
        badge: "bg-muted text-muted-foreground border-border",
        icon: XCircle,
        label: "Withdrawn",
      };
    default:
      return {
        badge: "bg-muted text-muted-foreground border-border",
        icon: Clock,
        label: status,
      };
  }
};

const ApplicationCard = ({
  app,
  index = 0,
  isWithdrawing,
  onWithdraw,
}: {
  app: MyAppliedJob;
  index?: number;
  isWithdrawing?: boolean;
  onWithdraw?: (applicationId: string) => void;
}) => {
  const statusConfig = getStatusConfig(app.status);
  const StatusIcon = statusConfig.icon;
  const location = `${app.job.location}${app.job.isRemote ? " (Remote)" : ""}`;
  const salary = app.job.salaryMax
    ? `${app.job.currency || "$"}${Math.round(app.job.salaryMax / 1000)}k`
    : "Not disclosed";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="group hover:shadow-primary/10 border-border/40 bg-card/60 relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="from-primary/5 absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <CardContent className="relative p-6">
          <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="from-muted/50 to-muted border-border/60 group-hover:border-primary/40 relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border bg-linear-to-br p-0 shadow-inner transition-colors duration-300">
                    {app.job.company.logoUrl ? (
                      <Image
                        src={app.job.company.logoUrl}
                        alt={app.job.company.name}
                        className="h-full w-full rounded-2xl object-cover"
                        fill
                      />
                    ) : (
                      <Building2 className="text-muted-foreground/60 h-7 w-7" />
                    )}
                  </div>
                  <div className="border-background bg-card absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 shadow-sm">
                    <StatusIcon
                      className={statusConfig.badge.split(" ")[1] + " h-3 w-3"}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-foreground group-hover:text-primary text-xl leading-tight font-bold tracking-tight transition-colors">
                    {app.job.title}
                  </h3>
                  <p className="text-muted-foreground flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
                    {app.job.company.name}
                  </p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-muted/60 h-9 w-9 rounded-xl transition-colors"
                  >
                    <MoreVertical className="text-muted-foreground/50 h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border-border/60 w-56 rounded-xl p-2 backdrop-blur-xl"
                >
                  <DropdownMenuItem
                    asChild
                    className="h-10 rounded-lg font-medium"
                  >
                    <Link href={`/jobs/${app.job.id}`} className="w-full">
                      View Job
                    </Link>
                  </DropdownMenuItem>
                  {app.job.company.slug && (
                    <DropdownMenuItem
                      asChild
                      className="h-10 rounded-lg font-medium"
                    >
                      <Link
                        href={`/companies/${app.job.company.slug}`}
                        className="w-full"
                      >
                        Company Profile
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {onWithdraw && app.status !== "WITHDRAWN" && (
                    <DropdownMenuItem
                      disabled={isWithdrawing}
                      onClick={() => onWithdraw(app.id)}
                      className="text-destructive focus:text-destructive h-10 rounded-lg font-medium"
                    >
                      {isWithdrawing ? "Withdrawing..." : "Withdraw"}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Infographic Divider */}
            <div className="flex items-center gap-4 px-1">
              <div className="from-border/10 via-border/50 to-border/10 h-px flex-1 bg-linear-to-r" />
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-[13px]">
              <div className="text-muted-foreground/80 flex items-center gap-3 font-medium">
                <div className="bg-muted/30 flex h-8 w-8 items-center justify-center rounded-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                {location}
              </div>
              <div className="text-muted-foreground/80 flex items-center gap-3 font-medium">
                <div className="bg-muted/30 text-primary flex h-8 w-8 items-center justify-center rounded-lg">
                  <DollarSign className="h-4 w-4" />
                </div>
                <span className="text-foreground/90 font-bold">{salary}</span>
              </div>
              <div className="text-muted-foreground/80 flex items-center gap-3 font-medium">
                <div className="bg-muted/30 flex h-8 w-8 items-center justify-center rounded-lg">
                  <Clock className="h-4 w-4" />
                </div>
                {app.job.jobType.replaceAll("_", " ")}
              </div>
              <div className="text-muted-foreground/80 flex items-center gap-3 font-medium">
                <div className="bg-muted/30 flex h-8 w-8 items-center justify-center rounded-lg">
                  <Calendar className="h-4 w-4" />
                </div>
                {new Date(app.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>

            {/* Status \u0026 Action */}
            <div className="border-border/40 mt-2 flex items-center justify-between border-t pt-6">
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold shadow-sm transition-all",
                  statusConfig.badge,
                )}
              >
                <div
                  className={cn(
                    "h-1.5 w-1.5 animate-pulse rounded-full",
                    statusConfig.badge.split(" ")[1],
                  )}
                />
                {statusConfig.label}
              </div>

              <Button
                asChild
                variant="outline"
                className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 group/btn h-10 gap-2 rounded-xl px-5 text-xs font-bold transition-all"
              >
                <Link href={`/jobs/${app.job.id}`}>
                  View Details
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ApplicationCard;
