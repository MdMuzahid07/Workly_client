/**
 * Employer accounts linked to a company via Prisma `Company.employees`.
 * The relation name is historical; it is not the JOB_SEEKER role.
 */
export function getCompanyTeamMemberCount(company?: {
  _count?: { employees?: number };
}): number {
  return company?._count?.employees ?? 0;
}
