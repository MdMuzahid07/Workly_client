/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bookmark,
  Building,
  Calendar,
  Filter,
  Search,
  Share2,
} from "lucide-react";
import { useState } from "react";
import JobCard from "../../components/main/jobs/JobCard";
import EmptyState from "../../components/main/saved-jobs/EmptyState";
import ErrorState from "../../components/main/saved-jobs/ErrorState";
import LoadingState from "../../components/main/saved-jobs/LoadingState";
import StatsCards from "../../components/main/saved-jobs/StatsCards";
import { useGetSavedJobsQuery } from "../../redux/feature/profile/profileApi";

const SearchFilterSection = ({
  searchTerm,
  onSearchChange,
  companies,
  selectedCompanies,
  onCompanyToggle,
}: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  companies: string[];
  selectedCompanies: string[];
  onCompanyToggle: (company: string) => void;
}) => (
  <Card className="mb-6">
    <CardContent className="p-4">
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
          <Input
            placeholder="Search in your saved jobs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Company Filters */}
        {companies.length > 0 && (
          <div className="flex gap-2 overflow-x-auto">
            <Button variant="outline" className="gap-2 whitespace-nowrap">
              <Filter className="h-4 w-4" />
              Companies
            </Button>
            {companies.map((company) => (
              <Badge
                key={company}
                variant={
                  selectedCompanies.includes(company) ? "default" : "outline"
                }
                className="cursor-pointer whitespace-nowrap"
                onClick={() => onCompanyToggle(company)}
              >
                <Building className="mr-1 h-3 w-3" />
                {company}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

const SavedJobsView = () => {
  const {
    data: savedJobsData,
    isLoading,
    error,
  } = useGetSavedJobsQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  // =======  extract and transform data ========>
  const savedJobs = savedJobsData?.data || [];
  // ===== ensure jobs is typed as an array and guard savedJobs shape =========>
  const jobs: any[] = (savedJobs as any[]).map((savedJob: any) => savedJob.job);

  // ====== get unique companies (ensure we only keep string names)=====>
  const companies: string[] = Array.from(
    new Set(
      jobs
        .map((job: any) => job?.company?.name)
        .filter((name: any): name is string => typeof name === "string"),
    ),
  );

  // ==== filter logic=====>

  const filteredJobs = jobs.filter(
    //@ts-ignore
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCompanies.length === 0 ||
        selectedCompanies.includes(job.company.name)),
  );

  //@ts-ignore
  const activeJobs = filteredJobs.filter((job) => job.isActive);
  //@ts-ignore
  const closedJobs = filteredJobs.filter((job) => !job.isActive);

  // ==== calculate stats =====>
  const totalSavedJobs = jobs.length;
  //@ts-ignore
  const expiringSoon = jobs.filter((job) => {
    const deadline = new Date(job.applicationDeadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysUntilDeadline <= 7 && daysUntilDeadline > 0;
  }).length;

  // ==== handlers ====>
  const handleCompanyToggle = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company],
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCompanies([]);
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState onRetry={() => window.location.reload()} />;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 pt-24">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Saved Jobs</h1>
            <p className="text-muted-foreground mt-2">
              Manage your saved job opportunities and track your applications
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share List
          </Button>
        </div>

        {/* Stats */}
        {jobs.length > 0 && (
          <StatsCards totalSaved={totalSavedJobs} expiringSoon={expiringSoon} />
        )}
      </div>

      {/* Search & Filter */}
      {jobs.length > 0 && (
        <SearchFilterSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          companies={companies}
          selectedCompanies={selectedCompanies}
          onCompanyToggle={handleCompanyToggle}
        />
      )}

      {/* Jobs Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="active" className="relative">
            Active Jobs
            <Badge variant="secondary" className="ml-2">
              {activeJobs.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="closed">
            Closed/Expired
            <Badge variant="secondary" className="ml-2">
              {closedJobs.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Active Jobs Tab */}
        <TabsContent value="active" className="space-y-4">
          {activeJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {activeJobs.map((job: any) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={
                jobs.length === 0 ? "No saved jobs yet" : "No active saved jobs"
              }
              description={
                jobs.length === 0
                  ? "Start saving jobs that interest you to keep track of them here."
                  : searchTerm || selectedCompanies.length > 0
                    ? "Try adjusting your search or filters to find more jobs."
                    : "All your saved jobs are currently closed or expired."
              }
              icon={Bookmark}
              showClearButton={!!(searchTerm || selectedCompanies.length > 0)}
              onClearFilters={handleClearFilters}
            />
          )}
        </TabsContent>

        {/* Closed Jobs Tab */}
        <TabsContent value="closed" className="space-y-4">
          {closedJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {closedJobs.map((job) => (
                <div key={job.id} className="opacity-70">
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No closed jobs"
              description="Jobs that have expired or been filled will appear here."
              icon={Calendar}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavedJobsView;
