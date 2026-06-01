/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanyBenefit } from "@/types/company-benefit";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Award,
  Briefcase,
  Clock,
  Coffee,
  Edit2,
  Heart,
  Home,
  Shield,
  Smile,
  Trash2,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

import WKCheckbox from "@/components/form/WKCheckbox";
import WkForm from "@/components/form/WkForm";
import { SectionCard } from "@/components/main/profile/SectionCard";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  benefitCategories,
  benefitIcons,
} from "../../../constants/companyBenefits";
import WKInput from "../../form/WkInput";
import WKSelect from "../../form/WkSelect";
import WKTextArea from "../../form/WkTextArea";

const benefitFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(60, "Title too long"),
  description: z.string().max(300, "Description too long").optional(),
  category: z.string().optional(),
  icon: z.string().optional(),
  isActive: z.boolean(),
});

type BenefitFormData = z.infer<typeof benefitFormSchema>;

const ICON_MAP: Record<string, any> = {
  award: Award,
  heart: Heart,
  zap: Zap,
  coffee: Coffee,
  home: Home,
  smile: Smile,
  clock: Clock,
  shield: Shield,
  briefcase: Briefcase,
};

const CompanyProfileBenefitsTab = ({
  currentProfile,
  isEditing,
  onBenefitsChange,
}: {
  currentProfile: any;
  isEditing: boolean;
  onBenefitsChange: (benefits: CompanyBenefit[]) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<CompanyBenefit | null>(
    null,
  );
  const [isFormLoading, setIsFormLoading] = useState(false);

  const benefits: CompanyBenefit[] = useMemo(() => {
    return (currentProfile?.benefits || []).map((b: any) => {
      if (typeof b === "string")
        return { id: Math.random().toString(), title: b, isActive: true };
      return {
        id: b.id || Math.random().toString(),
        title: b.title || "",
        description: b.description || "",
        category: b.category || "",
        icon: b.icon || "award",
        isActive: b.isActive ?? true,
      };
    });
  }, [currentProfile?.benefits]);

  const activeBenefits = benefits.filter((b) => b.isActive);
  const inactiveBenefits = benefits.filter((b) => !b.isActive);

  const handleAddBenefit = async (data: BenefitFormData) => {
    setIsFormLoading(true);
    try {
      const newBenefit: CompanyBenefit = {
        ...data,
        id: editingBenefit?.id || `temp-${Date.now()}`,
      };
      const updated = editingBenefit
        ? benefits.map((b) => (b.id === editingBenefit.id ? newBenefit : b))
        : [...benefits, newBenefit];
      onBenefitsChange(updated);
      setIsDialogOpen(false);
      setEditingBenefit(null);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <TabsContent value="benefits" className="space-y-10 focus:outline-none">
      <SectionCard
        title="Company perks & benefits"
        isCompleted={activeBenefits.length > 0}
        onAdd={
          isEditing
            ? () => {
                setEditingBenefit(null);
                setIsDialogOpen(true);
              }
            : undefined
        }
      >
        <div className="space-y-8">
          <div className="bg-primary/5 border-primary/20 flex items-center gap-4 rounded-2xl border border-dashed p-6">
            <div className="bg-primary/10 text-primary rounded-full p-3">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-foreground font-bold">Talent Magnet</h4>
              <p className="text-muted-foreground text-sm">
                Comprehensive benefits packages increase candidate application
                rates by up to 40%.
              </p>
            </div>
          </div>

          {activeBenefits.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeBenefits.map((benefit) => {
                const Icon = ICON_MAP[benefit.icon || "award"] || Award;
                return (
                  <div
                    key={benefit.id}
                    className="group bg-card relative overflow-hidden rounded-2xl border p-6"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                      {isEditing && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingBenefit(benefit);
                              setIsDialogOpen(true);
                            }}
                            className="hover:bg-primary/10 hover:text-primary h-8 w-8"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              onBenefitsChange(
                                benefits.filter((b) => b.id !== benefit.id),
                              )
                            }
                            className="hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="bg-primary/10 text-primary w-fit rounded-xl p-3 transition-transform group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-foreground group-hover:text-primary mb-1 font-bold transition-colors">
                          {benefit.title}
                        </h4>
                        <p className="text-muted-foreground mb-3 text-xs font-bold tracking-widest uppercase">
                          {benefit.category || "General"}
                        </p>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                          {benefit.description ||
                            "Exciting perk for our amazing team members."}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-muted-foreground bg-muted/20 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed py-20">
              <Award className="mb-4 h-16 w-16 opacity-10" />
              <p className="text-lg font-medium">No perks listed yet.</p>
              <p className="text-sm opacity-60">
                Add some benefits to stand out!
              </p>
            </div>
          )}

          {inactiveBenefits.length > 0 && isEditing && (
            <div className="space-y-4 border-t pt-8">
              <h3 className="text-muted-foreground flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                <Clock className="h-3 w-3" /> Draft / Hidden Benefits
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {inactiveBenefits.map((benefit) => (
                  <div
                    key={benefit.id}
                    className="bg-muted/30 flex items-center justify-between rounded-xl border border-dashed p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-muted rounded-lg p-2">
                        <Award className="text-muted-foreground h-4 w-4" />
                      </div>
                      <span className="text-muted-foreground text-sm font-medium">
                        {benefit.title}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onBenefitsChange(
                            benefits.map((b) =>
                              b.id === benefit.id
                                ? { ...b, isActive: true }
                                : b,
                            ),
                          )
                        }
                        className="text-primary text-xs font-bold"
                      >
                        Activate
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onBenefitsChange(
                            benefits.filter((b) => b.id !== benefit.id),
                          )
                        }
                        className="text-destructive h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingBenefit ? "Refine Benefit" : "New Company Perk"}
            </DialogTitle>
            <DialogDescription>
              Define the details of this offering to attract candidates.
            </DialogDescription>
          </DialogHeader>
          <BenefitForm
            initialValues={editingBenefit || undefined}
            onSubmit={handleAddBenefit}
            onCancel={() => setIsDialogOpen(false)}
            isLoading={isFormLoading}
          />
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
};

const BenefitForm = ({ initialValues, onSubmit, onCancel, isLoading }: any) => {
  return (
    <WkForm<BenefitFormData>
      defaultValues={
        initialValues || {
          title: "",
          description: "",
          category: "Health & Wellness",
          icon: "award",
          isActive: true,
        }
      }
      resolver={zodResolver(benefitFormSchema)}
      onSubmit={onSubmit}
    >
      <div className="space-y-6 pt-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <WKInput
            name="title"
            label="Benefit Name"
            placeholder="e.g. Health Coverage"
            required
          />
          <WKSelect
            name="category"
            label="Category"
            placeholder=""
            options={benefitCategories}
            required
          />
        </div>
        <WKTextArea
          name="description"
          label="Detailed Description"
          placeholder="Explain what this benefit includes..."
          rows={3}
        />
        <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-2">
          <WKSelect
            placeholder=""
            name="icon"
            label="Visual Icon"
            options={benefitIcons}
          />
          <div className="pb-2">
            <WKCheckbox name="isActive" label="Make publicly visible" />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Save Benefit"}
          </Button>
        </div>
      </div>
    </WkForm>
  );
};

export default CompanyProfileBenefitsTab;
