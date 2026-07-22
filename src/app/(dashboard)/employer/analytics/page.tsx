import type { Metadata } from 'next';
import AnalyticsView from '../../../../view/dashboard/employer/analytics/AnalyticsView';
import UpgradeGate from '@/components/ui/UpgradeGate';

export const metadata: Metadata = {
  title: 'Performance Analytics',
  description: 'Employer hiring metrics, funnels, and job performance.',
  robots: { index: false, follow: false },
};

export default function EmployerAnalyticsPage() {
  return (
    <UpgradeGate
      feature="canViewAnalytics"
      title="Performance Analytics on Growth Plan"
      description="Detailed hiring metrics, candidate pipeline insights, and job performance reports are available on Growth and Enterprise plans."
    >
      <AnalyticsView />
    </UpgradeGate>
  );
}
