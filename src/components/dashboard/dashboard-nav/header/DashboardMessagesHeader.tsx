"use client";

import { MessageCircle } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardMessagesHeader = () => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <MessageCircle className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-md font-bold sm:text-2xl">
              Messages
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Connect employers and candidates
            </p>
          </div>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardMessagesHeader;
