'use client';

import { Receipt } from 'lucide-react';
import DashboardHeaderContainer from './DashboardHeaderContainer';

export default function DashboardCandidateBillingHeader() {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <Receipt className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              Billing Details
            </h1>
            <p className="text-muted-foreground inline-flex truncate text-xs font-medium opacity-80 sm:text-sm">
              View and download your
              <span className="hidden sm:block">
                &nbsp;candidate premium invoice history and subscription details
              </span>
              <span className="sm:hidden">&nbsp;billing history</span>
            </p>
          </div>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
}
