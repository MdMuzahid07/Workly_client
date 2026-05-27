import { Package, Shield, Star, Zap } from "lucide-react";

export const PRICING_TIERS = [
  {
    id: "free",
    name: "Free",
    price: "৳0",
    description:
      "Ideal for individuals or small startups looking for basic hiring.",
    features: [
      "1 active job posting",
      "Standard candidate management",
      "Basic company profile",
      "Community support",
      "In-app notifications",
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
    price: "৳4,999",
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
    price: "৳14,999",
    period: "/month",
    description:
      "Recruiters' top choice. Built for growing companies needing advanced recruitment tools.",
    features: [
      "15 active job postings",
      "Priority candidate filtering",
      "Premium company branding",
      "Premium email & chat notifications",
      "Advanced analytics dashboard",
      "Custom screening questions",
      "AI matching score (BETA)",
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
      "AI-powered talent matching (RFTA)",
      "Dedicated local client manager",
      "Custom integration options",
      "Full team permissions",
      "White-labeled career site",
      "Dedicated onboarding support",
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
        pro: "15",
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
        pro: "Beta",
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

export const CANDIDATE_PRICING_TIERS = [
  {
    id: "free",
    name: "Free Seeker",
    price: "৳0",
    description:
      "Standard job search and profile builder for everyday candidates.",
    features: [
      "Standard profile visibility",
      "Up to 40 job applications/month",
      "Single resume upload",
      "In-app notifications",
      "Community support",
    ],
    cta: "Current Plan",
    variant: "outline" as const,
    icon: Package,
    color: "text-slate-500",
    borderColor: "border-slate-200 dark:border-slate-800",
    bgColor: "bg-slate-50/50 dark:bg-slate-900/20",
  },
  {
    id: "pro",
    name: "Pro Candidate",
    price: "৳199",
    period: "/month",
    description:
      "Perfect for active job seekers looking for profile boosts and direct HR connections.",
    features: [
      "Top-tier profile visibility boost",
      "Up to 120 job applications/month",
      "Multiple resume uploads",
      "Direct messaging to Hiring Managers",
      "Profile Views tracker (Who viewed you)",
      "Premium resume & cover letter templates",
      "Real-time instant job email alerts",
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
    id: "elite",
    name: "Elite Seeker",
    price: "৳499",
    period: "/month",
    description:
      "Complete career acceleration package including mock interviews and direct counseling.",
    features: [
      "5x profile visibility (Featured Seeker)",
      "Unlimited job applications",
      "Unlimited resume uploads & all premium features",
      "Dedicated professional resume review",
      "1-on-1 monthly career counseling session",
      "1 Mock Interview prep session / month",
      "Direct HR chat & application trackers",
      "Guaranteed response tracking on 5 jobs",
    ],
    cta: "Upgrade to Elite",
    variant: "outline" as const,
    icon: Shield,
    color: "text-violet-500",
    borderColor: "border-violet-200 dark:border-violet-900/50",
    bgColor: "bg-violet-50/50 dark:bg-violet-900/10",
  },
];

export const CANDIDATE_COMPARISON_FEATURES = [
  {
    category: "Job Applications & CVs",
    features: [
      {
        name: "Monthly Applications",
        free: "40",
        pro: "120",
        elite: "Unlimited",
      },
      {
        name: "Resume Uploads Limit",
        free: "Single Resume Upload",
        pro: "Multiple Resumes Upload",
        elite: "Unlimited Resumes",
      },
      {
        name: "Guaranteed Response Tracking",
        free: false,
        pro: false,
        elite: "5 Jobs/mo",
      },
    ],
  },
  {
    category: "Profile Visibility & Messaging",
    features: [
      {
        name: "Profile Visibility",
        free: "Standard",
        pro: "Priority Boost",
        elite: "5x Featured Boost",
      },
      {
        name: "Direct HR Messaging",
        free: false,
        pro: true,
        elite: true,
      },
      {
        name: "Who Viewed My Profile",
        free: "Last 7 Days (anonymous)",
        pro: "Full Details",
        elite: "Full Details & Company Info",
      },
    ],
  },
  {
    category: "Career Assistance",
    features: [
      {
        name: "Resume Templates",
        free: "Basic",
        pro: "Premium",
        elite: "Premium & Custom",
      },
      {
        name: "Resume Expert Review",
        free: false,
        pro: false,
        elite: "1 Session/mo",
      },
      {
        name: "1-on-1 Career Counseling",
        free: false,
        pro: false,
        elite: "1 Session/mo",
      },
    ],
  },
];

export const CANDIDATE_PRICING_FAQ = [
  {
    question: "How does the Profile Visibility Boost work?",
    answer:
      "When employers search for talent or review job applications, Pro and Elite Candidates are automatically shown at the very top of their dashboard view, dramatically increasing your chances of getting noticed by 3x to 5x.",
  },
  {
    question: "What is 1-on-1 Career Counseling?",
    answer:
      "Elite Seekers can book a private 45-minute video call every month with our senior talent acquisition managers to review their CV, optimize their cover letters, and strategize their job search.",
  },
  {
    question: "Can I cancel my candidate subscription anytime?",
    answer:
      "Absolutely! All paid plans are billed month-to-month and can be canceled anytime with a single click from your Billing Details page. No hidden fees.",
  },
];
