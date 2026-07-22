'use client';

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
import { Loader2, Plus, Award, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/types/api';

interface AddSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  parentCategory: {
    id: string;
    name: string;
    taxonomySkills?: { id: string; name: string; active: boolean }[];
  } | null;
}

const AddSkillDialog = ({ open, onOpenChange, onSuccess, parentCategory }: AddSkillDialogProps) => {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const [skills, setSkills] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = inputVal.trim();
      if (!val) return;

      const existingSkillNames = (parentCategory?.taxonomySkills || []).map((s) =>
        s.name.toLowerCase(),
      );

      const isDuplicate =
        existingSkillNames.includes(val.toLowerCase()) ||
        skills.map((s) => s.toLowerCase()).includes(val.toLowerCase());

      if (isDuplicate) {
        toast.error('This skill already exists');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentCategory) return;
    if (skills.length === 0) {
      toast.error('Please add at least one skill tag');
      return;
    }

    try {
      const existingSkillNames = (parentCategory.taxonomySkills || []).map((s) => s.name);

      await updateCategory({
        categoryId: parentCategory.id,
        skills: [...existingSkillNames, ...skills],
      }).unwrap();

      toast.success('Taxonomy skills added successfully');
      setSkills([]);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to add skills'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mb-1 flex items-center gap-2">
            <Award className="text-primary h-5 w-5" />
            <DialogTitle className="text-xl font-bold">Add Taxonomy Skills</DialogTitle>
          </div>
          <DialogDescription>
            Add new technical skills under{' '}
            <Badge variant="secondary" className="mx-1 font-bold">
              {parentCategory?.name}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3 py-4">
            <label className="text-muted-foreground text-xs font-semibold uppercase">
              Skills List <span className="text-destructive">*</span>
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
                placeholder={skills.length === 0 ? 'Type skill and press Enter...' : 'Add more...'}
                className="placeholder:text-muted-foreground/60 min-w-[120px] flex-1 bg-transparent py-1 text-sm outline-none"
              />
            </div>
            <p className="text-muted-foreground text-[10px] leading-relaxed opacity-80">
              * Type a skill name (e.g. React Native, Docker) and press <strong>Enter</strong> or{' '}
              <strong>comma (,)</strong> to add it as a tag.
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
              className="bg-primary hover:bg-primary/95 rounded-full font-bold text-white shadow-sm"
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              ) : (
                <Plus className="mr-2 h-3 w-3" />
              )}
              Add Skills
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSkillDialog;
