'use client';

import { useAppSelector } from '@/redux/hooks';
import { BarChart3 } from 'lucide-react';
import DashboardHeaderContainer from './DashboardHeaderContainer';

const DashboardJobSeekerHeader = () => {
  const { user } = useAppSelector((state) => state.auth) || {};

  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
            <BarChart3 className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              Welcome back, {user?.fullName?.split(' ')[0] || 'there'}
            </h1>
            <p className="text-muted-foreground flex truncate text-xs font-medium opacity-80 sm:text-sm">
              {`Here's`} an overview
              <span className="hidden sm:block">&nbsp;of your job search activity</span>
            </p>
          </div>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardJobSeekerHeader;
