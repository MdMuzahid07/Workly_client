"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  Clock,
  DollarSign,
  Filter,
  MapPin,
  Search,
  Tag,
  X,
} from "lucide-react";
import { useState } from "react";

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
      <Card className="h-fit">
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
          {/* Search */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Search className="h-4 w-4" />
              Search Jobs
            </Label>
            <Input
              placeholder="Search by title, company, or keywords..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full"
            />
          </div>

          <Separator />

          {/* Location */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <RadioGroup
              value={filters.location}
              onValueChange={(value) => updateFilters({ location: value })}
            >
              {locationOptions.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={location}
                    id={`location-${location}`}
                  />
                  <Label
                    htmlFor={`location-${location}`}
                    className="cursor-pointer text-sm"
                  >
                    {location}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Budget Range */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <DollarSign className="h-4 w-4" />
              Budget Range
            </Label>
            <div className="px-2">
              <Slider
                value={filters.budgetRange}
                onValueChange={(value) =>
                  updateFilters({ budgetRange: value as [number, number] })
                }
                max={10000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="text-muted-foreground mt-2 flex justify-between text-xs">
                <span>${filters.budgetRange[0]}</span>
                <span>${filters.budgetRange[1]}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Job Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Job Type</Label>
            <RadioGroup
              value={filters.jobType}
              onValueChange={(value) => updateFilters({ jobType: value })}
            >
              {["Fixed Price", "Hourly", "Contract", "Full-time"].map(
                (type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={type.toLowerCase()}
                      id={`type-${type}`}
                    />
                    <Label
                      htmlFor={`type-${type}`}
                      className="cursor-pointer text-sm"
                    >
                      {type}
                    </Label>
                  </div>
                ),
              )}
            </RadioGroup>
          </div>

          <Separator />

          {/* Experience Level */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Experience Level</Label>
            <RadioGroup
              value={filters.experienceLevel}
              onValueChange={(value) =>
                updateFilters({ experienceLevel: value })
              }
            >
              {["Entry Level", "Intermediate", "Expert"].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={level.toLowerCase()}
                    id={`exp-${level}`}
                  />
                  <Label
                    htmlFor={`exp-${level}`}
                    className="cursor-pointer text-sm"
                  >
                    {level}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

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
