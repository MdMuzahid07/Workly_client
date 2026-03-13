"use client";

import DashboardCompanyJobsHeader from "@/components/dashboard/dashboard-nav/header/DashboardCompanyJobsHeader";
import JobFiltersAndSearch from "@/components/dashboard/job/JobFiltersAndSearch";
import JobManagementTabs from "@/components/dashboard/job/JobManagementTabs";
import JobStatusCards from "@/components/dashboard/job/JobStatusCards";
import { Card } from "@/components/ui/card";
import { useGetMyJobsQuery } from "@/redux/feature/job/jobApi";
import { useMemo, useState } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  applications: number;
  status: "active" | "closed" | "draft";
  postedDate: string;
  isRemote: boolean;
  isFeatured: boolean;
}

const mapJobTypeToLabel = (jobType: string | null | undefined) => {
  switch (jobType) {
    case "FULL_TIME":
      return "Full-time";
    case "PART_TIME":
      return "Part-time";
    case "CONTRACT":
      return "Contract";
    case "INTERNSHIP":
      return "Internship";
    case "FREELANCE":
      return "Freelance";
    case "REMOTE":
      return "Remote";
    default:
      return "Other";
  }
};

const mapStatusToDashboardStatus = (
  status: string | null | undefined,
): Job["status"] => {
  switch (status) {
    case "ACTIVE":
      return "active";
    case "DRAFT":
      return "draft";
    case "CLOSED":
    case "EXPIRED":
      return "closed";
    default:
      return "draft";
  }
};

const formatSalaryRange = (
  salaryMin?: number | null,
  salaryMax?: number | null,
  currency?: string | null,
) => {
  if (!salaryMin && !salaryMax) return "Not specified";
  const cur = currency || "BDT";
  if (salaryMin && salaryMax) {
    return `${cur} ${salaryMin.toLocaleString()} - ${salaryMax.toLocaleString()}`;
  }
  if (salaryMin) {
    return `${cur} ${salaryMin.toLocaleString()}+`;
  }
  return `${cur} up to ${salaryMax?.toLocaleString()}`;
};

const formatPostedDate = (
  createdAt?: string | Date | null,
  status?: string | null,
) => {
  if (status === "DRAFT" || !createdAt) return "Not published";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "Not published";
  return date.toLocaleDateString();
};

const DashboardJobManagementView = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};

    if (searchTerm) {
      params.search = searchTerm;
    }

    if (selectedType !== "all") {
      const typeMap: Record<string, string> = {
        "Full-time": "FULL_TIME",
        "Part-time": "PART_TIME",
        Contract: "CONTRACT",
        Internship: "INTERNSHIP",
      };
      const mapped = typeMap[selectedType];
      if (mapped) {
        params.jobType = mapped;
      }
    }

    if (selectedExperience !== "all") {
      params.experienceLevel = selectedExperience;
    }

    if (selectedLocation === "remote") {
      params.isRemote = "true";
    } else if (selectedLocation === "onsite") {
      params.isRemote = "false";
    }

    if (activeTab === "active") {
      params.status = "ACTIVE";
    } else if (activeTab === "draft") {
      params.status = "DRAFT";
    } else if (activeTab === "closed") {
      params.status = "CLOSED";
    }

    return params;
  }, [
    searchTerm,
    selectedType,
    selectedExperience,
    selectedLocation,
    activeTab,
  ]);

  const { data: myJobsData } = useGetMyJobsQuery(queryParams);

  const jobs: Job[] = useMemo(() => {
    const apiJobs = (myJobsData?.data || []) as {
      id: string;
      title: string;
      location: string;
      jobType: string;
      experienceLevel: string;
      salaryMin?: number | null;
      salaryMax?: number | null;
      currency?: string | null;
      status: string;
      createdAt?: string;
      isRemote: boolean;
      isFeatured: boolean;
      company?: { name?: string };
      _count?: { applications?: number };
    }[];

    return apiJobs.map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company?.name || "Unknown Company",
      location: job.location,
      type: mapJobTypeToLabel(job.jobType),
      experience: job.experienceLevel,
      salary: formatSalaryRange(job.salaryMin, job.salaryMax, job.currency),
      applications: job._count?.applications ?? 0,
      status: mapStatusToDashboardStatus(job.status),
      postedDate: formatPostedDate(job.createdAt, job.status),
      isRemote: job.isRemote,
      isFeatured: job.isFeatured,
    }));
  }, [myJobsData]);
  const filteredJobs = jobs;

  return (
    <div className="min-h-screen pt-16">
      <DashboardCompanyJobsHeader
        onClose={() => setIsCreateModalOpen(false)}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        <JobStatusCards jobs={jobs} />

        <Card className="bg-card rounded-xl border">
          <div className="border-border border-b p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-foreground text-lg font-bold tracking-tight sm:text-xl">
                All Job Postings
              </h2>
              <p className="text-muted-foreground text-sm font-medium opacity-80">
                Manage and track your job listings
              </p>
            </div>
          </div>

          <div className="p-6">
            <JobFiltersAndSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedExperience={selectedExperience}
              setSelectedExperience={setSelectedExperience}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />

            <JobManagementTabs
              jobs={jobs}
              filteredJobs={filteredJobs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardJobManagementView;
