/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardEmployerPricingHeader from "@/components/dashboard/dashboard-nav/header/DashboardEmployerPricingHeader";
import FeatureComparisonTable from "@/components/dashboard/pricing/FeatureComparisonTable";
import PricingFAQ from "@/components/dashboard/pricing/PricingFAQ";
import PricingTierCard from "@/components/dashboard/pricing/PricingTierCard";
import SubscriptionStatusCard from "@/components/dashboard/pricing/SubscriptionStatusCard";
import { useGetMyCompanyQuery } from "@/redux/feature/company/companyApi";
import { useGetPlansQuery } from "@/redux/feature/plan/planApi";
import { Loader2, Package, Shield, Star, Zap } from "lucide-react";

export default function EmployerPricingView() {
  const { data: myCompanyRes, isLoading: isCompanyLoading } =
    useGetMyCompanyQuery(undefined);
  const { data: plansRes, isLoading: isPlansLoading } = useGetPlansQuery({
    type: "employer",
    isActive: true,
  });

  const company = myCompanyRes?.data;
  const subscription = company?.subscription;
  const activePlanName = subscription?.plan?.name || "emp_free";

  const getRenewalDateString = () => {
    if (!subscription?.endDate) return "Never";
    return new Date(subscription.endDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const mapDbPlanToCardProps = (plan: any) => {
    const nameLower = plan.name.toLowerCase();

    let icon = Package;
    let color = "text-slate-500";
    let borderColor = "border-slate-200 dark:border-slate-800";
    let bgColor = "bg-slate-50/50 dark:bg-slate-900/20";
    let variant: "primary" | "outline" = "outline";
    let popular = false;
    let cta = "Upgrade";

    if (nameLower.includes("starter")) {
      icon = Star;
      color = "text-amber-500";
      borderColor = "border-amber-200 dark:border-amber-900/50";
      bgColor = "bg-amber-50/50 dark:bg-amber-900/10";
      cta = "Upgrade to Starter";
    } else if (nameLower.includes("pro")) {
      icon = Zap;
      color = "text-primary";
      borderColor = "border-primary/30";
      bgColor = "bg-primary/5";
      variant = "primary";
      popular = true;
      cta = "Upgrade to Pro";
    } else if (nameLower.includes("enterprise")) {
      icon = Shield;
      color = "text-violet-500";
      borderColor = "border-violet-200 dark:border-violet-900/50";
      bgColor = "bg-violet-50/50 dark:bg-violet-900/10";
      cta = "Contact Sales";
    } else if (nameLower.includes("free")) {
      cta = "Current Plan";
    }

    let parsedFeatures: string[] = [];
    if (Array.isArray(plan.features)) {
      parsedFeatures = plan.features;
    } else if (typeof plan.features === "string") {
      try {
        parsedFeatures = JSON.parse(plan.features);
      } catch {
        parsedFeatures = [];
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
      price: plan.price === 0 ? "৳0" : `৳${plan.price.toLocaleString()}`,
      period: "/month",
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
  const isLoading = isCompanyLoading || isPlansLoading;

  return (
    <div className="min-h-screen pt-15">
      <DashboardEmployerPricingHeader />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex h-60 items-center justify-center">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-10">
            {/* Current Subscription Status */}
            <SubscriptionStatusCard
              currentPlan={
                activePlanName
                  .replace("emp_", "")
                  .replace("cand_", "")
                  .charAt(0)
                  .toUpperCase() +
                activePlanName.replace("emp_", "").replace("cand_", "").slice(1)
              }
              jobPostsUsed={company?.jobs?.length || 0}
              jobPostsLimit={subscription?.plan?.maxActiveJobs || 1}
              renewalDate={getRenewalDateString()}
            />

            <div className="space-y-8 pt-6">
              <div className="text-center">
                <h2 className="text-foreground text-3xl font-black tracking-tight sm:text-4xl">
                  Ready to scale your hiring?
                </h2>
                <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
                  Choose the plan that fits your current needs. You can always
                  upgrade as you grow.
                </p>
              </div>

              {/* Pricing Tiers Grid */}
              <div className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-3">
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

            {/* Feature Comparison */}
            <FeatureComparisonTable />

            {/* FAQ Section */}
            <PricingFAQ />
          </div>
        )}
      </div>
    </div>
  );
}
