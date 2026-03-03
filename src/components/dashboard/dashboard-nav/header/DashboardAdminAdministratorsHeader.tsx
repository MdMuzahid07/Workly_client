"use client";

import { Badge } from "@/components/ui/badge";
import { AlertCircle, Download, ShieldCheck, UserPlus } from "lucide-react";
import { Button } from "../../../ui/button";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

interface DashboardAdminAdministratorsHeaderProps {
  onAddAdminClick?: () => void;
  onExportClick?: () => void;
}

const DashboardAdminAdministratorsHeader = ({
  onAddAdminClick,
  onExportClick,
}: DashboardAdminAdministratorsHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <ShieldCheck className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
                Administrator Management
              </h1>
              <Badge
                variant="outline"
                className="hidden items-center gap-1 border-emerald-200 bg-emerald-50 text-emerald-600 sm:flex"
              >
                <AlertCircle className="h-3 w-3" />
                Secure Mode
              </Badge>
            </div>
            <p className="text-muted-foreground truncate text-xs font-medium opacity-80 sm:text-sm">
              Manage internal staff roles, permissions, and monitor security
              logs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onExportClick}
            className="border-primary/20 text-primary hover:bg-primary/5 rounded-full font-bold sm:flex"
          >
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Export Logs</span>
          </Button>
          <Button
            onClick={onAddAdminClick}
            className="rounded-full font-bold shadow-sm"
          >
            <UserPlus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Admin</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminAdministratorsHeader;
