'use client';

import WkForm from '@/components/form/WkForm';
import WKIconPicker from '@/components/form/WKIconPicker';
import WKInput from '@/components/form/WkInput';
import WKTextArea from '@/components/form/WkTextArea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateCategoryMutation } from '@/redux/feature/category/categoryApi';
import { Loader2, Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { getErrorMessage } from '@/types/api';

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (data: FieldValues) => void;
}

const AddCategoryDialog = ({ open, onOpenChange, onSuccess }: AddCategoryDialogProps) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [skills, setSkills] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState('');

  // Reset skills state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setSkills([]);
      setInputVal('');
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = inputVal.trim();
      if (!val) return;

      if (skills.map((s) => s.toLowerCase()).includes(val.toLowerCase())) {
        toast.error('This skill has already been added to the list');
        return;
      }

      setSkills((prev) => [...prev, val]);
      setInputVal('');
    } else if (e.key === 'Backspace' && !inputVal && skills.length > 0) {
      setSkills((prev) => prev.slice(0, -1));
    }
  };

  const removeSkill = (indexToRemove: number) => {
    setSkills((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await createCategory({
        ...data,
        skills,
      }).unwrap();

      toast.success('Category created successfully');
      onSuccess(data);
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to create category'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Category</DialogTitle>
          <DialogDescription>
            Create a new industry classification for the platform.
          </DialogDescription>
        </DialogHeader>

        <WkForm onSubmit={onSubmit}>
          <div className="space-y-4 py-4">
            <WKInput
              name="name"
              label="Industry Name"
              placeholder="e.g. Software Engineering"
              required
            />
            <WKInput name="slug" label="Slug" placeholder="e.g. software-engineering" required />
            <WKIconPicker name="icon" label="Category Icon" required />

            {/* Fiverr-style Skills Tag Input */}
            <div className="space-y-2">
              <label className="text-muted-foreground text-xs font-semibold uppercase">
                Initial Skills List
              </label>
              <div className="border-input bg-background ring-offset-background focus-within:ring-primary/20 focus-within:border-primary flex min-h-[80px] w-full flex-wrap content-start gap-2 rounded-xl border p-3 text-sm transition-all focus-within:ring-2 focus-within:ring-offset-1 focus-within:outline-none">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1.5 border-none px-2.5 py-1 text-xs font-bold transition-all"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="hover:text-destructive text-muted-foreground cursor-pointer transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </Badge>
                ))}
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    skills.length === 0 ? 'Type skill and press Enter...' : 'Add more...'
                  }
                  className="placeholder:text-muted-foreground/60 min-w-[120px] flex-1 bg-transparent py-1 text-sm outline-none"
                />
              </div>
              <p className="text-muted-foreground text-[10px] leading-relaxed opacity-80">
                * Type a skill name and press <strong>Enter</strong> or <strong>comma (,)</strong>{' '}
                to add it.
              </p>
            </div>

            <WKTextArea
              name="description"
              label="Description"
              placeholder="Describe this industry briefly..."
              rows={3}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/95 rounded-full font-bold text-white shadow-md"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Category
            </Button>
          </div>
        </WkForm>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
