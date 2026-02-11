/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Building2, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../ui/button";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardOverviewHeader = ({ companyData }: { companyData: any }) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <Building2 className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              {companyData.name}
            </h1>
            <p className="text-muted-foreground truncate text-xs font-medium opacity-80 sm:text-sm">
              {companyData.industry} • {companyData.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/employer/settings" className="sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
            >
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
          <Link href="/employer/settings" className="hidden sm:block">
            <Button variant="outline" className="rounded-full font-bold">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Link href="/employer/new-job-post">
            <Button className="rounded-full font-bold shadow-sm">
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Post Job</span>
            </Button>
          </Link>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardOverviewHeader;
