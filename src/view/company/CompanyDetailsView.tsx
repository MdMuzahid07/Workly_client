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
  Share2,
  Users,
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

  if (!companyDetails) {
    return (
      <div className="bg-primary/2 min-h-screen md:pt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-secondary-foreground">Company not found.</p>
        </div>
      </div>
    );
  }

  const foundedYear = new Date(companyDetails.createdAt).getFullYear();
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
    <div className="bg-primary/2 min-h-screen md:pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Company Banner */}
        <div className="relative mb-8 h-48 w-full overflow-hidden rounded-2xl md:h-64 lg:h-80">
          <Image
            src={companyDetails.coverUrl || "/placeholder.svg"}
            alt={`${companyDetails.name} banner`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Company Header */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-md">
              <CardHeader className="p-6 sm:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="relative h-24 w-24 shrink-0 sm:h-32 sm:w-32">
                    <Image
                      fill
                      src={companyDetails.logoUrl || "/placeholder.svg"}
                      alt={`${companyDetails.name} logo`}
                      className="bg-primary rounded-3xl object-cover shadow-2xl"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                          {companyDetails.name}
                        </h1>
                        {companyDetails.isVerified && (
                          <Badge
                            variant="default"
                            className="border-emerald-500/20 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                          >
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-foreground/70 flex items-center gap-2 text-lg font-medium">
                        <CategoryIcon
                          className={`h-5 w-5 ${iconBgColor.replace("bg-", "text-")}`}
                        />
                        {companyDetails?.industry?.name}
                      </p>
                    </div>

                    <div className="text-foreground/60 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{companyDetails.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{companyDetails.size} employees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Founded {foundedYear}</span>
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

                  <div className="flex items-center gap-2 self-start">
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
              <CardContent>
                <p className="text-secondary-foreground mb-6 leading-relaxed">
                  {companyDetails.description}
                </p>
              </CardContent>
            </Card>

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
