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
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <ShieldCheck className="text-primary h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                {title}
              </h1>
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary hidden rounded-full px-2 py-0 text-[10px] font-bold tracking-wider uppercase sm:inline-flex"
              >
                Compliance
              </Badge>
            </div>
            <p className="text-muted-foreground truncate text-xs font-medium opacity-80 sm:text-sm">
              Manage and update the official {title.toLowerCase()} for the
              platform.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-primary/20 hover:bg-primary/5 hidden h-9 rounded-full font-bold shadow-sm sm:flex"
          >
            <FileText className="mr-2 h-4 w-4" />
            History
          </Button>
          {showSaveButton && (
            <Button
              size="sm"
              onClick={onSave}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 h-9 rounded-full px-6 font-bold shadow-md"
            >
              <Save
                className={`mr-2 h-4 w-4 ${isSaving ? "animate-pulse" : ""}`}
              />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminLegalHeader;
