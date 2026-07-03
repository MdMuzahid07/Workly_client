"use client";
import { Plus, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import WKCheckbox from "@/components/form/WKCheckbox";
import WKInput from "@/components/form/WkInput";
import WKSelect from "@/components/form/WkSelect";
import WKTextArea from "@/components/form/WkTextArea";
import { Button } from "@/components/ui/button";
import { JobFormData } from "./create-job-form";

export interface SkillRequired {
  skillName: string;
  experienceYears: number;
  isRequired: boolean;
  priority: "HIGH" | "MEDIUM" | "LOW" | "GOOD_TO_HAVE";
  description?: string;
}
const CreateJobFromSkillSection = () => {
  const { watch, setValue } = useFormContext<JobFormData>();
  const skills = watch("skillsRequired") || [];

  const addSkill = () => {
    const newSkill: SkillRequired = {
      skillName: "",
      experienceYears: 1,
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
        <div className="text-muted-foreground border-primary/20 rounded-lg border border-dashed p-4 text-center text-sm">
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
                <WKInput
                  name={`skillsRequired.${index}.skillName`}
                  label="Skill Name"
                  required
                  size="md"
                />

                <WKInput
                  name={`skillsRequired.${index}.experienceYears`}
                  label="Experience (Years)"
                  type="number"
                  required
                  size="md"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <WKSelect
                  name={`skillsRequired.${index}.priority`}
                  label="Priority"
                  placeholder="Select priority"
                  required
                  size="md"
                  options={[
                    { value: "HIGH", label: "High" },
                    { value: "MEDIUM", label: "Medium" },
                    { value: "GOOD_TO_HAVE", label: "Good to Have" },
                  ]}
                />

                <div className="pt-7">
                  <WKCheckbox
                    name={`skillsRequired.${index}.isRequired`}
                    label="Required"
                  />
                </div>
              </div>

              <WKTextArea
                name={`skillsRequired.${index}.description`}
                label="Description"
                rows={2}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateJobFromSkillSection;
