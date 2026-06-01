export interface NotificationSettings {
  emailNotifications: boolean;
  applicationAlerts: boolean;
  jobExpiryReminders: boolean;
  weeklyReports: boolean;
}

export interface JobPostingSettings {
  autoExpireJobs: boolean;
  jobExpiryDays: number;
  requireApproval: boolean;
  maxActiveJobs: number;
}

export interface PrivacySettings {
  profileVisibility: "public" | "private";
  showEmployeeCount: boolean;
  showSalaryRanges: boolean;
  allowDirectMessages: boolean;
}

export interface BillingSettings {
  billingEmail: string;
  autoRenew: boolean;
}

export interface CompanySettings {
  notifications: NotificationSettings;
  jobPosting: JobPostingSettings;
  privacy: PrivacySettings;
  billing: BillingSettings;
}
