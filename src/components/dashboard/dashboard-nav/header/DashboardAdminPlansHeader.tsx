"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, RefreshCcw } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

interface DashboardAdminPlansHeaderProps {
  onUpdatePricingClick?: () => void;
  onCreatePlanClick?: () => void;
}

const DashboardAdminPlansHeader = ({
  onUpdatePricingClick,
  onCreatePlanClick,
}: DashboardAdminPlansHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex h-full min-w-0 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <CreditCard className="text-primary h-6 w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                Subscription Plans
              </h1>
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary hidden rounded-full px-2 py-0 text-[10px] font-bold tracking-wider uppercase sm:inline-flex"
              >
                Monetization
              </Badge>
            </div>
            <p className="text-muted-foreground truncate text-xs font-medium opacity-80 sm:text-sm">
              Manage product tiers, pricing, and feature accessibility.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onUpdatePricingClick}
            className="border-primary/20 hover:bg-primary/5 hidden h-9 rounded-full font-bold shadow-sm sm:flex"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Update Pricing
          </Button>
          <Button
            size="sm"
            onClick={onCreatePlanClick}
            className="h-9 rounded-full font-bold shadow-md"
          >
            <Plus className="mr-1 h-4 w-4" />
            <span className="hidden sm:inline">Create Plan</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminPlansHeader;
