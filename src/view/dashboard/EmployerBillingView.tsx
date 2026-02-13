"use client";

import BillingHistoryTable from "@/components/dashboard/billing/BillingHistoryTable";
import DashboardEmployerBillingHeader from "@/components/dashboard/dashboard-nav/header/DashboardEmployerBillingHeader";
import { MOCK_INVOICES } from "@/constants/billing";

export default function EmployerBillingView() {
  return (
    <div className="min-h-screen bg-slate-50/30 pb-20 dark:bg-transparent">
      <DashboardEmployerBillingHeader />

      <div className="animate-in fade-in px-4 py-8 duration-500 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Section: Billing History */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 px-1">
              <div className="h-6 w-1 rounded-full bg-emerald-500" />
              <h2 className="text-foreground/70 text-sm font-black tracking-[0.2em] uppercase">
                Billing History
              </h2>
            </div>
            <BillingHistoryTable invoices={MOCK_INVOICES} />
          </section>
        </div>
      </div>
    </div>
  );
}
