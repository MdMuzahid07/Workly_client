"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Clock, Filter, Tag, X } from "lucide-react";
import { useState } from "react";
import BudgetRange from "./BudgetRange";
import ExperienceLevel from "./ExperienceLevel";
import FilterSearch from "./FilterSearch";
import JobType from "./JobType";
import LocationWise from "./LocationWise";

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
      <Card className="h-fit rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <FilterSearch updateFilters={updateFilters} filters={filters} />

          <Separator />

          <LocationWise
            updateFilters={updateFilters}
            filters={filters}
            locationOptions={locationOptions}
          />

          <Separator />

          <BudgetRange updateFilters={updateFilters} filters={filters} />

          <Separator />

          <JobType updateFilters={updateFilters} filters={filters} />

          <Separator />

          <ExperienceLevel updateFilters={updateFilters} filters={filters} />

          <Separator />

          {/* Posted Within */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4" />
              Posted Within
            </Label>
            <RadioGroup
              value={filters.postedWithin}
              onValueChange={(value) => updateFilters({ postedWithin: value })}
            >
              {["Last 24 hours", "Last 3 days", "Last week", "Last month"].map(
                (time) => (
                  <div key={time} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={time.toLowerCase()}
                      id={`time-${time}`}
                    />
                    <Label
                      htmlFor={`time-${time}`}
                      className="cursor-pointer text-sm"
                    >
                      {time}
                    </Label>
                  </div>
                ),
              )}
            </RadioGroup>
          </div>

          <Separator />

          {/* Skills */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Tag className="h-4 w-4" />
              Skills
            </Label>

            {/* Selected Skills */}
            {filters.skills.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {filters.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-auto p-0 hover:bg-transparent"
                      onClick={() => removeSkill(skill)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Available Skills */}
            <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto">
              {skillOptions.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={filters.skills.includes(skill)}
                    onCheckedChange={() => toggleSkill(skill)}
                  />
                  <Label
                    htmlFor={`skill-${skill}`}
                    className="cursor-pointer text-sm"
                  >
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarFilter;
