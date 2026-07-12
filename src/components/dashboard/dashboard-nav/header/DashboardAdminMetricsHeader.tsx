'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Server } from 'lucide-react';
import DashboardHeaderContainer from './DashboardHeaderContainer';

interface DashboardAdminMetricsHeaderProps {
  onRefresh?: () => void;
  isFetching?: boolean;
}

const DashboardAdminMetricsHeader = ({
  onRefresh,
  isFetching = false,
}: DashboardAdminMetricsHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
            <Server className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
                System Telemetry
              </h1>
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary hidden rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase sm:inline-flex"
              >
                Live Metrics
              </Badge>
            </div>
            <p className="text-muted-foreground hidden truncate text-xs font-medium opacity-80 sm:block sm:text-sm">
              Real-time resource utilization, database latency, and performance diagnostics.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            onClick={onRefresh}
            disabled={isFetching}
            className="bg-primary hover:bg-primary/90 flex h-9 w-9 items-center justify-center p-0 font-bold shadow-md sm:h-9 sm:w-auto sm:px-6"
          >
            <RefreshCw className={`h-4 w-4 sm:mr-2 ${isFetching ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isFetching ? 'Syncing...' : 'Refresh Status'}</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminMetricsHeader;
