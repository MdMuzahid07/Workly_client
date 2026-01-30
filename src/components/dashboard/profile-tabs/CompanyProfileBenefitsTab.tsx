/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CompanyBenefit } from "@/types/company-benefit";
import { TabsContent } from "@radix-ui/react-tabs";
import { Award, Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import WKCheckbox from "@/components/form/WKCheckbox";
import WkForm from "@/components/form/WkForm";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  benefitCategories,
  benefitIcons,
} from "../../../constants/companyBenefits";
import WKInput from "../../form/WkInput";
import WKSelect from "../../form/WkSelect";
import WKTextArea from "../../form/WkTextArea";

interface CompanyProfileBenefitsTabProps {
  currentProfile: any;
  isEditing: boolean;
  onBenefitsChange: (benefits: CompanyBenefit[]) => void;
}

// Define the form schema with proper types
const benefitFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title cannot exceed 255 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  category: z.string().optional(),
  icon: z.string().optional(),
  isActive: z.boolean(),
});

// Manually define the form data type to avoid Zod inference issues
interface BenefitFormData {
  title: string;
  description?: string;
  category?: string;
  icon?: string;
  isActive: boolean;
}

interface BenefitFormProps {
  initialData?: Partial<BenefitFormData>;
  onSubmit: (data: BenefitFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const BenefitForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: BenefitFormProps) => {
  const defaultValues: BenefitFormData = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    icon: initialData?.icon || "award",
    isActive: initialData?.isActive ?? true,
  };

  // Create a handler that ensures proper typing
  const handleFormSubmit = (data: z.infer<typeof benefitFormSchema>) => {
    // Convert the Zod-inferred type to our manually defined type
    const formData: BenefitFormData = {
      title: data.title,
      description: data.description,
      category: data.category,
      icon: data.icon,
      isActive: data.isActive,
    };
    onSubmit(formData);
  };

  return (
    <WkForm<z.infer<typeof benefitFormSchema>>
      defaultValues={defaultValues}
      resolver={zodResolver(benefitFormSchema)}
      onSubmit={handleFormSubmit}
    >
      <div className="space-y-6 p-1">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <WKInput
            name="title"
            label="Benefit Title"
            placeholder="e.g., Health Insurance, Flexible Hours"
            required
            size="lg"
            className="rounded-full"
          />

          <WKSelect
            name="category"
            label="Category"
            placeholder="Select category"
            options={benefitCategories}
            size="lg"
            className="rounded-full"
          />
        </div>

        <WKTextArea
          name="description"
          label="Description"
          placeholder="Describe the benefit details..."
          rows={3}
          size="lg"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <WKSelect
            name="icon"
            label="Icon"
            placeholder="Select an icon"
            options={benefitIcons}
            className="rounded-full"
            size="lg"
          />

          <div className="pt-8">
            <WKCheckbox
              name="isActive"
              label="Active Benefit"
              description="Show this benefit to employees and job seekers"
              className="rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData?.title ? "Update" : "Add"}{" "}
            Benefit
          </Button>
        </div>
      </div>
    </WkForm>
  );
};

