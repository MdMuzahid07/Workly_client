import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Download, LayoutDashboard } from 'lucide-react';
import type { EmployerAnalyticsPeriod } from '@/types/employerAnalytics';
import WKSelect from '@/components/form/WkSelect';
import { Button } from '../../../ui/button';
import DashboardHeaderContainer from './DashboardHeaderContainer';

type DashboardAnalyticsHeaderProps = {
  timeRange: EmployerAnalyticsPeriod | string;
  setTimeRange: (range: EmployerAnalyticsPeriod) => void;
  onExportReport?: () => void;
  exportDisabled?: boolean;
  isExporting?: boolean;
};

const DashboardAnalyticsHeader = ({
  timeRange,
  setTimeRange,
  onExportReport,
  exportDisabled,
  isExporting = false,
}: DashboardAnalyticsHeaderProps) => {
  const methods = useForm({
    defaultValues: {
      period: timeRange,
    },
  });

  const periodValue = methods.watch('period');

  useEffect(() => {
    if (timeRange && methods.getValues('period') !== timeRange) {
      methods.setValue('period', timeRange);
    }
  }, [timeRange, methods]);

  useEffect(() => {
    if (periodValue && periodValue !== timeRange) {
      setTimeRange(periodValue as EmployerAnalyticsPeriod);
    }
  }, [periodValue, timeRange, setTimeRange]);
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
            <LayoutDashboard className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              Performance Analytics
            </h1>
            <p className="text-muted-foreground hidden text-xs font-medium opacity-80 sm:block sm:text-sm">
              Monitor hiring efficiency and key metrics
            </p>
          </div>
        </div>
        <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto sm:gap-3">
          <FormProvider {...methods}>
            <WKSelect
              name="period"
              label="Reporting period"
              hideLabel
              options={[
                { value: '7d', label: 'Last 7 days' },
                { value: '30d', label: 'Last 30 days' },
                { value: '90d', label: 'Last 90 days' },
                { value: '1y', label: 'Last year' },
              ]}
              className="bg-muted/50 h-9 w-full flex-1 cursor-pointer rounded-full border-none px-4 text-xs font-bold shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:h-10 sm:w-[160px] sm:flex-none sm:text-sm"
            />
          </FormProvider>

          <Button
            type="button"
            variant="outline"
            disabled={exportDisabled || isExporting}
            className="hover:bg-primary/5 hover:text-primary bg-muted/50 flex h-9 w-9 items-center justify-center rounded-full border-none p-0 font-bold transition-all sm:h-10 sm:w-auto sm:px-6"
            onClick={onExportReport}
          >
            {isExporting ? (
              <span className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
            ) : (
              <Download className="h-4 w-4" aria-hidden />
            )}
            <span className="hidden sm:inline">
              {isExporting ? 'Exporting...' : 'Export Report'}
            </span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAnalyticsHeader;
