'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Rocket, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';
import WkForm from '../../form/WkForm';
import WkInput from '../../form/WkInput';
import WkTextArea from '../../form/WkTextArea';

interface AdvancedPlanBuilderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (data: {
    id: string;
    name: string;
    price: string;
    description: string;
    active: boolean;
    features: string[];
    subscriberCount: number;
    color: string;
    icon: React.ElementType;
    maxActiveJobs: number | null;
    maxUsers: number | null;
  }) => void;
}

const AdvancedPlanBuilderDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: AdvancedPlanBuilderDialogProps) => {
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data: {
    name: string;
    price: string;
    description: string;
    maxActiveJobs?: string;
    maxUsers?: string;
  }) => {
    const parsedJobs = data.maxActiveJobs ? parseInt(data.maxActiveJobs, 10) : 0;
    const parsedUsers = data.maxUsers ? parseInt(data.maxUsers, 10) : 0;

    onSuccess({
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      active: true,
      features,
      subscriberCount: 0,
      color: 'bg-indigo-600',
      icon: ShieldCheck,
      maxActiveJobs: parsedJobs > 0 ? parsedJobs : 95,
      maxUsers: parsedUsers > 0 ? parsedUsers : 20,
    });
    setFeatures([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
              <Rocket className="text-primary h-6 w-6" />
            </div>
            <div>
              <DialogTitle>Advanced Plan Builder</DialogTitle>
              <DialogDescription>
                Create a high-tier or custom enterprise package for specialized partners.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <WkForm
          onSubmit={handleFormSubmit}
          defaultValues={{
            name: 'Custom Enterprise',
            price: '999',
            maxActiveJobs: '0',
            maxUsers: '0',
          }}
        >
          <div className="custom-scrollbar grid max-h-[65vh] gap-6 overflow-y-auto px-1 py-6">
            <div className="bg-muted/30 grid grid-cols-2 gap-4 rounded-xl border p-4">
              <WkInput
                name="name"
                label="Plan Identity"
                placeholder="e.g. Fortune 500 Specialist"
                required
              />
              <WkInput name="price" label="Base Monthly Price ($)" type="number" required />
            </div>

            <WkTextArea name="description" label="Value Proposition / Description" required />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <WkInput
                  name="maxActiveJobs"
                  label="Active Job Limit"
                  type="number"
                  placeholder="0 for Unlimited"
                />
                <p className="text-muted-foreground text-[10px] font-medium opacity-70">
                  Enter 0 or leave blank for unlimited slots.
                </p>
              </div>
              <div className="space-y-1">
                <WkInput
                  name="maxUsers"
                  label="Maximum User Accounts"
                  type="number"
                  placeholder="0 for Unlimited"
                />
                <p className="text-muted-foreground text-[10px] font-medium opacity-70">
                  Define the size of the hiring team for this tier.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold">Custom Feature Modules</label>
                <Badge variant="outline" className="text-[10px] font-bold tracking-wider uppercase">
                  {features.length} Modules
                </Badge>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="e.g. White-label Career Portal"
                  className="bg-muted/50 focus:ring-primary h-11 flex-1 rounded-xl border-none px-4 text-sm transition-all outline-none focus:ring-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddFeature}
                  className="h-11 w-11 shrink-0 rounded-xl"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid max-h-[180px] grid-cols-1 gap-3 overflow-y-auto pt-1 pr-2 md:grid-cols-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-background group hover:border-primary/30 flex items-center justify-between rounded-xl border px-3 py-2.5 shadow-sm transition-all"
                  >
                    <span className="truncate text-xs font-bold opacity-80">{feature}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-lg opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      <X className="text-destructive h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 border-t pt-6 sm:gap-0">
            <Button
              variant="ghost"
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full font-bold"
            >
              Discard Draft
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 shadow-primary/20 rounded-full px-10 font-bold shadow-lg"
            >
              Deploy Custom Tier
            </Button>
          </DialogFooter>
        </WkForm>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedPlanBuilderDialog;
