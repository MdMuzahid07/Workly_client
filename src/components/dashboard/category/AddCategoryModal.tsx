"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CategoryFormValues } from "@/types/categories";
import { useMemo, useState } from "react";

interface AddCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CategoryFormValues) => void;
}

const initialFormState: CategoryFormValues = {
  name: "",
  slug: "",
  description: "",
  subcategories: "",
};

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const AddCategoryModal = ({
  open,
  onOpenChange,
  onSubmit,
}: AddCategoryModalProps) => {
  const [formData, setFormData] =
    useState<CategoryFormValues>(initialFormState);
  const [slugLocked, setSlugLocked] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; slug?: string }>({});

  const isValid = useMemo(
    () => Boolean(formData.name.trim()) && Boolean(formData.slug.trim()),
    [formData.name, formData.slug],
  );

  const validate = () => {
    const nextErrors: { name?: string; slug?: string } = {};
    if (!formData.name.trim()) nextErrors.name = "Category name is required.";
    if (!formData.slug.trim()) nextErrors.slug = "Slug is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      slug: normalizeSlug(formData.slug) || normalizeSlug(formData.name),
      description: formData.description.trim(),
      subcategories: formData.subcategories.trim(),
    });
    setFormData(initialFormState);
    setSlugLocked(false);
    setErrors({});
  };

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: slugLocked ? prev.slug : normalizeSlug(value),
    }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  };

  const handleSlugChange = (value: string) => {
    const nextSlug = normalizeSlug(value);
    setSlugLocked(Boolean(nextSlug));
    setFormData((prev) => ({ ...prev, slug: nextSlug }));
    if (errors.slug) setErrors((prev) => ({ ...prev, slug: undefined }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubcategoriesChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subcategories: value }));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setFormData(initialFormState);
      setSlugLocked(false);
      setErrors({});
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new job category for your platform
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Engineering"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
            {errors.name && (
              <p className="text-destructive text-xs">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              placeholder="e.g., engineering"
              value={formData.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              required
            />
            <p className="text-muted-foreground text-xs">
              Auto-generated from name; you can override if needed.
            </p>
            {errors.slug && (
              <p className="text-destructive text-xs">{errors.slug}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe this category..."
              value={formData.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subcategories">Subcategories</Label>
            <Textarea
              id="subcategories"
              name="subcategories"
              placeholder="Comma separated e.g., Frontend, Backend"
              value={formData.subcategories}
              onChange={(e) => handleSubcategoriesChange(e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={!isValid}>
              Create Category
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
