"use client";

import { User } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardProfileHeader = () => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <User className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-xl font-bold sm:text-2xl">
              My Profile
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your profile information
            </p>
          </div>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardProfileHeader;
