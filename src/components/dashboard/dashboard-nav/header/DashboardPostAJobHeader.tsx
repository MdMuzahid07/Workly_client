"use client";

import { Briefcase } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardPostAJobHeader = () => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Briefcase className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-2xl font-bold">
              Post a new job
            </h1>
            <p className="text-muted-foreground text-sm">Create job postings</p>
          </div>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardPostAJobHeader;
