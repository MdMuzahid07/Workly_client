"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "../../ui/button";
import { JobFormData } from "./CreateNewJobForm";

export interface SkillRequired {
  skillName: string;
  experienceYears: number;
  isRequired: boolean;
  priority: "HIGH" | "MEDIUM" | "GOOD_TO_HAVE";
  description: string;
}
const CreateJobFromSkillSection = () => {
  const { watch, setValue } = useFormContext<JobFormData>();
  const skills = watch("skillsRequired") || [];

  const addSkill = () => {
    const newSkill: SkillRequired = {
      skillName: "",
      experienceYears: 0,
      isRequired: true,
      priority: "MEDIUM",
      description: "",
    };
    setValue("skillsRequired", [...skills, newSkill]);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setValue("skillsRequired", updatedSkills);
  };

  const updateSkill = (
    index: number,
    field: keyof SkillRequired,
    value: any,
  ) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setValue("skillsRequired", updatedSkills);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Required Skills</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSkill}
          className="h-8"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {skills.length === 0 ? (
        <div className="text-muted-foreground rounded-lg border border-dashed border-gray-300 p-4 text-center text-sm">
          No skills added yet. Click {`"Add Skill"`} to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="space-y-3 rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Skill {index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(index)}
                  className="text-destructive hover:text-destructive h-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Skill Name *</label>
                  <input
                    type="text"
                    value={skill.skillName}
                    onChange={(e) =>
                      updateSkill(index, "skillName", e.target.value)
                    }
                    placeholder="e.g. React.js"
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Experience (Years) *
                  </label>
                  <input
                    type="number"
                    value={skill.experienceYears}
                    onChange={(e) =>
                      updateSkill(
                        index,
                        "experienceYears",
                        Number(e.target.value),
                      )
                    }
                    placeholder="3"
                    min="0"
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority *</label>
                  <select
                    value={skill.priority}
                    onChange={(e) =>
                      updateSkill(index, "priority", e.target.value)
                    }
                    className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="GOOD_TO_HAVE">Good to Have</option>
                  </select>
                </div>

                <div className="flex items-center space-y-2 pt-7">
                  <input
                    type="checkbox"
                    id={`required-${index}`}
                    checked={skill.isRequired}
                    onChange={(e) =>
                      updateSkill(index, "isRequired", e.target.checked)
                    }
                    className="h-4 w-4 rounded text-green-600"
                  />
                  <label
                    htmlFor={`required-${index}`}
                    className="ml-2 text-sm font-normal"
                  >
                    Required
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={skill.description}
                  onChange={(e) =>
                    updateSkill(index, "description", e.target.value)
                  }
                  placeholder="Describe the skill requirements..."
                  rows={2}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateJobFromSkillSection;
