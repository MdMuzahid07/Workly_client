import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Calendar, Edit3, Eye, Save, Shield, Users, X } from "lucide-react";
import { CompanyProfile } from "../../../../view/dashboard/ManageCompanyProfileView";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";

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
    <header className="border-b bg-green-50">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={currentProfile.logoUrl || "/placeholder.svg"}
                alt={currentProfile.name}
              />
              <AvatarFallback className="text-lg">
                {currentProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
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
              <p className="text-muted-foreground">
                {currentProfile.industry} • {currentProfile.location}
              </p>
              <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  {currentProfile.stats.totalEmployees} employees
                </span>
                <span className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Founded {currentProfile.founded}
                </span>
                <span className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  {currentProfile.stats.profileViews} profile views
                </span>
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
      </div>
    </header>
  );
};

export default DashboardCompanyProfileHeader;
