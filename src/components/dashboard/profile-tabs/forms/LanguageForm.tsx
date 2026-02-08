"use client";

import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Languages } from "lucide-react";
import { Controller } from "react-hook-form";
import { LanguageFormData, languageSchema } from "./profile.validation";

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
      <div className="space-y-4">
        <WKInput
          name="language"
          label="Language"
          placeholder="e.g. Spanish, German"
          required
          labelIcon={<Languages className="h-4 w-4 text-blue-500" />}
        />

        <div className="space-y-2">
          <Label>Proficiency Level</Label>
          <Controller
            name="proficiency"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select proficiency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Conversational">Conversational</SelectItem>
                  <SelectItem value="Fluent">Fluent</SelectItem>
                  <SelectItem value="Native">Native</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
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
