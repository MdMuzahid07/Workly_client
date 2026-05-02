"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface ApplicationFiltersAndSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedJob: string;
  onJobChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  onClearFilters: () => void;
  jobs?: Array<{ id: string; title: string }>;
  statuses?: Array<{ value: string; label: string }>;
  hasActiveFilters?: boolean;
}

const ApplicationFiltersAndSearch = ({
  searchQuery,
  onSearchChange,
  selectedJob,
  onJobChange,
  selectedStatus,
  onStatusChange,
  onClearFilters,
  jobs = [],
  statuses = [],
  hasActiveFilters = false,
}: ApplicationFiltersAndSearchProps) => {
  return (
    <div className="bg-card flex flex-col gap-4 rounded-2xl border p-4 md:flex-row md:items-center md:justify-between md:p-6">
      <div className="relative max-w-md flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search by applicant name, email, or job..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-border rounded-full pl-9"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select value={selectedJob} onValueChange={onJobChange}>
          <SelectTrigger className="border-border w-[180px] cursor-pointer rounded-full">
            <SelectValue placeholder="All Jobs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="all">
              All Jobs
            </SelectItem>
            {jobs.map((job) => (
              <SelectItem
                className="cursor-pointer"
                key={job.id}
                value={job.id}
              >
                {job.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="border-border w-[180px] cursor-pointer rounded-full">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="all">
              All Statuses
            </SelectItem>
            {statuses.map((status) => (
              <SelectItem
                className="cursor-pointer"
                key={status.value}
                value={status.value}
              >
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default ApplicationFiltersAndSearch;
