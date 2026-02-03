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
import { useGetProfileQuery } from "@/redux/feature/profile/profileApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  BarChart3,
  Bell,
  Bookmark,
  Briefcase,
  Building2,
  Camera,
  Clock,
  Eye,
  FileText,
  LogOut,
  Menu,
  MessageCircle,
  Monitor,
  Moon,
  Pencil,
  Search,
  Settings,
  Sun,
  User,
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
        return <Monitor className="h-4 w-4" />;
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

function computeProfileCompletion(
  data:
    | {
        profile?: {
          bio?: string | null;
          location?: string | null;
          avatarUrl?: string | null;
          resumeUrl?: string | null;
        };
        fullName?: string;
      }
    | undefined,
): number {
  if (!data) return 0;
  const { profile } = data;
  const fields = [
    !!data.fullName,
    !!profile?.bio,
    !!profile?.location,
    !!profile?.avatarUrl,
    !!profile?.resumeUrl,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.min(100, Math.round((filled / fields.length) * 100));
}

const JobSeekerSidebarItem = memo(function JobSeekerSidebarItem({
  icon: Icon,
  label,
  href,
  badge,
  signOut,
  pathname,
  onSignOut,
  onItemClick,
}: SidebarItemProps & {
  pathname: string;
  onSignOut: () => void;
  onItemClick: () => void;
}) {
  const normalizedPath = pathname ? pathname.replace(/\/$/, "") : "";
  const normalizedHref = href.replace(/\/$/, "");
  const isExact = normalizedPath === normalizedHref;
  const isSection =
    normalizedHref !== "/dashboard" &&
    normalizedPath.startsWith(normalizedHref + "/");
  const isActive = isExact || isSection;

  if (signOut) {
    return (
      <button
        type="button"
        onClick={onSignOut}
        className={cn(
          "text-destructive hover:bg-destructive/10 hover:text-destructive active:bg-destructive/20 focus-visible:ring-ring inline-flex min-h-[40px] w-full cursor-pointer touch-manipulation items-center justify-start gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all outline-none focus-visible:ring-2 [&_svg]:size-5",
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
        "min-h-[40px] w-full touch-manipulation justify-start gap-3 px-3 py-2 text-[13px] font-normal",
        isActive &&
          "bg-primary text-primary-foreground hover:bg-primary font-medium",
        !isActive &&
          "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent",
        "focus-visible:border-ring focus-visible:ring-ring/50 inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
      )}
      onClick={onItemClick}
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
});

const JobSeekerSidebarContent = memo(function JobSeekerSidebarContent({
  navItems,
  bottomItems,
  pathname,
  user,
  profile,
  profileCompletion,
  onSignOut,
  onItemClick,
}: {
  navItems: SidebarItemProps[];
  bottomItems: SidebarItemProps[];
  pathname: string;
  user: { fullName?: string; avatar?: string } | null;
  profile: { avatarUrl?: string | null } | undefined;
  profileCompletion: number;
  onSignOut: () => void;
  onItemClick: () => void;
}) {
  return (
    <div className="bg-sidebar flex h-full min-h-0 flex-col">
      <div className="border-sidebar-border border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <WJLogo />
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggleButtonCompact />
          </div>
        </div>
      </div>

      <div className="border-sidebar-border border-b px-3 py-4 sm:px-4">
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <Avatar className="border-sidebar-border h-12 w-12 rounded-full border-2 sm:h-14 sm:w-14">
              <AvatarImage
                src={profile?.avatarUrl || user?.avatar}
                alt={user?.fullName}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-base font-semibold sm:text-lg">
                {user?.fullName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2) || "U"}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="secondary"
              size="icon"
              className="absolute -right-1 -bottom-1 h-7 w-7 touch-manipulation rounded-full sm:h-6 sm:w-6"
              aria-label="Change profile picture"
            >
              <Camera className="h-3.5 w-3.5 sm:h-3 sm:w-3" />
            </Button>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sidebar-foreground truncate text-sm font-medium">
                {user?.fullName || "User"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 touch-manipulation p-0 sm:h-6 sm:w-6"
                aria-label="Edit name"
              >
                <Pencil className="h-3.5 w-3.5 sm:h-3 sm:w-3" />
              </Button>
            </div>
            <Link
              href="/dashboard/profile"
              className="bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30 mt-2 inline-flex min-h-[32px] touch-manipulation items-center rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
            >
              {profileCompletion}% Profile Complete
            </Link>
          </div>
        </div>
      </div>

      <div className="scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-transparent min-h-0 flex-1 overflow-y-auto overscroll-contain py-3">
        <nav className="space-y-1 px-2 sm:px-3">
          {navItems.map((item) => (
            <JobSeekerSidebarItem
              key={item.href}
              {...item}
              pathname={pathname}
              onSignOut={onSignOut}
              onItemClick={onItemClick}
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto shrink-0 p-3 sm:p-4">
        <Separator className="mb-3" />
        <nav className="mb-3 space-y-1">
          {bottomItems.map((item) => (
            <JobSeekerSidebarItem
              key={item.href}
              {...item}
              pathname={pathname}
              onSignOut={onSignOut}
              onItemClick={onItemClick}
            />
          ))}
        </nav>
        <p className="text-muted-foreground px-2 text-center text-[10px] leading-relaxed sm:text-xs">
          2024 atB Lab. All Rights Reserved
          <br />
          <Link
            href="/privacy"
            className="text-primary touch-manipulation hover:underline active:opacity-70"
          >
            Privacy Policy
          </Link>{" "}
          <Link
            href="/terms"
            className="text-primary touch-manipulation hover:underline active:opacity-70"
          >
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
});

export default function JobSeekerSidebarView({
  isOpen: controlledIsOpen,
  onOpenChange,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
} = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const pathname = usePathname();

  // Use controlled state if provided, otherwise use internal state
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const { user } = useAppSelector((state) => state.auth) || {};
  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !user?.id,
  });
  const profile = profileData?.data?.profile;
  const profileCompletion = computeProfileCompletion(profileData?.data);

  const handleSignOut = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      await logoutUser().unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(logout());
      window.location.href = "/";
    }
  };

  const handleItemClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsOpen(false);
      onOpenChange?.(false);
    }
  };

  const navItems: SidebarItemProps[] = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
    { icon: MessageCircle, label: "Messages", href: "/dashboard/messages" },
    { icon: FileText, label: "Applied Jobs", href: "/dashboard/applied-jobs" },
    { icon: Search, label: "Find Jobs", href: "/dashboard/find-jobs" },
    { icon: Bookmark, label: "Saved Jobs", href: "/dashboard/saved-jobs" },
    {
      icon: Briefcase,
      label: "Recommended Jobs",
      href: "/dashboard/recommended-jobs",
    },
    { icon: FileText, label: "CV Manager", href: "/dashboard/cv-manager" },
    { icon: Eye, label: "Profile Views", href: "/dashboard/profile-views" },
    {
      icon: Building2,
      label: "Followed Company",
      href: "/dashboard/followed-company",
    },
    {
      icon: Clock,
      label: "Job View History",
      href: "/dashboard/job-view-history",
    },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const bottomItems: SidebarItemProps[] = [
    { icon: LogOut, label: "Sign Out", href: "/", signOut: true },
  ];

  return (
    <div className="relative">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="border-sidebar-border bg-sidebar flex flex-1 flex-col border-r">
          <JobSeekerSidebarContent
            navItems={navItems}
            bottomItems={bottomItems}
            pathname={pathname ?? ""}
            user={user}
            profile={profile}
            profileCompletion={profileCompletion}
            onSignOut={handleSignOut}
            onItemClick={handleItemClick}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="outline"
            size="icon"
            className="bg-background/95 border-border fixed top-4 left-4 z-50 hidden h-11 w-11 shadow-lg backdrop-blur-sm"
            aria-label="Open sidebar"
            id="job-seeker-sidebar-trigger"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[280px] max-w-[85vw] p-0 sm:w-[300px]"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Job Seeker Menu</SheetTitle>
          </SheetHeader>
          <JobSeekerSidebarContent
            navItems={navItems}
            bottomItems={bottomItems}
            pathname={pathname ?? ""}
            user={user}
            profile={profile}
            profileCompletion={profileCompletion}
            onSignOut={handleSignOut}
            onItemClick={handleItemClick}
          />
        </SheetContent>
      </Sheet>

      {/* Spacer for desktop sidebar */}
      <div className="hidden lg:block lg:w-64" />
    </div>
  );
}
