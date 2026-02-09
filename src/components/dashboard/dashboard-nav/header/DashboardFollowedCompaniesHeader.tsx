"use client";

import { Building2 } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardFollowedCompaniesHeader = () => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <Building2 className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
              Followed Companies
            </h1>
            <p className="text-muted-foreground text-sm font-medium opacity-80">
              Manage and stay updated with your preferred employers.
            </p>
          </div>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardFollowedCompaniesHeader;
