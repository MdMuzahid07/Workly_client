import { useGetMySubscriptionQuery } from '../redux/feature/subscription/subscriptionApi';
import { PlanFeatureFlags } from '../types/subscription';

export const useEntitlements = () => {
  const { data, isLoading, isError, refetch } = useGetMySubscriptionQuery();

  const features: PlanFeatureFlags | undefined = data?.data?.features;
  const usage = data?.data?.usage;
  const planName = data?.data?.planName;
  const planType = data?.data?.planType;

  return {
    features,
    usage,
    planName,
    planType,
    isLoading,
    isError,
    refetch,
  };
};

export const useCanAccess = (feature: keyof PlanFeatureFlags) => {
  const { features, usage, isLoading } = useEntitlements();

  if (isLoading || !features) {
    return { hasAccess: false, limit: 0, current: 0, isLoading };
  }

  const value = features[feature];

  if (typeof value === 'boolean') {
    return { hasAccess: value, limit: 0, current: 0, isLoading: false };
  }

  // Numeric limit check (maxActiveJobs, maxMonthlyApplications, maxResumes, maxUsers)
  let currentUsage = 0;
  if (feature === 'maxActiveJobs') {
    currentUsage = usage?.jobsPosted ?? 0;
  } else if (feature === 'maxMonthlyApplications') {
    currentUsage = usage?.applicationsSubmitted ?? 0;
  } else if (feature === 'maxResumes') {
    currentUsage = usage?.resumesUploaded ?? 0;
  } else if (feature === 'maxUsers') {
    currentUsage = usage?.teamMembers ?? 1;
  }

  return {
    hasAccess: currentUsage < value,
    limit: value,
    current: currentUsage,
    isLoading: false,
  };
};
