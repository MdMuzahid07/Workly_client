import { CompanyProfile } from '@/types/company-profile';
import { Briefcase, Image as ImageIcon, Info, LayoutGrid, User } from 'lucide-react';

/**
 * Mock company data for development and testing
 */
export const MOCK_COMPANY: CompanyProfile = {
  id: 'comp-001',
  name: 'TechFlow Solutions',
  slug: 'techflow-solutions',
  description:
    "TechFlow Solutions is a leading provider of innovative software solutions, specializing in cloud computing, Al integration, and enterprise-scale applications. Founded in 2015, we've grown from a small startup to a global team of over 500 passionate professionals dedicated to driving digital transformation for our clients.",
  industry: 'Software Development',
  size: '250-500 employees',
  location: 'San Francisco, CA',
  websiteUrl: 'https://techflow.example.com',
  contactEmail: 'contact@techflow.example.com',
  contactPhone: '+1 (555) 123-4567',
  founded: '2015-05-20',
  logoUrl:
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2548&auto=format&fit=crop',
  coverUrl:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
  isVerified: true,
  verifiedAt: '2023-01-15T10:00:00Z',
  mission:
    'To empower organizations worldwide through cutting-edge technology solutions that streamline workflows, enhance productivity, and foster sustainable growth in the digital age.',
  cultureSummary:
    "Culture isn't just what we say; it's what we do. By defining our mission and values, we create a compass that guides every hire, every meeting, and every line of code.",
  values: ['Innovation', 'Excellence', 'Integrity', 'Collaboration', 'Customer First'],
  benefits: [
    {
      id: 'ben-1',
      title: 'Remote Work',
      description: 'Flexible work-from-home options and remote-first culture.',
      category: 'Flexibility',
      icon: 'home',
      isActive: true,
    },
    {
      id: 'ben-2',
      title: 'Health Insurance',
      description: 'Comprehensive medical, dental, and vision coverage for you and your family.',
      category: 'Health',
      icon: 'heart',
      isActive: true,
    },
  ],
  socialLinks: [
    { platform: 'linkedin', url: 'https://linkedin.com/company/techflow' },
    { platform: 'twitter', url: 'https://twitter.com/techflow' },
  ],
  stats: {
    totalTeamMembers: 482,
    totalJobs: 15,
    totalApplications: 1250,
    profileViews: 4500,
  },
};

/**
 * Tab configuration for company profile navigation
 */
export const PROFILE_TABS = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'details', label: 'Company Details', icon: Info },
  { id: 'benefits', label: 'Benefits', icon: Briefcase },
  { id: 'culture', label: 'Culture & Values', icon: LayoutGrid },
  { id: 'media', label: 'Media & Branding', icon: ImageIcon },
] as const;

export type ProfileTabId = (typeof PROFILE_TABS)[number]['id'];
