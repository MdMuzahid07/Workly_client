import { Package, Shield, Star, Zap } from 'lucide-react';

export const PRICING_TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: '৳0',
    description: 'Ideal for individuals or small startups looking for basic hiring.',
    features: [
      '3 active job postings',
      '1 user account',
      'Standard applicant tracking',
      'Community support',
      'In-app notifications',
    ],
    cta: 'Current Plan',
    variant: 'outline' as const,
    icon: Package,
    color: 'text-slate-500',
    borderColor: 'border-slate-200 dark:border-slate-800',
    bgColor: 'bg-slate-50/50 dark:bg-slate-900/20',
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '৳1,999',
    period: '/month',
    description: 'Essential recruiting tools for growing small businesses.',
    features: [
      '5 active job postings',
      '2 user accounts',
      'Direct candidate messaging',
      'Standard applicant tracking',
      'Email support',
    ],
    cta: 'Upgrade to Starter',
    variant: 'outline' as const,
    icon: Star,
    color: 'text-amber-500',
    borderColor: 'border-amber-200 dark:border-amber-900/50',
    bgColor: 'bg-amber-50/50 dark:bg-amber-900/10',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '৳6,999',
    period: '/month',
    description: 'Best for active teams with regular recruitment campaigns.',
    features: [
      '15 active job postings',
      '5 user accounts',
      'Direct candidate messaging',
      'Basic analytics dashboard',
      'Priority email & chat support',
    ],
    cta: 'Upgrade to Growth',
    variant: 'primary' as const,
    popular: true,
    icon: Zap,
    color: 'text-primary',
    borderColor: 'border-primary/30',
    bgColor: 'bg-primary/5',
  },
  {
    id: 'business',
    name: 'Business',
    price: '৳14,999',
    period: '/month',
    description: 'Advanced features for mid-size hiring teams & agencies.',
    features: [
      '30 active job postings',
      '10 user accounts',
      'Direct candidate messaging',
      'Advanced analytics dashboard',
      'Featured company profile',
      'Priority support',
    ],
    cta: 'Upgrade to Business',
    variant: 'outline' as const,
    icon: Shield,
    color: 'text-indigo-500',
    borderColor: 'border-indigo-200 dark:border-indigo-900/50',
    bgColor: 'bg-indigo-50/50 dark:bg-indigo-900/10',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    description: 'Full-scale bespoke solutions for large corporate teams.',
    features: [
      'Unlimited / Custom active job postings',
      'Custom user seat limits',
      'AI-powered talent matching',
      'Dedicated account manager',
      'Custom integration options',
      'White-labeled career portal',
    ],
    cta: 'Contact Sales',
    variant: 'outline' as const,
    icon: Shield,
    color: 'text-violet-500',
    borderColor: 'border-violet-200 dark:border-violet-900/50',
    bgColor: 'bg-violet-50/50 dark:bg-violet-900/10',
  },
];

