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
import { Search, SlidersHorizontal } from "lucide-react";

interface JobFiltersAndSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedExperience: string;
  setSelectedExperience: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
}

const JobFiltersAndSearch = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  selectedExperience,
  setSelectedExperience,
  selectedLocation,
  setSelectedLocation,
}: JobFiltersAndSearchProps) => {
  const handleReset = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedExperience("all");
    setSelectedLocation("all");
  };

  const hasActiveFilters =
    searchTerm ||
    selectedType !== "all" ||
    selectedExperience !== "all" ||
    selectedLocation !== "all";

  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search jobs by title, location, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-border rounded pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-foreground flex items-center gap-2 text-sm font-medium">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters:</span>
        </div>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="border-border w-[140px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedExperience}
          onValueChange={setSelectedExperience}
        >
          <SelectTrigger className="border-border w-[140px]">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Entry-level">Entry-level</SelectItem>
            <SelectItem value="Mid-level">Mid-level</SelectItem>
            <SelectItem value="Senior">Senior</SelectItem>
            <SelectItem value="Lead">Lead</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="border-border w-[140px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="remote">Remote Only</SelectItem>
            <SelectItem value="onsite">On-site Only</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobFiltersAndSearch;
