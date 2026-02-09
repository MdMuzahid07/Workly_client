"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  Clock,
  Eye,
  FileText,
  LogOut,
  Menu,
  MessageCircle,
  Monitor,
  Moon,
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

interface SidebarGroupProps {
  title?: string;
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
        className="text-muted-foreground h-8 w-8 shrink-0"
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
      className="text-muted-foreground hover:text-foreground h-8 w-8 shrink-0 touch-manipulation"
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
          "text-muted-foreground hover:bg-destructive/5 hover:text-destructive active:bg-destructive/10 group flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none",
        )}
      >
        <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-105" />
        <span className="flex-1 truncate text-left">{label}</span>
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none",
        isActive
          ? "bg-primary/10 text-primary border-primary rounded-r-none border-r-2"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
      onClick={onItemClick}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-transform group-hover:scale-105",
          isActive ? "text-primary" : "text-muted-foreground/70",
        )}
      />
      <span className="flex-1 truncate text-left">{label}</span>
      {badge != null && (
        <Badge
          variant="secondary"
          className="bg-muted text-muted-foreground shrink-0 px-1.5 py-0 text-[10px]"
        >
          {badge}
        </Badge>
      )}
    </Link>
  );
});

const JobSeekerSidebarContent = memo(function JobSeekerSidebarContent({
  navGroups,
  bottomItems,
  pathname,
  user,
  profile,
  profileCompletion,
  onSignOut,
  onItemClick,
}: {
  navGroups: SidebarGroupProps[];
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
      {/* Header */}
      <div className="flex h-14 items-center justify-between px-4 sm:h-16">
        <WJLogo />
        <ThemeToggleButtonCompact />
      </div>

      <Separator className="opacity-50" />

      {/* Profile Section */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
            <AvatarImage
              src={profile?.avatarUrl || user?.avatar}
              alt={user?.fullName}
            />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {user?.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-foreground truncate text-sm font-semibold">
              {user?.fullName || "User"}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <Progress value={profileCompletion} className="h-1.5 flex-1" />
              <span className="text-muted-foreground text-[10px] font-medium">
                {profileCompletion}%
              </span>
            </div>
            <Link
              href="/dashboard/profile"
              className="text-muted-foreground hover:text-primary mt-0.5 block truncate text-[10px] transition-colors"
            >
              Complete your profile
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40 min-h-0 flex-1 overflow-y-auto px-3 py-2">
        <nav className="space-y-6">
          {navGroups.map((group, index) => (
            <div key={index}>
              {group.title && (
                <h4 className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase opacity-70">
                  {group.title}
                </h4>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <JobSeekerSidebarItem
                    key={item.href}
                    {...item}
                    pathname={pathname}
                    onSignOut={onSignOut}
                    onItemClick={onItemClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer / Bottom Items */}
      <div className="mt-auto p-3">
        <Separator className="mb-3 opacity-50" />
        <nav className="space-y-1">
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
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px]">
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms
          </Link>
          <span className="text-muted-foreground/50">© 2024 WorklyJob</span>
        </div>
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

  const navGroups: SidebarGroupProps[] = [
    {
      title: "Overview",
      items: [
        { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
        { icon: User, label: "My Profile", href: "/dashboard/profile" },
        { icon: Eye, label: "Profile Views", href: "/dashboard/profile-views" },
      ],
    },
    {
      title: "Job Applications",
      items: [
        {
          icon: FileText,
          label: "Applied Jobs",
          href: "/dashboard/applied-jobs",
        },
        { icon: Bookmark, label: "Saved Jobs", href: "/dashboard/saved-jobs" },
        {
          icon: Clock,
          label: "History",
          href: "/dashboard/job-view-history",
        },
      ],
    },
    {
      title: "Discover",
      items: [
        { icon: Search, label: "Find Jobs", href: "/dashboard/find-jobs" },
        {
          icon: Briefcase,
          label: "Recommended",
          href: "/dashboard/recommended-jobs",
        },
        {
          icon: Building2,
          label: "Companies",
          href: "/dashboard/followed-company",
        },
      ],
    },
    {
      title: "Account",
      items: [
        { icon: FileText, label: "CV Manager", href: "/dashboard/cv-manager" },
        { icon: MessageCircle, label: "Messages", href: "/dashboard/messages" },
        {
          icon: Bell,
          label: "Notifications",
          href: "/dashboard/notifications",
        },
        { icon: Settings, label: "Settings", href: "/dashboard/settings" },
      ],
    },
  ];

  const bottomItems: SidebarItemProps[] = [
    { icon: LogOut, label: "Sign Out", href: "/", signOut: true },
  ];

  return (
    <div className="relative">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="border-sidebar-border bg-sidebar flex flex-1 flex-col border-r shadow-sm">
          <JobSeekerSidebarContent
            navGroups={navGroups}
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
            variant="ghost"
            size="icon"
            className="bg-background/80 hover:bg-background fixed top-3 left-4 z-50 h-10 w-10 rounded-full shadow-sm backdrop-blur-md transition-all"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[280px] max-w-[85vw] border-r p-0 sm:w-[320px]"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Job Seeker Menu</SheetTitle>
          </SheetHeader>
          <JobSeekerSidebarContent
            navGroups={navGroups}
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
