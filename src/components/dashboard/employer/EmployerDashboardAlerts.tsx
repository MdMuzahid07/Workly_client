import { Button } from "@/components/ui/button";

type EmployerDashboardAlertsProps = {
  noCompanyAssigned: boolean;
  partialError: boolean;
  onRetry: () => void;
};

export function EmployerDashboardAlerts({
  noCompanyAssigned,
  partialError,
  onRetry,
}: EmployerDashboardAlertsProps) {
  return (
    <>
      {noCompanyAssigned && (
        <section
          className="border-border bg-muted/30 rounded-xl border p-6 text-sm"
          aria-labelledby="employer-dashboard-no-company-heading"
        >
          <h2
            id="employer-dashboard-no-company-heading"
            className="text-foreground font-medium"
          >
            No company is linked to this account yet.
          </h2>
          <p className="text-muted-foreground mt-1">
            Complete company onboarding to unlock job posting and hiring
            analytics.
          </p>
        </section>
      )}

      {partialError && (
        <div
          className="border-destructive/20 bg-destructive/5 text-destructive flex flex-col gap-3 rounded-xl border p-4 text-sm sm:flex-row sm:items-center sm:justify-between"
          role="alert"
        >
          <p>
            Part of your dashboard failed to load. You can retry or refresh the
            page.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-destructive/40 hover:bg-destructive/10 shrink-0"
            onClick={onRetry}
          >
            Retry
          </Button>
        </div>
      )}
    </>
  );
}
