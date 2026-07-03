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
  Tag,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useState } from "react";
import WJLogo from "../../shared/WJLogo";

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
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
  const pathname = usePathname();

  const navigationSections: NavigationSection[] = [
    {
      title: "Main",
      items: [
        {
          icon: Home,
          label: "Overview",
          href: "/dashboard",
        },
        {
          icon: Building2,
          label: "My Company",
          href: "/dashboard/profile",
        },
        {
          icon: Briefcase,
          label: "Jobs",
          href: "/dashboard/jobs",
          badge: "12",
        },

        {
          icon: Users,
          label: "Employees",
          href: "/dashboard/employees",
          badge: "250",
        },
        {
          icon: FileText,
          label: "Applications",
          href: "/dashboard/applications",
          badge: "156",
        },
        {
          icon: UserCheck,
          href: "/dashboard/hiring-pipeline",
          label: "Hiring Pipeline",
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          icon: BarChart3,
          label: "Analytics",
          href: "/dashboard/analytics",
        },
        {
          icon: TrendingUp,
          label: "Reports",
          href: "/dashboard/reports",
        },
        {
          icon: Calendar,
          label: "Schedule",
          href: "/dashboard/schedule",
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          icon: Plus,
          label: "Post Job",
          href: "/dashboard/post-job",
        },
        {
          icon: Tag,
          label: "Job Categories",
          href: "/dashboard/categories",
        },
      ],
    },
  ];

  const bottomItems: SidebarItemProps[] = [
    {
      icon: Bell,
      label: "Notifications",
      href: "/dashboard/notifications",
      hasDropdown: true,
      badge: "3",
    },
  ];

  const handleItemClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const SidebarItemBase: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    href,
    hasDropdown = false,
    badge,
    onClick,
  }) => {
    const normalizedPath = pathname ? pathname.replace(/\/$/, "") : "";
    const normalizedHref = href.replace(/\/$/, "");
    const isExact = normalizedPath === normalizedHref;
    const isSection =
      normalizedHref !== "/dashboard" &&
      normalizedPath.startsWith(normalizedHref + "/");
    const isActive = isExact || isSection;

    return (
      <Link
        href={href}
        className={cn(
          "h-auto w-full justify-start gap-3 px-3 py-2.5 font-normal",
          isActive &&
            "bg-secondary text-secondary-foreground hover:bg-secondary font-medium",
          !isActive &&
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        )}
        onClick={() => {
          onClick?.();
          handleItemClick();
        }}
      >
        <Icon className="h-5 w-5" />
        <span className="flex-1 truncate text-left">{label}</span>
        <div className="flex items-center gap-2">
          {badge && (
            <Badge variant="secondary" className="px-1.5 py-0.5 text-xs">
              {badge}
            </Badge>
          )}
          {hasDropdown && (
            <ChevronDown className="text-muted-foreground h-4 w-4" />
          )}
        </div>
      </Link>
    );
  };

  SidebarItemBase.displayName = "SidebarItem";
  const SidebarItem = memo(SidebarItemBase);

  const SidebarContentBase: React.FC = () => (
    <div className="bg-sidebar flex h-full flex-col">
      <div className="border-sidebar-border border-b p-4">
        <div className="flex items-center gap-3">
          <WJLogo />
          <div className="flex-1">
            <h2 className="text-sidebar-foreground font-semibold">
              TechFlow Inc.
            </h2>
            <p className="text-muted-foreground text-xs">Technology</p>
          </div>
          <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
            <ChevronDown className="text-muted-foreground h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {navigationSections.map((section) => (
          <div key={section.title} className="mb-6 px-3">
            <h3 className="text-muted-foreground mb-3 px-3 text-xs font-semibold tracking-wider uppercase">
              {section.title}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item) => (
                <SidebarItem key={item.href} {...item} />
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-3">
        <Separator className="mb-3" />
        <nav className="space-y-1">
          {bottomItems.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </nav>
      </div>
    </div>
  );

  SidebarContentBase.displayName = "SidebarContent";
  const SidebarContent = memo(SidebarContentBase);

  return (
    <div className="relative">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="border-sidebar-border bg-sidebar flex flex-1 flex-col border-r">
          <SidebarContent />
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="outline"
            size="icon"
            className="bg-primary/10 hover:bg-background fixed top-3 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-md border transition-all sm:top-6 sm:right-6"
          >
            <Menu className="text-primary h-5 w-5" />
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

      <div className="hidden lg:block lg:w-64" />
    </div>
  );
};

export default DashboardSidebar;

DashboardSidebar.displayName = "DashboardSidebar";
