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
  BarChart2,
  Bell,
  Briefcase,
  Building2,
  Crown,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Package,
  Plus,
  Receipt,
  Settings,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useState } from "react";
import SignOutModal from "../../shared/SignOutModal";
import ThemeToggleButtonCompact from "../../shared/ThemeToggleButtonCompact";
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

const EmployerSidebarItem = memo(function EmployerSidebarItem({
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
    normalizedHref !== "/employer" &&
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
          : "text-muted-foreground hover:bg-primary/20 hover:text-primary hover:border-primary rounded-r-none hover:border-r-2",
      )}
      onClick={onItemClick}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-transform group-hover:scale-105",
          isActive
            ? "text-primary"
            : "text-muted-foreground/70 group-hover:text-primary",
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

const EmployerSidebarContent = memo(function EmployerSidebarContent({
  navGroups,
  bottomItems,
  pathname,
  user,
  profile,
  profileData,
  onSignOut,
  onItemClick,
}: {
  navGroups: SidebarGroupProps[];
  bottomItems: SidebarItemProps[];
  pathname: string;
  user: { fullName?: string; profilePicture?: string } | null;
  profile: { avatarUrl?: string | null } | undefined;
  profileData?: {
    data?: {
      fullName?: string;
      isPremium?: boolean;
      profile?: {
        avatarUrl?: string | null;
      };
    };
  };
  onSignOut: () => void;
  onItemClick: () => void;
}) {
  return (
    <div className="bg-sidebar flex h-full max-h-full min-h-0 flex-col overflow-hidden">
      {/* Header */}
      <div className="flex h-12 shrink-0 items-center justify-between px-4 sm:h-14 lg:h-16">
        <WJLogo />
        <span className="pr-10 lg:pr-0">
          <ThemeToggleButtonCompact />
        </span>
      </div>

      <Separator className="shrink-0" />

      {/* Company Profile Section */}
      <div className="shrink-0 px-4 py-3">
        <Link
          href="/employer/company-profile"
          className="flex items-center gap-3 px-1 py-1"
        >
          <Avatar className="h-10 w-10 shrink-0 sm:h-11 sm:w-11">
            <AvatarImage
              src={profile?.avatarUrl || user?.profilePicture}
              alt={profileData?.data?.fullName || user?.fullName}
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {(profileData?.data?.fullName || user?.fullName)
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2) || <Building2 className="h-5 w-5" />}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-1.5">
              <p className="text-foreground truncate text-sm font-semibold">
                {profileData?.data?.fullName ||
                  user?.fullName ||
                  "Company Name"}
              </p>
              {(profileData?.data?.isPremium ||
                (user as { isPremium?: boolean })?.isPremium) && (
                <span className="inline-flex shrink-0 animate-pulse items-center gap-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-black tracking-wider text-amber-500 uppercase shadow-xs">
                  <Crown className="h-2.5 w-2.5 fill-amber-500" />
                  Pro
                </span>
              )}
            </div>
            <p className="text-muted-foreground truncate text-xs">
              Employer Account
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain px-3 py-2 [-webkit-overflow-scrolling:touch]">
        <nav className="space-y-6 pb-2">
          {navGroups.map((group, index) => (
            <div key={index}>
              {group.title && (
                <h4 className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase opacity-70">
                  {group.title}
                </h4>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <EmployerSidebarItem
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
      <div className="bg-sidebar border-border/40 mt-auto shrink-0 border-t p-3">
        <nav className="space-y-1">
          {bottomItems.map((item) => (
            <EmployerSidebarItem
              key={item.href}
              {...item}
              pathname={pathname}
              onSignOut={onSignOut}
              onItemClick={onItemClick}
            />
          ))}
        </nav>
      </div>
    </div>
  );
});

export default function EmployerSidebarView({
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
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();
  const { user } = useAppSelector((state) => state.auth) || {};
  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !user?.id,
  });
  const profile = profileData?.data?.profile;

  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const handleSignOutClick = () => {
    setIsSignOutModalOpen(true);
  };

  const handleConfirmSignOut = async () => {
    try {
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
          href: "/employer/applications",
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
    {
      title: "Analytics",
      items: [
        { icon: BarChart2, label: "Analytics", href: "/employer/analytics" },
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
    { icon: LogOut, label: "Logout", href: "#", signOut: true },
  ];

  return (
    <div className="relative">
      <div className="hidden lg:fixed lg:top-0 lg:bottom-0 lg:z-40 lg:flex lg:h-dvh lg:max-h-dvh lg:min-h-0 lg:w-64 lg:flex-col">
        <div className="border-sidebar-border bg-sidebar flex h-full min-h-0 flex-1 flex-col overflow-hidden border-r shadow-sm">
          <EmployerSidebarContent
            navGroups={navGroups}
            bottomItems={bottomItems}
            pathname={pathname ?? ""}
            user={user}
            profile={profile}
            profileData={profileData}
            onSignOut={handleSignOutClick}
            onItemClick={handleItemClick}
          />
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="bg-primary/10 hover:bg-background fixed top-3 right-4 z-999 flex h-9 w-9 items-center justify-center rounded-full border transition-all sm:top-4"
            aria-label="Open sidebar"
          >
            <Menu className="text-primary h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="z-9999 flex h-dvh max-h-dvh min-h-0 w-[280px] max-w-[85vw] flex-col gap-0 overflow-hidden border-r p-0 sm:w-[320px]"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Employer Menu</SheetTitle>
          </SheetHeader>
          <EmployerSidebarContent
            navGroups={navGroups}
            bottomItems={bottomItems}
            pathname={pathname ?? ""}
            user={user}
            profile={profile}
            profileData={profileData}
            onSignOut={handleSignOutClick}
            onItemClick={handleItemClick}
          />
        </SheetContent>
      </Sheet>

      <div className="hidden lg:block lg:w-64" />

      <SignOutModal
        open={isSignOutModalOpen}
        onOpenChange={setIsSignOutModalOpen}
        onConfirm={handleConfirmSignOut}
        isLoading={isLoggingOut}
      />
    </div>
  );
}
