import { ChartNoAxesCombined, Download } from "lucide-react";
import { Button } from "../../../ui/button";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardAnalyticsHeader = ({
  timeRange,
  setTimeRange,
}: {
  timeRange: string;
  setTimeRange: (range: string) => void;
}) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <ChartNoAxesCombined className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              Analytics
            </h1>
            <p className="text-muted-foreground inline-flex text-xs font-medium opacity-80 sm:text-sm">
              Track your hiring performance
              <span className="hidden sm:block">&nbsp;and key metrics</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border-input bg-background text-foreground rounded-lg border px-3 py-2 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>

          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAnalyticsHeader;
