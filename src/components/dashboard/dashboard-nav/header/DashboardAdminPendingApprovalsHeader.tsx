'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, History } from 'lucide-react';
import DashboardHeaderContainer from './DashboardHeaderContainer';

interface DashboardAdminPendingApprovalsHeaderProps {
  onExportClick?: () => void;
  onAuditLogsClick?: () => void;
}

const DashboardAdminPendingApprovalsHeader = ({
  onExportClick,
  onAuditLogsClick,
}: DashboardAdminPendingApprovalsHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
            <CheckCircle2 className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
                Pending Approvals
              </h1>
              <Badge
                variant="outline"
                className="hidden items-center gap-1 border-amber-200 bg-amber-50 text-amber-600 sm:flex"
              >
                Moderation Mode
              </Badge>
            </div>
            <p className="text-muted-foreground hidden truncate text-xs font-medium opacity-80 sm:block sm:text-sm">
              Review and approve new job postings to maintain quality.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onAuditLogsClick}
            className="border-primary/20 text-primary hover:bg-primary/5 flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold sm:h-9 sm:w-auto sm:px-4"
          >
            <History className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Audit Logs</span>
          </Button>

          <Button
            variant="outline"
            onClick={onExportClick}
            className="border-primary/20 text-primary hover:bg-primary/5 flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold sm:h-9 sm:w-auto sm:px-4"
          >
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Export Queue</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminPendingApprovalsHeader;
