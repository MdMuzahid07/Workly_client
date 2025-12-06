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
import { cn } from "@/lib/utils";
import {
  Award,
  BadgeCheck,
  Banknote,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Building,
  Building2,
  Calculator,
  Camera,
  ChartBar,
  Check,
  ChefHat,
  CircuitBoard,
  Clipboard,
  Cloud,
  Code,
  Code2,
  Coins,
  Cpu,
  CreditCard,
  Database,
  FileText,
  Flame,
  Gamepad2,
  GraduationCap,
  Hammer,
  HandCoins,
  Headphones,
  Heart,
  HeartPulse,
  Home,
  Hotel,
  Languages,
  Laptop,
  Lightbulb,
  LineChart,
  LucideIcon,
  Mail,
  Megaphone,
  Mic,
  Microscope,
  Network,
  Palette,
  PenTool,
  Phone,
  PieChart,
  Plane,
  Plug,
  Presentation,
  Rocket,
  Scale,
  Search,
  Server,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Store,
  Target,
  TrendingUp,
  Truck,
  Users,
  Video,
  Wallet,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface WKIconPickerProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
}

const ICONS: { name: string; icon: LucideIcon; category: string }[] = [
  // Technology & Software
  { name: "Code", icon: Code, category: "Technology" },
  { name: "Code2", icon: Code2, category: "Technology" },
  { name: "Laptop", icon: Laptop, category: "Technology" },
  { name: "BrainCircuit", icon: BrainCircuit, category: "Technology" },
  { name: "Database", icon: Database, category: "Technology" },
  { name: "Server", icon: Server, category: "Technology" },
  { name: "Cloud", icon: Cloud, category: "Technology" },
  { name: "Cpu", icon: Cpu, category: "Technology" },
  { name: "CircuitBoard", icon: CircuitBoard, category: "Technology" },
  { name: "Network", icon: Network, category: "Technology" },
  { name: "Zap", icon: Zap, category: "Technology" },
  { name: "Plug", icon: Plug, category: "Technology" },
  { name: "Settings", icon: Settings, category: "Technology" },

  // Security & Protection
  { name: "Shield", icon: Shield, category: "Security" },
  { name: "BadgeCheck", icon: BadgeCheck, category: "Security" },

  // Design & Creative
  { name: "Palette", icon: Palette, category: "Design" },
  { name: "PenTool", icon: PenTool, category: "Design" },
  { name: "Camera", icon: Camera, category: "Design" },
  { name: "Video", icon: Video, category: "Design" },
  { name: "Sparkles", icon: Sparkles, category: "Design" },

  // Healthcare & Medical
  { name: "Heart", icon: Heart, category: "Healthcare" },
  { name: "HeartPulse", icon: HeartPulse, category: "Healthcare" },
  { name: "Stethoscope", icon: Stethoscope, category: "Healthcare" },
  { name: "Microscope", icon: Microscope, category: "Healthcare" },

  // Education & Training
  { name: "GraduationCap", icon: GraduationCap, category: "Education" },
  { name: "BookOpen", icon: BookOpen, category: "Education" },
  { name: "Award", icon: Award, category: "Education" },
  { name: "Presentation", icon: Presentation, category: "Education" },

  // Business & Finance
  { name: "Briefcase", icon: Briefcase, category: "Business" },
  { name: "Building", icon: Building, category: "Business" },
  { name: "Building2", icon: Building2, category: "Business" },
  { name: "TrendingUp", icon: TrendingUp, category: "Business" },
  { name: "LineChart", icon: LineChart, category: "Business" },
  { name: "ChartBar", icon: ChartBar, category: "Business" },
  { name: "PieChart", icon: PieChart, category: "Business" },
  { name: "Banknote", icon: Banknote, category: "Business" },
  { name: "Coins", icon: Coins, category: "Business" },
  { name: "Wallet", icon: Wallet, category: "Business" },
  { name: "CreditCard", icon: CreditCard, category: "Business" },
  { name: "HandCoins", icon: HandCoins, category: "Business" },
  { name: "Calculator", icon: Calculator, category: "Business" },
  { name: "Scale", icon: Scale, category: "Business" },

  // Sales & Marketing
  { name: "ShoppingCart", icon: ShoppingCart, category: "Sales" },
  { name: "ShoppingBag", icon: ShoppingBag, category: "Sales" },
  { name: "Store", icon: Store, category: "Sales" },
  { name: "Megaphone", icon: Megaphone, category: "Sales" },
  { name: "Target", icon: Target, category: "Sales" },
  { name: "Rocket", icon: Rocket, category: "Sales" },
  { name: "Flame", icon: Flame, category: "Sales" },

  // Communication & Support
  { name: "Users", icon: Users, category: "Communication" },
  { name: "Mail", icon: Mail, category: "Communication" },
  { name: "Phone", icon: Phone, category: "Communication" },
  { name: "Headphones", icon: Headphones, category: "Communication" },
  { name: "Mic", icon: Mic, category: "Communication" },
  { name: "Languages", icon: Languages, category: "Communication" },

  // Operations & Logistics
  { name: "Truck", icon: Truck, category: "Operations" },
  { name: "Plane", icon: Plane, category: "Operations" },
  { name: "Clipboard", icon: Clipboard, category: "Operations" },
  { name: "FileText", icon: FileText, category: "Operations" },

  // Hospitality & Services
  { name: "Hotel", icon: Hotel, category: "Hospitality" },
  { name: "ChefHat", icon: ChefHat, category: "Hospitality" },
  { name: "Home", icon: Home, category: "Hospitality" },

  // Engineering & Construction
  { name: "Hammer", icon: Hammer, category: "Engineering" },
  { name: "Wrench", icon: Wrench, category: "Engineering" },

  // Research & Analysis
  { name: "Search", icon: Search, category: "Research" },
  { name: "Lightbulb", icon: Lightbulb, category: "Research" },

  // Entertainment & Gaming
  { name: "Gamepad2", icon: Gamepad2, category: "Entertainment" },
];

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

  const hasError = !!errors[name];

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
          const selectedIcon = ICONS.find((i) => i.name === field.value);
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
              <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search icons..." />
                  <CommandList>
                    <CommandEmpty>No icon found.</CommandEmpty>
                    {Array.from(new Set(ICONS.map((i) => i.category))).map(
                      (category) => (
                        <CommandGroup key={category} heading={category}>
                          {ICONS.filter((i) => i.category === category).map(
                            ({ name: iconName, icon: Icon }) => (
                              <CommandItem
                                key={iconName}
                                value={iconName}
                                onSelect={() => {
                                  field.onChange(iconName);
                                  setOpen(false);
                                }}
                              >
                                <Icon className="mr-2 h-4 w-4" />
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
                            ),
                          )}
                        </CommandGroup>
                      ),
                    )}
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
