"use client";

import { FileText } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardAppliedJobsHeader = () => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <FileText className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-xl font-bold sm:text-2xl">
              Applied Jobs
            </h1>
            <p className="text-muted-foreground text-sm">
              Track your job applications
            </p>
          </div>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAppliedJobsHeader;
