"use client";

import { Briefcase } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardRecommendedJobsHeader = () => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12">
            <Briefcase className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          <div>
            <h1 className="text-foreground text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              Recommended Jobs
            </h1>
            <p className="text-muted-foreground text-xs font-medium opacity-80 sm:text-sm">
              Personalized opportunities based on your unique profile
            </p>
          </div>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardRecommendedJobsHeader;
