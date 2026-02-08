export interface RecommendedJob {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
  };
  location: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  jobType: string;
  createdAt: string;
  matchScore: number; // 0-100
  matchReason: string;
  requirements: string;
  JobSkill: Array<{ id: string; skillName: string }>;
  isFeatured: boolean;
  isRemote: boolean;
}

export const mockRecommendedJobs: RecommendedJob[] = [
  {
    id: "rj1",
    title: "Lead Frontend Architect",
    company: { name: "InnovateTech", logo: "/placeholder-logo.png" },
    location: "Stockholm, Sweden (Remote)",
    salaryMin: 180000,
    salaryMax: 240000,
    currency: "USD",
    jobType: "FULL_TIME",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    matchScore: 98,
    matchReason: "Matches your expertise in React and System Design",
    requirements: "React, TypeScript, GraphQL, Architecture",
    JobSkill: [
      { id: "s1", skillName: "React" },
      { id: "s6", skillName: "TypeScript" },
    ],
    isFeatured: true,
    isRemote: true,
  },
  {
    id: "rj2",
    title: "Senior Product Engineer",
    company: { name: "FutureStream", logo: "/placeholder-logo-2.png" },
    location: "Berlin, Germany",
    salaryMin: 140000,
    salaryMax: 170000,
    currency: "USD",
    jobType: "FULL_TIME",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    matchScore: 92,
    matchReason: "Strong match for your full-stack development profile",
    requirements: "Next.js, Node.js, PostgreSQL",
    JobSkill: [
      { id: "s2", skillName: "Node.js" },
      { id: "s7", skillName: "Next.js" },
    ],
    isFeatured: false,
    isRemote: false,
  },
  {
    id: "rj3",
    title: "Staff UI Engineer",
    company: { name: "DesignFirst", logo: "/placeholder-logo-3.png" },
    location: "Global Remote",
    salaryMin: 150000,
    salaryMax: 200000,
    currency: "USD",
    jobType: "CONTRACT",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    matchScore: 85,
    matchReason: "Matches your skill-set in advanced UI systems",
    requirements: "Figma, Tailwind CSS, Framer Motion",
    JobSkill: [
      { id: "s3", skillName: "Figma" },
      { id: "s8", skillName: "Tailwind CSS" },
    ],
    isFeatured: true,
    isRemote: true,
  },
];
