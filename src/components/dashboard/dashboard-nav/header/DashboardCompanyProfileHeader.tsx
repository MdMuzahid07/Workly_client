"use client";

import { Building2, Edit3, Save, Shield, X } from "lucide-react";
import { CompanyProfile } from "../../../../view/dashboard/ManageCompanyProfileView";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardCompanyProfileHeader = ({
  setIsEditing,
  currentProfile,
  handleCancel,
  isSaving,
  isEditing,
  handleSave,
}: {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  currentProfile: CompanyProfile;
  handleCancel: () => void;
  isEditing: boolean;
  isSaving: boolean;
  handleSave: () => void;
}) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <Building2 className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
                {currentProfile.name}
              </h1>
              {currentProfile.isVerified && (
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary rounded-full border-none px-2 py-0.5 text-[10px] font-bold"
                >
                  <Shield className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground truncate text-xs font-medium opacity-80 sm:text-sm">
              Manage your company profile and information
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="rounded-full font-bold shadow-sm"
            >
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="rounded-full font-bold"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-full font-bold shadow-sm"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardCompanyProfileHeader;
