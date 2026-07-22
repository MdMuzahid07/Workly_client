export type AdminStaffRole = 'ADMIN' | 'SUPER_ADMIN';
export type AdminStaffStatus = 'Active' | 'Inactive';

export interface AdminStaffRow {
  id: string;
  name: string;
  email: string;
  role: AdminStaffRole;
  status: AdminStaffStatus;
  lastLogin: string | null;
}

export interface AdminStaffStats {
  totalAdmins: number;
  activeNow: number;
  totalAuditLogs: number;
  riskItems: number;
}

export interface AdminAuditLogRow {
  id: string;
  action: string;
  entityType: string;
  target: string;
  actor: string;
  actorRole: string;
  createdAt: string;
}
