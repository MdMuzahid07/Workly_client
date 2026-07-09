"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import WkForm from "../../form/WkForm";
import WkInput from "../../form/WkInput";
import WkTextArea from "../../form/WkTextArea";

interface EditPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: {
    name: string;
    price: number | string;
    description: string;
    features?: string[];
    firstTimeDiscountPercent?: number;
  } | null;
  onSuccess: (data: {
    name: string;
    price: number | string;
    description: string;
    features?: string[];
    firstTimeDiscountPercent?: number;
  }) => void;
}

const EditPlanDialog = ({
  open,
  onOpenChange,
  plan,
  onSuccess,
}: EditPlanDialogProps) => {
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    if (plan) {
      setFeatures(plan.features || []);
    }
  }, [plan]);

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data: {
    name: string;
    price: string;
    description: string;
    firstTimeDiscountPercent?: string;
  }) => {
    onSuccess({
      ...plan,
      ...data,
      firstTimeDiscountPercent: data.firstTimeDiscountPercent
        ? parseInt(data.firstTimeDiscountPercent, 10)
        : 0,
      features,
    });
    onOpenChange(false);
  };

  if (!plan) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Plan: {plan.name}</DialogTitle>
          <DialogDescription>
            Modify pricing, description, and feature sets for the selected tier.
          </DialogDescription>
        </DialogHeader>

        <WkForm
          onSubmit={handleFormSubmit}
          defaultValues={{
            name: plan.name,
            description: plan.description,
            price: plan.price.toString(),
            firstTimeDiscountPercent: (
              plan.firstTimeDiscountPercent ?? 0
            ).toString(),
          }}
        >
          <div className="custom-scrollbar grid max-h-[60vh] gap-4 overflow-y-auto px-1 py-4">
            <div className="grid grid-cols-2 gap-4">
              <WkInput name="name" label="Plan Name" required />
              <WkInput
                name="price"
                label="Monthly Price ($)"
                type="number"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <WkInput
                name="firstTimeDiscountPercent"
                label="First Time Discount (%)"
                type="number"
                placeholder="0"
                required
              />
            </div>

            <WkTextArea name="description" label="Short Description" required />

            <div className="space-y-3">
              <label className="text-sm font-bold">Plan Features</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="e.g. Priority Support"
                  className="bg-muted/50 focus:ring-primary h-10 flex-1 rounded-lg border-none px-4 text-sm outline-none focus:ring-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddFeature}
                  size="icon"
                  className="shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="max-h-[200px] space-y-2 overflow-y-auto pr-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-muted/30 group hover:bg-muted/50 flex items-center justify-between rounded-lg border px-3 py-2 transition-colors"
                  >
                    <span className="text-sm font-medium">{feature}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      <X className="text-destructive h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="border-t pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary rounded-full px-8 font-bold"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </WkForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlanDialog;
