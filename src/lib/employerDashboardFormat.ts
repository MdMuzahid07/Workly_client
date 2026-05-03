/** Pure helpers for employer dashboard presentation (easy to unit test). */

export function humanizeJobOrApplicationStatus(status: string): string {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export type JobStatusBadgeVariant = "default" | "secondary" | "outline";

export function jobStatusToBadgeVariant(status: string): JobStatusBadgeVariant {
  if (status === "ACTIVE" || status === "OFFERED" || status === "ACCEPTED") {
    return "default";
  }
  if (status === "CLOSED" || status === "REJECTED" || status === "WITHDRAWN") {
    return "secondary";
  }
  return "outline";
}

/**
 * Formats comparative copy between two counts (current period vs baseline period).
 */
export function comparePeriodCopy(
  current: number,
  prior: number,
  priorLabel: string,
  neutralWhenBothZero?: string,
): string {
  if (neutralWhenBothZero !== undefined && current === 0 && prior === 0) {
    return neutralWhenBothZero;
  }
  const delta = current - prior;
  if (delta > 0) return `+${delta} ${priorLabel}`;
  if (delta < 0) return `${delta} ${priorLabel}`;
  return `Flat ${priorLabel}`;
}

export function buildApplicationsTrendSubtitle(
  summary: { newThisWeek: number } | undefined,
  trends:
    | { applicationsLast7Days: number; applicationsPrevious7Days: number }
    | undefined,
): string {
  if (!summary) return "—";
  const weekly = `${summary.newThisWeek} new this week`;
  if (!trends) return weekly;
  return `${weekly} · ${comparePeriodCopy(
    trends.applicationsLast7Days,
    trends.applicationsPrevious7Days,
    "vs prior 7 days",
  )}`;
}
