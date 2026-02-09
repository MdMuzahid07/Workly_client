"use client";

import { Clock } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardJobViewHistoryHeader = () => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <Clock className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
              Job View History
            </h1>
            <p className="text-muted-foreground text-sm font-medium opacity-80">
              Keep track of titles {`you've`} explored recently.
            </p>
          </div>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardJobViewHistoryHeader;
