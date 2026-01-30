"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Plus, Sparkles, X } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface Skill {
  skillName: string;
  experienceYears: number;
}

// =========== helper function ===============>
const skillHelpers = {
  sanitize: (name: string) => name.trim().replace(/\s+/g, " "),
  isDuplicate: (skills: Skill[], name: string) =>
    skills.some((s) => s.skillName.toLowerCase() === name.toLowerCase()),
  isValidExperience: (years: number) =>
    years >= 0 && years <= LIMITS.MAX_EXPERIENCE_YEARS,
};

// ============ constants ==================>
const LIMITS = {
  MAX_SKILLS: 50,
  MAX_SKILL_NAME: 100,
  MAX_EXPERIENCE_YEARS: 50,
} as const;

// ========== skills management component ==================>
interface SkillsManagementProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
}

const ProfileSkillManagement = ({
  skills,
  onSkillsChange,
}: SkillsManagementProps) => {
  const [newSkill, setNewSkill] = useState<Skill>({
    skillName: "",
    experienceYears: 1,
  });
  const [error, setError] = useState("");

  const validateAndAddSkill = useCallback(() => {
    const trimmedName = skillHelpers.sanitize(newSkill.skillName);

    if (!trimmedName) {
      setError("Skill name cannot be empty");
      return;
    }

    if (trimmedName.length > LIMITS.MAX_SKILL_NAME) {
      setError(`Skill name cannot exceed ${LIMITS.MAX_SKILL_NAME} characters`);
      return;
    }

    if (skillHelpers.isDuplicate(skills, trimmedName)) {
      setError("This skill has already been added");
      return;
    }

    if (!skillHelpers.isValidExperience(newSkill.experienceYears)) {
      setError(
        `Experience must be between 0 and ${LIMITS.MAX_EXPERIENCE_YEARS} years`,
      );
      return;
    }

    if (skills.length >= LIMITS.MAX_SKILLS) {
      setError(`Maximum ${LIMITS.MAX_SKILLS} skills allowed`);
      return;
    }

    onSkillsChange([...skills, { ...newSkill, skillName: trimmedName }]);
    setNewSkill({ skillName: "", experienceYears: 1 });
    setError("");
    toast.success("Skill added successfully");
  }, [newSkill, skills, onSkillsChange]);

  const removeSkill = useCallback(
    (index: number) => {
      const removed = skills[index];
      onSkillsChange(skills.filter((_, i) => i !== index));
      toast.success(`${removed.skillName} removed`);
    },
    [skills, onSkillsChange],
  );

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      validateAndAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-foreground flex items-center text-xl font-semibold">
          <Sparkles className="text-primary mr-2 h-5 w-5" />
          Skills & Expertise
        </h3>
        <Badge variant="secondary" className="text-xs">
          {skills.length} / {LIMITS.MAX_SKILLS}
        </Badge>
      </div>

      {/* Skills Display */}
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={`${skill.skillName}-${index}`}
              variant="secondary"
              className="bg-primary text-primary-foreground border-primary flex items-center gap-2 px-3 py-2 transition-all hover:scale-105"
            >
              <span className="font-medium">{skill.skillName}</span>
              <span className="text-xs opacity-90">
                ({skill.experienceYears}y)
              </span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="hover:text-destructive ml-1 transition-colors"
                aria-label={`Remove ${skill.skillName}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <div className="bg-muted/30 border-border flex items-center justify-center rounded-lg border border-dashed p-8">
          <div className="space-y-2 text-center">
            <AlertCircle className="text-muted-foreground mx-auto h-8 w-8" />
            <p className="text-muted-foreground text-sm">
              No skills added yet. Add your first skill below!
            </p>
          </div>
        </div>
      )}

      {/* Add Skill Form */}
      <div className="bg-muted/30 border-border space-y-4 rounded-lg border p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <Label
              htmlFor="newSkill"
              className="text-foreground text-sm font-medium"
            >
              Add New Skill *
            </Label>
            <Input
              id="newSkill"
              value={newSkill.skillName}
              onChange={(e) => {
                setNewSkill((prev) => ({ ...prev, skillName: e.target.value }));
                setError("");
              }}
              onKeyPress={handleKeyPress}
              placeholder="e.g., React, Python, Project Management"
              className="mt-1 w-full"
              maxLength={LIMITS.MAX_SKILL_NAME}
            />
          </div>
          <div>
            <Label
              htmlFor="experience"
              className="text-foreground text-sm font-medium"
            >
              Years *
            </Label>
            <Input
              id="experience"
              type="number"
              min="0"
              max={LIMITS.MAX_EXPERIENCE_YEARS}
              step="0.5"
              value={newSkill.experienceYears}
              onChange={(e) => {
                setNewSkill((prev) => ({
                  ...prev,
                  experienceYears: Number(e.target.value),
                }));
                setError("");
              }}
              className="mt-1 w-full"
            />
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive flex items-start gap-2 rounded-md p-3 text-sm">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button
          type="button"
          onClick={validateAndAddSkill}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
          disabled={
            !newSkill.skillName.trim() || skills.length >= LIMITS.MAX_SKILLS
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>
    </div>
  );
};

export default ProfileSkillManagement;
