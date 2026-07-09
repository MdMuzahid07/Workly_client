"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  ChevronLeft,
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
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
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

const EmployerSidebarItem = function EmployerSidebarItem({
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
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  const normalizedPath = pathname ? pathname.replace(/\/$/, "") : "";
  const normalizedHref = href.replace(/\/$/, "");
  const isExact = normalizedPath === normalizedHref;
  const isSection =
    normalizedHref !== "/employer" &&
    normalizedPath.startsWith(normalizedHref + "/");
  const isActive = isExact || isSection;

  const innerContent = (
    <>
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-transform group-hover:scale-105",
          isActive
            ? "text-primary"
            : "text-muted-foreground/70 group-hover:text-primary",
        )}
      />
      <span
        className={cn(
          "ease-apple flex-1 origin-left truncate overflow-hidden text-left whitespace-nowrap transition-all duration-300",
          isCollapsed
            ? "pointer-events-none ml-0 max-w-0 opacity-0"
            : "ml-3 max-w-[150px] opacity-100",
        )}
      >
        {label}
      </span>
      {badge != null && (
        <Badge
          variant={isActive ? "default" : "secondary"}
          className={cn(
            "ease-apple shrink-0 scale-90 transition-all duration-300",
            isCollapsed
              ? "pointer-events-none max-w-0 p-0 opacity-0"
              : "bg-muted text-muted-foreground max-w-10 px-1.5 py-0 text-[10px] opacity-100",
          )}
        >
          {badge}
        </Badge>
      )}
    </>
  );

  const itemLink = signOut ? (
    <button
      type="button"
      onClick={onSignOut}
      className={cn(
        "group ease-apple flex cursor-pointer items-center transition-all duration-300 outline-none",
        isCollapsed
          ? "mx-auto h-9 w-9 justify-center rounded-lg p-0"
          : "w-full justify-start rounded-md px-3 py-2 text-sm font-medium",
        "text-muted-foreground hover:bg-destructive/5 hover:text-destructive active:bg-destructive/10",
      )}
    >
      {innerContent}
    </button>
  ) : (
    <Link
      href={href}
      className={cn(
        "group ease-apple flex items-center transition-all duration-300 outline-none",
        isCollapsed
          ? "mx-auto h-9 w-9 justify-center rounded-lg p-0"
          : "w-full justify-start rounded-md px-3 py-2 text-sm font-medium",
        isCollapsed
          ? isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-primary/20 hover:text-primary"
          : isActive
            ? "bg-primary/10 text-primary border-primary rounded-r-none border-r-2"
            : "text-muted-foreground hover:bg-primary/20 hover:text-primary hover:border-primary rounded-r-none hover:border-r-2",
      )}
      onClick={onItemClick}
    >
      {innerContent}
    </Link>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>{itemLink}</TooltipTrigger>
      <TooltipContent
        side="right"
        className="text-xs font-semibold"
        hidden={!isCollapsed}
      >
        <div className="flex items-center gap-1.5">
          <span>{label}</span>
          {badge != null && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary px-1 py-0 text-[9px] font-black"
            >
              {badge}
            </Badge>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

const EmployerSidebarContent = function EmployerSidebarContent({
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
  const { state, isMobile, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  return (
    <div className="group bg-sidebar flex h-full max-h-full min-h-0 flex-col overflow-hidden">
      {/* Header */}
      <div
        className={cn(
          "flex shrink-0 items-center transition-all duration-200",
          isCollapsed ? "px-1.5" : "px-4",
          isCollapsed
            ? "h-16 justify-center pt-2"
            : "h-12 justify-between sm:h-14 lg:h-16",
        )}
      >
        {!isCollapsed ? (
          <>
            <WJLogo />
            <div className="flex items-center gap-1">
              <ThemeToggleButtonCompact />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="text-muted-foreground hover:bg-muted hidden h-8 w-8 rounded-md md:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <Link
            href="/"
            className="relative block h-5 w-8 shrink-0 overflow-hidden"
          >
            <Image
              src="/logo/workly_job-logo.png"
              alt="W"
              className="absolute top-0 left-0 h-8 w-8 max-w-none"
              width={100}
              height={100}
            />
          </Link>
        )}
      </div>

      <Separator className="shrink-0" />

      {/* Company Profile Section */}
      <div
        className={cn(
          "shrink-0 py-3 transition-all duration-200",
          isCollapsed ? "flex justify-center px-1.5" : "px-4",
        )}
      >
        <Link
          href="/employer/company-profile"
          className={cn(
            "flex items-center transition-all duration-200",
            isCollapsed ? "gap-0" : "gap-3 px-1 py-1",
          )}
        >
          <Avatar
            className={cn(
              "shrink-0 transition-all duration-200",
              isCollapsed ? "h-9 w-9" : "h-10 w-10",
            )}
          >
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
          <div
            className={cn(
              "min-w-0 flex-1 overflow-hidden whitespace-nowrap transition-all duration-200 ease-in-out",
              isCollapsed
                ? "pointer-events-none max-w-0 opacity-0"
                : "max-w-[200px] opacity-100",
            )}
          >
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
      <div
        className={cn(
          "min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain py-2 [-webkit-overflow-scrolling:touch]",
          isCollapsed
            ? "scrollbar-hover-visible px-1.5"
            : "scrollbar-thin px-3",
        )}
      >
        <nav className="space-y-6 pb-2">
          {navGroups.map((group, index) => (
            <div key={index}>
              {group.title && (
                <div className="ease-apple relative overflow-hidden transition-all duration-300">
                  <h4
                    className={cn(
                      "text-muted-foreground ease-apple overflow-hidden px-3 text-xs font-semibold tracking-wider whitespace-nowrap uppercase opacity-70 transition-all duration-300",
                      isCollapsed
                        ? "pointer-events-none mb-0 max-h-0 opacity-0"
                        : "mb-2 max-h-8 opacity-70",
                    )}
                  >
                    {group.title}
                  </h4>
                  <Separator
                    className={cn(
                      "ease-apple shrink-0 transition-all duration-300",
                      isCollapsed
                        ? "my-3 opacity-100"
                        : "pointer-events-none my-0 h-0 opacity-0",
                    )}
                  />
                </div>
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
      <div
        className={cn(
          "bg-sidebar border-border/40 mt-auto shrink-0 border-t py-3",
          isCollapsed ? "px-1.5" : "p-3",
        )}
      >
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
};

export default function EmployerSidebarView() {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { toggleSidebar, openMobile, setOpenMobile } = useSidebar();
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
      setOpenMobile(false);
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
    <>
      <Sidebar
        collapsible="icon"
        className="border-sidebar-border bg-sidebar border-r"
      >
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
      </Sidebar>

      {/* Mobile Burger Button Trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="bg-primary/10 hover:bg-background fixed top-3 right-4 z-999 flex h-9 w-9 items-center justify-center rounded-md border transition-all sm:top-6 sm:right-6 md:hidden"
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        <Menu className="text-primary h-5 w-5" />
      </Button>

      <SignOutModal
        open={isSignOutModalOpen}
        onOpenChange={setIsSignOutModalOpen}
        onConfirm={handleConfirmSignOut}
        isLoading={isLoggingOut}
      />
    </>
  );
}
