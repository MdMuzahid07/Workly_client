"use client";

import { Building2, Download, UserPlus } from "lucide-react";
import { Button } from "../../../ui/button";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

interface DashboardAdminEmployersHeaderProps {
  onInviteClick?: () => void;
  onExportClick?: () => void;
}

const DashboardAdminEmployersHeader = ({
  onInviteClick,
  onExportClick,
}: DashboardAdminEmployersHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <Building2 className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              Employer Management
            </h1>
            <p className="text-muted-foreground truncate text-xs font-medium opacity-80 sm:text-sm">
              Manage company accounts, verify businesses, and monitor activity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onExportClick}
            className="rounded-full font-bold sm:flex"
          >
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
          <Button
            onClick={onInviteClick}
            className="rounded-full font-bold shadow-sm"
          >
            <UserPlus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Invite Employer</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminEmployersHeader;
