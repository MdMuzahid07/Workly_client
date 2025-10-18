import { Download } from "lucide-react";
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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            Analytics
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track your hiring performance and key metrics
          </p>
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
