"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useMemo, useState } from "react";
import FilterBySkill from "../../jobs/filter/FilterBySkill";
import LocationWise from "../../jobs/filter/LocationWise";
import ExperienceRange from "./ExperienceRange";

interface FilterState {
  location: string;
  experienceRange: [number, number];
  industry: string;
  skills: string[];
}

interface CandidateFilterSidebarProps {
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

const INDUSTRY_OPTIONS = [
  "Software Development",
  "Healthcare",
  "Finance",
  "Marketing",
  "Design",
  "Sales",
  "Education",
];

const INDUSTRY_SKILLS_MAP: Record<string, string[]> = {
  "Software Development": [
    "React",
    "Node.js",
    "TypeScript",
    "Python",
    "JavaScript",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Tailwind CSS",
  ],
  Healthcare: [
    "Nursing",
    "Patient Care",
    "Medical Terminology",
    "EMR",
    "First Aid",
    "CPR",
    "Phlebotomy",
  ],
  Finance: [
    "Accounting",
    "Financial Analysis",
    "Excel",
    "QuickBooks",
    "Tax Preparation",
    "Auditing",
    "Investment",
  ],
  Marketing: [
    "SEO",
    "Content Writing",
    "Social Media Marketing",
    "Google Analytics",
    "Copywriting",
    "Email Marketing",
  ],
  Design: [
    "Figma",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "UI/UX Design",
    "Graphic Design",
    "Typography",
  ],
  Sales: [
    "CRM",
    "Lead Generation",
    "Negotiation",
    "Cold Calling",
    "Sales Strategy",
  ],
  Education: [
    "Curriculum Development",
    "Teaching",
    "Classroom Management",
    "Special Education",
    "Tutoring",
    "E-learning",
  ],
};

const locationOptions = [
  "Remote",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "San Francisco, CA",
  "Austin, TX",
  "Seattle, WA",
];

const CandidateSidebarFilter = ({
  onFiltersChange,
  className,
}: CandidateFilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    experienceRange: [0, 30],
    industry: "",
    skills: [],
  });

  const skillOptions = useMemo(() => {
    if (!filters.industry)
      return Object.values(INDUSTRY_SKILLS_MAP).flat().slice(0, 15);
    return INDUSTRY_SKILLS_MAP[filters.industry] || [];
  }, [filters.industry]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };

    // Reset skills if industry changes
    if (
      newFilters.industry !== undefined &&
      newFilters.industry !== filters.industry
    ) {
      updated.skills = [];
    }

    setFilters(updated);
    onFiltersChange(updated);
  };

  const clearAllFilters = () => {
    const cleared: FilterState = {
      location: "",
      experienceRange: [0, 30],
      industry: "",
      skills: [],
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
      <Card className="h-fit rounded-3xl border-gray-100 dark:border-slate-800">
        <CardHeader className="py-5 xl:px-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground text-base font-bold tracking-tight uppercase">
              Filter Candidates
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-primary hover:bg-primary/5 h-auto p-0 text-xs font-bold transition-colors"
            >
              Reset
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8 xl:px-0">
          <div className="space-y-3">
            <Label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Industry
            </Label>
            <Select
              value={filters.industry}
              onValueChange={(val) => updateFilters({ industry: val })}
            >
              <SelectTrigger className="w-full rounded-xl border-gray-100 bg-gray-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                <SelectValue placeholder="Select Industry" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {INDUSTRY_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-gray-100 dark:bg-slate-800" />

          <LocationWise
            updateFilters={updateFilters}
            filters={filters}
            locationOptions={locationOptions}
          />

          <Separator className="bg-gray-100 dark:bg-slate-800" />

          <ExperienceRange updateFilters={updateFilters} filters={filters} />

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

export default CandidateSidebarFilter;
