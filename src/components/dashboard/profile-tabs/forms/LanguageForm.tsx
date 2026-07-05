"use client";

import WkForm from "@/components/form/WkForm";
import WKSelect from "@/components/form/WkSelect";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { LanguageFormData, languageSchema } from "./profile.validation";

const LANGUAGE_OPTIONS = [
  { value: "Bangla", label: "Bangla" },
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
] as const;

const PROFICIENCY_OPTIONS = [
  { value: "Basic", label: "Basic" },
  { value: "Conversational", label: "Conversational" },
  { value: "Fluent", label: "Fluent" },
  { value: "Native", label: "Native" },
] as const;

interface LanguageFormProps {
  onSubmit: (data: LanguageFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const LanguageForm = ({
  onSubmit,
  onCancel,
  isLoading,
}: LanguageFormProps) => {
  return (
    <WkForm<LanguageFormData>
      onSubmit={onSubmit}
      resolver={zodResolver(languageSchema)}
      defaultValues={{ proficiency: "Conversational" }}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <WKSelect
          name="language"
          label="Language"
          placeholder="Select Language"
          options={LANGUAGE_OPTIONS}
          required
        />

        <WKSelect
          name="proficiency"
          label="Proficiency Level"
          placeholder="Select Proficiency"
          options={PROFICIENCY_OPTIONS}
          required
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Language"}
        </Button>
      </div>
    </WkForm>
  );
};
