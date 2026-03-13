"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  Briefcase,
  Building,
  Calendar,
  Globe,
  Heart,
  MapPin,
  Rocket,
  Share2,
  Shield,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CompanyDetails } from "../../app/(main)/companies/[slug]/page";
import CompanyDetailsSidebar from "../../components/main/company/companyDetails/CompanyDetailsSidebar";
import getIconComponent from "../../helper/getIconComponent";

interface CompanyDetailsViewProps {
  companyDetails: CompanyDetails | null;
}

const CompanyDetailsView = ({ companyDetails }: CompanyDetailsViewProps) => {
  console.log(companyDetails, "companyDetails");
  //* infinite scroll state for jobs start here =============>
  const [visibleJobsCount, setVisibleJobsCount] = useState(4);
  const jobsPerLoad = 4;
  //* infinite scroll state for jobs end here =============<

  const { icon: CategoryIcon, color: iconBgColor } = getIconComponent(
    companyDetails?.industry?.icon || "Briefcase",
  );

  const VALUE_OPTIONS = [
    {
      value: "Innovation",
      icon: Zap,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-200 dark:border-blue-900/50",
    },
    {
      value: "Collaboration",
      icon: Users,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      borderColor: "border-emerald-200 dark:border-emerald-900/50",
    },
    {
      value: "Customer First",
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-50 dark:bg-rose-950/30",
      borderColor: "border-rose-200 dark:border-rose-900/50",
    },
    {
      value: "Excellence",
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      borderColor: "border-amber-200 dark:border-amber-900/50",
    },
    {
      value: "Integrity",
      icon: Shield,
      color: "text-violet-500",
      bgColor: "bg-violet-50 dark:bg-violet-950/30",
      borderColor: "border-violet-200 dark:border-violet-900/50",
    },
    {
      value: "Agility",
      icon: Zap,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
      borderColor: "border-cyan-200 dark:border-cyan-900/50",
    },
    {
      value: "Impact",
      icon: Target,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      borderColor: "border-orange-200 dark:border-orange-900/50",
    },
    {
      value: "Growth",
      icon: Rocket,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      borderColor: "border-indigo-200 dark:border-indigo-900/50",
    },
  ] as const;

  const getValueMetadata = (valueName: string) => {
    const option = VALUE_OPTIONS.find(
      (opt) => opt.value.toLowerCase() === valueName.toLowerCase(),
    );
    return {
      icon: option?.icon || Target,
      color: option?.color || "text-emerald-500",
      bgColor: option?.bgColor || "bg-emerald-50 dark:bg-emerald-950/30",
      borderColor:
        option?.borderColor || "border-emerald-200 dark:border-emerald-900/50",
    };
  };

  if (!companyDetails) {
    return (
      <div className="bg-primary/2 min-h-screen md:pt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-secondary-foreground">Company not found.</p>
        </div>
      </div>
    );
  }

  // const foundedYear = new Date(companyDetails.createdAt).getFullYear();
  const websiteDisplay = companyDetails.websiteUrl?.replace(/^https?:\/\//, "");

  const transformedJobs =
    companyDetails.jobs?.map((job) => ({
      id: job.id,
      title: job.title,
      department: job.experienceLevel,
      type: job.jobType,
      location: job.location,
      salary:
        job.salaryMin && job.salaryMax
          ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${job.currency}`
          : undefined,
      posted: new Date(job.createdAt).toLocaleDateString(),
    })) || [];

  //* infinite scroll logic start ==========================>
  const hasMoreJobs = companyDetails.jobs
    ? visibleJobsCount < companyDetails.jobs.length
    : false;

  const loadMoreJobs = () => {
    setVisibleJobsCount((prev) => prev + jobsPerLoad);
  };

  const visibleJobs =
    companyDetails.jobs?.slice(0, visibleJobsCount).map((job) => ({
      id: job.id,
      title: job.title,
      department: job.experienceLevel,
      type: job.jobType,
      location: job.location,
      salary:
        job.salaryMin && job.salaryMax
          ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${job.currency}`
          : undefined,
      posted: new Date(job.createdAt).toLocaleDateString(),
    })) || [];

  //* infinite scroll logic end ==========================<

  return (
    <div className="bg-background min-h-screen">
      {/* Dynamic Banner Section */}
      <div className="relative h-64 w-full overflow-hidden lg:h-80">
        <Image
          src={companyDetails.coverUrl || "/placeholder-banner.jpg"}
          alt={`${companyDetails.name} banner`}
          fill
          className="object-cover"
          priority
        />
        <div className="from-background via-background/40 absolute inset-0 bg-linear-to-t to-transparent" />
      </div>

      <div className="relative mx-auto -mt-32 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Premium Header Card */}
            <Card className="border-primary/10 bg-background/60 overflow-hidden border backdrop-blur-xl">
              <CardHeader className="p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="bg-card border-primary/10 relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border p-2 shadow-2xl sm:h-32 sm:w-32">
                      <Image
                        src={companyDetails.logoUrl || "/placeholder-logo.png"}
                        alt={`${companyDetails.name} logo`}
                        fill
                        className="rounded-2xl object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                            {companyDetails.name}
                          </h1>
                          {companyDetails.isVerified && (
                            <Badge className="border-none bg-emerald-500/10 text-emerald-600">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground flex items-center gap-2 text-lg font-medium">
                          <CategoryIcon
                            className={`h-5 w-5 ${iconBgColor.replace("bg-", "text-")}`}
                          />
                          {companyDetails?.industry?.name}
                        </p>
                      </div>

                      <div className="text-muted-foreground flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{companyDetails.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>
                            {companyDetails._count?.employees || 0} Employees
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Founded {companyDetails.founded || "Not specified"}
                          </span>
                        </div>
                        {companyDetails.websiteUrl && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <a
                              href={companyDetails.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors hover:underline"
                            >
                              {websiteDisplay}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl border border-white/5 bg-white/5 hover:bg-white/10"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl border border-white/5 bg-white/5 hover:bg-white/10"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* About Company */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  About {companyDetails.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {companyDetails.description && (
                  <div>
                    <h4 className="text-foreground mb-3 text-sm font-semibold tracking-wide uppercase">
                      Company Overview
                    </h4>
                    <p className="text-secondary-foreground leading-relaxed">
                      {companyDetails.description}
                    </p>
                  </div>
                )}

                {companyDetails.mission && (
                  <div>
                    <h4 className="text-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
                      Mission Statement
                    </h4>
                    <div className="bg-primary/5 border-primary/10 group relative overflow-hidden rounded-2xl border p-6">
                      <div className="relative z-10">
                        <p className="text-foreground/90 font-italic text-lg leading-relaxed italic">
                          &quot;{companyDetails.mission}&quot;
                        </p>
                      </div>
                      <Target className="text-primary/5 absolute -right-4 -bottom-4 h-24 w-24 rotate-12 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Core Values */}
            {companyDetails.values && companyDetails.values.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-rose-500" />
                      Core Values
                    </div>
                    <Badge
                      variant="secondary"
                      className="border-none bg-emerald-500/10 text-emerald-600"
                    >
                      Culture & Principles
                    </Badge>
                  </CardTitle>
                  <p className="text-muted-foreground mt-1 text-sm">
                    The beliefs that guide our {`team's`} conduct every day.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {companyDetails.values.map((val) => {
                      const meta = getValueMetadata(val);
                      const Icon = meta.icon;
                      return (
                        <div
                          key={val}
                          className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all hover:shadow-md ${meta.bgColor} ${meta.borderColor}`}
                        >
                          <div
                            className={`rounded-xl bg-white p-3 shadow-sm transition-transform group-hover:scale-110 dark:bg-black/20`}
                          >
                            <Icon className={`h-6 w-6 ${meta.color}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-foreground text-lg font-bold tracking-tight">
                              {val}
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              Fundamental principle driving our culture and how
                              we build products.
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Benefits & Perks */}
            {companyDetails.benefits && companyDetails.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Benefits & Perks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {companyDetails.benefits.map((benefit) => {
                      const { icon: BenefitIcon, color: iconBgColor } =
                        getIconComponent(benefit.icon);
                      return (
                        <div
                          key={benefit.id}
                          className="group hover:border-primary/20 flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/3 p-5 transition-all duration-300 hover:bg-white/5"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBgColor}/10 ${iconBgColor.replace("bg-", "text-")}`}
                            >
                              <BenefitIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-secondary-foreground font-semibold">
                                {benefit.title}
                              </h4>
                              <p className="text-foreground/50 text-xs font-medium tracking-wider uppercase">
                                {benefit.category}
                              </p>
                            </div>
                          </div>
                          {benefit.description && (
                            <p className="text-foreground/60 line-clamp-2 text-sm leading-relaxed">
                              {benefit.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Open Positions */}
            {transformedJobs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Open Positions ({transformedJobs.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <InfiniteScroll
                    dataLength={visibleJobs.length}
                    next={loadMoreJobs}
                    hasMore={hasMoreJobs}
                    loader={
                      <div className="mt-4 space-y-4">
                        {[...Array(2)].map((_, index) => (
                          <div
                            key={`loading-${index}`}
                            className="animate-pulse rounded-lg border border-gray-200 p-4"
                          >
                            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
                            <div className="mb-2 h-3 w-1/2 rounded bg-gray-200"></div>
                            <div className="h-3 w-1/4 rounded bg-gray-200"></div>
                          </div>
                        ))}
                      </div>
                    }
                    endMessage={
                      visibleJobs.length > 0 && (
                        <div className="py-6 text-center">
                          <p className="text-sm text-gray-500">
                            All {companyDetails.jobs.length} jobs loaded
                          </p>
                        </div>
                      )
                    }
                    scrollThreshold={0.8}
                    style={{ overflow: "visible" }}
                  >
                    <div className="space-y-4">
                      {visibleJobs.map((job) => (
                        <div
                          key={job.id}
                          className="hover:bg-primary/2 rounded-lg border border-gray-200 p-4 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-secondary-foreground mb-1 font-medium">
                                {job.title}
                              </h4>
                              <div className="text-foreground/60 mb-2 flex items-center gap-4 text-sm">
                                <span>{job.department}</span>
                                <span>•</span>
                                <span>{job.type}</span>
                                <span>•</span>
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-4 text-sm">
                                {job.salary && (
                                  <span className="font-medium text-green-600">
                                    {job.salary}
                                  </span>
                                )}
                                {job.posted && (
                                  <span className="text-secondary-foreground">
                                    Posted {job.posted}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary text-white"
                            >
                              Apply
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </InfiniteScroll>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <CompanyDetailsSidebar company={companyDetails} />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsView;
