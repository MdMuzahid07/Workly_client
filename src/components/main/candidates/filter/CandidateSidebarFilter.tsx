'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useMemo, useState } from 'react';
import {
  useGetCandidateLocationFacetsQuery,
  useGetCandidateSkillFacetsQuery,
} from '../../../../redux/feature/candidate/candidateApi';
import FilterBySkill from '../../jobs/filter/FilterBySkill';
import LocationWise from '../../jobs/filter/LocationWise';
import ExperienceRange from './ExperienceRange';

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
  'Software Development',
  'Healthcare',
  'Finance',
  'Marketing',
  'Design',
  'Sales',
  'Education',
];

const CandidateSidebarFilter = ({ onFiltersChange, className }: CandidateFilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    experienceRange: [0, 30],
    industry: '',
    skills: [],
  });

  // Dynamic Skill Facets for Candidates
  const skillFacetParams = useMemo(() => {
    const p: Record<string, string | number> = { limit: 50 };
    if (filters.location) p.location = filters.location;
    if (filters.industry) p.industry = filters.industry;
    return p;
  }, [filters.location, filters.industry]);

  const { data: skillFacetsData, isLoading: skillsLoading } =
    useGetCandidateSkillFacetsQuery(skillFacetParams);

  const skillOptions = useMemo(() => {
    if (!skillFacetsData?.data) return [];
    return skillFacetsData.data.map((facet: { skillName: string; count: number }) => ({
      name: facet.skillName,
      count: facet.count,
    }));
  }, [skillFacetsData]);

  // Dynamic Location Facets for Candidates
  const locationFacetParams = useMemo(() => {
    const p: Record<string, string | number> = { limit: 50 };
    if (filters.skills.length > 0) p.skills = filters.skills.join(',');
    if (filters.industry) p.industry = filters.industry;
    return p;
  }, [filters.skills, filters.industry]);

  const { data: locationFacetsData, isLoading: locationsLoading } =
    useGetCandidateLocationFacetsQuery(locationFacetParams);

  const locationOptions = useMemo(() => {
    if (!locationFacetsData?.data) return [];
    return locationFacetsData.data.map((facet: { location: string; count: number }) => ({
      name: facet.location,
      count: facet.count,
    }));
  }, [locationFacetsData]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };

    // Reset skills if industry changes
    if (newFilters.industry !== undefined && newFilters.industry !== filters.industry) {
      updated.skills = [];
    }

    setFilters(updated);
    onFiltersChange(updated);
  };

  const clearAllFilters = () => {
    const cleared: FilterState = {
      location: '',
      experienceRange: [0, 30],
      industry: '',
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
      <Card className="bg-background h-fit rounded-2xl">
        <CardHeader className="px-5 py-5 sm:px-6">
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

        <CardContent className="space-y-6 px-5 pb-8 sm:px-6">
          <div className="space-y-3">
            <Label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Industry
            </Label>
            <Select
              value={filters.industry}
              onValueChange={(val) => updateFilters({ industry: val })}
            >
              <SelectTrigger className="w-full rounded-full border-gray-100 bg-gray-50/50 dark:border-slate-800 dark:bg-slate-900/50">
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
            locationsLoading={locationsLoading}
          />

          <Separator className="bg-gray-100 dark:bg-slate-800" />

          <ExperienceRange updateFilters={updateFilters} filters={filters} />

          <Separator className="bg-gray-100 dark:bg-slate-800" />

          <FilterBySkill
            filters={filters}
            removeSkill={removeSkill}
            skillOptions={skillOptions}
            skillsLoading={skillsLoading}
            toggleSkill={toggleSkill}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateSidebarFilter;
