"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Receipt } from "lucide-react";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

interface DashboardAdminTransactionsHeaderProps {
  onExportClick?: () => void;
  isExporting?: boolean;
}

const DashboardAdminTransactionsHeader = ({
  onExportClick,
  isExporting = false,
}: DashboardAdminTransactionsHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <Receipt className="text-primary h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                Transactions
              </h1>
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary hidden rounded-full px-2 py-0 text-[10px] font-bold tracking-wider uppercase sm:inline-flex"
              >
                Billing Hub
              </Badge>
            </div>
            <p className="text-muted-foreground truncate text-xs font-medium opacity-80 sm:text-sm">
              Audit and monitor all platform-wide billing activity.
            </p>
          </div>
        </div>

        {/* Export CSV only — New Invoice removed (payments are user-initiated) */}
        <Button
          variant="outline"
          size="sm"
          onClick={onExportClick}
          disabled={isExporting}
          className="border-primary/20 hover:bg-primary/5 h-9 rounded-full font-bold shadow-sm"
        >
          {isExporting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {isExporting ? "Exporting…" : "Export CSV"}
          </span>
          <span className="sm:hidden">CSV</span>
        </Button>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardAdminTransactionsHeader;
