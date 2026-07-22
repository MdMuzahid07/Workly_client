/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Checkbox } from '@radix-ui/react-checkbox';
import { Loader2, Search, Tag, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '../../../ui/badge';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';

export type SkillOption = string | { name: string; count?: number };

const FilterBySkill = ({
  filters,
  skillOptions,
  skillsLoading = false,
  removeSkill,
  toggleSkill,
}: {
  filters: any;
  skillOptions: SkillOption[];
  skillsLoading?: boolean;
  removeSkill: (skill: string) => void;
  toggleSkill: (skill: string) => void;
}) => {
  const [skillSearch, setSkillSearch] = useState('');

  const normalizedSkills = useMemo(() => {
    if (!skillOptions) return [];
    return skillOptions.map((opt) =>
      typeof opt === 'string' ? { name: opt, count: undefined } : opt,
    );
  }, [skillOptions]);

  // Filter skills based on search input
  const filteredSkills = useMemo(() => {
    if (!skillSearch.trim()) return normalizedSkills;
    return normalizedSkills.filter((skill) =>
      skill.name.toLowerCase().includes(skillSearch.toLowerCase()),
    );
  }, [normalizedSkills, skillSearch]);

  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <Tag className="h-4 w-4" />
        Skills
        {normalizedSkills.length > 0 && (
          <span className="text-muted-foreground text-xs font-normal">
            ({normalizedSkills.length})
          </span>
        )}
      </Label>

      {/* Selected Skills */}
      {filters.skills.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {filters.skills.map((skill: string) => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1 text-xs">
              {skill}
              <button
                type="button"
                className="text-muted-foreground cursor-pointer rounded-full p-0.5 transition-colors hover:bg-red-100 hover:text-red-600 focus:outline-none dark:hover:bg-red-900/40 dark:hover:text-red-400"
                onClick={() => removeSkill(skill)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {skill}</span>
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Skill Search */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2" />
        <Input
          placeholder="Search skills..."
          value={skillSearch}
          onChange={(e) => setSkillSearch(e.target.value)}
          className="h-8 pl-8 text-xs"
        />
      </div>

      {/* Loading State */}
      {skillsLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
          <span className="text-muted-foreground ml-2 text-xs">Loading skills...</span>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="text-muted-foreground py-3 text-center text-xs">
          {skillSearch ? 'No skills match your search' : 'No skills available'}
        </div>
      ) : (
        /* Available Skills */
        <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`skill-${skill.name}`}
                  checked={filters.skills.includes(skill.name)}
                  onCheckedChange={() => toggleSkill(skill.name)}
                />
                <Label htmlFor={`skill-${skill.name}`} className="cursor-pointer text-sm">
                  {skill.name}
                </Label>
              </div>
              {skill.count !== undefined && (
                <span className="text-muted-foreground text-xs tabular-nums">{skill.count}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBySkill;
