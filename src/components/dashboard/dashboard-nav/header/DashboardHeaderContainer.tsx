"use client";
import { ReactNode } from "react";

const DashboardHeaderContainer = ({ children }: { children: ReactNode }) => {
  return (
    <header className="border-border bg-card/95 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm lg:left-64">
      <div className="mx-auto flex h-12 shrink-0 items-center justify-between gap-3 px-4 py-3 sm:h-14 sm:px-6 sm:py-4 lg:px-8">
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </header>
  );
};

export default DashboardHeaderContainer;
