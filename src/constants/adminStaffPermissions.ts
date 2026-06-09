import type { AdminStaffRole } from "@/types/adminStaff";

export type StaffRoleDefinition = {
  label: string;
  summary: string;
  granted: string[];
  restricted: string[];
};

export const STAFF_ROLE_DEFINITIONS: Record<
  AdminStaffRole,
  StaffRoleDefinition
> = {
  ADMIN: {
    label: "System Admin",
    summary: "Handles daily platform operations and moderation.",
    granted: [
      "Manage employers, job seekers, jobs, and categories",
      "Review moderation queues and reported content",
      "View audit logs and update portal settings",
      "Create other System Admin accounts",
    ],
    restricted: ["Cannot create or manage Super Administrators"],
  },
  SUPER_ADMIN: {
    label: "Super Administrator",
    summary: "Full control over staff, settings, and platform security.",
    granted: [
      "Full platform administration access",
      "Create and manage Admin and Super Admin accounts",
      "Activate, deactivate, and change staff roles",
      "Access financial, legal, and system configuration areas",
      "View and export complete audit history",
    ],
    restricted: [],
  },
};

export const STAFF_ROLE_OPTIONS: {
  value: AdminStaffRole;
  label: string;
  description: string;
}[] = [
  {
    value: "ADMIN",
    label: STAFF_ROLE_DEFINITIONS.ADMIN.label,
    description: STAFF_ROLE_DEFINITIONS.ADMIN.summary,
  },
  {
    value: "SUPER_ADMIN",
    label: STAFF_ROLE_DEFINITIONS.SUPER_ADMIN.label,
    description: STAFF_ROLE_DEFINITIONS.SUPER_ADMIN.summary,
  },
];
