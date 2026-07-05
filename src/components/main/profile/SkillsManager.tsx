import { SectionCard } from "@/components/main/profile/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoriesQuery } from "@/redux/feature/category/categoryApi";
import type { Language, Skill } from "@/types/profile";
import { X } from "lucide-react";
import { useState, useMemo } from "react";

// Mock skills list for dropdown fallback
const AVAILABLE_SKILLS = [
  "React.js",
  "Node.js",
  "TypeScript",
  "Python",
  "SQL",
  "Docker",
  "AWS",
  "Figma",
  "Next.js",
];

interface SkillsManagerProps {
  skills?: Skill[];
  languages?: Language[];
  onAddSoftSkill?: () => void;
  onAddLanguage?: () => void;
  onAddTechnicalSkill?: (skill: {
    skillName: string;
    experienceYears: number;
    type: "HARD";
  }) => void;
  onRemoveSkill?: (idOrIndex: string | number) => void;
  onRemoveLanguage?: (idOrIndex: string | number) => void;
}

export const SkillsManager = ({
  skills = [],
  languages = [],
  onAddSoftSkill,
  onAddLanguage,
  onAddTechnicalSkill,
  onRemoveSkill,
  onRemoveLanguage,
}: SkillsManagerProps) => {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  interface TaxonomySkill {
    id: string;
    name: string;
    active: boolean;
  }

  interface CategoryWithSkills {
    id: string;
    name: string;
    taxonomySkills?: TaxonomySkill[];
  }

  const { data: categoriesResponse } = useGetCategoriesQuery(undefined);

  const categoriesList = useMemo(() => {
    return (categoriesResponse?.data || []) as CategoryWithSkills[];
  }, [categoriesResponse]);

  const skillsList = useMemo(() => {
    if (selectedCategory === "all") {
      const allSkills = categoriesList.flatMap((cat) =>
        (cat.taxonomySkills || []).map((s) => s.name),
      );
      const uniqueSkills = Array.from(new Set(allSkills)) as string[];
      return uniqueSkills.length > 0 ? uniqueSkills : AVAILABLE_SKILLS;
    } else {
      const targetCategory = categoriesList.find(
        (cat) => cat.id === selectedCategory,
      );
      const catSkills = (targetCategory?.taxonomySkills || []).map(
        (s) => s.name,
      );
      return catSkills;
    }
  }, [categoriesList, selectedCategory]);

  const technicalSkills = skills.filter((skill) => skill?.type !== "SOFT");
  const softSkills = skills.filter((skill) => skill?.type === "SOFT");

  const experienceToYears: Record<string, number> = {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
    Expert: 4,
  };

  const getSkillDisplay = (skill: Skill): string => {
    if (skill?.experienceYears === undefined || skill?.experienceYears === null)
      return "N/A";
    const years = Number(skill.experienceYears);
    if (Number.isNaN(years)) return "N/A";
    return `${years}y`;
  };

  const handleAdd = () => {
    if (selectedSkill && experience && onAddTechnicalSkill) {
      onAddTechnicalSkill({
        skillName: selectedSkill,
        experienceYears: experienceToYears[experience] ?? 1,
        type: "HARD",
      });
      setSelectedSkill("");
      setExperience("");
    }
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Technical / Hard Skills"
        isCompleted={technicalSkills.length > 0}
        completionPercentage={technicalSkills.length > 0 ? 10 : 0}
        noData={technicalSkills.length === 0}
      >
        <div className="space-y-6">
          <div className="bg-muted/20 flex flex-col items-end gap-4 rounded-lg border p-4 md:flex-row">
            <div className="w-full space-y-2 md:flex-1">
              <label className="text-muted-foreground text-xs font-medium uppercase">
                Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={(val) => {
                  setSelectedCategory(val);
                  setSelectedSkill("");
                }}
              >
                <SelectTrigger className="bg-background border-border cursor-pointer rounded-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="all">
                    All Categories
                  </SelectItem>
                  {categoriesList.map((cat) => (
                    <SelectItem
                      className="cursor-pointer"
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full space-y-2 md:flex-1">
              <label className="text-muted-foreground text-xs font-medium uppercase">
                Skill <span className="text-destructive">*</span>
              </label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="bg-background border-border cursor-pointer rounded-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {skillsList.map((skill) => (
                    <SelectItem
                      className="cursor-pointer"
                      key={skill}
                      value={skill}
                    >
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full space-y-2 md:w-48">
              <label className="text-muted-foreground text-xs font-medium uppercase">
                Expertise Level <span className="text-destructive">*</span>
              </label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger className="bg-background border-border cursor-pointer rounded-full">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="Beginner">
                    Beginner
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Intermediate">
                    Intermediate
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Advanced">
                    Advanced
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Expert">
                    Expert
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAdd}
              disabled={!selectedSkill || !experience}
              className="w-full min-w-[100px] md:w-auto"
            >
              Add
            </Button>
          </div>

          {/* Skills List */}
          {technicalSkills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {technicalSkills.map((skill, index) => (
                <div
                  key={skill.id || `${skill.skillName}-${index}`}
                  className="bg-background transition-hover hover:border-primary/50 flex items-center gap-2 rounded-full border py-1.5 pr-1 pl-4 text-sm shadow-sm"
                >
                  <span className="text-foreground font-medium">
                    {skill.skillName || skill.skill}
                  </span>
                  <span className="text-muted-foreground mx-1">·</span>
                  <Badge variant="secondary" className="h-5 text-[10px]">
                    {getSkillDisplay(skill)}
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-destructive/10 hover:text-destructive ml-1 h-6 w-6 rounded-full"
                    onClick={() => onRemoveSkill?.(skill.id || index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground text-sm italic">
              Add technical skills like React, Node.js, Python, etc.
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard
        title="Soft Skills"
        noData={softSkills.length === 0}
        isCompleted={softSkills.length > 0}
        onAdd={onAddSoftSkill}
      >
        {softSkills.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {softSkills.map((skill, index) => (
              <div
                key={skill.id || `${skill.skillName}-${index}`}
                className="bg-background flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm shadow-sm"
              >
                <span className="text-foreground font-medium">
                  {skill.skillName || skill.skill}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-destructive/10 hover:text-destructive h-6 w-6 rounded-full"
                  onClick={() => onRemoveSkill?.(skill.id || index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-sm">
            Communication, Leadership, Problem Solving...
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Languages"
        noData={languages.length === 0}
        isCompleted={languages.length > 0}
        onAdd={onAddLanguage}
      >
        {languages.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {languages.map((lang, index) => (
              <div
                key={lang.id || `${lang.language}-${index}`}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <span className="font-medium">{lang.language}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{lang.proficiency}</Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-destructive/10 hover:text-destructive h-6 w-6 rounded-full"
                    onClick={() => onRemoveLanguage?.(lang.id || index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-sm italic">
            Add your known languages and proficiency levels.
          </div>
        )}
      </SectionCard>
    </div>
  );
};
