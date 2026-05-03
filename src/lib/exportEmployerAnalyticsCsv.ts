import type { EmployerAnalyticsPayload } from "@/types/employerAnalytics";

function escapeCell(value: string | number) {
  const s = String(value);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function buildEmployerAnalyticsCsv(
  payload: EmployerAnalyticsPayload,
): string {
  const lines: string[][] = [
    ["Workly employer analytics export"],
    ["Period", payload.period],
    [],
    ["Summary"],
    ["Total applications", String(payload.summary.totalApplications)],
    [
      "Applications change vs prior period %",
      String(payload.summary.totalApplicationsChangePct),
    ],
    ["Active jobs (estimated live)", String(payload.summary.activeJobs)],
    [
      "Active jobs change vs prior point %",
      String(payload.summary.activeJobsChangePct),
    ],
    ["Distinct applicants", String(payload.summary.newCandidates)],
    [
      "Distinct applicants change %",
      String(payload.summary.newCandidatesChangePct),
    ],
    ["Hires (ACCEPTED, period)", String(payload.summary.hiredThisPeriod)],
    ["Hires change %", String(payload.summary.hiredThisPeriodChangePct)],
    [],
    ["Application trends"],
    ["Bucket", "Applications", "Interviews", "Hired"],
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
  lines.push(["Job performance"]);
  lines.push([
    "Title",
    "Views (lifetime)",
    "Applications (selected period)",
    "Conversion % (lifetime apply/views)",
    "Status",
  ]);
  for (const j of payload.jobPerformance) {
    lines.push([
      j.title,
      String(j.views),
      String(j.applications),
      String(j.conversionRate),
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
