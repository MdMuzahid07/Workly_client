"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase } from "lucide-react";
import DashboardJobCard from "./DashboardJobCard";

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

interface JobManagementTabsProps {
  jobs: Job[];
  filteredJobs: Job[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
  allJobs?: Array<Pick<Job, "id" | "status" | "applications">>;
  isLoading?: boolean;
}

const JobManagementTabs = ({
  jobs,
  filteredJobs,
  activeTab,
  setActiveTab,
  onEdit,
  onDelete,
  onStatusChange,
  allJobs,
  isLoading,
}: JobManagementTabsProps) => {
  const getJobsByStatus = (status: string) => {
    if (status === "all") return filteredJobs;
    return filteredJobs.filter((job) => job.status === status);
  };

  const jobsToCount = allJobs || jobs;
  const activeCount = jobsToCount.filter(
    (job) => job.status === "active",
  ).length;
  const closedCount = jobsToCount.filter(
    (job) => job.status === "closed",
  ).length;
  const draftCount = jobsToCount.filter((job) => job.status === "draft").length;
  const totalCount = jobsToCount.length;

  const renderJobCard = (job: Job) => (
    <DashboardJobCard
      key={job.id}
      job={job}
      onEdit={onEdit}
      onDelete={onDelete}
      onStatusChange={onStatusChange}
    />
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-4 border p-0 lg:w-auto">
        <TabsTrigger value="all" className="gap-2">
          All Jobs
          <Badge variant="secondary" className="ml-1">
            {totalCount}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="active" className="gap-2">
          Active
          <Badge variant="secondary" className="ml-1">
            {activeCount}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="draft" className="gap-2">
          Draft
          <Badge variant="secondary" className="ml-1">
            {draftCount}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="closed" className="gap-2">
          Closed
          <Badge variant="secondary" className="ml-1">
            {closedCount}
          </Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        {getJobsByStatus("all").length === 0 ? (
          <div className="border-border bg-muted/50 rounded-lg border border-dashed p-12 text-center">
            <Briefcase className="text-muted-foreground mx-auto h-12 w-12" />
            <h3 className="text-foreground mt-4 text-lg font-semibold">
              No jobs found
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          getJobsByStatus("all").map(renderJobCard)
        )}
      </TabsContent>

      <TabsContent value="active" className="space-y-4">
        {getJobsByStatus("active").length === 0 ? (
          <div className="border-border bg-muted/50 rounded-lg border border-dashed p-12 text-center">
            <Briefcase className="text-muted-foreground mx-auto h-12 w-12" />
            <h3 className="text-foreground mt-4 text-lg font-semibold">
              No active jobs
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Publish a draft or create a new job posting
            </p>
          </div>
        ) : (
          getJobsByStatus("active").map(renderJobCard)
        )}
      </TabsContent>

      <TabsContent value="draft" className="space-y-4">
        {getJobsByStatus("draft").length === 0 ? (
          <div className="border-border bg-muted/50 rounded-lg border border-dashed p-12 text-center">
            <Briefcase className="text-muted-foreground mx-auto h-12 w-12" />
            <h3 className="text-foreground mt-4 text-lg font-semibold">
              No draft jobs
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Create a new job posting to get started
            </p>
          </div>
        ) : (
          getJobsByStatus("draft").map(renderJobCard)
        )}
      </TabsContent>

      <TabsContent value="closed" className="space-y-4">
        {getJobsByStatus("closed").length === 0 ? (
          <div className="border-border bg-muted/50 rounded-lg border border-dashed p-12 text-center">
            <Briefcase className="text-muted-foreground mx-auto h-12 w-12" />
            <h3 className="text-foreground mt-4 text-lg font-semibold">
              No closed jobs
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Closed job postings will appear here
            </p>
          </div>
        ) : (
          getJobsByStatus("closed").map(renderJobCard)
        )}
      </TabsContent>
    </Tabs>
  );
};

export default JobManagementTabs;
