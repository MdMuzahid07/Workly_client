"use client";

import { Bookmark } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardSavedJobsHeader = () => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Bookmark className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-xl font-bold sm:text-2xl">
              Saved Jobs
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your saved job listings
            </p>
          </div>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardSavedJobsHeader;
