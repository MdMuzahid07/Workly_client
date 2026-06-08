"use client";

import { ProfileInsightsPanel } from "@/components/dashboard/profile-views/ProfileInsightsPanel";
import DashboardHeaderContainer from "@/components/dashboard/dashboard-nav/header/DashboardHeaderContainer";
import { Eye } from "lucide-react";

export default function ProfileViewsView() {
  return (
    <div className="mt-16 min-h-screen">
      {/* ================= Page Header ================= */}
      <DashboardHeaderContainer>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <Eye className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              Profile Insights
            </h1>
            <p className="text-muted-foreground inline-flex text-xs font-medium opacity-80 sm:text-sm">
              Track who is viewing your profile
            </p>
          </div>
        </div>
      </DashboardHeaderContainer>

      {/* ================= Full Insights Panel (stats + chart + visitors) ================= */}
      <ProfileInsightsPanel />
    </div>
  );
}
