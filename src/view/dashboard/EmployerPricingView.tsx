"use client";
import DashboardEmployerPricingHeader from "@/components/dashboard/dashboard-nav/header/DashboardEmployerPricingHeader";
import FeatureComparisonTable from "@/components/dashboard/pricing/FeatureComparisonTable";
import PricingFAQ from "@/components/dashboard/pricing/PricingFAQ";
import PricingTierCard from "@/components/dashboard/pricing/PricingTierCard";
import SubscriptionStatusCard from "@/components/dashboard/pricing/SubscriptionStatusCard";
import { PRICING_TIERS } from "@/constants/pricing";

export default function EmployerPricingView() {
  return (
    <div className="min-h-screen">
      <DashboardEmployerPricingHeader />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Current Subscription Status */}
          <SubscriptionStatusCard
            currentPlan="Starter (Free)"
            jobPostsUsed={2}
            jobPostsLimit={3}
            renewalDate="March 15, 2026"
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
            <div className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {PRICING_TIERS.map((tier) => (
                <PricingTierCard key={tier.id} {...tier} />
              ))}
            </div>
          </div>

          {/* Feature Comparison */}
          <FeatureComparisonTable />

          {/* FAQ Section */}
          <PricingFAQ />
        </div>
      </div>
    </div>
  );
}
