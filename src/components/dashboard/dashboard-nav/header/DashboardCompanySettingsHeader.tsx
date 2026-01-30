import { Save, Settings } from "lucide-react";
import { Button } from "../../../ui/button";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardCompanySettingsHeader = ({
  handleSaveSettings,
  isSaving,
}: {
  handleSaveSettings: () => void;
  isSaving: boolean;
}) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground flex items-center text-xl font-bold sm:text-2xl">
            <Settings className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
            Company Settings
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage your company preferences and configurations
          </p>
        </div>
        <Button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="w-full sm:w-auto"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardCompanySettingsHeader;
