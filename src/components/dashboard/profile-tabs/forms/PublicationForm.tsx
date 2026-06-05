"use client";
import WKDatePicker from "@/components/form/WKDatePicker";
import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen } from "lucide-react";
import { PublicationFormData, publicationSchema } from "./profile.validation";
import WKTextArea from "../../../form/WkTextArea";

interface PublicationFormProps {
  onSubmit: (data: PublicationFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<PublicationFormData>;
}

export const PublicationForm = ({
  onSubmit,
  onCancel,
  isLoading,
  defaultValues,
}: PublicationFormProps) => {
  return (
    <WkForm<PublicationFormData>
      onSubmit={onSubmit}
      defaultValues={defaultValues || {}}
      resolver={zodResolver(publicationSchema)}
    >
      <div className="space-y-4">
        <WKInput
          name="title"
          label="Publication Title"
          placeholder="e.g. Modern React Patterns"
          required
          labelIcon={<BookOpen className="h-4 w-4 text-blue-500" />}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <WKInput
            name="publisher"
            label="Publisher / Medium"
            placeholder="e.g. Medium, IEEE"
            required
          />
          <WKDatePicker name="date" label="Publication Date" />
        </div>

        <WKInput name="url" label="URL (Optional)" placeholder="https://..." />

        <WKTextArea
          name="description"
          label="Description (Optional)"
          placeholder="Brief abstract or summary..."
          className="min-h-20"
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Publication"}
        </Button>
      </div>
    </WkForm>
  );
};
