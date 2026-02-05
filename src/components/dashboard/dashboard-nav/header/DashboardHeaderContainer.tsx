"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "../../../ui/button";

const DashboardHeaderContainer = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const handleToggleSidebar = () => {
    //  keep the real Sheet triggers inside sidebars (hidden),
    // and programmatically click them from the header on mobile.
    const isEmployer = pathname?.startsWith("/employer");
    const triggerId = isEmployer
      ? "employer-sidebar-trigger"
      : "job-seeker-sidebar-trigger";

    const el = document.getElementById(triggerId) as HTMLButtonElement | null;
    el?.click();
  };

  return (
    <header className="border-border bg-card/95 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm lg:left-64">
      <div className="mx-auto flex h-12 shrink-0 items-center justify-between gap-3 px-4 py-3 sm:h-14 sm:px-6 sm:py-4 lg:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 lg:hidden"
          aria-label="Open sidebar"
          onClick={handleToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </header>
  );
};

export default DashboardHeaderContainer;
