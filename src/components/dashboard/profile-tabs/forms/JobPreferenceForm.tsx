/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import WKCheckbox from "@/components/form/WKCheckbox";
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
import { Controller } from "react-hook-form";
import {
  JobPreferenceFormData,
  jobPreferenceSchema,
} from "./profile.validation";

interface JobPreferenceFormProps {
  onSubmit: (data: JobPreferenceFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<JobPreferenceFormData>;
}

export const JobPreferenceForm = ({
  onSubmit,
  onCancel,
  isLoading,
  defaultValues,
}: JobPreferenceFormProps) => {
  return (
    <WkForm<JobPreferenceFormData>
      onSubmit={onSubmit}
      resolver={zodResolver(jobPreferenceSchema) as any}
      defaultValues={{
        jobType: "FULL_TIME",
        expectedSalary: 0,
        preferredLocation: "",
        industry: "",
        workExperience: "",
        remoteWork: false,
        ...defaultValues,
      }}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Job Type</Label>
            <Controller
              name="jobType"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                    <SelectItem value="CONTRACT">Contract</SelectItem>
                    <SelectItem value="FREELANCE">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <WKInput
            name="expectedSalary"
            label="Expected Salary ($)"
            type="number"
            placeholder="e.g. 50000"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <WKInput
            name="preferredLocation"
            label="Preferred Location"
            placeholder="e.g. Remote, New York"
          />
          <WKInput
            name="industry"
            label="Industry"
            placeholder="e.g. Software Development"
          />
        </div>

        <div className="space-y-2">
          <Label>Experience Level</Label>
          <Controller
            name="workExperience"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Intern">Intern</SelectItem>
                  <SelectItem value="Junior">Junior</SelectItem>
                  <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <WKCheckbox name="remoteWork" label="Open to Remote Work" />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </WkForm>
  );
};