export const COMPARISON_FEATURES = [
  {
    category: 'Job Postings',
    features: [
      {
        name: 'Active Jobs',
        free: '1',
        starter: '5',
        pro: '15',
        enterprise: 'Unlimited',
      },
      {
        name: 'Live Duration',
        free: '30 Days',
        starter: '60 Days',
        pro: 'Unlimited',
        enterprise: 'Unlimited',
      },
      {
        name: 'Featured Postings',
        free: '-',
        starter: '1 per month',
        pro: '5 per month',
        enterprise: 'Unlimited',
      },
    ],
  },
  {
    category: 'Candidate Management',
    features: [
      {
        name: 'Resume Downloads',
        free: 'Limited',
        starter: '100/mo',
        pro: 'Unlimited',
        enterprise: 'Unlimited',
      },
      {
        name: 'Advanced Filters',
        free: false,
        starter: 'Basic',
        pro: true,
        enterprise: true,
      },
      {
        name: 'Bulk Actions',
        free: false,
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: 'AI Match Score',
        free: false,
        starter: false,
        pro: 'Beta',
        enterprise: true,
      },
    ],
  },
  {
    category: 'Branding & Analytics',
    features: [
      {
        name: 'Company Profile',
        free: 'Basic',
        starter: 'Standard',
        pro: 'Premium',
        enterprise: 'Custom',
      },
      {
        name: 'Analytics',
        free: 'Basic',
        starter: 'Standard',
        pro: 'Advanced',
        enterprise: 'Real-time',
      },
      {
        name: 'Custom Domain',
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
    question: 'Can I change my plan later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time from your dashboard settings.',
  },
  {
    question: 'What happens when I hit my job post limit?',
    answer:
      "You'll be notified when you reach your limit. You can either upgrade to a higher tier or archive old jobs to make room for new ones.",
  },
  {
    question: 'Do you offer custom pricing for nonprofits?',
    answer:
      'We sure do! Contact our support team with your organization details to receive a 25% discount on any paid plan.',
  },
];

export const CANDIDATE_PRICING_TIERS = [
  {
    id: 'free',
    name: 'Free Seeker',
    price: '৳0',
    description: 'Start your job search with essential tools at no cost.',
    features: [
      '40 job applications per month',
      '1 active CV / resume upload',
      'Standard profile visibility',
      '7-day profile view history (basic)',
      'In-app job alerts & notifications',
      'Basic application status only (Submitted/Pending)',
    ],
    cta: 'Current Plan',
    variant: 'outline' as const,
    icon: Package,
    color: 'text-slate-500',
    borderColor: 'border-slate-200 dark:border-slate-800',
    bgColor: 'bg-slate-50/50 dark:bg-slate-900/20',
  },
  {
    id: 'Starter',
    name: 'Starter',
    price: '৳90',
    period: '/ 1 month',
    description: 'Great entry point for active job seekers. First month at 65% off.',
    features: [
      '200 job applications per month',
      '5 active CV uploads',
      'Direct messaging to HR & Recruiters',
      'Full profile view history (30 days)',
      'Priority real-time job alerts',
      'Detailed application stage tracking',
    ],
    cta: 'Get Starter',
    variant: 'primary' as const,
    popular: true,
    icon: Zap,
    color: 'text-primary',
    borderColor: 'border-primary/30',
    bgColor: 'bg-primary/5',
  },
  {
    id: 'Pro',
    name: 'Pro',
    price: '৳160',
    period: '/ 2 months',
    periodNote: 'Effective ৳80/month',
    description: 'Double the value. Best for sustained job searching.',
    features: [
      '300 job applications per month',
      '10 active CV uploads',
      'Direct messaging to HR & Recruiters',
      'Full profile view history (30 days)',
      'Priority real-time job alerts',
      'Detailed application stage tracking',
    ],
    cta: 'Get Pro (2 Months)',
    variant: 'outline' as const,
    icon: Shield,
    color: 'text-indigo-500',
    borderColor: 'border-indigo-200 dark:border-indigo-900/50',
    bgColor: 'bg-indigo-50/50 dark:bg-indigo-900/10',
  },
  {
    id: 'Premium',
    name: 'Premium',
    price: '৳225',
    period: '/ 3 months',
    periodNote: 'Effective ৳75/month',
    description: 'Maximum visibility with Featured Candidate status for 3 months.',
    features: [
      'Unlimited job applications',
      'Unlimited CV uploads',
      'Direct messaging to HR & Recruiters',
      'Featured Candidate profile (5× visibility boost)',
      'Priority real-time job alerts',
      'Full application stage & insights tracking',
    ],
    cta: 'Get Premium (3 Months)',
    variant: 'outline' as const,
    icon: Star,
    color: 'text-violet-500',
    borderColor: 'border-violet-200 dark:border-violet-900/50',
    bgColor: 'bg-violet-50/50 dark:bg-violet-900/10',
  },
];

export const CANDIDATE_COMPARISON_FEATURES = [
  {
    category: 'Job Applications & CVs',
    features: [
      {
        name: 'Monthly Applications',
        free: '40',
        starter: '200',
        pro: '300',
        premium: 'Unlimited',
      },
      {
        name: 'Active CV Uploads',
        free: '1 Resume',
        starter: '5 Resumes',
        pro: '10 Resumes',
        premium: 'Unlimited',
      },
      {
        name: 'Application Insights',
        free: 'Basic (Submitted/Pending)',
        starter: 'Detailed Stage Tracking',
        pro: 'Detailed Stage Tracking',
        premium: 'Full Insights & Analytics',
      },
    ],
  },
  {
    category: 'Profile Visibility & Messaging',
    features: [
      {
        name: 'Profile Visibility',
        free: 'Standard',
        starter: 'Priority Boost',
        pro: 'Priority Boost',
        premium: '5× Featured Boost',
      },
      {
        name: 'Direct HR Messaging',
        free: false,
        starter: true,
        pro: true,
        premium: true,
      },
      {
        name: 'Profile View History',
        free: '7-Day (anonymous)',
        starter: '30-Day Full Details',
        pro: '30-Day Full Details',
        premium: '30-Day Full + Company Info',
      },
      {
        name: 'Featured Candidate Badge',
        free: false,
        starter: false,
        pro: false,
        premium: true,
      },
    ],
  },
  {
    category: 'Subscription Details',
    features: [
      {
        name: 'Duration',
        free: 'No expiry',
        starter: '1 Month',
        pro: '2 Months',
        premium: '3 Months',
      },
      {
        name: 'Price',
        free: '৳0',
        starter: '৳90 (৳31 first-time)',
        pro: '৳160 (৳80/mo)',
        premium: '৳225 (৳75/mo)',
      },
      {
        name: 'Job Alerts',
        free: 'Standard In-App',
        starter: 'Priority Real-Time',
        pro: 'Priority Real-Time',
        premium: 'Priority Real-Time',
      },
    ],
  },
];

export const CANDIDATE_PRICING_FAQ = [
  {
    question: 'How does the 65% first-month discount work?',
    answer:
      'First-time subscribers who choose the 1-Month Starter plan get 65% off — paying just ৳31 instead of ৳90. This discount is automatically applied at checkout and is valid for your very first purchase only. Subsequent renewals or upgrades are billed at the regular rate.',
  },
  {
    question: 'How does the Profile Visibility Boost work?',
    answer:
      'On any paid plan, your profile is ranked higher in employer search results, dramatically increasing your chances of getting noticed. The Premium (3-month) plan unlocks Featured Candidate status — a 5× boost shown at the very top of employer dashboards.',
  },
  {
    question: 'Can I upgrade between packages?',
    answer:
      'Yes! You can upgrade from Starter to Pro or Premium at any time from your Billing page. The remaining days on your current plan are credited toward your new package.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Absolutely. All paid plans can be canceled anytime with a single click from your Billing Details page. You keep access until the end of your purchased period. No hidden fees, no questions asked.',
  },
];
