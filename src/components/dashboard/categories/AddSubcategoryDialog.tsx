'use client';

import WkForm from '@/components/form/WkForm';
import WKInput from '@/components/form/WkInput';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUpdateCategoryMutation } from '@/redux/feature/category/categoryApi';
import { Loader2, Plus, Tag } from 'lucide-react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { getErrorMessage } from '@/types/api';

interface AddSubcategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (data: FieldValues) => void;
  parentCategory: { id: string; name: string; subcategories: string[] } | null;
}

const AddSubcategoryDialog = ({
  open,
  onOpenChange,
  onSuccess,
  parentCategory,
}: AddSubcategoryDialogProps) => {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!parentCategory) return;

    try {
      await updateCategory({
        categoryId: parentCategory.id,
        subcategories: [...parentCategory.subcategories, data.name],
      }).unwrap();

      toast.success('Subcategory added successfully');
      onSuccess(data);
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to add subcategory'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mb-1 flex items-center gap-2">
            <Tag className="text-primary h-5 w-5" />
            <DialogTitle className="text-xl font-bold">Add Subcategory</DialogTitle>
          </div>
          <DialogDescription>
            Add a new niche specialized role under{' '}
            <Badge variant="secondary" className="mx-1 font-bold">
              {parentCategory?.name}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <WkForm onSubmit={onSubmit}>
          <div className="space-y-4 py-4">
            <WKInput
              name="name"
              label="Subcategory Name"
              placeholder="e.g. React Developer, UI Designer"
              required
            />
            <p className="text-muted-foreground text-[10px] leading-relaxed">
              * This will be added as a searchable tag for jobs in this category.
            </p>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-xs font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-full font-bold shadow-sm"
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              ) : (
                <Plus className="mr-2 h-3 w-3" />
              )}
              Add Niche Tag
            </Button>
          </div>
        </WkForm>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubcategoryDialog;
