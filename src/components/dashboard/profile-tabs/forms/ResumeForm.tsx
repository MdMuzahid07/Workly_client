"use client";

import WKCheckbox from "@/components/form/WKCheckbox";
import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { ResumeFormData, resumeSchema } from "./profile.validation";

interface ResumeFormProps {
  onSubmit: (data: ResumeFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ResumeForm = ({
  onSubmit,
  onCancel,
  isLoading,
}: ResumeFormProps) => {
  return (
    <WkForm<ResumeFormData>
      onSubmit={onSubmit}
      defaultValues={{ isDefault: false }}
      resolver={zodResolver(resumeSchema)}
    >
      <div className="space-y-6">
        <WKInput
          name="name"
          label="Resume Name"
          placeholder="e.g. Frontend Developer Resume"
          required
        />

        <div className="space-y-2">
          <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Upload Resume (PDF/DOCX) <span className="text-destructive">*</span>
          </label>
          <div className="flex w-full items-center justify-center">
            <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="mb-3 h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">PDF, DOCX (MAX. 5MB)</p>
              </div>
              <input type="file" className="hidden" accept=".pdf,.docx,.doc" />
            </label>
          </div>
        </div>

        <div className="pt-2">
          <WKCheckbox name="isDefault" label="Set as default resume" />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload Resume"}
        </Button>
      </div>
    </WkForm>
  );
};
