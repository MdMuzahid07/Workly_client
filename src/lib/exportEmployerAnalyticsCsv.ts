import type { EmployerAnalyticsPayload } from "@/types/employerAnalytics";

function escapeCell(value: string | number) {
  const s = String(value);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function formatPct(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return "0.0%";
  if (val > 0) return `+${val.toFixed(1)}%`;
  if (val < 0) return `${val.toFixed(1)}%`;
  return "0.0%";
}

export function buildEmployerAnalyticsCsv(
  payload: EmployerAnalyticsPayload,
): string {
  const generatedAt =
    new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      dateStyle: "medium",
      timeStyle: "medium",
    }) + " UTC";

  const lines: string[][] = [
    ["Workly Enterprise Employer Analytics Report"],
    ["Generated At", generatedAt],
    [
      "Reporting Period",
      payload.period === "7d"
        ? "Last 7 days"
        : payload.period === "30d"
          ? "Last 30 days"
          : payload.period === "90d"
            ? "Last 90 days"
            : "Last year",
    ],
    [],
    ["SUMMARY METRICS"],
    ["Metric", "Value", "Change vs Prior Period (%)"],
    [
      "Total Applications",
      String(payload.summary.totalApplications),
      formatPct(payload.summary.totalApplicationsChangePct),
    ],
    [
      "Active Jobs",
      String(payload.summary.activeJobs),
      formatPct(payload.summary.activeJobsChangePct),
    ],
    [
      "New Candidates (Distinct)",
      String(payload.summary.newCandidates),
      formatPct(payload.summary.newCandidatesChangePct),
    ],
    [
      "Hires (ACCEPTED)",
      String(payload.summary.hiredThisPeriod),
      formatPct(payload.summary.hiredThisPeriodChangePct),
    ],
    [],
    ["APPLICATION TRENDS OVER TIME"],
    ["Period Label", "Applications", "Interviews", "Hired"],
  ];

  for (const row of payload.applicationTrends) {
    lines.push([
      row.periodLabel,
      String(row.applications),
      String(row.interviews),
      String(row.hired),
    ]);
  }

  lines.push([]);
  lines.push(["HIRING FUNNEL STAGES"]);
  lines.push(["Stage Name", "Candidates Count", "Conversion Rate (%)"]);
  for (const stage of payload.funnelStages ?? []) {
    lines.push([
      stage.name,
      String(stage.count),
      `${stage.percentage.toFixed(1)}%`,
    ]);
  }

  lines.push([]);
  lines.push(["KEY CONVERSION FUNNEL METRICS"]);
  lines.push(["Metric Label", "Conversion Rate Value"]);
  for (const metric of payload.conversionMetrics ?? []) {
    lines.push([metric.label, metric.value]);
  }

  lines.push([]);
  lines.push(["DEPARTMENT DISTRIBUTION"]);
  lines.push(["Department Name", "Applications Count", "Share (%)"]);
  for (const dept of payload.departments ?? []) {
    lines.push([
      dept.name,
      String(dept.count),
      `${dept.percentage.toFixed(1)}%`,
    ]);
  }

  lines.push([]);
  lines.push(["JOB PERFORMANCE DETAILS"]);
  lines.push([
    "Job Title",
    "Views (Lifetime)",
    "Applications (Selected Period)",
    "Conversion Rate (Selected Period / Lifetime Views %)",
    "Status",
  ]);
  for (const j of payload.jobPerformance.data ?? []) {
    lines.push([
      j.title,
      String(j.views),
      String(j.applications),
      `${j.conversionRate.toFixed(1)}%`,
      j.status,
    ]);
  }

  return lines.map((r) => r.map(escapeCell).join(",")).join("\n");
}

export function downloadEmployerAnalyticsCsv(
  payload: EmployerAnalyticsPayload,
  filename = "employer-analytics.csv",
) {
  const csv = buildEmployerAnalyticsCsv(payload);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
