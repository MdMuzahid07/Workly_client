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
  AlertTriangle,
  Bell,
  CheckCircle2,
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

const AdminSidebarItem = memo(function AdminSidebarItem({
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
    normalizedHref !== "/admin" &&
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

const AdminSidebarContent = memo(function AdminSidebarContent({
  navGroups,
  bottomItems,
  pathname,
  user,
  onSignOut,
  onItemClick,
}: {
  navGroups: SidebarGroupProps[];
  bottomItems: SidebarItemProps[];
  pathname: string;
  user: { fullName?: string; profilePicture?: string } | null;
  onSignOut: () => void;
  onItemClick: () => void;
}) {
  return (
    <div className="bg-sidebar flex h-full min-h-0 flex-col">
      <div className="flex h-14 items-center justify-between px-4 sm:h-16">
        <WJLogo />
        <span className="pr-10 lg:pr-0">
          <ThemeToggleButtonCompact />
        </span>
      </div>

      <Separator className="opacity-50" />

      <div className="px-4 py-4">
        <div className="group border-border/50 bg-card/30 flex items-center gap-3 rounded-lg border p-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={user?.profilePicture} alt={user?.fullName} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {user?.fullName?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-foreground truncate text-sm font-semibold">
              {user?.fullName || "Admin"}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              System Administrator
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
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

      <div className="mt-auto p-3">
        <Separator className="mb-3 opacity-50" />
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
});

export default function AdminSidebarView({
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

  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

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
      setIsOpen(false);
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
          badge: 5,
        },
        {
          icon: AlertTriangle,
          label: "Reported",
          href: "/admin/jobs/reported",
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
      badge: 8,
    },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
    { icon: LogOut, label: "Logout", href: "#", signOut: true },
  ];

  return (
    <div className="relative">
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="border-sidebar-border bg-sidebar flex flex-1 flex-col border-r shadow-sm">
          <AdminSidebarContent
            navGroups={navGroups}
            bottomItems={bottomItems}
            pathname={pathname ?? ""}
            user={user}
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
            className="bg-primary/10 hover:bg-background fixed top-1 right-4 z-999 h-10 w-10 rounded-lg border transition-all sm:top-2"
          >
            <Menu className="text-primary h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="z-9999 w-[280px] p-0 sm:w-[320px]">
          <SheetHeader className="sr-only">
            <SheetTitle>Admin Menu</SheetTitle>
          </SheetHeader>
          <AdminSidebarContent
            navGroups={navGroups}
            bottomItems={bottomItems}
            pathname={pathname ?? ""}
            user={user}
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
