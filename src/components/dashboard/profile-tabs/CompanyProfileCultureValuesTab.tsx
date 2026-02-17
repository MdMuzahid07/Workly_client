/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import WKTextArea from "@/components/form/WkTextArea";
import { SectionCard } from "@/components/main/profile/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Heart,
  Lightbulb,
  Plus,
  Shield,
  Star,
  Target,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const VALUE_OPTIONS = [
  {
    value: "Innovation",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-900/50",
  },
  {
    value: "Collaboration",
    icon: Users,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-900/50",
  },
  {
    value: "Customer First",
    icon: Heart,
    color: "text-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    borderColor: "border-rose-200 dark:border-rose-900/50",
  },
  {
    value: "Excellence",
    icon: Star,
    color: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-900/50",
  },
  {
    value: "Integrity",
    icon: Shield,
    color: "text-violet-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    borderColor: "border-violet-200 dark:border-violet-900/50",
  },
  {
    value: "Agility",
    icon: Zap,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    borderColor: "border-cyan-200 dark:border-cyan-900/50",
  },
  {
    value: "Impact",
    icon: Target,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-900/50",
  },
  {
    value: "Growth",
    icon: RocketIcon,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    borderColor: "border-indigo-200 dark:border-indigo-900/50",
  },
] as const;

function RocketIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
      <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
    </svg>
  );
}

