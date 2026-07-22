'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';

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
    setSearchTerm('');
    setSelectedType('all');
    setSelectedExperience('all');
    setSelectedLocation('all');
  };

  const hasActiveFilters =
    searchTerm ||
    selectedType !== 'all' ||
    selectedExperience !== 'all' ||
    selectedLocation !== 'all';

  return (
    <div className="mb-6 space-y-3.5">
      {/* Search Bar */}
      <div className="group relative w-full">
        <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
        <Input
          placeholder="Search jobs by title, location, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-muted/20 border-border focus:bg-background h-9.5 rounded-full pl-9 text-xs transition-all sm:h-11 sm:text-sm"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="text-foreground/80 flex items-center gap-1.5 text-xs font-semibold sm:text-sm">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Filters:</span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="bg-muted/20 border-border h-9 w-full rounded-full text-xs font-medium sm:h-10 sm:w-[140px] sm:text-sm">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedExperience} onValueChange={setSelectedExperience}>
            <SelectTrigger className="bg-muted/20 border-border h-9 w-full rounded-full text-xs font-medium sm:h-10 sm:w-[140px] sm:text-sm">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Entry-level">Entry-level</SelectItem>
              <SelectItem value="Mid-level">Mid-level</SelectItem>
              <SelectItem value="Senior">Senior</SelectItem>
              <SelectItem value="Lead">Lead</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="bg-muted/20 border-border h-9 w-full rounded-full text-xs font-medium sm:h-10 sm:w-[140px] sm:text-sm">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
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
              className="text-muted-foreground hover:text-foreground h-9 text-xs font-semibold sm:h-10 sm:text-sm"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFiltersAndSearch;
