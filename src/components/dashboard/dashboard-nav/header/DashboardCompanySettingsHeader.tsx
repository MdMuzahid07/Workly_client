import { Save, Settings } from 'lucide-react';
import { Button } from '../../../ui/button';
import DashboardHeaderContainer from './DashboardHeaderContainer';

const DashboardCompanySettingsHeader = ({
  handleSaveSettings,
  isSaving,
}: {
  handleSaveSettings: () => void;
  isSaving: boolean;
}) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-xl p-2.5 ring-4">
            <Settings className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-foreground truncate text-sm font-black tracking-tight sm:text-lg md:text-xl lg:text-2xl">
              Company Settings
            </h1>
            <p className="text-muted-foreground hidden text-xs font-medium opacity-80 sm:block sm:text-sm">
              Manage your company preferences and hiring configurations
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="bg-primary shadow-primary/20 hover:bg-primary/90 flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold text-white shadow-lg transition-all active:scale-95 sm:h-9 sm:w-auto sm:px-6"
          >
            <Save className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardCompanySettingsHeader;
