"use client";

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import WKSelect from "@/components/form/WkSelect";
import { JobFormData } from "../schema";

interface SubcategorySelectProps {
  categories:
    | {
        data?: { id: string; name: string; subcategories: string[] }[];
      }
    | undefined;
  categoriesLoading: boolean;
}

export default function SubcategorySelect({
  categories,
  categoriesLoading,
}: SubcategorySelectProps) {
  const { watch } = useFormContext<JobFormData>();
  const selectedIndustry = watch("industryId");

  const subcategoryOptions = useMemo(() => {
    if (!categories?.data || !selectedIndustry) return [];

    const category = categories.data.find((cat) => cat.id === selectedIndustry);
    return (
      category?.subcategories.map((sub: string) => ({
        value: sub,
        label: sub,
      })) || []
    );
  }, [categories, selectedIndustry]);

  return (
    <WKSelect
      className="w-full"
      name="discipline"
      label="Discipline"
      placeholder={
        categoriesLoading
          ? "Loading disciplines..."
          : selectedIndustry
            ? "Select discipline"
            : "Select industry first"
      }
      required
      disabled={!selectedIndustry || categoriesLoading}
      options={subcategoryOptions}
    />
  );
}
