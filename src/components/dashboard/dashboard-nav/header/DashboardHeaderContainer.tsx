import { ReactNode } from "react";

const DashboardHeaderContainer = ({ children }: { children: ReactNode }) => {
  return (
    <header className="border-border bg-card sticky top-0 z-50 border-b">
      <div className="container mx-auto flex h-18 shrink px-4 py-2.5 sm:px-6 lg:px-8">
        {children}
      </div>
    </header>
  );
};

export default DashboardHeaderContainer;
