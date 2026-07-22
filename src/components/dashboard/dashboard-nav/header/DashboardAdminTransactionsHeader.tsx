'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Receipt } from 'lucide-react';
import DashboardHeaderContainer from './DashboardHeaderContainer';

interface DashboardAdminTransactionsHeaderProps {
  onExportClick?: () => void;
  isExporting?: boolean;
}

const DashboardAdminTransactionsHeader = ({
  onExportClick,
  isExporting = false,
}: DashboardAdminTransactionsHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
            <Receipt className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
                Transactions
              </h1>
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary hidden rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase sm:inline-flex"
              >
                Billing Hub
              </Badge>
            </div>
            <p className="text-muted-foreground hidden truncate text-xs font-medium opacity-80 sm:block sm:text-sm">
              Audit and monitor all platform-wide billing activity.
            </p>
          </div>
        </div>

        {/* Export CSV only — New Invoice removed (payments are user-initiated) */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onExportClick}
            disabled={isExporting}
            className="border-primary/20 hover:bg-primary/5 flex h-9 w-9 items-center justify-center p-0 font-bold shadow-sm sm:h-9 sm:w-auto sm:px-4"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{isExporting ? 'Exporting…' : 'Export CSV'}</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminTransactionsHeader;
