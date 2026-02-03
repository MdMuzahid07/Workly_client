"use client";

import { Package } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

export default function DashboardEmployerPricingHeader() {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Package className="text-primary h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-foreground truncate text-xl font-bold sm:text-2xl">
              Pricing Packages
            </h1>
            <p className="text-muted-foreground truncate text-sm">
              View and manage your subscription plan
            </p>
          </div>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
}
