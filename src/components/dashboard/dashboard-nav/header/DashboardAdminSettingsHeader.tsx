"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Save, Settings2, ShieldCheck } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

interface DashboardAdminSettingsHeaderProps {
  isSaving?: boolean;
  onSave?: () => void;
}

const DashboardAdminSettingsHeader = ({
  isSaving,
  onSave,
}: DashboardAdminSettingsHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
            <Settings2 className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
                System Settings
              </h1>
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary hidden rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase sm:inline-flex"
              >
                Core Config
              </Badge>
            </div>
            <p className="text-muted-foreground hidden truncate text-xs font-medium opacity-80 sm:block sm:text-sm">
              Manage platform-wide configurations, security, and global
              variables.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="border-primary/20 hover:bg-primary/5 flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold sm:h-9 sm:w-auto sm:px-4"
          >
            <ShieldCheck className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Audit Logs</span>
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 flex h-9 w-9 items-center justify-center p-0 font-bold shadow-md sm:h-9 sm:w-auto sm:px-6"
          >
            <Save
              className={`h-4 w-4 sm:mr-2 ${isSaving ? "animate-pulse" : ""}`}
            />
            <span className="hidden sm:inline">
              {isSaving ? "Saving..." : "Save Changes"}
            </span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminSettingsHeader;
