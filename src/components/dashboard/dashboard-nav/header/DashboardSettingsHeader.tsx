'use client';

import { Button } from '@/components/ui/button';
import { Save, Settings } from 'lucide-react';
import DashboardHeaderContainer from './DashboardHeaderContainer';

interface DashboardSettingsHeaderProps {
  isSaving?: boolean;
  onSave?: () => void;
}

const DashboardSettingsHeader = ({ isSaving, onSave }: DashboardSettingsHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
            <Settings className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              Settings
            </h1>
            <p className="text-muted-foreground hidden text-xs font-medium opacity-80 sm:block sm:text-sm">
              Manage your account preferences and privacy settings.
            </p>
          </div>
        </div>

        {onSave && (
          <div className="flex shrink-0 items-center gap-2">
            <Button
              onClick={onSave}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 group relative h-9 overflow-hidden rounded-full px-4 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 sm:h-10 sm:px-6 sm:text-xs"
            >
              <span
                className={`flex items-center gap-2 transition-all duration-300 ${isSaving ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}
              >
                <Save className="h-3.5 w-3.5 group-hover:rotate-12 sm:h-4 sm:w-4" />
                Save Changes
              </span>

              {isSaving && (
                <span className="absolute inset-0 flex items-center justify-center gap-2 text-white">
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent sm:h-4 sm:w-4" />
                  Saving...
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardSettingsHeader;
