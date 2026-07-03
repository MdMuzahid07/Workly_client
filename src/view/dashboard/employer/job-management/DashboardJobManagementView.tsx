/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardCompanyJobsHeader from "@/components/dashboard/dashboard-nav/header/DashboardCompanyJobsHeader";
import JobFiltersAndSearch from "@/components/dashboard/job/JobFiltersAndSearch";
import JobManagementTabs from "@/components/dashboard/job/JobManagementTabs";
import JobStatusCards from "@/components/dashboard/job/JobStatusCards";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useDeleteJobMutation,
  useGetMyJobsQuery,
  useUpdateJobMutation,
} from "@/redux/feature/job/jobApi";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import debounce from "debounce";
import PaginationBar from "@/components/shared/PaginationBar";
import CreateNewJobForm from "@/components/dashboard/job/create-job-form";
import DeleteConfirmationModal from "@/components/shared/DeleteConfirmationModal";

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
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [currentEditStep, setCurrentEditStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteJob] = useDeleteJobMutation();
  const [updateJob] = useUpdateJobMutation();

  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [actionJobId, setActionJobId] = useState<string | null>(null);

  // Debounced search logic
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
      }, 500),
    [],
  );

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => debouncedSearch.clear();
  }, [debouncedSearch, searchValue]);

  // Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedType,
    selectedExperience,
    selectedLocation,
    activeTab,
  ]);

  const handleStatusChange = async (id: string, status: string) => {
    if (status === "CLOSED") {
      setActionJobId(id);
      setAlertOpen(true);
      return;
    }

    try {
      await updateJob({ id, status }).unwrap();
      toast.success(
        `Job ${status === "ACTIVE" ? "published" : "moved to draft"} successfully`,
      );
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources?.message ||
          error?.data?.message ||
          "Failed to update job status",
      );
    }
  };

  const handleEdit = (id: string) => {
    setEditingJobId(id);
    setCurrentEditStep(1);
  };

  const handleDelete = (id: string) => {
    setActionJobId(id);
    setDeleteModalOpen(true);
  };

  const confirmCloseAction = async () => {
    if (!actionJobId) return;

    try {
      await updateJob({ id: actionJobId, status: "CLOSED" }).unwrap();
      toast.success("Job closed successfully");
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources?.message ||
          error?.data?.message ||
          "Failed to close job",
      );
    }
    setAlertOpen(false);
    setActionJobId(null);
  };

  const confirmDeleteAction = async () => {
    if (!actionJobId) throw new Error("No job selected");
    await deleteJob(actionJobId).unwrap();
    setActionJobId(null);
  };

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {
      page: String(currentPage),
      limit: "10",
    };

    if (searchQuery) {
      params.search = searchQuery;
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
      const expMap: Record<string, string> = {
        "Entry-level": "Entry",
        "Mid-level": "Mid",
        Senior: "Senior",
        Lead: "Lead",
      };
      params.experienceLevel = expMap[selectedExperience] || selectedExperience;
    }

    if (selectedLocation === "remote") {
      params.isRemote = "true";
    } else if (selectedLocation === "onsite") {
      params.isRemote = "false";
    } else if (selectedLocation === "hybrid") {
      params.location = "hybrid";
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
    currentPage,
    searchQuery,
    selectedType,
    selectedExperience,
    selectedLocation,
    activeTab,
  ]);

  const { data: myJobsData, isLoading: jobsLoading } =
    useGetMyJobsQuery(queryParams);
  const { data: allJobsData } = useGetMyJobsQuery({ limit: "1000" });

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

  const allJobs = useMemo(() => {
    const apiJobs = (allJobsData?.data || []) as any[];
    return apiJobs.map((job) => ({
      id: job.id,
      status: mapStatusToDashboardStatus(job.status),
      applications: job._count?.applications ?? 0,
    }));
  }, [allJobsData]);

  const filteredJobs = jobs;

  return (
    <div className="min-h-screen pt-16">
      <DashboardCompanyJobsHeader
        onClose={() => setIsCreateModalOpen(false)}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        <JobStatusCards jobs={allJobs} />

        <Card className="bg-card rounded-xl border shadow-xs">
          <div className="border-border border-b p-4 sm:p-6">
            <div className="flex flex-col gap-1 sm:gap-2">
              <h2 className="text-foreground text-base font-bold tracking-tight sm:text-xl">
                All Job Postings
              </h2>
              <p className="text-muted-foreground text-xs font-medium opacity-80 sm:text-sm">
                Manage and track your job listings
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <JobFiltersAndSearch
              searchTerm={searchValue}
              setSearchTerm={setSearchValue}
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
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              allJobs={allJobs}
              isLoading={jobsLoading}
            />

            <PaginationBar
              meta={{
                page: myJobsData?.meta?.page || currentPage,
                limit: myJobsData?.meta?.limit || 10,
                total: myJobsData?.meta?.total || 0,
                pages: myJobsData?.meta?.pages || 0,
              }}
              onPageChange={setCurrentPage}
              className="mt-6 border-t pt-6"
            />
          </div>
        </Card>

        <Dialog
          open={!!editingJobId}
          onOpenChange={(open) => !open && setEditingJobId(null)}
        >
          <DialogContent className="bg-card max-h-[90vh] overflow-y-auto sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Edit Job Posting</DialogTitle>
              <DialogDescription>
                Update the details below to modify your job posting
              </DialogDescription>
            </DialogHeader>
            <CreateNewJobForm
              jobId={editingJobId as string}
              onClose={() => setEditingJobId(null)}
              currentStep={currentEditStep}
              onStepChange={setCurrentEditStep}
            />
          </DialogContent>
        </Dialog>

        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Close Job Posting</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to close this job posting? It will no
                longer be visible to candidates, but you can still view past
                applications.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmCloseAction}>
                Close Job
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DeleteConfirmationModal
          open={deleteModalOpen}
          onOpenChange={(open) => {
            setDeleteModalOpen(open);
            if (!open) setActionJobId(null);
          }}
          onConfirm={confirmDeleteAction}
          title="Delete Job Posting"
          description="Are you sure you want to delete this job posting? This action cannot be undone and will permanently remove the job and all its applications."
        />
      </div>
    </div>
  );
};

export default DashboardJobManagementView;
