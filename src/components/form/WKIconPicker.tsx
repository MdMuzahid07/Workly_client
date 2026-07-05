"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, getNestedValue } from "@/lib/utils";
import { Check, Search } from "lucide-react";
import * as LucideIcons from "lucide-react";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IconItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

const IconRegistry: IconItem[] = [
  // Technology & Creative
  { name: "Code", icon: LucideIcons.Code, category: "Technology" },
  { name: "Cpu", icon: LucideIcons.Cpu, category: "Technology" },
  { name: "Layers", icon: LucideIcons.Layers, category: "Technology" },
  { name: "Palette", icon: LucideIcons.Palette, category: "Creative" },
  { name: "Database", icon: LucideIcons.Database, category: "Technology" },
  { name: "Smartphone", icon: LucideIcons.Smartphone, category: "Technology" },
  { name: "Monitor", icon: LucideIcons.Monitor, category: "Technology" },
  { name: "Cloud", icon: LucideIcons.Cloud, category: "Technology" },
  { name: "Terminal", icon: LucideIcons.Terminal, category: "Technology" },
  { name: "PenTool", icon: LucideIcons.PenTool, category: "Creative" },
  { name: "Gamepad2", icon: LucideIcons.Gamepad2, category: "Creative" },

  // Business & Operations
  { name: "Briefcase", icon: LucideIcons.Briefcase, category: "Business" },
  { name: "TrendingUp", icon: LucideIcons.TrendingUp, category: "Business" },
  { name: "BarChart3", icon: LucideIcons.BarChart3, category: "Business" },
  { name: "PieChart", icon: LucideIcons.PieChart, category: "Business" },
  { name: "Target", icon: LucideIcons.Target, category: "Business" },
  { name: "DollarSign", icon: LucideIcons.DollarSign, category: "Finance" },
  { name: "Megaphone", icon: LucideIcons.Megaphone, category: "Marketing" },
  { name: "Award", icon: LucideIcons.Award, category: "Business" },
  {
    name: "Presentation",
    icon: LucideIcons.Presentation,
    category: "Business",
  },

  // Health, Science & Public Services
  { name: "Heart", icon: LucideIcons.Heart, category: "Health" },
  { name: "Stethoscope", icon: LucideIcons.Stethoscope, category: "Health" },
  { name: "Activity", icon: LucideIcons.Activity, category: "Health" },
  { name: "FlaskConical", icon: LucideIcons.FlaskConical, category: "Science" },
  { name: "Dna", icon: LucideIcons.Dna, category: "Science" },
  { name: "Brain", icon: LucideIcons.Brain, category: "Health" },
  { name: "Microscope", icon: LucideIcons.Microscope, category: "Science" },

  // Social & Networking
  { name: "Globe", icon: LucideIcons.Globe, category: "Social" },
  { name: "Linkedin", icon: LucideIcons.Linkedin, category: "Social" },
  { name: "Github", icon: LucideIcons.Github, category: "Social" },
  { name: "Twitter", icon: LucideIcons.Twitter, category: "Social" },
  { name: "Facebook", icon: LucideIcons.Facebook, category: "Social" },
  { name: "Youtube", icon: LucideIcons.Youtube, category: "Social" },
  { name: "Instagram", icon: LucideIcons.Instagram, category: "Social" },
  { name: "Link2", icon: LucideIcons.Link2, category: "Social" },
  { name: "Mail", icon: LucideIcons.Mail, category: "Communication" },
  {
    name: "MessageSquare",
    icon: LucideIcons.MessageSquare,
    category: "Communication",
  },
  { name: "Phone", icon: LucideIcons.Phone, category: "Communication" },

  // Industry, Trade & Energy
  { name: "Wrench", icon: LucideIcons.Wrench, category: "Industry" },
  { name: "Settings", icon: LucideIcons.Settings, category: "Industry" },
  { name: "Hammer", icon: LucideIcons.Hammer, category: "Industry" },
  { name: "Flame", icon: LucideIcons.Flame, category: "Energy" },
  { name: "Zap", icon: LucideIcons.Zap, category: "Energy" },
  { name: "Sun", icon: LucideIcons.Sun, category: "Energy" },
  { name: "Wind", icon: LucideIcons.Wind, category: "Energy" },
  { name: "Factory", icon: LucideIcons.Factory, category: "Industry" },

  // Travel, Log & Built Environment
  { name: "Plane", icon: LucideIcons.Plane, category: "Travel" },
  { name: "Car", icon: LucideIcons.Car, category: "Travel" },
  { name: "MapPin", icon: LucideIcons.MapPin, category: "Travel" },
  { name: "Compass", icon: LucideIcons.Compass, category: "Travel" },
  { name: "Ship", icon: LucideIcons.Ship, category: "Travel" },
  { name: "Truck", icon: LucideIcons.Truck, category: "Logistics" },
  { name: "Building2", icon: LucideIcons.Building2, category: "Logistics" },

  // Education, Government & Legal
  { name: "BookOpen", icon: LucideIcons.BookOpen, category: "Education" },
  { name: "Scale", icon: LucideIcons.Scale, category: "Legal" },
  {
    name: "GraduationCap",
    icon: LucideIcons.GraduationCap,
    category: "Education",
  },
  { name: "Gavel", icon: LucideIcons.Gavel, category: "Legal" },
  { name: "FileText", icon: LucideIcons.FileText, category: "Legal" },

  // Art, Entertainment & Media
  { name: "Camera", icon: LucideIcons.Camera, category: "Media" },
  { name: "Music", icon: LucideIcons.Music, category: "Media" },
  { name: "Film", icon: LucideIcons.Film, category: "Media" },
  { name: "Tv", icon: LucideIcons.Tv, category: "Media" },
  { name: "Image", icon: LucideIcons.Image, category: "Media" },
  { name: "Video", icon: LucideIcons.Video, category: "Media" },
  { name: "Mic", icon: LucideIcons.Mic, category: "Media" },

  // Agriculture, Food & Retail
  { name: "Sprout", icon: LucideIcons.Sprout, category: "Agriculture" },
  { name: "Utensils", icon: LucideIcons.Utensils, category: "Food" },
  { name: "Coffee", icon: LucideIcons.Coffee, category: "Food" },
  { name: "ShoppingBag", icon: LucideIcons.ShoppingBag, category: "Retail" },
  { name: "Leaf", icon: LucideIcons.Leaf, category: "Agriculture" },
];

