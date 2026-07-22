export type NotificationType =
  | 'APPLICATION_RECEIVED'
  | 'APPLICATION_STATUS_CHANGE'
  | 'NEW_JOB_MATCH'
  | 'JOB_EXPIRING'
  | 'JOB_CLOSED'
  | 'MESSAGE_RECEIVED'
  | 'SYSTEM_ANNOUNCEMENT'
  | 'PROFILE_INCOMPLETE'
  | 'INTERVIEW_SCHEDULED'
  | 'PROFILE_VIEWED'
  | 'JOB_VIEWED';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  jobId?: string | null;
  applicationId?: string | null;
  metadata?: unknown;
}

export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
