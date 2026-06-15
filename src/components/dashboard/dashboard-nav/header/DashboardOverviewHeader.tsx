"use client";

import { EMPLOYER_ROUTES } from "@/constants/employerRoutes";
import { Building2, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../ui/button";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

import type { CompanyProfile } from "@/types/company-profile";

const DashboardOverviewHeader = ({
  companyData,
}: {
  companyData: Partial<CompanyProfile>;
}) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
            <Building2 className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              {companyData.name}
            </h1>
            <p className="text-muted-foreground truncate text-xs font-medium opacity-80 sm:text-sm">
              {[companyData.industry, companyData.location]
                .filter(Boolean)
                .join(" • ") || "Employer account"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link href={EMPLOYER_ROUTES.settings}>
            <Button
              variant="outline"
              className="flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold sm:h-9 sm:w-auto sm:px-4"
            >
              <Settings className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </Link>
          <Link href={EMPLOYER_ROUTES.postJob}>
            <Button className="flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold shadow-sm sm:h-9 sm:w-auto sm:px-4">
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