const CompanyProfileBenefitsTab = ({
  currentProfile,
  isEditing,
  onBenefitsChange,
}: CompanyProfileBenefitsTabProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<CompanyBenefit | null>(
    null,
  );
  const [isFormLoading, setIsFormLoading] = useState(false);

  // Parse benefits from current profile
  const benefits: CompanyBenefit[] =
    currentProfile.benefits
      ?.filter((b: any) => b && (typeof b === "object" ? b.title : b))
      .map((benefit: any) => {
        if (typeof benefit === "string") {
          return {
            id: `temp-${Date.now()}-${benefit}`,
            title: benefit,
            description: "",
            isActive: true,
          };
        }
        return {
          id: benefit.id || `temp-${Date.now()}-${benefit.title}`,
          title: benefit.title || "",
          description: benefit.description || "",
          category: benefit.category || "",
          icon: benefit.icon || "award",
          isActive: benefit.isActive ?? true,
        };
      }) || [];

  const getCategoryLabel = (categoryValue?: string) => {
    if (!categoryValue) return "Uncategorized";
    const category = benefitCategories.find(
      (cat) => cat.value === categoryValue,
    );
    return category?.label || categoryValue;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getIconComponent = (iconName?: string) => {
    //*TODO:   map icon names to actual Lucide components
    return Award;
  };

  const handleAddBenefit = async (data: BenefitFormData) => {
    setIsFormLoading(true);
    try {
      const newBenefit: CompanyBenefit = {
        ...data,
        id: editingBenefit?.id || `temp-${Date.now()}`,
      };

      const updatedBenefits = editingBenefit
        ? benefits.map((b) => (b.id === editingBenefit.id ? newBenefit : b))
        : [...benefits, newBenefit];

      onBenefitsChange(updatedBenefits);
      setIsDialogOpen(false);
      setEditingBenefit(null);
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleEditBenefit = (benefit: CompanyBenefit) => {
    setEditingBenefit(benefit);
    setIsDialogOpen(true);
  };

  const handleDeleteBenefit = (benefitId: string) => {
    const updatedBenefits = benefits.filter((b) => b.id !== benefitId);
    onBenefitsChange(updatedBenefits);
  };

  const handleCancelEdit = () => {
    setIsDialogOpen(false);
    setEditingBenefit(null);
  };

  const activeBenefits = benefits.filter((b) => b.isActive);
  const inactiveBenefits = benefits.filter((b) => !b.isActive);

  return (
    <>
      <TabsContent value="benefits" className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Company Benefits</CardTitle>
              <CardDescription>
                Showcase the benefits you offer to attract top talent
              </CardDescription>
            </div>
            {isEditing && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setEditingBenefit(null)}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Benefit
                  </Button>
                </DialogTrigger>
              </Dialog>
            )}
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Active Benefits Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Active Benefits ({activeBenefits.length})
                </h3>
              </div>

              {activeBenefits.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {activeBenefits.map((benefit) => {
                    const Icon = getIconComponent(benefit.icon);
                    return (
                      <Card
                        key={benefit.id}
                        className="border-border hover:border-primary/20 transition-all hover:shadow-sm"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="bg-primary/10 text-primary rounded-lg p-2">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="leading-tight font-semibold">
                                  {benefit.title}
                                </h4>
                                {benefit.category && (
                                  <span className="text-muted-foreground text-xs font-medium">
                                    {getCategoryLabel(benefit.category)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {isEditing && (
                              <div className="flex gap-1">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                          handleEditBenefit(benefit)
                                        }
                                        className="h-8 w-8"
                                      >
                                        <Edit2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Edit benefit</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                          handleDeleteBenefit(benefit.id!)
                                        }
                                        className="text-destructive hover:text-destructive h-8 w-8"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Delete benefit</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            )}
                          </div>

                          {benefit.description && (
                            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                              {benefit.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="border-border bg-muted/30 border-2 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <Award className="text-muted-foreground mb-4 h-12 w-12" />
                    <h3 className="mb-2 text-lg font-semibold">
                      No benefits added yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Add benefits to make your company more attractive to
                      candidates
                    </p>
                    {isEditing && (
                      <Button
                        onClick={() => setIsDialogOpen(true)}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Your First Benefit
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Inactive Benefits Section */}
            {inactiveBenefits.length > 0 && isEditing && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-muted-foreground text-lg font-semibold">
                    Inactive Benefits ({inactiveBenefits.length})
                  </h3>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {inactiveBenefits.map((benefit) => {
                      const Icon = getIconComponent(benefit.icon);
                      return (
                        <div
                          key={benefit.id}
                          className="border-border bg-card rounded-lg border p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-muted-foreground rounded-lg p-2">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <h4 className="text-muted-foreground font-medium">
                                  {benefit.title}
                                </h4>
                                {benefit.category && (
                                  <span className="text-muted-foreground/70 text-xs">
                                    {getCategoryLabel(benefit.category)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const updatedBenefits = benefits.map((b) =>
                                    b.id === benefit.id
                                      ? { ...b, isActive: true }
                                      : b,
                                  );
                                  onBenefitsChange(updatedBenefits);
                                }}
                                className="h-7 w-7"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteBenefit(benefit.id!)}
                                className="text-destructive hover:text-destructive h-7 w-7"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Add/Edit Benefit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingBenefit ? "Edit Benefit" : "Add New Benefit"}
            </DialogTitle>
            <DialogDescription>
              {editingBenefit
                ? "Update the benefit details below."
                : "Add a new benefit to showcase to employees and candidates."}
            </DialogDescription>
          </DialogHeader>

          <BenefitForm
            initialData={editingBenefit || undefined}
            onSubmit={handleAddBenefit}
            onCancel={handleCancelEdit}
            isLoading={isFormLoading}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CompanyProfileBenefitsTab;
