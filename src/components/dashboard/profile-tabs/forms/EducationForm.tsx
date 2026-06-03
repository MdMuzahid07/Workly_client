"use client";
import WKCheckbox from "@/components/form/WKCheckbox";
import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import WKSelect from "@/components/form/WkSelect";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { EducationFormData, educationSchema } from "./profile.validation";

const EDUCATION_LEVELS = [
  { value: "Secondary", label: "Secondary School / High School" },
  { value: "Higher Secondary", label: "Higher Secondary / College" },
  { value: "Bachelor", label: "Bachelor's Degree" },
  { value: "Master", label: "Master's Degree" },
  { value: "PhD", label: "Doctorate / PhD" },
  { value: "Diploma", label: "Diploma" },
  { value: "Other", label: "Other" },
];

interface EducationFormProps {
  onSubmit: (data: EducationFormData) => void;
  onCancel: () => void;
  defaultValues?: Partial<EducationFormData>;
  isLoading?: boolean;
}

export const EducationForm = ({
  onSubmit,
  onCancel,
  defaultValues,
  isLoading,
}: EducationFormProps) => {
  return (
    <WkForm<EducationFormData>
      onSubmit={onSubmit}
      defaultValues={defaultValues as unknown as EducationFormData}
      resolver={zodResolver(educationSchema)}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <WKSelect
          name="level"
          label="Level of Education"
          placeholder="Select Level"
          options={EDUCATION_LEVELS}
          required
        />
        <WKInput
          name="degree"
          label="Degree / Exam Title"
          placeholder="e.g. BSc in Computer Science"
          required
        />

        <div className="md:col-span-2">
          <WKInput
            name="institute"
            label="University / Institute"
            placeholder="e.g. University of Technology"
            required
          />
        </div>

        <WKInput
          name="year"
          label="Year of Passing"
          placeholder="e.g. 2024"
          type="number"
          required
        />
        <WKInput
          name="result"
          label="Result / GPA"
          placeholder="e.g. 3.8/4.0"
          required
        />

        <div className="flex items-center pt-2 md:col-span-2">
          <WKCheckbox
            name="currentlyStudying"
            label="I am currently studying here"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Education"}
        </Button>
      </div>
    </WkForm>
  );
};
