/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardCandidatePricingHeader from "@/components/dashboard/dashboard-nav/header/DashboardCandidatePricingHeader";
import CandidateFeatureComparisonTable from "@/components/dashboard/pricing/CandidateFeatureComparisonTable";
import CandidatePricingFAQ from "@/components/dashboard/pricing/CandidatePricingFAQ";
import CandidateSubscriptionStatusCard from "@/components/dashboard/pricing/CandidateSubscriptionStatusCard";
import PricingTierCard from "@/components/dashboard/pricing/PricingTierCard";
import { useGetPlansQuery } from "@/redux/feature/plan/planApi";
import { useGetMySubscriptionQuery } from "@/redux/feature/subscription/subscriptionApi";
import JobSeekerPricingSkeleton from "@/skeleton/dashboard/job-seeker/pricing/JobSeekerPricingSkeleton";
import { Package, Shield, Zap } from "lucide-react";

export default function JobSeekerPricingView() {
  const { data: subRes, isLoading: isSubLoading } = useGetMySubscriptionQuery();
  const { data: plansRes, isLoading: isPlansLoading } = useGetPlansQuery({
    type: "candidate",
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

    let icon = Package;
    let color = "text-slate-500";
    let borderColor = "border-slate-200 dark:border-slate-800";
    let bgColor = "bg-slate-50/50 dark:bg-slate-900/20";
    let variant: "primary" | "outline" = "outline";
    let popular = false;
    let cta = "Upgrade";

    if (nameLower.includes("pro")) {
      icon = Zap;
      color = "text-primary";
      borderColor = "border-primary/30";
      bgColor = "bg-primary/5";
      variant = "primary";
      popular = true;
      cta = "Upgrade to Pro";
    } else if (nameLower.includes("premium") || nameLower.includes("elite")) {
      icon = Shield;
      color = "text-violet-500";
      borderColor = "border-violet-200 dark:border-violet-900/50";
      bgColor = "bg-violet-50/50 dark:bg-violet-900/10";
      cta = "Upgrade to Premium";
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
  const isLoading = isSubLoading || isPlansLoading;

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

            <div className="space-y-8 pt-6">
              <div className="text-center">
                <h2 className="text-foreground text-3xl font-black tracking-tight sm:text-4xl">
                  Land your dream job faster
                </h2>
                <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
                  Upgrade your search with high profile boosts, unlimited job
                  applications, and expert 1-on-1 career assistance.
                </p>
              </div>

              {/* Pricing Tiers Grid */}
              <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-3">
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

            {/* Feature Comparison */}
            <CandidateFeatureComparisonTable />

            {/* FAQ Section */}
            <CandidatePricingFAQ />
          </div>
        </div>
      )}
    </div>
  );
}
