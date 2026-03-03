"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Download, ShieldAlert } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

interface DashboardAdminReportedJobsHeaderProps {
  onExportClick?: () => void;
  onClearAllClick?: () => void;
}

const DashboardAdminReportedJobsHeader = ({
  onExportClick,
  onClearAllClick,
}: DashboardAdminReportedJobsHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-destructive/10 ring-destructive/5 rounded-lg p-2 ring-4">
            <AlertTriangle className="text-destructive h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
                Reported Content
              </h1>
              <Badge
                variant="outline"
                className="border-destructive/20 bg-destructive/5 text-destructive hidden items-center gap-1 sm:flex"
              >
                <ShieldAlert className="h-3 w-3" />
                Critical Queue
              </Badge>
            </div>
            <p className="text-muted-foreground truncate text-xs font-medium opacity-80 sm:text-sm">
              Investigate flagged listings and enforce community standards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onClearAllClick}
            className="border-destructive/20 text-destructive hover:bg-destructive/5 hidden rounded-full font-bold sm:flex"
          >
            Clear Flagged
          </Button>

          <Button
            variant="outline"
            onClick={onExportClick}
            className="border-primary/20 text-primary hover:bg-primary/5 hidden rounded-full font-bold sm:flex"
          >
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Export Reports</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminReportedJobsHeader;
