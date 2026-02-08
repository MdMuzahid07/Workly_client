export type ApplicationStatus =
  | "pending"
  | "under_review"
  | "interviewing"
  | "offer"
  | "rejected"
  | "accepted";

export interface Application {
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
  appliedDate: string;
  status: ApplicationStatus;
  requirements: string[]; // Changed from string for better UI
  JobSkill: Array<{ id: string; skillName: string }>;
}

export const mockApplications: Application[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: { name: "TechCorp Inc.", logo: "/placeholder-logo.png" },
    location: "New York, NY (Remote)",
    salaryMin: 120000,
    salaryMax: 150000,
    currency: "$",
    jobType: "Full-time",
    appliedDate: new Date().toISOString(), // Today
    status: "interviewing",
    requirements: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    JobSkill: [
      { id: "s1", skillName: "React" },
      { id: "s2", skillName: "TypeScript" },
    ],
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: { name: "StartupX", logo: "/placeholder-logo-2.png" },
    location: "San Francisco, CA",
    salaryMin: 140000,
    salaryMax: 180000,
    currency: "$",
    jobType: "Full-time",
    appliedDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    status: "pending",
    requirements: ["Node.js", "React", "PostgreSQL", "AWS"],
    JobSkill: [
      { id: "s3", skillName: "Node.js" },
      { id: "s4", skillName: "PostgreSQL" },
    ],
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: { name: "Design Studio", logo: "/placeholder-logo-3.png" },
    location: "Remote",
    salaryMin: 90000,
    salaryMax: 120000,
    currency: "$",
    jobType: "Contract",
    appliedDate: "2024-02-01T09:15:00Z",
    status: "rejected",
    requirements: ["Figma", "Adobe XD", "Prototyping"],
    JobSkill: [{ id: "s5", skillName: "Figma" }],
  },
  {
    id: "4",
    title: "Backend Developer",
    company: { name: "FinTech Sol", logo: "/placeholder-logo-4.png" },
    location: "London, UK",
    salaryMin: 80000,
    salaryMax: 110000,
    currency: "£",
    jobType: "Full-time",
    appliedDate: "2024-02-18T16:45:00Z",
    status: "under_review",
    requirements: ["Java", "Spring Boot", "Microservices"],
    JobSkill: [
      { id: "s6", skillName: "Java" },
      { id: "s7", skillName: "Spring Boot" },
    ],
  },
  {
    id: "5",
    title: "Product Manager",
    company: { name: "InnovateBest", logo: "/placeholder-logo-5.png" },
    location: "Austin, TX",
    salaryMin: 130000,
    salaryMax: 160000,
    currency: "$",
    jobType: "Full-time",
    appliedDate: "2024-02-05T11:20:00Z",
    status: "offer",
    requirements: ["Agile", "Scrum", "Product Lifecycle"],
    JobSkill: [{ id: "s8", skillName: "Agile" }],
  },
];
