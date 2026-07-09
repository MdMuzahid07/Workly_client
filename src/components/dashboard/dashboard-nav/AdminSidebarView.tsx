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
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShieldCheck,
  Tags,
  Users,
} from "lucide-react";
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

const AdminSidebarItem = function AdminSidebarItem({
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
    normalizedHref !== "/admin" &&
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

const AdminSidebarContent = function AdminSidebarContent({
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

      {/* Admin Profile Section */}
      <div
        className={cn(
          "shrink-0 py-3 transition-all duration-200",
          isCollapsed ? "flex justify-center px-1.5" : "px-4",
        )}
      >
        <div
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
              {(profileData?.data?.fullName || user?.fullName)?.charAt(0) ||
                "A"}
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
            <p className="text-foreground truncate text-sm font-semibold">
              {profileData?.data?.fullName || user?.fullName || "Admin"}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              System Administrator
            </p>
          </div>
        </div>
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
                  <AdminSidebarItem
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
            <AdminSidebarItem
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

import {
  useGetActiveJobsAdminQuery,
  useGetJobReportStatsQuery,
} from "@/redux/feature/admin/adminApi";
import { useGetUnreadCountQuery } from "@/redux/feature/notification/notificationApi";
import Image from "next/image";

export default function AdminSidebarView() {
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

  // Live sidebar counters
  const { data: pendingJobsData } = useGetActiveJobsAdminQuery({
    status: "DRAFT",
    limit: 1,
  });
  const { data: reportStatsData } = useGetJobReportStatsQuery();
  const { data: unreadNotificationsData } = useGetUnreadCountQuery();

  const pendingCount =
    (pendingJobsData as { meta?: { total?: number } })?.meta?.total ?? 0;
  const reportedCount = reportStatsData?.data?.openReports ?? 0;
  const unreadCount = unreadNotificationsData?.data?.unreadCount ?? 0;

  const handleSignOutClick = () => {
    setIsSignOutModalOpen(true);
  };

  const handleConfirmSignOut = async () => {
    try {
      await logoutUser(undefined).unwrap();
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
      title: "System Control",
      items: [{ icon: LayoutDashboard, label: "Overview", href: "/admin" }],
    },
    {
      title: "User Management",
      items: [
        { icon: Users, label: "Employers", href: "/admin/users/employers" },
        { icon: Users, label: "Job Seekers", href: "/admin/users/job-seekers" },
        {
          icon: ShieldCheck,
          label: "Administrators",
          href: "/admin/users/admins",
        },
      ],
    },
    {
      title: "Content Moderation",
      items: [
        { icon: FileText, label: "Active Jobs", href: "/admin/jobs/active" },
        {
          icon: CheckCircle2,
          label: "Pending Approvals",
          href: "/admin/jobs/pending",
          badge: pendingCount > 0 ? pendingCount : undefined,
        },
        {
          icon: AlertTriangle,
          label: "Reported",
          href: "/admin/jobs/reported",
          badge: reportedCount > 0 ? reportedCount : undefined,
        },
        { icon: Tags, label: "Categories", href: "/admin/categories" },
      ],
    },
    {
      title: "Financials & Plans",
      items: [
        {
          icon: CreditCard,
          label: "Transactions",
          href: "/admin/billing/transactions",
        },
        {
          icon: Package,
          label: "Subscription Plans",
          href: "/admin/billing/plans",
        },
      ],
    },
    {
      title: "Legal & Compliance",
      items: [
        {
          icon: ShieldCheck,
          label: "Privacy Policy",
          href: "/admin/legal/privacy-policy",
        },
        {
          icon: ShieldCheck,
          label: "Terms of Service",
          href: "/admin/legal/terms-of-service",
        },
        {
          icon: ShieldCheck,
          label: "Accessibility Statement",
          href: "/admin/legal/accessibility-statement",
        },
        {
          icon: ShieldCheck,
          label: "Cookie Policy",
          href: "/admin/legal/cookie-policy",
        },
        {
          icon: ShieldCheck,
          label: "User Agreements",
          href: "/admin/legal/user-agreements",
        },
      ],
    },
  ];

  const bottomItems: SidebarItemProps[] = [
    {
      icon: Bell,
      label: "Notifications",
      href: "/admin/notifications",
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
    { icon: LogOut, label: "Logout", href: "#", signOut: true },
  ];

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="border-sidebar-border bg-sidebar border-r"
      >
        <AdminSidebarContent
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

      {/* Mobile Sidebar Burger Button Trigger */}
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
