"use client";

import DashboardCandidatePricingHeader from "@/components/dashboard/dashboard-nav/header/DashboardCandidatePricingHeader";
import CandidateFeatureComparisonTable from "@/components/dashboard/pricing/CandidateFeatureComparisonTable";
import CandidatePricingFAQ from "@/components/dashboard/pricing/CandidatePricingFAQ";
import PricingTierCard from "@/components/dashboard/pricing/PricingTierCard";
import CandidateSubscriptionStatusCard from "@/components/dashboard/pricing/CandidateSubscriptionStatusCard";
import { CANDIDATE_PRICING_TIERS } from "@/constants/pricing";

export default function JobSeekerPricingView() {
  return (
    <div className="min-h-screen pt-15">
      <DashboardCandidatePricingHeader />
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Current Subscription Status */}
          <CandidateSubscriptionStatusCard
            currentPlan="Free Seeker"
            applicationsUsed={4}
            applicationsLimit={15}
            renewalDate="June 27, 2026"
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
              {CANDIDATE_PRICING_TIERS.map((tier) => (
                <PricingTierCard key={tier.id} {...tier} />
              ))}
            </div>
          </div>

          {/* Feature Comparison */}
          <CandidateFeatureComparisonTable />

          {/* FAQ Section */}
          <CandidatePricingFAQ />
        </div>
      </div>
    </div>
  );
}
