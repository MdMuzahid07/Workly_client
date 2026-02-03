"use client";

import { useAppSelector } from "@/redux/hooks";
import { BarChart3 } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardJobSeekerHeader = () => {
  const { user } = useAppSelector((state) => state.auth) || {};

  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <BarChart3 className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-xl font-bold sm:text-2xl">
              Welcome back, {user?.fullName?.split(" ")[0] || "there"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {`Here's`} an overview of your job search activity
            </p>
          </div>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardJobSeekerHeader;
