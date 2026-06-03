"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Package, TrendingUp } from "lucide-react";

interface CandidateSubscriptionStatusCardProps {
  currentPlan: string;
  applicationsUsed: number;
  applicationsLimit: number; // can be -1 for unlimited
  renewalDate: string;
}

export default function CandidateSubscriptionStatusCard({
  currentPlan,
  applicationsUsed,
  applicationsLimit,
  renewalDate,
}: CandidateSubscriptionStatusCardProps) {
  const isUnlimited = applicationsLimit === -1 || applicationsLimit >= 999;
  const usagePercentage = isUnlimited
    ? 0
    : Math.round((applicationsUsed / applicationsLimit) * 100);

  return (
    <Card className="border-primary/10 from-primary/5 overflow-hidden bg-linear-to-br via-transparent to-transparent">
      <CardContent className="p-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-foreground text-lg font-bold">
                  Active Seeker Plan
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-2 py-0"
                >
                  {currentPlan}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Your plan renews on{" "}
                <span className="text-foreground font-semibold">
                  {renewalDate}
                </span>
              </p>
            </div>
          </div>

          <div className="flex max-w-md flex-1 flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5 font-medium">
                <TrendingUp className="text-primary h-4 w-4" />
                <span>Job Applications Usage</span>
              </div>
              <span className="text-muted-foreground">
                <span className="text-foreground font-bold">
                  {applicationsUsed}
                </span>{" "}
                / {isUnlimited ? "Unlimited" : `${applicationsLimit} apps used`}
              </span>
            </div>
            {!isUnlimited && (
              <Progress value={usagePercentage} className="h-2" />
            )}
            <p className="text-muted-foreground/60 text-[10px] font-bold tracking-wider uppercase">
              {isUnlimited
                ? "Enjoy unlimited job applications & top priority boost!"
                : `${100 - usagePercentage}% of your monthly applications remaining`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
