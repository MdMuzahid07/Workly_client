"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Download, Plus } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

interface DashboardAdminActiveJobsHeaderProps {
  onExportClick?: () => void;
  onNewJobClick?: () => void;
}

const DashboardAdminActiveJobsHeader = ({
  onExportClick,
  onNewJobClick,
}: DashboardAdminActiveJobsHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <Briefcase className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
                Active Job Listings
              </h1>
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary hidden items-center gap-1 sm:flex"
              >
                Live Board
              </Badge>
            </div>
            <p className="text-muted-foreground truncate text-xs font-medium opacity-80 sm:text-sm">
              Monitor and manage currently published career opportunities.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onExportClick}
            className="border-primary/20 text-primary hover:bg-primary/5 hidden rounded-full font-bold sm:flex"
          >
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Button
            onClick={onNewJobClick}
            className="rounded-full font-bold shadow-sm"
          >
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Post New Job</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminActiveJobsHeader;
