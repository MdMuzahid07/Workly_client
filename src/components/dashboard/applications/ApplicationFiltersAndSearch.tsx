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
}

const ApplicationFiltersAndSearch = ({
  searchQuery,
  onSearchChange,
  selectedJob,
  onJobChange,
  selectedStatus,
  onStatusChange,
  onClearFilters,
}: ApplicationFiltersAndSearchProps) => {
  return (
    <div className="bg-card flex flex-col gap-4 rounded-2xl p-4 md:flex-row md:items-center md:justify-between">
      <div className="relative max-w-md flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search by applicant name, email, or job..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select value={selectedJob} onValueChange={onJobChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Jobs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            <SelectItem value="senior-frontend">
              Senior Frontend Developer
            </SelectItem>
            <SelectItem value="backend-engineer">Backend Engineer</SelectItem>
            <SelectItem value="product-manager">Product Manager</SelectItem>
            <SelectItem value="ux-designer">UX Designer</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="reviewing">Reviewing</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="interviewed">Interviewed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="offered">Offered</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default ApplicationFiltersAndSearch;
