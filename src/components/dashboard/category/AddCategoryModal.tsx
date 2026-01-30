"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useCreateCategoryMutation } from "../../../redux/feature/category/categoryApi";
import WkForm from "../../form/WkForm";
import WKIconPicker from "../../form/WKIconPicker ";
import WkInput from "../../form/WkInput";
import WkTextArea from "../../form/WkTextArea";
import SubcategoriesArrayField from "./SubcategoriesArrayField";

interface AddCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required").trim(),
  icon: z.string().min(1, "Icon is required").trim(),
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

const defaultValues: CategoryFormData = {
  name: "",
  slug: "",
  description: "",
  icon: "",
  subcategories: [],
};

const AddCategoryModal = ({ open, onOpenChange }: AddCategoryModalProps) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSubmit = async (data: CategoryFormData) => {
    try {
      const payload = {
        name: data.name.trim(),
        icon: data.icon,
        slug: normalizeSlug(data.slug) || normalizeSlug(data.name),
        description: data.description.trim() || null,
        subcategories: data.subcategories
          .map((item) => item.trim())
          .filter(Boolean),
        active: true,
      };

      const result = await createCategory(payload).unwrap();
      console.log("Submitting category:", payload, result);

      if (result?.success) {
        toast.success(result?.message || "Category created successfully");
        onOpenChange(false);
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { errorSources: { message: string } } })?.data
          ?.errorSources?.message || "Failed to create category";
      toast.error(errorMessage);
      console.log(error);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new job category for your platform
          </DialogDescription>
        </DialogHeader>

        <WkForm<CategoryFormData>
          defaultValues={defaultValues}
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
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Category"}
            </Button>
          </div>
        </WkForm>
      </DialogContent>
    </Dialog>
  );
};

const CategoryFormFields = () => {
  const { setValue, watch } = useFormContext<CategoryFormData>();
  const name = watch("name");
  const slug = watch("slug");
  const [slugLocked, setSlugLocked] = useState(false);

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
      <WKIconPicker name="icon" label="Category Icon" required />

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

export default AddCategoryModal;
