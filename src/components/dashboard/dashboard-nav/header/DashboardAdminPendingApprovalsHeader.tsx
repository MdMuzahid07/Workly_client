"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, History } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

interface DashboardAdminPendingApprovalsHeaderProps {
  onExportClick?: () => void;
  onAuditLogsClick?: () => void;
}

const DashboardAdminPendingApprovalsHeader = ({
  onExportClick,
  onAuditLogsClick,
}: DashboardAdminPendingApprovalsHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <CheckCircle2 className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
                Pending Approvals
              </h1>
              <Badge
                variant="outline"
                className="hidden items-center gap-1 border-amber-200 bg-amber-50 text-amber-600 sm:flex"
              >
                Moderation Mode
              </Badge>
            </div>
            <p className="text-muted-foreground truncate text-xs font-medium opacity-80 sm:text-sm">
              Review and approve new job postings to maintain quality.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onAuditLogsClick}
            className="border-primary/20 text-primary hover:bg-primary/5 hidden rounded-full font-bold sm:flex"
          >
            <History className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Audit Logs</span>
          </Button>

          <Button
            variant="outline"
            onClick={onExportClick}
            className="border-primary/20 text-primary hover:bg-primary/5 hidden rounded-full font-bold sm:flex"
          >
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Export Queue</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminPendingApprovalsHeader;
