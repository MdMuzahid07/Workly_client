/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardEmployerPricingHeader from "@/components/dashboard/dashboard-nav/header/DashboardEmployerPricingHeader";
import PricingFAQ from "@/components/dashboard/pricing/PricingFAQ";
import PricingTierCard from "@/components/dashboard/pricing/PricingTierCard";
import SubscriptionStatusCard from "@/components/dashboard/pricing/SubscriptionStatusCard";
import { useGetPlansQuery } from "@/redux/feature/plan/planApi";
import { useGetMySubscriptionQuery } from "@/redux/feature/subscription/subscriptionApi";
import EmployerPricingSkeleton from "@/skeleton/dashboard/employer/pricing/EmployerPricingSkeleton";
import { Package, Shield, ShieldCheck, Zap } from "lucide-react";

export default function EmployerPricingView() {
  const { data: subRes, isLoading: isSubLoading } = useGetMySubscriptionQuery();
  const { data: plansRes, isLoading: isPlansLoading } = useGetPlansQuery({
    type: "employer",
    isActive: true,
  });

  const subData = subRes?.data;
  const activePlanName = subData?.planName || "Free";

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

    const planFeatures =
      typeof plan.features === "object" && plan.features !== null
        ? plan.features
        : {};
    const discountPercent = Number(planFeatures?.firstTimeDiscountPercent || 0);
    const basePrice = plan.price;

    let displayPrice =
      plan.price === 0 ? "৳0" : `৳${plan.price.toLocaleString()}`;
    let originalPrice: string | undefined;
    let discountBadge: string | undefined;

    // Calculate dynamic discount for card display
    if (discountPercent > 0 && basePrice > 0) {
      originalPrice = `৳${basePrice.toLocaleString()}`;
      // Calculate Math.floor to match backend perfectly (no fraction allowed)
      const discountedValue = Math.floor(
        basePrice - basePrice * (discountPercent / 100),
      );
      displayPrice = `৳${discountedValue}`;
      discountBadge = `${discountPercent}% OFF · 1ST PURCHASE`;
    }

    let icon = Package;
    let color = "text-slate-500";
    let borderColor = "border-slate-200 dark:border-slate-800";
    let bgColor = "bg-slate-50/50 dark:bg-slate-900/20";
    let variant: "primary" | "outline" = "outline";
    let popular = false;
    let cta = "Upgrade";

    if (nameLower.includes("growth") || nameLower.includes("pro")) {
      icon = Zap;
      color = "text-primary";
      borderColor = "border-primary/30";
      bgColor = "bg-primary/5";
      variant = "primary";
      popular = true;
      cta = "Upgrade to Growth";
    } else if (
      nameLower.includes("enterprise") ||
      nameLower.includes("ultimate")
    ) {
      icon = Shield;
      color = "text-violet-500";
      borderColor = "border-violet-200 dark:border-violet-900/50";
      bgColor = "bg-violet-50/50 dark:bg-violet-900/10";
      cta = "Upgrade to Enterprise";
    } else if (nameLower.includes("free")) {
      cta = "Current Plan";
    }

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
      if (nameLower.includes("free")) {
        parsedFeatures = [
          "1 active job posting (30 days live)",
          "Standard candidate applicant tracking",
          "Basic company profile visibility",
          "Standard email notifications",
          "Community support",
        ];
      } else if (nameLower.includes("growth") || nameLower.includes("pro")) {
        parsedFeatures = [
          "10 active job postings (60 days live)",
          "Priority candidate matching & AI score",
          "Advanced applicant filters & bulk actions",
          "Featured company branding badge",
          "Real-time analytics dashboard",
          "Priority support (24/7 assistance)",
        ];
      } else if (
        nameLower.includes("enterprise") ||
        nameLower.includes("ultimate")
      ) {
        parsedFeatures = [
          "Unlimited active job postings",
          "Dedicated account manager",
          "AI-powered automated talent matching",
          "Custom ATS integration & API access",
          "Full team permission controls",
          "Custom branded career portal",
        ];
      }
    }

    // Capitalize each word for readable display
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
      period: "/month",
      originalPrice,
      discountBadge,
      discountPercent,
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

  return (
    <div className="min-h-screen pt-15">
      <DashboardEmployerPricingHeader />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <EmployerPricingSkeleton />
        ) : (
          <div className="space-y-10">
            {/* Current Subscription Status */}
            <SubscriptionStatusCard
              currentPlan={activePlanName}
              jobPostsUsed={subData?.usage?.jobsPosted || 0}
              jobPostsLimit={subData?.features?.maxActiveJobs || 1}
              renewalDate={getRenewalDateString()}
            />

            <div className="space-y-8 pt-4">
              <div className="space-y-6 text-center">
                <div className="bg-primary/10 border-primary/20 text-primary inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold shadow-xs">
                  <ShieldCheck className="h-4 w-4" />
                  Flexible & Transparent Plans
                </div>
                <div className="space-y-2">
                  <h2 className="text-foreground text-2xl font-black tracking-tight sm:text-4xl">
                    Ready to scale your hiring?
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base">
                    Choose the plan that fits your current needs. You can always
                    upgrade as you grow.
                  </p>
                </div>
              </div>

              {/* Pricing Tiers Grid */}
              <div className="grid grid-cols-1 gap-8 pt-4 sm:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan: any) => {
                  const cardProps = mapDbPlanToCardProps(plan);
                  const isActive =
                    activePlanName.toLowerCase() === plan.name.toLowerCase();
                  return (
                    <PricingTierCard
                      key={plan.id}
                      {...cardProps}
                      category="EMPLOYER_PLAN"
                      isActivePlan={isActive}
                    />
                  );
                })}
              </div>
            </div>

            {/* FAQ Section */}
            <PricingFAQ />
          </div>
        )}
      </div>
    </div>
  );
}
