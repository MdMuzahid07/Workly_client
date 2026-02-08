"use client";

import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { SoftSkillFormData, softSkillSchema } from "./profile.validation";

interface SoftSkillsFormProps {
  onSubmit: (data: SoftSkillFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const SoftSkillsForm = ({
  onSubmit,
  onCancel,
  isLoading,
}: SoftSkillsFormProps) => {
  return (
    <WkForm<SoftSkillFormData>
      onSubmit={onSubmit}
      resolver={zodResolver(softSkillSchema)}
    >
      <div className="space-y-4">
        <WKInput
          name="skill"
          label="Soft Skill"
          placeholder="e.g. Leadership, Communication"
          required
          labelIcon={<Sparkles className="h-4 w-4 text-purple-500" />}
        />
        <p className="text-muted-foreground text-xs">
          Soft skills highlight your personal attributes and interpersonal
          abilities.
        </p>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Skill"}
        </Button>
      </div>
    </WkForm>
  );
};
