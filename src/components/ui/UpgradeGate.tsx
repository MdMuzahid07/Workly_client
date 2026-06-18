"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCanAccess } from "@/hooks/useEntitlements";
import { useAppSelector } from "@/redux/hooks";
import { PlanFeatureFlags } from "@/types/subscription";
import { ArrowRight, Crown, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

interface UpgradeGateProps {
  feature: keyof PlanFeatureFlags;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  title?: string;
  description?: string;
}

export default function UpgradeGate({
  feature,
  children,
  fallback,
  title = "Premium Feature Locked",
  description = "This feature is only available on our premium subscription tiers. Upgrade your plan to get instant access.",
}: UpgradeGateProps) {
  const { hasAccess, isLoading, limit, current } = useCanAccess(feature);
  const { user } = useAppSelector((state) => state.auth) || {};

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  // If a custom fallback is provided, use it
  if (fallback) {
    return <>{fallback}</>;
  }

  const isEmployer = user?.role === "EMPLOYER";
  const pricingLink = isEmployer ? "/employer/pricing" : "/dashboard/pricing";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 flex w-full items-center justify-center px-4 py-12 duration-500">
      <Card className="border-primary/20 from-card to-background relative w-full max-w-lg overflow-hidden bg-linear-to-br shadow-2xl">
        {/* Top decorative gradient bar */}
        <div className="via-primary absolute top-0 right-0 left-0 h-1.5 bg-linear-to-r from-violet-500 to-emerald-500" />

        {/* Glow effect in background */}
        <div className="bg-primary/10 pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

        <CardContent className="flex flex-col items-center p-8 text-center sm:p-10">
          <div className="bg-primary/10 ring-primary/20 mb-6 inline-flex animate-pulse rounded-2xl p-4 ring-1">
            <Lock className="text-primary h-8 w-8" />
          </div>

          <h3 className="text-foreground flex items-center justify-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
            {title}
            <Sparkles className="h-5 w-5 animate-bounce text-violet-500" />
          </h3>

          <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-relaxed font-medium">
            {description}
          </p>

          {limit > 0 && (
            <div className="border-border/50 mt-6 w-full max-w-xs space-y-1.5 rounded-xl border bg-slate-50 p-4 text-xs dark:bg-slate-900/40">
              <div className="text-muted-foreground flex justify-between font-bold tracking-wide uppercase">
                <span>Usage Limit Reached</span>
                <span className="text-foreground">
                  {current} / {limit}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className="from-primary h-full rounded-full bg-linear-to-r to-violet-500"
                  style={{
                    width: `${Math.min(100, (current / limit) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href={pricingLink} className="w-full sm:w-auto">
              <Button className="bg-primary text-primary-foreground shadow-primary/20 hover:shadow-primary/40 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-bold shadow-lg transition-all sm:px-8">
                <Crown className="h-4 w-4" />
                View Upgrade Plans
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
