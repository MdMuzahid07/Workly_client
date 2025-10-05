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
  Bell,
  Briefcase,
  ChevronDown,
  FileText,
  Home,
  Menu,
  Settings,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import WJLogo from "../../shared/WJLogo";

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
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
        {
          icon: Home,
          label: "Overview",
          value: "/dashboard",
          active: activeItem === "Overview",
        },
        {
          icon: Briefcase,
          label: "Jobs",
          value: "/dashboard/jobs",
          active: activeItem === "Jobs",
          badge: "12",
        },
        {
          icon: Users,
          label: "Employees",
          value: "/dashboard/employees",
          active: activeItem === "Employees",
          badge: "250",
        },
        {
          icon: FileText,
          label: "Applications",
          value: "/dashboard/applications",
          active: activeItem === "Applications",
          badge: "156",
        },
        {
          icon: UserCheck,
          value: "/dashboard/hiring-pipeline",
          label: "Hiring Pipeline",
          active: activeItem === "Hiring Pipeline",
        },
      ],
    },
    // {
    //   title: "Analytics",
    //   items: [
    //     {
    //       icon: BarChart3,
    //       label: "Analytics",
    //       value: "",
    //       active: activeItem === "Analytics",
    //     },
    //     {
    //       icon: TrendingUp,
    //       label: "Reports",
    //       value: "",
    //       active: activeItem === "Reports",
    //     },
    //     {
    //       icon: Calendar,
    //       label: "Schedule",
    //       value: "",
    //       active: activeItem === "Schedule",
    //     },
    //   ],
    // },
    // {
    //   title: "Management",
    //   items: [
    //     {
    //       icon: Plus,
    //       label: "Post Job",
    //       value: "",
    //       active: activeItem === "Post Job",
    //     },
    //     {
    //       icon: Tag,
    //       label: "Categories",
    //       value: "",
    //       active: activeItem === "Categories",
    //     },
    //     {
    //       icon: Building2,
    //       label: "Departments",
    //       value: "",
    //       active: activeItem === "Departments",
    //     },
    //   ],
    // },
  ];

  const bottomItems: SidebarItemProps[] = [
    {
      icon: Bell,
      label: "Notifications",
      value: "",
      hasDropdown: true,
      active: activeItem === "Notifications",
      badge: "3",
    },
    {
      icon: Settings,
      label: "Settings",
      value: "/dashboard/settings",
      active: activeItem === "Settings",
    },
  ];

  const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    value,
    active = false,
    hasDropdown = false,
    badge,
    onClick,
  }) => (
    <Link
      href={value}
      className={cn(
        "h-auto w-full justify-start gap-3 px-3 py-2.5 font-normal",
        active && "bg-gray-100 font-medium text-gray-900 hover:bg-gray-100",
        !active && "hover:bg-primary/2 text-gray-600 hover:text-gray-900",
        "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
    </Link>
  );

  const SidebarContent = () => (
    <div className="bg-card flex h-full flex-col">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <WJLogo />
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
