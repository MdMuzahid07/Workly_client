"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import BudgetRange from "./BudgetRange";
import ExperienceLevel from "./ExperienceLevel";
import FilterBySkill from "./FilterBySkill";
import FilterSearch from "./FilterSearch";
import JobType from "./JobType";
import LocationWise from "./LocationWise";
import PostedWithin from "./PostedWithin";

interface FilterState {
  search: string;
  location: string;
  budgetRange: [number, number];
  jobType: string;
  experienceLevel: string;
  skills: string[];
  postedWithin: string;
}

interface JobFilterSidebarProps {
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

const skillOptions = [
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "JavaScript",
  "PHP",
  "WordPress",
  "UI/UX Design",
  "Figma",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "AWS",
];

const locationOptions = [
  "Remote",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "San Francisco, CA",
  "Austin, TX",
  "Seattle, WA",
  "Boston, MA",
  "Miami, FL",
  "Denver, CO",
];

const SidebarFilter = ({
  onFiltersChange,
  className,
}: JobFilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    location: "",
    budgetRange: [0, 10000],
    jobType: "",
    experienceLevel: "",
    skills: [],
    postedWithin: "",
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const clearAllFilters = () => {
    const cleared: FilterState = {
      search: "",
      location: "",
      budgetRange: [0, 10000],
      jobType: "",
      experienceLevel: "",
      skills: [],
      postedWithin: "",
    };
    setFilters(cleared);
    onFiltersChange(cleared);
  };

  const toggleSkill = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    updateFilters({ skills: newSkills });
  };

  const removeSkill = (skill: string) => {
    updateFilters({ skills: filters.skills.filter((s) => s !== skill) });
  };

  return (
    <div className={className}>
      <Card className="h-fit rounded-3xl">
        <CardHeader className="px-6 py-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground text-base font-bold tracking-tight uppercase">
              Refined By
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-primary hover:bg-primary/5 h-auto p-0 text-xs font-bold transition-colors"
            >
              Reset All
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-6 pb-8">
          <FilterSearch updateFilters={updateFilters} filters={filters} />

          <Separator className="bg-gray-100 dark:bg-slate-800" />

          <LocationWise
            updateFilters={updateFilters}
            filters={filters}
            locationOptions={locationOptions}
          />

          <Separator className="bg-gray-100 dark:bg-slate-800" />

          <BudgetRange updateFilters={updateFilters} filters={filters} />

          <Separator className="bg-gray-100 dark:bg-slate-800" />

          <JobType updateFilters={updateFilters} filters={filters} />

          <Separator className="bg-gray-100 dark:bg-slate-800" />

          <ExperienceLevel updateFilters={updateFilters} filters={filters} />

          <Separator className="bg-gray-100 dark:bg-slate-800" />

          <PostedWithin updateFilters={updateFilters} filters={filters} />

          <Separator className="bg-gray-100 dark:bg-slate-800" />

          <FilterBySkill
            filters={filters}
            removeSkill={removeSkill}
            skillOptions={skillOptions}
            toggleSkill={toggleSkill}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarFilter;