const CompanyProfileCultureValuesTab = ({
  currentProfile,
  isEditing,
  onMissionChange,
  onCultureSummaryChange,
  onValuesChange,
  initialValues = [],
}: {
  currentProfile: any;
  isEditing: boolean;
  onMissionChange?: (mission: string) => void;
  onCultureSummaryChange?: (cultureSummary: string) => void;
  onValuesChange?: (values: string[]) => void;
  initialValues?: string[];
}) => {
  const [newValue, setNewValue] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>(
    initialValues || currentProfile.values || [],
  );

  const methods = useForm({
    mode: "onChange",
    values: {
      mission: currentProfile.mission || "",
      cultureSummary: currentProfile.cultureSummary || "",
    },
  });

  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === "mission" && value.mission !== undefined) {
        onMissionChange?.(value.mission);
      }
      if (name === "cultureSummary" && value.cultureSummary !== undefined) {
        onCultureSummaryChange?.(value.cultureSummary);
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods, onMissionChange]);

  const handleAddValue = (valueToAdd: string) => {
    if (valueToAdd.trim() && !selectedValues.includes(valueToAdd.trim())) {
      const updatedValues = [...selectedValues, valueToAdd.trim()];
      setSelectedValues(updatedValues);
      setNewValue("");
      onValuesChange?.(updatedValues);
    }
  };

  const handleRemoveValue = (valueToRemove: string) => {
    const updatedValues = selectedValues.filter(
      (value) => value !== valueToRemove,
    );
    setSelectedValues(updatedValues);
    onValuesChange?.(updatedValues);
  };

  const getValueMetadata = (valueName: string) => {
    const option = VALUE_OPTIONS.find(
      (opt) => opt.value.toLowerCase() === valueName.toLowerCase(),
    );
    return {
      icon: option?.icon || Target,
      color: option?.color || "text-primary",
      bgColor: option?.bgColor || "bg-primary/5",
      borderColor: option?.borderColor || "border-primary/10",
    };
  };

  return (
    <TabsContent value="culture" className="space-y-10 focus:outline-none">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Mission Statement */}
        <SectionCard
          title="Mission Statement"
          isCompleted={!!currentProfile.mission}
          className="h-full"
        >
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <Target className="text-primary h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-foreground text-sm font-semibold">
                  Purpose & Strategic Intent
                </p>
                <p className="text-muted-foreground text-xs">
                  Define what your company exists to achieve.
                </p>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <FormProvider {...methods}>
                  <WKTextArea
                    name="mission"
                    label="Mission Statement"
                    placeholder="Our mission is to..."
                    className="min-h-[200px] resize-none"
                  />
                </FormProvider>
                <div className="bg-muted/30 rounded-xl border border-dashed p-4">
                  <p className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                    <Lightbulb className="h-3 w-3" /> Expert Design Tips
                  </p>
                  <ul className="text-muted-foreground list-inside list-disc space-y-2 text-xs">
                    <li>Focus on the specific problem you solve.</li>
                    <li>Keep it under 30 words for maximum impact.</li>
                    <li>Use active verbs and avoid jargon.</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-primary/5 border-primary/10 group relative overflow-hidden rounded-2xl border p-8">
                <div className="relative z-10">
                  {currentProfile.mission ? (
                    <p className="text-foreground/90 text-lg leading-relaxed font-medium italic">
                      &quot;{currentProfile.mission}&quot;
                    </p>
                  ) : (
                    <p className="text-muted-foreground text-center italic">
                      No mission statement defined yet.
                    </p>
                  )}
                </div>
                <Target className="text-primary/5 absolute -right-6 -bottom-6 h-32 w-32 rotate-12 transition-transform duration-500 group-hover:scale-110" />
              </div>
            )}
          </div>
        </SectionCard>

        {/* Company Values */}
        <SectionCard
          title="Core Values"
          isCompleted={selectedValues.length > 0}
          className="h-full"
        >
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                <Heart className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <p className="text-foreground text-sm font-semibold">
                  Culture & Principles
                </p>
                <p className="text-muted-foreground text-xs">
                  The beliefs that guide your {`team's`} conduct.
                </p>
              </div>
            </div>

            {isEditing && (
              <div className="space-y-4">
                <div className="mb-6 flex gap-2">
                  <Input
                    placeholder="Enter custom value..."
                    value={newValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewValue(e.target.value)
                    }
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      e.key === "Enter" && handleAddValue(newValue)
                    }
                    className="h-10"
                  />
                  <Button
                    onClick={() => handleAddValue(newValue)}
                    disabled={!newValue.trim()}
                    className="shrink-0"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>

                <div className="space-y-4">
                  <Label className="text-muted-foreground decoration-primary/30 text-xs font-semibold tracking-wider uppercase underline underline-offset-4">
                    Values Selection
                  </Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {VALUE_OPTIONS.map((opt) => {
                      const isSelected = selectedValues.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() =>
                            isSelected
                              ? handleRemoveValue(opt.value)
                              : handleAddValue(opt.value)
                          }
                          className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${
                            isSelected
                              ? "bg-primary/10 border-primary ring-primary/20 scale-95 ring-2"
                              : "bg-muted/50 hover:border-muted-foreground/30 border-transparent"
                          }`}
                        >
                          <opt.icon className={`h-5 w-5 ${opt.color}`} />
                          <span className="text-[10px] font-bold tracking-tight uppercase">
                            {opt.value}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedValues.length > 0 && (
                  <div className="flex flex-wrap gap-2 border-t pt-4">
                    {selectedValues.map((val) => (
                      <Badge
                        key={val}
                        variant="secondary"
                        className="bg-primary/10 text-primary gap-2 rounded-full border-none px-3 py-1.5 text-xs"
                      >
                        {val}
                        <X
                          className="hover:text-destructive h-3 w-3 cursor-pointer"
                          onClick={() => handleRemoveValue(val)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            {!isEditing && (
              <div className="grid grid-cols-1 gap-4">
                {selectedValues.length > 0 ? (
                  selectedValues.map((val) => {
                    const meta = getValueMetadata(val);
                    return (
                      <div
                        key={val}
                        className={`group dark:hover:bg-muted/20 flex items-center gap-4 rounded-2xl border p-4 transition-all hover:bg-white ${meta.bgColor} ${meta.borderColor}`}
                      >
                        <div
                          className={`rounded-xl bg-white p-3 shadow-sm transition-transform group-hover:scale-110 dark:bg-black/20`}
                        >
                          <meta.icon className={`h-5 w-5 ${meta.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-foreground font-bold tracking-tight">
                            {val}
                          </h4>
                          <p className="text-muted-foreground text-xs">
                            Fundamental principle driving our culture.
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-muted-foreground flex flex-col items-center justify-center rounded-3xl border-2 border-dashed py-12">
                    <Heart className="mb-3 h-12 w-12 opacity-20" />
                    <p className="text-sm">
                      No values specified for this profile.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      {/* Culture Summary Section */}
      <div className="from-primary/5 to-primary/5 rounded-3xl border border-white/10 bg-linear-to-r via-transparent p-8 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="bg-primary/10 text-primary mb-2 inline-flex rounded-2xl p-3">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            Our Living Culture
          </h3>

          {isEditing ? (
            <FormProvider {...methods}>
              <WKTextArea
                name="cultureSummary"
                label="Culture Summary"
                placeholder="Culture isn't just what we say; it's what we do..."
                className="min-h-[150px] resize-none border-white/10 bg-white/5 text-center"
              />
            </FormProvider>
          ) : (
            <p className="text-muted-foreground text-lg leading-relaxed">
              {currentProfile.cultureSummary ||
                "Culture isn't just what we say; it's what we do. By defining our mission and values, we create a compass that guides every hire, every meeting, and every line of code."}
            </p>
          )}
        </div>
      </div>
    </TabsContent>
  );
};

export default CompanyProfileCultureValuesTab;
