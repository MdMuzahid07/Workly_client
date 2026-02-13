"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BillingSummary } from "@/types/billing";
import { Calendar, CreditCard, DollarSign, RefreshCcw } from "lucide-react";

interface BillingSummaryCardProps {
  summary: BillingSummary;
}

export default function BillingSummaryCard({
  summary,
}: BillingSummaryCardProps) {
  return (
    <Card className="border-primary/10 from-primary/8 to-primary/2 overflow-hidden bg-linear-to-br via-transparent shadow-sm">
      <CardContent className="p-0">
        <div className="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
          {/* Current Plan */}
          <div className="space-y-4 p-6">
            <div className="flex items-center gap-2.5">
              <div className="bg-primary/10 text-primary rounded-lg p-2">
                <RefreshCcw className="h-4 w-4" />
              </div>
              <span className="text-muted-foreground/70 text-[10px] font-black tracking-widest uppercase">
                Current Plan
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-foreground text-2xl font-black tracking-tight">
                {summary.currentPlan}
              </h3>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Account Active
                </span>
              </div>
            </div>
          </div>

          {/* Next Payment */}
          <div className="space-y-4 p-6">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
                <Calendar className="h-4 w-4" />
              </div>
              <span className="text-muted-foreground/70 text-[10px] font-black tracking-widest uppercase">
                Next Payment
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-foreground text-2xl font-black tracking-tight">
                {summary.nextBillingDate}
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                Automatic renewal
              </p>
            </div>
          </div>

          {/* Amount Due */}
          <div className="space-y-4 p-6">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                <DollarSign className="h-4 w-4" />
              </div>
              <span className="text-muted-foreground/70 text-[10px] font-black tracking-widest uppercase">
                Amount Due
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-foreground text-2xl font-black tracking-tight">
                ${summary.amountDue.toFixed(2)}
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                Charged to default card
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-primary/2 space-y-4 p-6">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-violet-500/10 p-2 text-violet-600 dark:text-violet-400">
                <CreditCard className="h-4 w-4" />
              </div>
              <span className="text-muted-foreground/70 text-[10px] font-black tracking-widest uppercase">
                Auto-Renew
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-foreground text-sm font-bold">
                  Status
                </span>
                <Badge
                  variant="outline"
                  className={cn(
                    "border-none px-2 py-0 text-[10px] font-black tracking-tighter uppercase",
                    summary.autoRenew
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-slate-500/10 text-slate-600",
                  )}
                >
                  {summary.autoRenew ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full transition-all duration-1000"
                  style={{ width: summary.autoRenew ? "100%" : "0%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { cn } from "@/lib/utils";
