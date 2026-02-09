"use client";

import { Briefcase } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardPostAJobHeader = () => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <Briefcase className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              Post a new job
            </h1>
            <p className="text-muted-foreground text-xs font-medium opacity-80 sm:text-sm">
              Create job postings
            </p>
          </div>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardPostAJobHeader;
