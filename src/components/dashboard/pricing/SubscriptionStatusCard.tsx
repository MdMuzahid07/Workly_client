"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Package, TrendingUp } from "lucide-react";

interface SubscriptionStatusCardProps {
  currentPlan: string;
  jobPostsUsed: number;
  jobPostsLimit: number;
  renewalDate: string;
}

export default function SubscriptionStatusCard({
  currentPlan,
  jobPostsUsed,
  jobPostsLimit,
  renewalDate,
}: SubscriptionStatusCardProps) {
  const usagePercentage = Math.min(
    100,
    Math.round((jobPostsUsed / Math.max(1, jobPostsLimit)) * 100),
  );

  return (
    <Card className="border-primary/20 bg-card relative overflow-hidden rounded-2xl border shadow-xs">
      <div className="bg-primary/5 absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl" />
      <CardContent className="relative z-10 p-5 sm:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 ring-primary/5 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-4">
              <Package className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-foreground text-base font-bold sm:text-lg">
                  Active Subscription
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 rounded-full border px-2.5 py-0.5 text-xs font-bold"
                >
                  {currentPlan}
                </Badge>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Your plan renews on{" "}
                <span className="text-foreground font-semibold">
                  {renewalDate}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-muted/30 border-border/60 flex max-w-md flex-1 flex-col gap-2.5 rounded-xl border p-3.5 sm:p-4">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 font-semibold">
                <TrendingUp className="text-primary h-4 w-4" />
                <span>Job Posts Usage</span>
              </div>
              <span className="text-muted-foreground text-xs">
                <span className="text-foreground font-bold">
                  {jobPostsUsed}
                </span>{" "}
                / {jobPostsLimit} slots used
              </span>
            </div>
            <Progress value={usagePercentage} className="h-2 rounded-full" />
            <div className="flex items-center justify-between text-[11px] font-medium">
              <span className="text-muted-foreground">
                {100 - usagePercentage}% monthly quota remaining
              </span>
              <span className="text-primary font-bold">{usagePercentage}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