interface WKIconPickerProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
}

const WKIconPicker = ({
  name,
  label,
  required = false,
  className,
}: WKIconPickerProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [open, setOpen] = useState(false);

  const fieldError = getNestedValue(errors, name);
  const hasError = !!fieldError;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={hasError ? "text-destructive" : ""}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field }) => {
          const selectedIcon = IconRegistry.find((i) => i.name === field.value);
          const SelectedIconComponent = selectedIcon?.icon;

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between",
                    hasError && "border-destructive",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <div className="flex items-center gap-2">
                    {SelectedIconComponent ? (
                      <>
                        <SelectedIconComponent className="h-4 w-4" />
                        <span>{selectedIcon.name}</span>
                      </>
                    ) : (
                      "Select an icon..."
                    )}
                  </div>
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[400px] p-0"
                align="start"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <Command>
                  <CommandInput placeholder="Search icons..." />
                  <CommandList
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                  >
                    <CommandEmpty>No icon found.</CommandEmpty>
                    {Array.from(
                      new Set(IconRegistry.map((i) => i.category)),
                    ).map((category) => (
                      <CommandGroup key={category} heading={category}>
                        {IconRegistry.filter(
                          (i) => i.category === category,
                        ).map(({ name: iconName, icon: Icon }) => (
                          <CommandItem
                            key={iconName}
                            value={iconName}
                            onSelect={() => {
                              field.onChange(iconName);
                              setOpen(false);
                            }}
                          >
                            <Icon className="text-primary/70 h-4 w-4" />
                            {iconName}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                field.value === iconName
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {hasError && (
        <p className="text-destructive text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default WKIconPicker;
