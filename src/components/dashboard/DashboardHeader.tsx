"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/redux/hooks";
import { Bell, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeSwitcher from "../shared/ThemeSwitcher";
import NotificationDropdown from "../shared/navigation/NotificationDropdown";
import ProfileDrop from "../shared/navigation/ProfileDrop";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export default function DashboardHeader({
  onMenuClick,
  showMenuButton = false,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth) || {};
  const [showSearch, setShowSearch] = useState(false);

  // Handle menu button click
  const handleMenuClick = () => {
    onMenuClick?.();
  };

  // Get page title from pathname
  const getPageTitle = () => {
    if (!pathname) return "Dashboard";

    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length === 0) return "Dashboard";

    // Remove "dashboard" or "employer" prefix
    const segments = pathSegments.filter(
      (seg) => seg !== "dashboard" && seg !== "employer",
    );

    if (segments.length === 0) return "Dashboard";

    const lastSegment = segments[segments.length - 1];

    // Special cases for better titles
    const titleMap: Record<string, string> = {
      "applied-jobs": "Applied Jobs",
      "saved-jobs": "Saved Jobs",
      "recommended-jobs": "Recommended Jobs",
      "post-job": "Post a Job",
      "company-profile": "Company Profile",
      "saved-profiles": "Saved Profiles",
      "talent-management": "Talent Management",
      "pricing-packages": "Pricing Packages",
      "billing-details": "Billing Details",
      "job-view-history": "Job View History",
      "followed-company": "Followed Companies",
      "profile-views": "Profile Views",
      "cv-manager": "CV Manager",
      "find-jobs": "Find Jobs",
    };

    if (titleMap[lastSegment]) {
      return titleMap[lastSegment];
    }

    // Convert kebab-case to Title Case
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const pageTitle = getPageTitle();

  return (
    <header className="border-border bg-background/95 sticky top-0 z-40 border-b shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex h-16 shrink-0 items-center justify-between gap-4 px-4 sm:h-18 sm:px-6 lg:px-8">
        {/* Left Section: Menu Button + Page Title */}
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 touch-manipulation lg:hidden"
              onClick={handleMenuClick}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="text-foreground truncate text-lg font-semibold sm:text-xl">
              {pageTitle}
            </h1>
            {pathname && (
              <p className="text-muted-foreground hidden truncate text-xs sm:block">
                {pathname}
              </p>
            )}
          </div>
        </div>

        {/* Right Section: Search + Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Button (Mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 touch-manipulation lg:hidden"
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                type="search"
                placeholder="Search..."
                className="bg-background border-border focus:ring-ring h-9 w-64 rounded-md border pr-3 pl-9 text-sm outline-none focus:ring-2 focus:ring-offset-1"
              />
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showSearch && (
            <div className="bg-background absolute top-full right-0 left-0 z-50 border-b p-4 lg:hidden">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="bg-background border-border focus:ring-ring h-10 w-full rounded-md border pr-3 pl-9 text-sm outline-none focus:ring-2"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
              </div>
            </div>
          )}

          <Separator orientation="vertical" className="hidden h-6 sm:block" />

          {/* Theme Switcher */}
          <div className="hidden sm:block">
            <ThemeSwitcher />
          </div>

          {/* Notifications */}
          {user?.email && (
            <div className="hidden sm:block">
              <NotificationDropdown />
            </div>
          )}

          {/* Profile Dropdown */}
          {user?.email && (
            <div className="hidden sm:block">
              <ProfileDrop user={user} />
            </div>
          )}

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 sm:hidden">
            {user?.email && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 touch-manipulation"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <ProfileDrop user={user} isMobile={true} />
              </>
            )}
            <ThemeSwitcher isMobile={true} />
          </div>
        </div>
      </div>
    </header>
  );
}
