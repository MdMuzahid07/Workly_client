"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Edit,
  Eye,
  FileText,
  MapPin,
  MoreVertical,
  TrendingUp,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useMemo } from "react";

interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logoUrl?: string;
    location: string;
    size?: string;
    industry?: string;
  };
  description?: string;
  requirements?: string;
  benefits?: string;
  discipline?: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  isRemote: boolean;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  postedAt: string;
  expiresAt?: string;
  applications: number;
  isFeatured: boolean;
  status?: "ACTIVE" | "DRAFT" | "CLOSED" | "ARCHIVED";
  skills?: string[];
  contactEmail?: string;
  pipelineStats?: {
    submitted: number;
    reviewing: number;
    shortlisted: number;
    interviewed: number;
    offered: number;
  };
}

interface JobDetailsSheetProps {
  job: Job;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ---------- Helpers ----------
function formatSalary(salaryMin?: number, salaryMax?: number): string {
  if (!salaryMin || !salaryMax) return "Competitive";
  return `$${(salaryMin / 1000).toFixed(0)}k - $${(salaryMax / 1000).toFixed(0)}k`;
}

function formatJobType(type: string): string {
  return type
    ?.split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join("-");
}

function getStatusBadge(status: Job["status"] | undefined): {
  label: string;
  className: string;
} | null {
  const normalized = status || "ACTIVE";
  const variants: Record<string, { label: string; className: string }> = {
    ACTIVE: {
      label: "Active",
      className: "bg-success text-success-foreground",
    },
    DRAFT: {
      label: "Draft",
      className: "bg-warning text-warning-foreground",
    },
    CLOSED: { label: "Closed", className: "bg-muted text-muted-foreground" },
    ARCHIVED: {
      label: "Archived",
      className: "bg-muted text-muted-foreground",
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

const JobDetailsSheet = ({ job, open, onOpenChange }: JobDetailsSheetProps) => {
  const statusBadge = useMemo(() => getStatusBadge(job.status), [job.status]);
  const salaryText = useMemo(
    () => formatSalary(job.salaryMin, job.salaryMax),
    [job.salaryMin, job.salaryMax],
  );
  const jobTypeText = useMemo(() => formatJobType(job.jobType), [job.jobType]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-0 sm:max-w-[600px] lg:max-w-[700px] [&>button]:hidden"
      >
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col">
            {/* Header */}
            <SheetHeader className="bg-muted/30 border-b px-6 py-5">
              <div className="flex items-start gap-4">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <div className="bg-primary/10 text-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <SheetTitle className="text-xl">{job.title}</SheetTitle>
                      {job.isFeatured && (
                        <Badge className="bg-accent text-accent-foreground">
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
                        {job.company.name}
                      </p>
                      <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                        {job.isRemote && (
                          <Badge variant="secondary" className="text-xs">
                            Remote
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Job
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Close Job
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetHeader>

            {/* Content */}
            <div className="flex-1 space-y-6 px-6 py-6">
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  label="Applications"
                  value={job.applications}
                  Icon={Users}
                  containerClassName="border-primary/20 bg-primary/5"
                  iconClassName="bg-primary/10 text-primary rounded-lg p-2"
                />
                <StatCard
                  label="Views"
                  value={"1,234"}
                  Icon={Eye}
                  containerClassName="border-success/20 bg-success/5"
                  iconClassName="bg-success/10 text-success rounded-lg p-2"
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
                  value={job.experienceLevel}
                  Icon={TrendingUp}
                />
                <IconInfoCard
                  label="Posted"
                  value={job.postedAt}
                  Icon={Calendar}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  className="bg-primary hover:bg-primary/90 flex-1"
                  size="lg"
                >
                  <Users className="mr-2 h-4 w-4" />
                  View Applications
                </Button>
                <Button variant="outline" size="lg">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>

              {job.pipelineStats && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Application Pipeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Submitted</span>
                        <span className="font-medium">
                          {job.pipelineStats.submitted}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Reviewing</span>
                        <span className="font-medium">
                          {job.pipelineStats.reviewing}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Shortlisted
                        </span>
                        <span className="font-medium">
                          {job.pipelineStats.shortlisted}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Interviewed
                        </span>
                        <span className="font-medium">
                          {job.pipelineStats.interviewed}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Offered</span>
                        <span className="font-medium">
                          {job.pipelineStats.offered}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Separator />

              {/* Job Description */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-semibold">
                  <FileText className="h-4 w-4" />
                  Job Description
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {job.description || "No description provided."}
                </p>
              </div>

              <Separator />

              {/* Requirements */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="h-4 w-4" />
                  Requirements
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {job.requirements || "No requirements specified."}
                </p>
              </div>

              {/* Skills */}
              {job.skills && job.skills.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h3 className="font-semibold">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="px-3 py-1"
                        >
                          {skill}
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
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {job.benefits || "No benefits information provided."}
                </p>
              </div>

              <Separator />

              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building2 className="h-4 w-4" />
                    About {job.company.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Industry</span>
                      <span className="font-medium">
                        {job.company.industry || "Not specified"}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Company Size
                      </span>
                      <span className="font-medium">
                        {job.company.size || "Not specified"}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">
                        {job.company.location}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="sm"
                  >
                    <Building2 className="mr-2 h-4 w-4" />
                    View Company Profile
                  </Button>
                </CardContent>
              </Card>

              {job.expiresAt && (
                <Card className="border-warning/20 bg-warning/5">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="text-warning h-4 w-4" />
                      <span className="text-sm font-medium">
                        Expires in {job.expiresAt}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default JobDetailsSheet;
