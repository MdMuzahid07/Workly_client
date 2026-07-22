'use client';

import { Building2, Edit3, Save, Shield, X } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import DashboardHeaderContainer from './DashboardHeaderContainer';
import { CompanyProfile } from '../../../../types/company-profile';

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
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
            <Building2 className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <h1 className="text-foreground min-w-0 truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
                {currentProfile.name}
              </h1>
              {currentProfile.isVerified && (
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary shrink-0 rounded-full border-none px-2 py-0.5 text-[10px] font-bold"
                >
                  <Shield className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground hidden truncate text-xs font-medium opacity-80 sm:block sm:text-sm">
              Manage your company profile and information
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold shadow-sm sm:h-9 sm:w-auto sm:px-4"
            >
              <Edit3 className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Edit Profile</span>
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold sm:h-9 sm:w-auto sm:px-4"
              >
                <X className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Cancel</span>
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold shadow-sm sm:h-9 sm:w-auto sm:px-4"
              >
                <Save className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardCompanyProfileHeader;
