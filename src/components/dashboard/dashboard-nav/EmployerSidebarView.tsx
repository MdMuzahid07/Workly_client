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
  Package,
  Pencil,
  Plus,
  Receipt,
  Settings,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useState } from "react";
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

const EmployerSidebarContent = memo(function EmployerSidebarContent({
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
  user: { fullName?: string; avatar?: string } | null;
  onSignOut: () => void;
  onItemClick: () => void;
}) {
  return (
    <div className="bg-sidebar flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex h-14 items-center justify-between px-4 sm:h-16">
        <WJLogo />
        <span className="pr-10 lg:pr-0">
          <ThemeToggleButtonCompact />
        </span>
      </div>

      <Separator className="opacity-50" />

      {/* Company Profile Section */}
      <div className="px-4 py-4">
        <Link
          href="/employer/company-profile"
          className="group border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 flex items-center gap-3 rounded-lg border p-3 transition-all hover:shadow-sm"
        >
          <Avatar className="h-10 w-10 shrink-0 sm:h-11 sm:w-11">
            <AvatarImage src={user?.avatar} alt={user?.fullName} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {user?.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2) || <Building2 className="h-5 w-5" />}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-foreground truncate text-sm font-semibold">
              {user?.fullName || "Company Name"}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              Employer Account
            </p>
          </div>
          <Pencil className="text-muted-foreground h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
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
      <div className="mt-auto p-3">
        <Separator className="mb-3 opacity-50" />
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
  const [logoutUser] = useLogoutUserMutation();
  const { user } = useAppSelector((state) => state.auth) || {};

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

  return (
    <div className="relative">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="border-sidebar-border bg-sidebar flex flex-1 flex-col border-r shadow-sm">
          <EmployerSidebarContent
            navGroups={navGroups}
            bottomItems={bottomItems}
            pathname={pathname ?? ""}
            user={user}
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
            className="bg-primary/10 hover:bg-background fixed top-1 right-4 z-999 h-10 w-10 rounded-lg border transition-all sm:top-2"
            aria-label="Open sidebar"
          >
            <Menu className="text-primary h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="z-9999 w-[280px] max-w-[85vw] border-r p-0 sm:w-[320px]"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Employer Menu</SheetTitle>
          </SheetHeader>
          <EmployerSidebarContent
            navGroups={navGroups}
            bottomItems={bottomItems}
            pathname={pathname ?? ""}
            user={user}
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
