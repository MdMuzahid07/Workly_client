'use client';

import { Badge } from '@/components/ui/badge';
import { AlertCircle, Download, Loader2, ShieldCheck, UserPlus } from 'lucide-react';
import { Button } from '../../../ui/button';
import DashboardHeaderContainer from './DashboardHeaderContainer';

interface DashboardAdminAdministratorsHeaderProps {
  onAddAdminClick?: () => void;
  onExportClick?: () => void;
  isExporting?: boolean;
}

const DashboardAdminAdministratorsHeader = ({
  onAddAdminClick,
  onExportClick,
  isExporting = false,
}: DashboardAdminAdministratorsHeaderProps) => {
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
                Administrator Management
              </h1>
              <Badge
                variant="outline"
                className="hidden items-center gap-1 border-emerald-200 bg-emerald-50 text-emerald-600 sm:flex"
              >
                <AlertCircle className="h-3 w-3" />
                Secure Mode
              </Badge>
            </div>
            <p className="text-muted-foreground hidden truncate text-xs font-medium opacity-80 sm:block sm:text-sm">
              Manage internal staff roles, permissions, and monitor security logs.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onExportClick}
            disabled={isExporting}
            className="border-primary/20 text-primary hover:bg-primary/5 flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold sm:h-9 sm:w-auto sm:px-4"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export Logs'}</span>
          </Button>
          <Button
            onClick={onAddAdminClick}
            className="flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold shadow-sm sm:h-9 sm:w-auto sm:px-4"
          >
            <UserPlus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Admin</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminAdministratorsHeader;
