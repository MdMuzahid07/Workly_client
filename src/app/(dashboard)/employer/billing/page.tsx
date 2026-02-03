"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardEmployerBillingHeader from "../../../../components/dashboard/dashboard-nav/header/DashboardEmployerBillingHeader";

export default function EmployerBillingPage() {
  return (
    <div className="min-h-screen">
      <DashboardEmployerBillingHeader />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Billing Details</CardTitle>
            <p className="text-muted-foreground text-sm">
              View invoices, payment history, and update payment method.
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Billing history and payment methods will appear here. Manage your
              subscription from Settings.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
