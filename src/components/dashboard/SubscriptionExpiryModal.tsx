"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetMySubscriptionQuery } from "@/redux/feature/subscription/subscriptionApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowRight, Calendar, Lock } from "lucide-react";
import { PlanType } from "@/types/subscription";

export default function SubscriptionExpiryModal() {
  const router = useRouter();
  const { data: subRes, isLoading } = useGetMySubscriptionQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  const subData = subRes?.data;

  useEffect(() => {
    if (isLoading || !subData) return;

    const planName = subData.planName || "Free";
    const isFreePlan =
      planName.toLowerCase() === "free" ||
      planName.toLowerCase() === "admin access";

    if (isFreePlan || subData.status !== "ACTIVE" || !subData.endDate) {
      return;
    }

    const expiryDate = new Date(subData.endDate);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const calculatedDaysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Show if 7 days or less, and subscription is not yet fully expired (days >= 0)
    if (calculatedDaysLeft >= 0 && calculatedDaysLeft <= 7) {
      setDaysLeft(calculatedDaysLeft);

      // Check session storage so we only show once per login/session
      const hasShownThisSession = sessionStorage.getItem(
        "workly_shown_expiry_modal",
      );
      if (!hasShownThisSession) {
        setIsOpen(true);
      }
    }
  }, [subData, isLoading]);

  const handleDismiss = () => {
    sessionStorage.setItem("workly_shown_expiry_modal", "true");
    setIsOpen(false);
  };

  const handleRenew = () => {
    sessionStorage.setItem("workly_shown_expiry_modal", "true");
    setIsOpen(false);

    if (subData?.planType === PlanType.EMPLOYER) {
      router.push("/employer/billing");
    } else {
      router.push("/dashboard/billing");
    }
  };

  if (!isOpen || daysLeft === null || !subData) return null;

  const isEmployer = subData.planType === PlanType.EMPLOYER;

  // Key features lost on degrade
  const lostBenefits = isEmployer
    ? [
        "Your active job postings will be paused or restricted to 1 active post",
        "You will lose access to team member collaboration controls",
        "Direct candidate messaging capabilities will be restricted",
        "Advanced recruitment analytics dashboards will be locked",
      ]
    : [
        "Your job application limit will degrade back to 40 per month",
        "Multiple resume version manager slots will be deactivated",
        "Access to recruiter profile analytics (who viewed your CV) will be locked",
        "Direct messaging to employers will be disabled",
      ];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleDismiss();
      }}
    >
      <DialogContent className="relative max-w-[calc(100%-2rem)] overflow-hidden border-amber-500/20 bg-slate-900 p-0 text-slate-100 sm:max-w-md">
        {/* Glow effect */}
        <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />
        <div className="absolute -right-12 -bottom-12 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />

        <div className="space-y-6 p-6">
          <div className="flex flex-col items-center space-y-3 text-center">
            <div className="animate-pulse rounded-full border border-amber-500/30 bg-amber-500/10 p-3">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            </div>

            <div className="space-y-1">
              <DialogHeader>
                <div className="mb-1 flex items-center justify-center gap-2">
                  <Badge className="animate-bounce border-none bg-amber-500 px-2.5 py-0.5 font-black text-slate-950">
                    {daysLeft === 0
                      ? "Expires Today"
                      : daysLeft === 1
                        ? "1 Day Remaining"
                        : `${daysLeft} Days Remaining`}
                  </Badge>
                </div>
                <DialogTitle className="text-xl font-extrabold tracking-tight text-white">
                  Subscription Renewal Pending
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="mt-1 text-xs leading-relaxed text-slate-400">
                Your{" "}
                <span className="font-bold text-amber-400">
                  {subData.planName}
                </span>{" "}
                subscription is due for manual payment. Renew now to maintain
                uninterrupted access.
              </DialogDescription>
            </div>
          </div>

          {/* Loss list */}
          <div className="space-y-3.5 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
            <h4 className="flex items-center gap-1.5 border-b border-slate-800/80 pb-2 text-xs font-bold tracking-wider text-slate-200 uppercase">
              <Lock className="h-3.5 w-3.5 text-amber-500" />
              What will be locked:
            </h4>
            <ul className="space-y-2.5">
              {lostBenefits.map((benefit, i) => (
                <li
                  key={i}
                  className="text-slate-350 flex items-start gap-2 text-xs leading-relaxed font-medium"
                >
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/60" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expiry Details */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-950/30 px-4 py-3 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-400">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>Expiry Date:</span>
            </div>
            <span className="font-mono font-bold text-white">
              {new Date(subData.endDate || "").toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 border-t border-slate-800 bg-slate-950/60 p-4 sm:flex-row sm:justify-end sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={handleDismiss}
            className="rounded-xl border border-slate-800 font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white sm:w-auto"
          >
            Remind Me Later
          </Button>
          <Button
            type="button"
            onClick={handleRenew}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 font-black text-slate-950 shadow-lg shadow-amber-500/10 hover:bg-amber-600 hover:shadow-amber-500/20 sm:w-auto"
          >
            Renew Subscription
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
