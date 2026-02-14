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
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-xl p-2.5 ring-4">
            <Settings className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-sm font-black tracking-tight sm:text-lg md:text-xl lg:text-2xl">
              Company Settings
            </h1>
            <p className="text-muted-foreground text-xs font-medium opacity-80 sm:text-sm">
              Manage your company preferences and hiring configurations
            </p>
          </div>
        </div>
        <Button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="bg-primary shadow-primary/20 hover:bg-primary/90 rounded-full font-bold shadow-lg transition-all active:scale-95 sm:px-6"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardCompanySettingsHeader;
