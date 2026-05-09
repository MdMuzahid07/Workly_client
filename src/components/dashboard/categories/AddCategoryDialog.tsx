"use client";

import WkForm from "@/components/form/WkForm";
import WKIconPicker from "@/components/form/WKIconPicker";
import WKInput from "@/components/form/WkInput";
import WKTextArea from "@/components/form/WkTextArea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateCategoryMutation } from "@/redux/feature/category/categoryApi";
import { Loader2, Save } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (data: FieldValues) => void;
}

const AddCategoryDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: AddCategoryDialogProps) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await createCategory(data).unwrap();
      toast.success("Category created successfully");
      onSuccess(data);
      onOpenChange(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create category");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add New Category
          </DialogTitle>
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
            <WKInput
              name="slug"
              label="Slug"
              placeholder="e.g. software-engineering"
              required
            />
            <WKIconPicker name="icon" label="Category Icon" required />
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
              className="rounded-full font-bold shadow-md"
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
