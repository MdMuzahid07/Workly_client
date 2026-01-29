/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Check,
  Globe,
  Heart,
  Plus,
  Shield,
  Star,
  Target,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

// ====== predefined values with icons for suggestions ====>
const VALUE_OPTIONS = [
  {
    value: "Innovation",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    value: "Collaboration",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/30",
  },
  {
    value: "Customer First",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/30",
  },
  {
    value: "Excellence",
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
  },
  {
    value: "Integrity",
    icon: Shield,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    value: "Sustainability",
    icon: Globe,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    value: "Diversity",
    icon: Users,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  {
    value: "Accountability",
    icon: Target,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    value: "Transparency",
    icon: Shield,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
  },
  {
    value: "Agility",
    icon: Zap,
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
  },
] as const;

interface CompanyProfileCultureValuesTabProps {
  currentProfile: any;
  isEditing: boolean;
  onMissionChange?: (mission: string) => void;
  onValuesChange?: (values: string[]) => void;
  initialValues?: string[];
}

const CompanyProfileCultureValuesTab = ({
  currentProfile,
  isEditing,
  onMissionChange,
  onValuesChange,
  initialValues = [],
}: CompanyProfileCultureValuesTabProps) => {
  const [newValue, setNewValue] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>(
    initialValues || currentProfile.values || [],
  );
  const [mission, setMission] = useState(currentProfile.mission || "");

  // Get values from current profile
  const values = currentProfile.values || [];

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

  const handleMissionChange = (newMission: string) => {
    setMission(newMission);
    onMissionChange?.(newMission);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getValueIcon = (valueName: string) => {
    const option = VALUE_OPTIONS.find(
      (opt) =>
        opt.value.toLowerCase() === valueName.toLowerCase() ||
        valueName.toLowerCase().includes(opt.value.toLowerCase()),
    );
    return option?.icon || Target;
  };

  const getValueColor = (valueName: string) => {
    const option = VALUE_OPTIONS.find(
      (opt) =>
        opt.value.toLowerCase() === valueName.toLowerCase() ||
        valueName.toLowerCase().includes(opt.value.toLowerCase()),
    );
    return {
      icon: option?.icon || Target,
      color: option?.color || "text-gray-500",
      bgColor: option?.bgColor || "bg-gray-50 dark:bg-gray-950/30",
    };
  };

  return (
    <TabsContent value="culture" className="space-y-6">
      {/* Mission Statement Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Mission Statement
          </CardTitle>
          <CardDescription>
            Define your {`company's`} purpose and what you strive to achieve
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                placeholder="Describe your company's mission..."
                value={mission}
                onChange={(e) => handleMissionChange(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>Be clear and inspirational</span>
                <span>{mission.length}/500 characters</span>
              </div>
              <div className="text-muted-foreground space-y-1 text-sm">
                <p className="font-medium">
                  Tips for a great mission statement:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Start with your purpose</li>
                  <li>Keep it concise and memorable</li>
                  <li>Focus on impact and values</li>
                  <li>Make it aspirational but achievable</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {currentProfile.mission ? (
                <div className="bg-muted/30 rounded-lg p-6">
                  <p className="text-lg leading-relaxed">
                    {currentProfile.mission}
                  </p>
                </div>
              ) : (
                <div className="border-muted rounded-lg border-2 border-dashed p-8 text-center">
                  <Target className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-lg font-semibold">
                    No mission statement added
                  </h3>
                  <p className="text-muted-foreground">
                    A mission statement helps communicate your {`company's`}{" "}
                    purpose
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Company Values Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Company Values
          </CardTitle>
          <CardDescription>
            The principles that guide your {`company's`} culture and decisions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* View Mode */}
            {!isEditing && (
              <div>
                {values.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {values.map((value: string, index: number) => {
                      const {
                        icon: Icon,
                        color,
                        bgColor,
                      } = getValueColor(value);
                      return (
                        <div
                          key={index}
                          className={`${bgColor} border-border rounded-lg border p-4 transition-transform hover:scale-[1.02]`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`${color} rounded-lg p-2`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{value}</h4>
                              <p className="text-muted-foreground mt-1 text-sm">
                                Guides our decisions and actions
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="border-muted rounded-lg border-2 border-dashed p-8 text-center">
                    <Heart className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                    <h3 className="mb-2 text-lg font-semibold">
                      No values defined
                    </h3>
                    <p className="text-muted-foreground">
                      Define your company values to build a strong culture
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Edit Mode */}
            {isEditing && (
              <div className="space-y-6">
                {/* Current Values Display */}
                {selectedValues.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">
                      Selected Values ({selectedValues.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedValues.map((value, index) => {
                        const { icon: Icon, color } = getValueColor(value);
                        return (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="gap-1.5 py-1.5 pr-2 pl-2.5 text-sm"
                          >
                            <Icon className={`h-3.5 w-3.5 ${color}`} />
                            {value}
                            <button
                              onClick={() => handleRemoveValue(value)}
                              className="text-muted-foreground hover:text-foreground hover:bg-muted ml-1.5 rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Add Value Input */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Add New Value</h3>
                    <span className="text-muted-foreground text-xs">
                      {newValue.length}/50 characters
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter a company value..."
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      maxLength={50}
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && newValue.trim()) {
                          e.preventDefault();
                          handleAddValue(newValue);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => handleAddValue(newValue)}
                      disabled={!newValue.trim()}
                      className="gap-1.5"
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>

                {/* Value Suggestions */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">
                    Common Value Suggestions
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                    {VALUE_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      const isSelected = selectedValues.includes(option.value);
                      return (
                        <TooltipProvider key={option.value}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => {
                                  if (isSelected) {
                                    handleRemoveValue(option.value);
                                  } else {
                                    handleAddValue(option.value);
                                  }
                                }}
                                disabled={isSelected}
                                className={`${option.bgColor} border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2 rounded-lg border p-3 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100`}
                              >
                                <Icon className={`h-5 w-5 ${option.color}`} />
                                <span className="text-xs font-medium">
                                  {option.value}
                                </span>
                                {isSelected && (
                                  <div className="absolute -top-1 -right-1">
                                    <Badge className="h-5 w-5 rounded-full p-0">
                                      <Check className="h-3 w-3" />
                                    </Badge>
                                  </div>
                                )}
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Click to {isSelected ? "remove" : "add"} value
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                  </div>
                </div>

                {/* Value Guidelines */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="mb-2 font-semibold">Value Guidelines</h4>
                  <ul className="text-muted-foreground space-y-1.5 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="bg-primary mt-0.5 h-1.5 w-1.5 rounded-full" />
                      <span>Choose 3-7 core values for maximum impact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary mt-0.5 h-1.5 w-1.5 rounded-full" />
                      <span>
                        Values should be authentic and practiced daily
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary mt-0.5 h-1.5 w-1.5 rounded-full" />
                      <span>Make values specific and actionable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary mt-0.5 h-1.5 w-1.5 rounded-full" />
                      <span>Involve your team in defining shared values</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Culture Overview Card (Non-Editable) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Culture Overview
          </CardTitle>
          <CardDescription>
            How your values translate into daily company culture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                      <Users className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold">Team Environment</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Our values foster collaboration, respect, and mutual support
                    among team members.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                      <Zap className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold">Decision Making</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Values guide our choices, ensuring alignment with company
                    principles and long-term goals.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                      <Star className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold">Recognition</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    We celebrate team members who exemplify our values through
                    their actions and achievements.
                  </p>
                </div>
              </div>
            </div>

            {!isEditing && values.length > 0 && (
              <div className="rounded-lg border p-4">
                <h4 className="mb-3 font-semibold">Values in Action</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {values.slice(0, 4).map((value: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-primary mt-0.5 h-2 w-2 rounded-full" />
                      <div>
                        <span className="font-medium">{value}:</span>
                        <span className="text-muted-foreground ml-2 text-sm">
                          Actively practiced in our daily operations
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default CompanyProfileCultureValuesTab;
