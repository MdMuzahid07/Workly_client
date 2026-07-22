'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Category } from '@/types/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useUpdateCategoryMutation } from '../../../redux/feature/category/categoryApi';
import WKIconPicker from '../../form/WKIconPicker';
import WkForm from '../../form/WkForm';
import WkInput from '../../form/WkInput';
import WkTextArea from '../../form/WkTextArea';
import SubcategoriesArrayField from './SubcategoriesArrayField';
import SkillsArrayField from './SkillsArrayField';

interface ExtendedCategory extends Omit<Category, 'subcategories'> {
  subcategories: (string | { name: string })[];
  taxonomySkills?: { id: string; name: string; active: boolean }[];
}

interface EditCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
}

const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').trim(),
  slug: z.string().min(1, 'Slug is required').trim(),
  icon: z.string().min(1, 'Icon is required').trim(),
  description: z.string(),
  subcategories: z.array(z.string().trim().min(1, 'Subcategory cannot be empty')),
  skills: z.array(z.string().trim().min(1, 'Skill cannot be empty')),
});

type CategoryFormData = z.infer<typeof categorySchema>;

const normalizeSlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const EditCategoryModal = ({ open, onOpenChange, category }: EditCategoryModalProps) => {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const getDefaultValues = (): CategoryFormData => {
    if (!category) {
      return {
        name: '',
        slug: '',
        icon: '',
        description: '',
        subcategories: [],
        skills: [],
      };
    }
    return {
      name: category.name,
      slug: category.slug,
      icon: category.icon || '',
      description: category.description || '',
      subcategories: category.subcategories.map((sub) =>
        typeof sub === 'string' ? sub : sub?.name || '',
      ),
      skills: ((category as unknown as ExtendedCategory).taxonomySkills || []).map((s) => s.name),
    };
  };

  const handleSubmit = async (data: CategoryFormData) => {
    if (!category) return;

    try {
      const payload = {
        categoryId: category.id,
        name: data.name.trim(),
        icon: data.icon,
        slug: normalizeSlug(data.slug) || normalizeSlug(data.name),
        description: data.description.trim() || null,
        subcategories: data.subcategories.map((item) => item.trim()).filter(Boolean),
        skills: data.skills.map((item) => item.trim()).filter(Boolean),
      };

      const result = await updateCategory(payload).unwrap();

      if (result?.success) {
        toast.success(result?.message || 'Category updated successfully');
        onOpenChange(false);
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { errorSources: { message: string } } })?.data?.errorSources?.message ||
        'Failed to update category';
      toast.error(errorMessage);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-card border-border flex h-[85vh] max-h-[680px] w-full flex-col overflow-hidden rounded-2xl border p-0 shadow-2xl sm:max-w-4xl">
        <DialogHeader className="bg-card shrink-0 border-b px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-bold">Edit Category & Taxonomy</DialogTitle>
          <DialogDescription>
            Update basic details, subcategories, and skills mapping.
          </DialogDescription>
        </DialogHeader>

        {category && (
          <WkForm<CategoryFormData>
            key={category.id}
            defaultValues={getDefaultValues()}
            resolver={zodResolver(categorySchema)}
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <CategoryFormFields />
            </div>
            <div className="bg-card flex shrink-0 gap-3 border-t p-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="h-11 flex-1 rounded-full font-bold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/95 h-11 flex-1 rounded-full font-bold text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Saving Changes...' : 'Save Changes'}
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
  const name = watch('name');
  const slug = watch('slug');
  const [slugLocked, setSlugLocked] = useState(true);

  useEffect(() => {
    if (!slugLocked && name) {
      const autoSlug = normalizeSlug(name);
      if (autoSlug) {
        setValue('slug', autoSlug, { shouldValidate: true });
      }
    }
  }, [name, slugLocked, setValue]);

  useEffect(() => {
    if (slug) {
      const normalized = normalizeSlug(slug);
      if (normalized !== slug) {
        setSlugLocked(Boolean(normalized));
        if (normalized) {
          setValue('slug', normalized, { shouldValidate: true });
        }
      } else if (normalized) {
        setSlugLocked(true);
      }
    }
  }, [slug, setValue]);

  return (
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
      {/* Left Column: Basic Details */}
      <div className="space-y-5">
        <WkInput name="name" label="Category Name" required placeholder="e.g., Engineering" />

        <WKIconPicker name="icon" label="Category Icon" required />

        <div className="space-y-2">
          <WkInput name="slug" label="Slug" required placeholder="e.g., engineering" />
          <p className="text-muted-foreground text-xs opacity-75">
            Auto-generated from name; you can override if needed.
          </p>
        </div>

        <WkTextArea
          name="description"
          label="Description"
          placeholder="Describe this category..."
          rows={4}
        />
      </div>

      {/* Right Column: Taxonomy Elements */}
      <div className="bg-muted/10 border-border space-y-6 rounded-2xl border p-5">
        <SubcategoriesArrayField name="subcategories" />
        <SkillsArrayField name="skills" />
      </div>
    </div>
  );
};

export default EditCategoryModal;
