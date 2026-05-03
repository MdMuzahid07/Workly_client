import { ChevronDown, Download, LayoutDashboard } from "lucide-react";
import type { EmployerAnalyticsPeriod } from "@/types/employerAnalytics";
import { Button } from "../../../ui/button";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

type DashboardAnalyticsHeaderProps = {
  timeRange: EmployerAnalyticsPeriod | string;
  setTimeRange: (range: EmployerAnalyticsPeriod) => void;
  onExportReport?: () => void;
  exportDisabled?: boolean;
};

const DashboardAnalyticsHeader = ({
  timeRange,
  setTimeRange,
  onExportReport,
  exportDisabled,
}: DashboardAnalyticsHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <LayoutDashboard className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              Performance Analytics
            </h1>
            <p className="text-muted-foreground text-xs font-medium opacity-80 sm:text-sm">
              Monitor hiring efficiency and key metrics
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="relative">
            <label htmlFor="analytics-period" className="sr-only">
              Reporting period
            </label>
            <select
              id="analytics-period"
              value={timeRange}
              onChange={(e) =>
                setTimeRange(e.target.value as EmployerAnalyticsPeriod)
              }
              className="bg-muted/50 border-input text-foreground focus:ring-primary/20 h-9 w-full appearance-none rounded-full border-none px-4 pr-10 text-xs font-bold transition-all focus:ring-2 focus:outline-none sm:h-10 sm:w-auto sm:text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 opacity-50" />
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={exportDisabled}
            className="hover:bg-primary/5 hover:text-primary bg-muted/50 h-9 gap-2 rounded-full border-none px-5 font-bold transition-all sm:h-10 sm:px-6"
            onClick={onExportReport}
          >
            <Download className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Export Report</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAnalyticsHeader;
