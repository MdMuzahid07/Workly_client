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
import { X } from "lucide-react";
import { useState } from "react";

// Mock skills list for dropdown
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

export const SkillsManager = ({
  skills = [],
  onAddSoftSkill,
  onAddLanguage,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  skills: any[];
  onAddSoftSkill?: () => void;
  onAddLanguage?: () => void;
}) => {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [experience, setExperience] = useState("");

  const handleAdd = () => {
    if (selectedSkill) {
      // In a real app, this would update the backend or parent state
      console.log("Adding skill:", selectedSkill, "Experience:", experience);
      setSelectedSkill("");
      setExperience("");
    }
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Technical / Hard Skills"
        isCompleted={skills.length > 0}
        completionPercentage={skills.length > 0 ? 10 : 0}
        noData={skills.length === 0}
      >
        <div className="space-y-6">
          {/* Add Skill Form */}
          {/* ... existing form logic ... */}
          <div className="bg-muted/20 flex flex-col items-end gap-4 rounded-lg border p-4 md:flex-row">
            <div className="w-full space-y-2 md:flex-1">
              <label className="text-muted-foreground text-xs font-medium uppercase">
                Skill <span className="text-destructive">*</span>
              </label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_SKILLS.map((skill) => (
                    <SelectItem key={skill} value={skill}>
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
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAdd}
              disabled={!selectedSkill}
              className="w-full min-w-[100px] md:w-auto"
            >
              Add
            </Button>
          </div>

          {/* Skills List */}
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-background transition-hover hover:border-primary/50 flex items-center gap-2 rounded-full border py-1.5 pr-1 pl-4 text-sm shadow-sm"
                >
                  <span className="text-foreground font-medium">
                    {skill.skillName}
                  </span>
                  <span className="text-muted-foreground mx-1">·</span>
                  <Badge variant="secondary" className="h-5 text-[10px]">
                    {skill.experienceYears + "y" || "Expert"}
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-destructive/10 hover:text-destructive ml-1 h-6 w-6 rounded-full"
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

      <SectionCard title="Soft Skills" noData onAdd={onAddSoftSkill}>
        <div className="text-muted-foreground text-sm">
          Communication, Leadership, Problem Solving...
        </div>
      </SectionCard>

      <SectionCard title="Languages" noData onAdd={onAddLanguage}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-md border p-3">
            <span className="font-medium">English</span>
            <Badge variant="outline">Fluent</Badge>
          </div>
          <div className="flex items-center justify-between rounded-md border p-3">
            <span className="font-medium">Bengali</span>
            <Badge variant="outline">Native</Badge>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};
