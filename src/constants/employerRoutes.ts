/**
 * Central route map for employer dashboard area.
 * Using a single source of truth avoids broken links when paths change.
 */
export const EMPLOYER_ROUTES = {
  root: "/employer",
  dashboard: "/employer",
  postJob: "/employer/post-job",
  jobs: "/employer/jobs",
  applications: "/employer/applications",
  savedProfiles: "/employer/saved-profiles",
  companyProfile: "/employer/company-profile",
  analytics: "/employer/analytics",
  employees: "/employer/employees",
  settings: "/employer/settings",
} as const;

export type EmployerRouteKey = keyof typeof EMPLOYER_ROUTES;
