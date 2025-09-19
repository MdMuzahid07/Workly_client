"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  Calendar,
  ChevronDown,
  FileText,
  Home,
  Menu,
  Plus,
  Settings,
  Tag,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import React, { useState } from "react";

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

interface NavigationSection {
  title: string;
  items: SidebarItemProps[];
}

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Overview");

  const navigationSections: NavigationSection[] = [
    {
      title: "Main",
      items: [
        { icon: Home, label: "Overview", active: activeItem === "Overview" },
        {
          icon: Briefcase,
          label: "Jobs",
          active: activeItem === "Jobs",
          badge: "12",
        },
        {
          icon: Users,
          label: "Employees",
          active: activeItem === "Employees",
          badge: "250",
        },
        {
          icon: FileText,
          label: "Applications",
          active: activeItem === "Applications",
          badge: "156",
        },
        {
          icon: UserCheck,
          label: "Hiring Pipeline",
          active: activeItem === "Hiring Pipeline",
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          icon: BarChart3,
          label: "Analytics",
          active: activeItem === "Analytics",
        },
        {
          icon: TrendingUp,
          label: "Reports",
          active: activeItem === "Reports",
        },
        {
          icon: Calendar,
          label: "Schedule",
          active: activeItem === "Schedule",
        },
      ],
    },
    {
      title: "Management",
      items: [
        { icon: Plus, label: "Post Job", active: activeItem === "Post Job" },
        { icon: Tag, label: "Categories", active: activeItem === "Categories" },
        {
          icon: Building2,
          label: "Departments",
          active: activeItem === "Departments",
        },
      ],
    },
  ];

  const bottomItems: SidebarItemProps[] = [
    {
      icon: Bell,
      label: "Notifications",
      hasDropdown: true,
      active: activeItem === "Notifications",
      badge: "3",
    },
    { icon: Settings, label: "Settings", active: activeItem === "Settings" },
  ];

  const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active = false,
    hasDropdown = false,
    badge,
    onClick,
  }) => (
    <Button
      variant="ghost"
      className={cn(
        "h-auto w-full justify-start gap-3 px-3 py-2.5 font-normal",
        active && "bg-gray-100 font-medium text-gray-900 hover:bg-gray-100",
        !active && "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
      )}
      onClick={() => {
        setActiveItem(label);
        onClick?.();
        if (window.innerWidth < 1024) {
          setIsOpen(false);
        }
      }}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="flex-1 truncate text-left">{label}</span>
      <div className="flex items-center gap-2">
        {badge && (
          <Badge variant="secondary" className="px-1.5 py-0.5 text-xs">
            {badge}
          </Badge>
        )}
        {hasDropdown && <ChevronDown className="h-4 w-4 text-gray-400" />}
      </div>
    </Button>
  );

  const SidebarContent = () => (
    <div className="bg flex h-full flex-col">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
            TF
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">TechFlow Inc.</h2>
            <p className="text-xs text-gray-500">Technology</p>
          </div>
          <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {navigationSections.map((section) => (
          <div key={section.title} className="mb-6 px-3">
            <h3 className="mb-3 px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
              {section.title}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item, index) => (
                <SidebarItem key={index} {...item} />
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom Items */}
      <div className="p-3">
        <Separator className="mb-3" />
        <nav className="space-y-1">
          {bottomItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-1 flex-col border-r border-gray-200 bg-white">
          <SidebarContent />
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 z-50 border-gray-200 bg-white shadow-lg"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="hidden flex-shrink-0 lg:block lg:w-64" />
    </div>
  );
};

export default DashboardSidebar;
