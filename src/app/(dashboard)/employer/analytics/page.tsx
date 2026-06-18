import type { Metadata } from "next";
import AnalyticsView from "../../../../view/dashboard/employer/analytics/AnalyticsView";
import UpgradeGate from "@/components/ui/UpgradeGate";

export const metadata: Metadata = {
  title: "Performance Analytics",
  description: "Employer hiring metrics, funnels, and job performance.",
  robots: { index: false, follow: false },
};

export default function EmployerAnalyticsPage() {
  return (
    <UpgradeGate
      feature="canViewAnalytics"
      title="Advanced Analytics Locked"
      description="Access deep insights on candidate conversion funnels, job performance trends, and team metrics. Upgrade to Growth or Enterprise to unlock."
    >
      <AnalyticsView />
    </UpgradeGate>
  );
}
