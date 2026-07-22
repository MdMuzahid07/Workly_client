'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Download, ShieldAlert } from 'lucide-react';
import DashboardHeaderContainer from './DashboardHeaderContainer';

interface DashboardAdminReportedJobsHeaderProps {
  onExportClick?: () => void;
  onClearAllClick?: () => void;
}

const DashboardAdminReportedJobsHeader = ({
  onExportClick,
  onClearAllClick,
}: DashboardAdminReportedJobsHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-destructive/10 ring-destructive/5 shrink-0 rounded-lg p-2 ring-4">
            <AlertTriangle className="text-destructive h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
                Reported Content
              </h1>
              <Badge
                variant="outline"
                className="border-destructive/20 bg-destructive/5 text-destructive hidden items-center gap-1 sm:flex"
              >
                <ShieldAlert className="h-3 w-3" />
                Critical Queue
              </Badge>
            </div>
            <p className="text-muted-foreground hidden truncate text-xs font-medium opacity-80 sm:block sm:text-sm">
              Investigate flagged listings and enforce community standards.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onClearAllClick}
            className="border-destructive/20 text-destructive hover:bg-destructive/5 flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold sm:h-9 sm:w-auto sm:px-4"
          >
            <ShieldAlert className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Clear Flagged</span>
          </Button>

          <Button
            variant="outline"
            onClick={onExportClick}
            className="border-primary/20 text-primary hover:bg-primary/5 flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold sm:h-9 sm:w-auto sm:px-4"
          >
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Export Reports</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminReportedJobsHeader;
