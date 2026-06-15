export enum PlanType {
  EMPLOYER = "EMPLOYER",
  JOB_SEEKER = "JOB_SEEKER",
}

export interface PlanFeatureFlags {
  maxActiveJobs: number;
  maxUsers: number;
  maxMonthlyApplications: number;
  maxResumes: number;
  canMessage: boolean;
  canViewAnalytics: boolean;
  canViewProfileAnalytics: boolean;
  isFeaturedProfile: boolean;
  canMessageEmployer: boolean;
}

export interface Plan {
  id: string;
  name: string;
  planType: PlanType;
  description: string | null;
  price: number;
  currency: string;
  interval: string;
  features: PlanFeatureFlags;
  maxActiveJobs: number | null;
  maxUsers: number | null;
  isActive: boolean;
  isCustom: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MySubscriptionResponse {
  planName: string;
  planType: PlanType;
  price: number;
  startDate: string;
  endDate: string | null;
  status: string;
  autoRenew: boolean;
  cancelAtPeriodEnd: boolean;
  features: PlanFeatureFlags;
  usage: {
    jobsPosted: number;
    applicationsSubmitted: number;
    resumesUploaded: number;
  };
}

export interface CheckoutResponse {
  gatewayUrl: string;
}

export interface EntitlementErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  error: {
    code: "LIMIT_EXCEEDED" | "FEATURE_LOCKED";
    feature: keyof PlanFeatureFlags;
    limit?: number;
    current?: number;
  };
}
