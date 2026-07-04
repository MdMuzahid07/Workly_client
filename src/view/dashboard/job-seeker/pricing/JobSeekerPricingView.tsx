/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardCandidatePricingHeader from "@/components/dashboard/dashboard-nav/header/DashboardCandidatePricingHeader";
import CandidatePricingFAQ from "@/components/dashboard/pricing/CandidatePricingFAQ";
import CandidateSubscriptionStatusCard from "@/components/dashboard/pricing/CandidateSubscriptionStatusCard";
import PricingTierCard from "@/components/dashboard/pricing/PricingTierCard";
import { useGetPlansQuery } from "@/redux/feature/plan/planApi";
import { useGetMySubscriptionQuery } from "@/redux/feature/subscription/subscriptionApi";
import JobSeekerPricingSkeleton from "@/skeleton/dashboard/job-seeker/pricing/JobSeekerPricingSkeleton";
import { Crown, Package, Shield, ShieldCheck, Zap } from "lucide-react";

export default function JobSeekerPricingView() {
  const { data: subRes, isLoading: isSubLoading } = useGetMySubscriptionQuery();
  const { data: plansRes, isLoading: isPlansLoading } = useGetPlansQuery({
    type: "candidate",
    isActive: true,
  });

  const subData = subRes?.data;
  const activePlanName = subData?.planName || "Free";

  const isFirstTimeBuyer =
    activePlanName.toLowerCase() === "free" ||
    !subData?.price ||
    subData.price === 0;

  const getRenewalDateString = () => {
    if (!subData?.endDate) return "Never";
    return new Date(subData.endDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const mapDbPlanToCardProps = (plan: any) => {
    const nameLower = plan.name.toLowerCase();

    // ── Icon & colour scheme ────────────────────────────────────
    let icon = Package;
    let color = "text-slate-500";
    let borderColor = "border-slate-200 dark:border-slate-800";
    let bgColor = "bg-slate-50/50 dark:bg-slate-900/20";
    let variant: "primary" | "outline" = "outline";
    let popular = false;
    let cta = "Upgrade";

    // ── Parse Plan features (discount percentages & details) ─────
    const planFeatures = typeof plan.features === "object" ? plan.features : {};
    const durationMonths = planFeatures?.durationMonths || null;
    const discountPercent = Number(planFeatures?.firstTimeDiscountPercent || 0);
    const basePrice = plan.price;

    let displayPrice = `৳${basePrice.toLocaleString()}`;
    let originalPrice: string | undefined;
    let discountBadge: string | undefined;
    let periodNote: string | undefined;

    // Calculate dynamic discount for card display (only for first-time buyers)
    if (discountPercent > 0 && isFirstTimeBuyer) {
      originalPrice = `৳${basePrice.toLocaleString()}`;
      // Calculate Math.floor to match backend perfectly (no fraction allowed)
      const discountedValue = Math.floor(
        basePrice - basePrice * (discountPercent / 100),
      );
      displayPrice = `৳${discountedValue}`;
      discountBadge = `${discountPercent}% OFF · 1ST PURCHASE`;
    }

    if (nameLower === "free") {
      cta = "Current Plan";
    } else if (nameLower === "starter") {
      icon = Zap;
      color = "text-primary";
      borderColor = "border-primary/30";
      bgColor = "bg-primary/5";
      variant = "primary";
      popular = true;
      cta = "Get Starter";
    } else if (nameLower === "pro") {
      icon = Shield;
      color = "text-indigo-500";
      borderColor = "border-indigo-200 dark:border-indigo-900/50";
      bgColor = "bg-indigo-50/50 dark:bg-indigo-900/10";
      cta = "Get Pro (2 Months)";
      const effMonthly = Math.round(basePrice / (durationMonths || 2));
      periodNote = `Effective ৳${effMonthly}/month`;
    } else if (nameLower === "premium") {
      icon = Crown;
      color = "text-violet-500";
      borderColor = "border-violet-200 dark:border-violet-900/50";
      bgColor = "bg-violet-50/50 dark:bg-violet-900/10";
      cta = "Get Premium (3 Months)";
      const effMonthly = Math.round(basePrice / (durationMonths || 3));
      periodNote = `Effective ৳${effMonthly}/month`;
    }

    // ── Feature list fallback if DB returns none ────────────────
    let parsedFeatures: string[] = [];
    if (Array.isArray(plan.features) && plan.features.length > 0) {
      parsedFeatures = plan.features;
    } else if (typeof plan.features === "string") {
      try {
        parsedFeatures = JSON.parse(plan.features);
      } catch {
        parsedFeatures = [];
      }
    }

    if (!parsedFeatures || parsedFeatures.length === 0) {
      if (nameLower === "free") {
        parsedFeatures = [
          "40 job applications per month",
          "1 active CV / resume upload",
          "Standard profile visibility",
          "7-day profile view history (basic)",
          "In-app job alerts & notifications",
          "Basic application status (Submitted / Pending)",
        ];
      } else if (nameLower === "starter") {
        parsedFeatures = [
          "200 job applications per month",
          "5 active CV uploads",
          "Direct messaging to HR & Recruiters",
          "Full profile view history (30 days)",
          "Priority real-time job alerts",
          "Detailed application stage tracking",
        ];
      } else if (nameLower === "pro") {
        parsedFeatures = [
          "300 job applications per month",
          "10 active CV uploads",
          "Direct messaging to HR & Recruiters",
          "Full profile view history (30 days)",
          "Priority real-time job alerts",
          "Detailed application stage tracking",
        ];
      } else if (nameLower === "premium") {
        parsedFeatures = [
          "Unlimited job applications",
          "Unlimited CV uploads",
          "Direct messaging to HR & Recruiters",
          "Featured Candidate profile (5× visibility boost)",
          "Priority real-time job alerts",
          "Full application stage & insights tracking",
        ];
      }
    }

    // ── Duration period label ────────────────────────────────────
    let periodLabel: string | undefined;
    if (durationMonths === 1) periodLabel = "/ 1 month";
    else if (durationMonths === 2) periodLabel = "/ 2 months";
    else if (durationMonths === 3) periodLabel = "/ 3 months";

    // ── Readable display name ────────────────────────────────────
    const readableName = plan.name
      .replace("emp_", "")
      .replace("cand_", "")
      .split("_")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      id: plan.name,
      name: readableName,
      price: displayPrice,
      period: periodLabel,
      originalPrice,
      discountBadge,
      discountPercent,
      periodNote,
      description: plan.description || "",
      features: parsedFeatures,
      cta,
      variant,
      popular,
      icon,
      color,
      borderColor,
      bgColor,
    };
  };

  const plans = plansRes?.data || [];
  const isLoading = isSubLoading || isPlansLoading;

  // Calculate starting price dynamically from plans data
  const starterPlan = plans.find(
    (p: any) => p.name.toLowerCase() === "starter",
  );
  let starterMinPrice = "৳49";
  if (starterPlan) {
    const planFeatures =
      typeof starterPlan.features === "object" ? starterPlan.features : {};
    const discountPercent = Number(planFeatures?.firstTimeDiscountPercent || 0);
    const basePrice = starterPlan.price;
    if (discountPercent > 0) {
      starterMinPrice = `৳${Math.floor(basePrice - basePrice * (discountPercent / 100))}`;
    } else {
      starterMinPrice = `৳${basePrice}`;
    }
  }

  return (
    <div className="min-h-screen pt-8">
      <DashboardCandidatePricingHeader />
      {isLoading ? (
        <JobSeekerPricingSkeleton />
      ) : (
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {/* Current Subscription Status */}
            <CandidateSubscriptionStatusCard
              currentPlan={activePlanName}
              applicationsUsed={subData?.usage?.applicationsSubmitted || 0}
              applicationsLimit={
                subData?.features?.maxMonthlyApplications || 40
              }
              renewalDate={getRenewalDateString()}
            />

            <div className="space-y-8 pt-4">
              <div className="space-y-6 text-center">
                <div className="bg-primary/10 border-primary/20 text-primary inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold shadow-xs">
                  <ShieldCheck className="h-4 w-4" />
                  Elevate Your Career Search
                </div>
                <div className="space-y-2">
                  <h2 className="text-foreground text-2xl font-black tracking-tight sm:text-4xl">
                    Land your dream job faster
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base">
                    Upgrade with direct HR messaging, enhanced profile
                    visibility, and unlimited applications — starting from just{" "}
                    <strong className="text-foreground">
                      {starterMinPrice}
                    </strong>{" "}
                    for your first month.
                  </p>
                </div>
              </div>

              {/* Pricing Tiers Grid */}
              <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {plans.map((plan: any) => {
                  const cardProps = mapDbPlanToCardProps(plan);
                  const isActive =
                    activePlanName.toLowerCase() === plan.name.toLowerCase();
                  return (
                    <PricingTierCard
                      key={plan.id}
                      {...cardProps}
                      category="SEEKER_PREMIUM"
                      isActivePlan={isActive}
                    />
                  );
                })}
              </div>
            </div>

            {/* FAQ Section */}
            <CandidatePricingFAQ />
          </div>
        </div>
      )}
    </div>
  );
}
