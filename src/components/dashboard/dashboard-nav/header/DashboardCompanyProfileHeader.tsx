import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Edit3, Save, Shield, X } from "lucide-react";
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
        <div className="flex items-center space-x-4">
          <Avatar className="bg-primary h-10 w-10 overflow-hidden rounded-full sm:h-12 sm:w-12">
            <AvatarImage
              src={currentProfile.logoUrl || "/placeholder.svg"}
              alt={currentProfile.name}
              className="rounded-full"
            />
            <AvatarFallback className="flex items-center justify-center text-lg">
              {currentProfile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="space-y-2">
              <h1 className="text-foreground text-2xl font-bold">
                {currentProfile.name}
              </h1>
              {currentProfile.isVerified && (
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  <Shield className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
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
