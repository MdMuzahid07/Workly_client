'use client';

import { Settings, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../../ui/button';
import DashboardHeaderContainer from './DashboardHeaderContainer';

const AdminDashboardHeader = () => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
            <ShieldCheck className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              System Administration
            </h1>
            <p className="text-muted-foreground hidden truncate text-xs font-medium opacity-80 sm:block sm:text-sm">
              Global Overview • Performance Metrics • System Health
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link href="/admin/settings">
            <Button
              variant="outline"
              className="flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold sm:h-9 sm:w-auto sm:px-4"
            >
              <Settings className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </Link>
          <Link href="/admin/users/job-seekers">
            <Button className="flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold shadow-sm sm:h-9 sm:w-auto sm:px-4">
              <Users className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Manage Users</span>
            </Button>
          </Link>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default AdminDashboardHeader;
