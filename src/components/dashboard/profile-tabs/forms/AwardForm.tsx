"use client";

import WKDatePicker from "@/components/form/WKDatePicker";
import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Award } from "lucide-react";
import { AwardFormData, awardSchema } from "./profile.validation";

interface AwardFormProps {
  onSubmit: (data: AwardFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const AwardForm = ({
  onSubmit,
  onCancel,
  isLoading,
}: AwardFormProps) => {
  return (
    <WkForm<AwardFormData>
      onSubmit={onSubmit}
      resolver={zodResolver(awardSchema)}
    >
      <div className="space-y-4">
        <WKInput
          name="title"
          label="Award Title"
          placeholder="e.g. Hackathon Winner 2024"
          required
          labelIcon={<Award className="h-4 w-4 text-amber-500" />}
        />
        <WKInput
          name="organization"
          label="Organization / Event"
          placeholder="e.g. Global Tech Summit"
          required
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <WKDatePicker name="date" label="Date Received" />
        </div>

        <WKInput
          name="description"
          label="Description (Optional)"
          placeholder="Short description of the recognition..."
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Award"}
        </Button>
      </div>
    </WkForm>
  );
};
