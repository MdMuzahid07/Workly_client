"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Category, CategoryFormValues } from "@/types/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import WkForm from "../../form/WkForm";
import WkInput from "../../form/WkInput";
import WkTextArea from "../../form/WkTextArea";
import SubcategoriesArrayField from "./SubcategoriesArrayField";

interface EditCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onSubmit: (data: CategoryFormValues) => void;
}

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required").trim(),
  slug: z.string().min(1, "Slug is required").trim(),
  description: z.string(),
  subcategories: z.array(
    z.string().trim().min(1, "Subcategory cannot be empty"),
  ),
});

type CategoryFormData = z.infer<typeof categorySchema>;

const normalizeSlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const convertSubcategoriesArrayToString = (subcategories: string[]): string => {
  if (!subcategories || subcategories.length === 0) return "";
  return subcategories
    .map((item) => item.trim())
    .filter(Boolean)
    .join(", ");
};

const EditCategoryModal = ({
  open,
  onOpenChange,
  category,
  onSubmit,
}: EditCategoryModalProps) => {
  const getDefaultValues = (): CategoryFormData => {
    if (!category) {
      return {
        name: "",
        slug: "",
        description: "",
        subcategories: [],
      };
    }
    return {
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      subcategories: category.subcategories.map((sub) => sub.name),
    };
  };

  const handleSubmit = (data: CategoryFormData) => {
    const normalizedData: CategoryFormValues = {
      name: data.name.trim(),
      slug: normalizeSlug(data.slug) || normalizeSlug(data.name),
      description: data.description.trim(),
      subcategories: convertSubcategoriesArrayToString(data.subcategories),
    };
    onSubmit(normalizedData);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Update category information</DialogDescription>
        </DialogHeader>

        {category && (
          <WkForm<CategoryFormData>
            key={category.id}
            defaultValues={getDefaultValues()}
            resolver={zodResolver(categorySchema)}
            onSubmit={handleSubmit}
          >
            <CategoryFormFields />
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
            </div>
          </WkForm>
        )}
      </DialogContent>
    </Dialog>
  );
};

const CategoryFormFields = () => {
  const { setValue, watch } = useFormContext<CategoryFormData>();
  const name = watch("name");
  const slug = watch("slug");
  const [slugLocked, setSlugLocked] = useState(true);

  useEffect(() => {
    if (!slugLocked && name) {
      const autoSlug = normalizeSlug(name);
      if (autoSlug) {
        setValue("slug", autoSlug, { shouldValidate: true });
      }
    }
  }, [name, slugLocked, setValue]);

  useEffect(() => {
    if (slug) {
      const normalized = normalizeSlug(slug);
      if (normalized !== slug) {
        setSlugLocked(Boolean(normalized));
        if (normalized) {
          setValue("slug", normalized, { shouldValidate: true });
        }
      } else if (normalized) {
        setSlugLocked(true);
      }
    }
  }, [slug, setValue]);

  return (
    <div className="space-y-4">
      <WkInput
        name="name"
        label="Category Name"
        required
        placeholder="e.g., Engineering"
      />

      <div className="space-y-2">
        <WkInput
          name="slug"
          label="Slug"
          required
          placeholder="e.g., engineering"
        />
        <p className="text-muted-foreground text-xs">
          Auto-generated from name; you can override if needed.
        </p>
      </div>

      <WkTextArea
        name="description"
        label="Description"
        placeholder="Describe this category..."
        rows={3}
      />

      <SubcategoriesArrayField name="subcategories" />
    </div>
  );
};

export default EditCategoryModal;
