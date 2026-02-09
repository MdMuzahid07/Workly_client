"use client";

import { Sparkles } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardRecommendedJobsHeader = () => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="rounded-lg bg-amber-500/10 p-2 ring-4 ring-amber-500/5">
            <Sparkles className="h-4 w-4 text-amber-500 sm:h-6 sm:w-6" />
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
