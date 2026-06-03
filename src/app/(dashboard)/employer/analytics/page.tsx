import type { Metadata } from "next";
import AnalyticsView from "../../../../view/dashboard/employer/analytics/AnalyticsView";

export const metadata: Metadata = {
  title: "Performance Analytics",
  description: "Employer hiring metrics, funnels, and job performance.",
  robots: { index: false, follow: false },
};

export default function EmployerAnalyticsPage() {
  return <AnalyticsView />;
}
