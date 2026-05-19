/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  FileText,
  MapPin,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useMemo } from "react";
import { useGetJobByIdQuery } from "../../../redux/feature/job/jobApi";

interface JobDetailsSheetProps {
  jobId: string;
  initialData: {
    title: string;
    company: string;
    location: string;
    status: string;
    isFeatured: boolean;
    isRemote: boolean;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ---------- Helpers ----------
function formatSalary(
  salaryMin?: number | null,
  salaryMax?: number | null,
  currency?: string | null,
): string {
  if (!salaryMin || !salaryMax) return "Competitive";
  return `${currency || "$"} ${salaryMin.toLocaleString()} - ${salaryMax.toLocaleString()}`;
}

function formatJobType(type: string | undefined): string {
  if (!type) return "N/A";
  return type
    ?.split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join("-");
}

function getStatusBadge(status: string | undefined): {
  label: string;
  className: string;
} | null {
  const normalized = status?.toUpperCase() || "ACTIVE";
  const variants: Record<string, { label: string; className: string }> = {
    ACTIVE: {
      label: "Active",
      className: "bg-green-100 text-green-700 border-0",
    },
    DRAFT: {
      label: "Draft",
      className: "bg-orange-100 text-orange-700 border-0",
    },
    CLOSED: {
      label: "Closed",
      className: "bg-gray-100 text-gray-700 border-0",
    },
    ARCHIVED: {
      label: "Archived",
      className: "bg-gray-100 text-gray-700 border-0",
    },
  };
  return variants[normalized] ?? null;
}

// ---------- UI Subcomponents ----------
function StatCard({
  label,
  value,
  Icon,
  containerClassName,
  iconClassName,
}: {
  label: string;
  value: string | number;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  containerClassName?: string;
  iconClassName?: string;
}) {
  return (
    <Card className={containerClassName}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={iconClassName}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function IconInfoCard({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string | number | undefined | null;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
          <Icon className="text-muted-foreground h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground text-xs">{label}</p>
          <p className="text-sm font-medium">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

const JobDetailsSheet = ({
  jobId,
  initialData,
  open,
  onOpenChange,
}: JobDetailsSheetProps) => {
  const { data: jobResponse, isLoading } = useGetJobByIdQuery(jobId, {
    skip: !open || !jobId,
  });

  const job = jobResponse?.data;

  const statusBadge = useMemo(
    () => getStatusBadge(job?.status || initialData.status),
    [job?.status, initialData.status],
  );

  const salaryText = useMemo(
    () => formatSalary(job?.salaryMin, job?.salaryMax, job?.currency),
    [job?.salaryMin, job?.salaryMax, job?.currency],
  );

  const jobTypeText = useMemo(
    () => formatJobType(job?.jobType || ""),
    [job?.jobType],
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-0 sm:max-w-[600px] lg:max-w-[700px] [&>button]:hidden"
      >
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col">
            <SheetHeader className="bg-muted/30 border-b px-6 py-5">
              <div className="flex items-start gap-4">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl border">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <SheetTitle className="text-xl">
                        {job?.title || initialData.title}
                      </SheetTitle>
                      {(job?.isFeatured ?? initialData.isFeatured) && (
                        <Badge className="border-0 bg-blue-100 text-blue-700">
                          Featured
                        </Badge>
                      )}
                      {statusBadge && (
                        <Badge className={statusBadge.className}>
                          {statusBadge.label}
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-foreground flex items-center gap-2 text-sm font-medium">
                        <Building2 className="h-4 w-4" />
                        {job?.company?.name || initialData.company}
                      </p>
                      <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {job?.location || initialData.location}
                        </span>
                        {(job?.isRemote ?? initialData.isRemote) && (
                          <Badge
                            variant="outline"
                            className="border-green-200 text-xs text-green-700"
                          >
                            Remote
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetHeader>

            {/* Content */}
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
              </div>
            ) : (
              <div className="flex-1 space-y-6 px-6 py-6">
                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    label="Applications"
                    value={job?.applyCount || 0}
                    Icon={Users}
                    containerClassName="border-primary/20 bg-primary/5"
                    iconClassName="bg-primary/10 text-primary rounded-lg p-2"
                  />
                  <StatCard
                    label="Views"
                    value={job?.viewCount || 0}
                    Icon={Eye}
                    containerClassName="border-green-100 bg-green-50"
                    iconClassName="bg-green-100 text-green-700 rounded-lg p-2"
                  />
                </div>

                {/* Job Meta */}
                <div className="grid grid-cols-2 gap-3">
                  <IconInfoCard
                    label="Type"
                    value={jobTypeText}
                    Icon={Briefcase}
                  />
                  <IconInfoCard
                    label="Salary"
                    value={salaryText}
                    Icon={DollarSign}
                  />
                  <IconInfoCard
                    label="Experience"
                    value={job?.experienceLevel}
                    Icon={TrendingUp}
                  />
                  <IconInfoCard
                    label="Posted"
                    value={
                      job?.createdAt
                        ? new Date(job.createdAt).toLocaleDateString()
                        : "N/A"
                    }
                    Icon={Calendar}
                  />
                </div>

                <Separator />

                {/* Job Description */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <FileText className="h-4 w-4" />
                    Job Description
                  </h3>
                  <div
                    className="text-muted-foreground prose prose-sm max-w-none text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: job?.description || "No description provided.",
                    }}
                  />
                </div>

                <Separator />

                {/* Requirements */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    Requirements
                  </h3>
                  {job?.requirements && job.requirements.length > 0 ? (
                    <ul className="list-disc space-y-1 pl-5">
                      {job.requirements.map((req: string, i: number) => (
                        <li key={i} className="text-muted-foreground text-sm">
                          {req}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm italic">
                      No requirements specified.
                    </p>
                  )}
                </div>

                {/* Skills */}
                {job?.JobSkill && job.JobSkill.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <h3 className="font-semibold">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {job.JobSkill.map((skill: any) => (
                          <Badge
                            key={skill.id}
                            variant="secondary"
                            className="flex items-center gap-1.5 px-3 py-1"
                          >
                            {skill.skillName}
                            <span className="text-[10px] opacity-60">
                              ({skill.experienceYears}y)
                            </span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                {/* Benefits */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Benefits & Perks</h3>
                  {job?.benefits && job.benefits.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit: string, i: number) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="border-green-100 bg-green-50/50 text-green-700"
                        >
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm italic">
                      No benefits information provided.
                    </p>
                  )}
                </div>

                <Separator />

                <Card className="border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Building2 className="h-4 w-4" />
                      About {job?.company?.name || initialData.company}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Industry</span>
                        <span className="font-medium">
                          {job?.industry?.name || "Not specified"}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Location</span>
                        <span className="font-medium">
                          {job?.location || job?.company?.location}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {job?.applicationDeadline && (
                  <Card className="border-warning/20 bg-warning/5">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="text-warning h-4 w-4" />
                        <span className="text-sm font-medium text-orange-700">
                          Deadline:{" "}
                          {new Date(
                            job.applicationDeadline,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default JobDetailsSheet;
