import { Package, Shield, Star, Zap } from "lucide-react";

export const PRICING_TIERS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description:
      "Ideal for individuals or small startups looking for basic hiring.",
    features: [
      "1 active job posting",
      "Standard candidate management",
      "Basic company profile",
      "Community support",
      "Email notifications",
    ],
    cta: "Current Plan",
    variant: "outline" as const,
    icon: Package,
    color: "text-slate-500",
    borderColor: "border-slate-200 dark:border-slate-800",
    bgColor: "bg-slate-50/50 dark:bg-slate-900/20",
  },
  {
    id: "starter",
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "Best for small teams with occasional hiring needs.",
    features: [
      "5 active job postings",
      "Enhanced candidate filtering",
      "Standard company branding",
      "Email support (24h response)",
      "Basic analytics",
    ],
    cta: "Upgrade to Starter",
    variant: "outline" as const,
    icon: Star,
    color: "text-amber-500",
    borderColor: "border-amber-200 dark:border-amber-900/50",
    bgColor: "bg-amber-50/50 dark:bg-amber-900/10",
  },
  {
    id: "pro",
    name: "Professional",
    price: "$49",
    period: "/month",
    description:
      "Built for growing companies needing advanced recruitment tools.",
    features: [
      "20 active job postings",
      "Priority candidate filtering",
      "Premium company branding",
      "Priority chat support",
      "Advanced analytics dashboard",
      "Custom screening questions",
    ],
    cta: "Upgrade to Pro",
    variant: "primary" as const,
    popular: true,
    icon: Zap,
    color: "text-primary",
    borderColor: "border-primary/30",
    bgColor: "bg-primary/5",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    description:
      "Full-scale solution for large organizations and high-volume hiring.",
    features: [
      "Unlimited active job postings",
      "AI-powered talent matching",
      "Dedicated account manager",
      "Custom integration options",
      "Full team permissions",
      "White-labeled career site",
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
    icon: Shield,
    color: "text-violet-500",
    borderColor: "border-violet-200 dark:border-violet-900/50",
    bgColor: "bg-violet-50/50 dark:bg-violet-900/10",
  },
];

export const COMPARISON_FEATURES = [
  {
    category: "Job Postings",
    features: [
      {
        name: "Active Jobs",
        free: "1",
        starter: "5",
        pro: "20",
        enterprise: "Unlimited",
      },
      {
        name: "Live Duration",
        free: "30 Days",
        starter: "60 Days",
        pro: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "Featured Postings",
        free: "-",
        starter: "1 per month",
        pro: "5 per month",
        enterprise: "Unlimited",
      },
    ],
  },
  {
    category: "Candidate Management",
    features: [
      {
        name: "Resume Downloads",
        free: "Limited",
        starter: "100/mo",
        pro: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "Advanced Filters",
        free: false,
        starter: "Basic",
        pro: true,
        enterprise: true,
      },
      {
        name: "Bulk Actions",
        free: false,
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "AI Match Score",
        free: false,
        starter: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Branding & Analytics",
    features: [
      {
        name: "Company Profile",
        free: "Basic",
        starter: "Standard",
        pro: "Premium",
        enterprise: "Custom",
      },
      {
        name: "Analytics",
        free: "Basic",
        starter: "Standard",
        pro: "Advanced",
        enterprise: "Real-time",
      },
      {
        name: "Custom Domain",
        free: false,
        starter: false,
        pro: true,
        enterprise: true,
      },
    ],
  },
];

export const PRICING_FAQ = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time from your dashboard settings.",
  },
  {
    question: "What happens when I hit my job post limit?",
    answer:
      "You'll be notified when you reach your limit. You can either upgrade to a higher tier or archive old jobs to make room for new ones.",
  },
  {
    question: "Do you offer custom pricing for nonprofits?",
    answer:
      "We sure do! Contact our support team with your organization details to receive a 25% discount on any paid plan.",
  },
];
