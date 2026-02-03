"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardEmployerPricingHeader from "../../../../components/dashboard/dashboard-nav/header/DashboardEmployerPricingHeader";

export default function EmployerPricingPage() {
  return (
    <div className="min-h-screen">
      <DashboardEmployerPricingHeader />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Pricing Packages</CardTitle>
            <p className="text-muted-foreground text-sm">
              View and manage your subscription plan. Upgrade for more job posts
              and features.
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Pricing and plan management will be available here. Contact
              support for custom enterprise plans.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
