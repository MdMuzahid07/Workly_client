export interface SavedJob {
  id: string;
  job: {
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
    applicationDeadline: string;
    requirements: string;
    JobSkill: Array<{ id: string; skillName: string }>;
    isFeatured: boolean;
    isRemote: boolean;
    isActive: boolean;
  };
}

export const mockSavedJobs: SavedJob[] = [
  {
    id: "sj1",
    job: {
      id: "1",
      title: "Senior Software Engineer",
      company: { name: "TechGiant", logo: "/placeholder-logo.png" },
      location: "Mountain View, CA",
      salaryMin: 160000,
      salaryMax: 220000,
      currency: "USD",
      jobType: "FULL_TIME",
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      applicationDeadline: new Date(Date.now() + 14 * 86400000).toISOString(),
      requirements: "React, Node.js, AWS",
      JobSkill: [
        { id: "s1", skillName: "React" },
        { id: "s2", skillName: "Node.js" },
      ],
      isFeatured: true,
      isRemote: true,
      isActive: true,
    },
  },
  {
    id: "sj2",
    job: {
      id: "2",
      title: "Product Designer",
      company: { name: "CreativeCloud", logo: "/placeholder-logo-2.png" },
      location: "Remote",
      salaryMin: 120000,
      salaryMax: 150000,
      currency: "USD",
      jobType: "CONTRACT",
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      applicationDeadline: new Date(Date.now() + 3 * 86400000).toISOString(),
      requirements: "Figma, Portfolio, UI/UX",
      JobSkill: [{ id: "s3", skillName: "Figma" }],
      isFeatured: false,
      isRemote: true,
      isActive: true,
    },
  },
  {
    id: "sj3",
    job: {
      id: "3",
      title: "DevOps Engineer",
      company: { name: "CloudScale", logo: "/placeholder-logo-3.png" },
      location: "Austin, TX",
      salaryMin: 140000,
      salaryMax: 190000,
      currency: "USD",
      jobType: "FULL_TIME",
      createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
      applicationDeadline: new Date(Date.now() - 2 * 86400000).toISOString(),
      requirements: "Kubernetes, Docker, CI/CD",
      JobSkill: [{ id: "s4", skillName: "Kubernetes" }],
      isFeatured: false,
      isRemote: false,
      isActive: false,
    },
  },
  {
    id: "sj4",
    job: {
      id: "4",
      title: "Frontend Developer",
      company: { name: "WebFlow", logo: "/placeholder-logo-4.png" },
      location: "New York, NY",
      salaryMin: 100000,
      salaryMax: 140000,
      currency: "USD",
      jobType: "FULL_TIME",
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      applicationDeadline: new Date(Date.now() + 1 * 86400000).toISOString(),
      requirements: "HTML, CSS, JS",
      JobSkill: [{ id: "s5", skillName: "JavaScript" }],
      isFeatured: true,
      isRemote: true,
      isActive: true,
    },
  },
];
