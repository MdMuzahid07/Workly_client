"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useLogoutUserMutation } from "@/redux/feature/auth/authApi";
import { logout } from "@/redux/feature/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Bell,
  Briefcase,
  Building2,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  Package,
  Pencil,
  Plus,
  Receipt,
  Settings,
  Sun,
  UserCheck,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import WJLogo from "../../shared/WJLogo";

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: string | number;
  signOut?: boolean;
}

interface NavigationSection {
  title: string;
  items: SidebarItemProps[];
}

const ThemeToggleButtonCompact = memo(function ThemeToggleButtonCompact() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0"
        disabled
        aria-label="Theme toggle"
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const handleThemeToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="h-4 w-4" />;
      case "system":
        return <Sun className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 shrink-0 touch-manipulation"
      onClick={handleThemeToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} mode`}
    >
      {getThemeIcon()}
    </Button>
  );
});

const EmployerSidebar = ({
  isOpen: controlledIsOpen,
  onOpenChange,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
} = {}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const pathname = usePathname();

  // Use controlled state if provided, otherwise use internal state
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const { user } = useAppSelector((state) => state.auth) || {};

  const handleSignOut = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      await logoutUser().unwrap();
    } catch {
      // ignore
    } finally {
      dispatch(logout());
      window.location.href = "/";
    }
  };

  const navigationSections: NavigationSection[] = [
    {
      title: "Job Posting & Management",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", href: "/employer" },
        { icon: Plus, label: "New Job Post", href: "/employer/post-job" },
        { icon: Briefcase, label: "Posted Jobs", href: "/employer/jobs" },
      ],
    },
    {
      title: "Talent & Candidates",
      items: [
        {
          icon: Heart,
          label: "Saved Profiles",
          href: "/employer/saved-profiles",
        },
        {
          icon: UserCheck,
          label: "Talent Management",
          href: "/employer/talent",
        },
        { icon: MessageCircle, label: "Messages", href: "/employer/messages" },
      ],
    },
    {
      title: "Company & Billing",
      items: [
        {
          icon: Building2,
          label: "Company Profile",
          href: "/employer/company-profile",
        },
        { icon: Package, label: "Pricing Packages", href: "/employer/pricing" },
        { icon: Receipt, label: "Billing Details", href: "/employer/billing" },
      ],
    },
  ];

  const bottomItems: SidebarItemProps[] = [
    {
      icon: Bell,
      label: "Notification",
      href: "/employer/notifications",
      badge: "3",
    },
    { icon: Settings, label: "Settings", href: "/employer/settings" },
    { icon: LogOut, label: "Logout", href: "/", signOut: true },
  ];

  const SidebarItemBase: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    href,
    badge,
    signOut,
  }) => {
    const normalizedPath = pathname ? pathname.replace(/\/$/, "") : "";
    const normalizedHref = href.replace(/\/$/, "");
    const isExact = normalizedPath === normalizedHref;
    const isSection =
      normalizedHref !== "/employer" &&
      normalizedPath.startsWith(normalizedHref + "/");
    const isActive = isExact || isSection;

    if (signOut) {
      return (
        <button
          type="button"
          onClick={handleSignOut}
          className={cn(
            "text-destructive hover:bg-destructive/10 hover:text-destructive active:bg-destructive/20 focus-visible:ring-ring inline-flex min-h-10 w-full cursor-pointer touch-manipulation items-center justify-start gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all outline-none focus-visible:ring-2 [&_svg]:size-5",
          )}
        >
          <Icon className="h-5 w-5 shrink-0" />
          <span className="flex-1 truncate text-left">{label}</span>
        </button>
      );
    }

    return (
      <Link
        href={href}
        className={cn(
          "min-h-10 w-full touch-manipulation justify-start gap-3 px-3 py-2 text-[13px] font-normal",
          isActive &&
            "bg-primary text-primary-foreground hover:bg-primary font-medium",
          !isActive &&
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent",
          "focus-visible:border-ring focus-visible:ring-ring/50 inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
        )}
        onClick={() => {
          if (typeof window !== "undefined" && window.innerWidth < 1024) {
            setIsOpen(false);
            onOpenChange?.(false);
          }
        }}
      >
        <Icon className="h-5 w-5 shrink-0" />
        <span className="flex-1 truncate text-left">{label}</span>
        {badge != null && (
          <Badge variant="secondary" className="shrink-0 px-1.5 py-0.5 text-xs">
            {badge}
          </Badge>
        )}
      </Link>
    );
  };

  SidebarItemBase.displayName = "SidebarItem";
  const SidebarItem = memo(SidebarItemBase);

  const SidebarContentBase: React.FC = () => (
    <div className="bg-sidebar flex h-full min-h-0 flex-col">
      <div className="border-sidebar-border border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <WJLogo />
          <div className="ml-auto">
            <ThemeToggleButtonCompact />
          </div>
        </div>
      </div>

      {/* Employer / company profile summary */}
      <div className="border-sidebar-border border-b px-3 py-4 sm:px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <Avatar className="border-primary/30 h-16 w-16 rounded-full border-2 border-dashed sm:h-20 sm:w-20">
              <AvatarImage src={user?.avatar} alt={user?.fullName} />
              <AvatarFallback className="bg-primary/10 text-primary">
                <Building2 className="h-6 w-6 sm:h-8 sm:w-8" />
              </AvatarFallback>
            </Avatar>
            <Button
              variant="secondary"
              size="icon"
              className="absolute -right-1 -bottom-1 h-7 w-7 touch-manipulation rounded-full sm:h-7 sm:w-7"
              aria-label="Change company logo"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sidebar-foreground text-sm font-medium">
              {user?.fullName || "Company"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 touch-manipulation p-0 sm:h-6 sm:w-6"
              aria-label="Edit company name"
            >
              <Pencil className="h-3.5 w-3.5 sm:h-3 sm:w-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-transparent min-h-0 flex-1 overflow-y-auto overscroll-contain py-3">
        {navigationSections.map((section) => (
          <div key={section.title} className="mb-4 px-2 sm:px-3">
            <h3 className="text-muted-foreground mb-3 px-3 text-[10px] font-semibold tracking-wider uppercase sm:text-xs">
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

      <div className="mt-auto shrink-0 p-3 sm:p-4">
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
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="border-sidebar-border bg-sidebar flex flex-1 flex-col border-r">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="outline"
            size="icon"
            className="bg-primary/10 hover:bg-background fixed top-1 right-4 z-999 h-10 w-10 rounded-lg border transition-all sm:top-2"
            aria-label="Open sidebar"
            id="employer-sidebar-trigger"
          >
            <Menu className="text-primary h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[280px] max-w-[85vw] p-0 sm:w-[300px]"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Employer Menu</SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Spacer for desktop sidebar */}
      <div className="hidden lg:block lg:w-64" />
    </div>
  );
};

EmployerSidebar.displayName = "EmployerSidebar";
export default EmployerSidebar;
