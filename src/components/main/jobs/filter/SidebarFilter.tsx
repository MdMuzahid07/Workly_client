'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useMemo, useState } from 'react';
import {
  useGetLocationFacetsQuery,
  useGetSkillFacetsQuery,
} from '../../../../redux/feature/job/jobApi';
import BudgetRange from './BudgetRange';
import ExperienceLevel from './ExperienceLevel';
import FilterBySkill from './FilterBySkill';
import FilterSearch from './FilterSearch';
import JobType from './JobType';
import LocationWise from './LocationWise';
import PostedWithin from './PostedWithin';

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

const SidebarFilter = ({ onFiltersChange, className }: JobFilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    location: '',
    budgetRange: [0, 10000],
    jobType: '',
    experienceLevel: '',
    skills: [],
    postedWithin: '',
  });

  // Fetch dynamic skills from backend based on current filter context
  const facetParams = useMemo(() => {
    const p: Record<string, string | number> = { limit: 50 };
    if (filters.location) p.location = filters.location;
    return p;
  }, [filters.location]);

  const { data: skillFacetsData, isLoading: skillsLoading } = useGetSkillFacetsQuery(facetParams);

  const skillOptions = useMemo(() => {
    if (!skillFacetsData?.data) return [];
    return skillFacetsData.data.map((facet: { skillName: string; count: number }) => ({
      name: facet.skillName,
      count: facet.count,
    }));
  }, [skillFacetsData]);

  // Fetch dynamic locations from backend based on skills context
  const locationFacetParams = useMemo(() => {
    const p: Record<string, string | number> = { limit: 50 };
    if (filters.skills.length > 0) p.skills = filters.skills.join(',');
    return p;
  }, [filters.skills]);

  const { data: locationFacetsData, isLoading: locationsLoading } =
    useGetLocationFacetsQuery(locationFacetParams);

  const locationOptions = useMemo(() => {
    if (!locationFacetsData?.data) return [];
    return locationFacetsData.data.map((facet: { location: string; count: number }) => ({
      name: facet.location,
      count: facet.count,
    }));
  }, [locationFacetsData]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const clearAllFilters = () => {
    const cleared: FilterState = {
      search: '',
      location: '',
      budgetRange: [0, 10000],
      jobType: '',
      experienceLevel: '',
      skills: [],
      postedWithin: '',
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

        <CardContent className="space-y-6 px-5 pb-8 sm:px-6">
          <FilterSearch updateFilters={updateFilters} filters={filters} />

          <Separator className="bg-gray-100 dark:bg-slate-800" />

          <LocationWise
            updateFilters={updateFilters}
            filters={filters}
            locationOptions={locationOptions}
            locationsLoading={locationsLoading}
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
            skillsLoading={skillsLoading}
            toggleSkill={toggleSkill}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarFilter;
