"use client";

import WKCheckbox from "@/components/form/WKCheckbox";
import WKInput from "@/components/form/WkInput";
import WKSelect from "@/components/form/WkSelect";
import SubcategorySelect from "../components/SubcategorySelect";

interface Step1BasicInfoProps {
  categories:
    | {
        data?: { id: string; name: string; subcategories: string[] }[];
      }
    | undefined;
  categoriesLoading: boolean;
}

export default function Step1BasicInfo({
  categories,
  categoriesLoading,
}: Step1BasicInfoProps) {
  return (
    <div className="animate-in fade-in-50 space-y-6 duration-300">
      <div>
        <h2 className="text-foreground text-lg font-semibold">
          Basic Information
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {`Let's`} start with the essential details about this position
        </p>
      </div>

      <div className="space-y-4">
        {/* Title & Job Type */}
        <div className="grid gap-4 sm:grid-cols-2">
          <WKInput
            name="title"
            label="Job Title"
            placeholder="e.g., Senior Software Engineer"
            required
          />

          <WKSelect
            name="jobType"
            label="Job Type"
            placeholder="Select type"
            className="w-full"
            required
            options={[
              { value: "FULL_TIME", label: "Full-time" },
              { value: "PART_TIME", label: "Part-time" },
              { value: "CONTRACT", label: "Contract" },
              { value: "INTERNSHIP", label: "Internship" },
              { value: "FREELANCE", label: "Freelance" },
              { value: "REMOTE", label: "Remote" },
            ]}
          />
        </div>

        {/* Experience Level & Location */}
        <div className="grid gap-4 sm:grid-cols-2">
          <WKSelect
            className="w-full"
            name="experienceLevel"
            label="Experience Level"
            placeholder="Select level"
            required
            options={[
              { value: "Entry", label: "Entry Level" },
              { value: "Mid", label: "Mid-level" },
              { value: "Senior", label: "Senior" },
              { value: "Lead", label: "Lead" },
              { value: "Executive", label: "Executive" },
            ]}
          />

          <WKInput
            name="location"
            label="Location"
            placeholder="e.g., Dhaka, Bangladesh"
            required
          />
        </div>

        {/* Industry & Discipline */}
        <div className="grid gap-4 sm:grid-cols-2">
          <WKSelect
            className="w-full"
            name="industryId"
            label="Industry"
            placeholder={categoriesLoading ? "Loading..." : "Select Industry"}
            required
            options={
              categories?.data?.map((cat) => ({
                value: cat.id,
                label: cat.name,
              })) || []
            }
          />
          <SubcategorySelect
            categories={categories}
            categoriesLoading={categoriesLoading}
          />
        </div>

        {/* Remote Checkbox */}
        <WKCheckbox name="isRemote" label="This is a remote position" />
      </div>
    </div>
  );
}
