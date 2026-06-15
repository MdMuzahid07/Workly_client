"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Save, ShieldCheck, FileText } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

interface DashboardAdminLegalHeaderProps {
  title: string;
  isSaving?: boolean;
  onSave?: () => void;
  showSaveButton?: boolean;
}

const DashboardAdminLegalHeader = ({
  title,
  isSaving,
  onSave,
  showSaveButton = true,
}: DashboardAdminLegalHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
            <ShieldCheck className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
                {title}
              </h1>
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary hidden rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase sm:inline-flex"
              >
                Compliance
              </Badge>
            </div>
            <p className="text-muted-foreground hidden truncate text-xs font-medium opacity-80 sm:block sm:text-sm">
              Manage and update the official {title.toLowerCase()} for the
              platform.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="border-primary/20 hover:bg-primary/5 flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold sm:h-9 sm:w-auto sm:px-4"
          >
            <FileText className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">History</span>
          </Button>
          {showSaveButton && (
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
          )}
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminLegalHeader;
