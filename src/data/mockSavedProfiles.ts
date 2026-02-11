export interface SavedProfile {
  id: string;
  candidateName: string;
  candidateAvatar?: string;
  currentPosition: string;
  location: string;
  experience: string; // e.g., "5+ years"
  savedDate: string;
  email: string;
  phone?: string;
  skills: Array<{ id: string; skillName: string }>;
  education: string;
  summary: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  availability: "immediate" | "2_weeks" | "1_month" | "not_available";
  salaryExpectation?: {
    min: number;
    max: number;
    currency: string;
  };
  tags: string[]; // e.g., ["Senior", "Remote Ready", "Team Lead"]
}

export const mockSavedProfiles: SavedProfile[] = [
  {
    id: "1",
    candidateName: "Sarah Johnson",
    candidateAvatar: "/placeholder-avatar-1.png",
    currentPosition: "Senior Frontend Developer",
    location: "New York, NY",
    experience: "7+ years",
    savedDate: new Date().toISOString(),
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    skills: [
      { id: "s1", skillName: "React" },
      { id: "s2", skillName: "TypeScript" },
      { id: "s3", skillName: "Next.js" },
      { id: "s4", skillName: "Tailwind CSS" },
      { id: "s5", skillName: "Node.js" },
    ],
    education: "BS Computer Science - MIT",
    summary:
      "Passionate frontend developer with 7+ years of experience building scalable web applications. Specialized in React ecosystem and modern JavaScript frameworks.",
    resumeUrl: "/resumes/sarah-johnson.pdf",
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    portfolioUrl: "https://sarahjohnson.dev",
    availability: "2_weeks",
    salaryExpectation: {
      min: 130000,
      max: 160000,
      currency: "$",
    },
    tags: ["Senior", "Remote Ready", "Team Lead"],
  },
  {
    id: "2",
    candidateName: "Michael Chen",
    candidateAvatar: "/placeholder-avatar-2.png",
    currentPosition: "Full Stack Engineer",
    location: "San Francisco, CA",
    experience: "5+ years",
    savedDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    skills: [
      { id: "s6", skillName: "Node.js" },
      { id: "s7", skillName: "React" },
      { id: "s8", skillName: "PostgreSQL" },
      { id: "s9", skillName: "AWS" },
      { id: "s10", skillName: "Docker" },
    ],
    education: "MS Software Engineering - Stanford University",
    summary:
      "Full stack engineer with expertise in building cloud-native applications. Strong background in microservices architecture and DevOps practices.",
    resumeUrl: "/resumes/michael-chen.pdf",
    linkedinUrl: "https://linkedin.com/in/michaelchen",
    availability: "immediate",
    salaryExpectation: {
      min: 140000,
      max: 180000,
      currency: "$",
    },
    tags: ["Full Stack", "Cloud Expert", "DevOps"],
  },
  {
    id: "3",
    candidateName: "Emily Rodriguez",
    candidateAvatar: "/placeholder-avatar-3.png",
    currentPosition: "UI/UX Designer",
    location: "Austin, TX",
    experience: "4+ years",
    savedDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    email: "emily.rodriguez@email.com",
    skills: [
      { id: "s11", skillName: "Figma" },
      { id: "s12", skillName: "Adobe XD" },
      { id: "s13", skillName: "Sketch" },
      { id: "s14", skillName: "Prototyping" },
      { id: "s15", skillName: "User Research" },
    ],
    education: "BFA Graphic Design - Parsons School of Design",
    summary:
      "Creative UI/UX designer focused on creating intuitive and beautiful user experiences. Experienced in design systems and user-centered design methodologies.",
    resumeUrl: "/resumes/emily-rodriguez.pdf",
    linkedinUrl: "https://linkedin.com/in/emilyrodriguez",
    portfolioUrl: "https://emilyrodriguez.design",
    availability: "1_month",
    salaryExpectation: {
      min: 95000,
      max: 125000,
      currency: "$",
    },
    tags: ["Designer", "UX Research", "Design Systems"],
  },
  {
    id: "4",
    candidateName: "David Kim",
    candidateAvatar: "/placeholder-avatar-4.png",
    currentPosition: "Backend Developer",
    location: "Seattle, WA",
    experience: "6+ years",
    savedDate: new Date(Date.now() - 86400000 * 7).toISOString(),
    email: "david.kim@email.com",
    phone: "+1 (555) 345-6789",
    skills: [
      { id: "s16", skillName: "Python" },
      { id: "s17", skillName: "Django" },
      { id: "s18", skillName: "PostgreSQL" },
      { id: "s19", skillName: "Redis" },
      { id: "s20", skillName: "Kubernetes" },
    ],
    education: "BS Computer Engineering - University of Washington",
    summary:
      "Backend developer specializing in scalable API design and database optimization. Strong experience with Python ecosystem and distributed systems.",
    resumeUrl: "/resumes/david-kim.pdf",
    linkedinUrl: "https://linkedin.com/in/davidkim",
    availability: "2_weeks",
    salaryExpectation: {
      min: 125000,
      max: 155000,
      currency: "$",
    },
    tags: ["Backend", "API Design", "Database Expert"],
  },
  {
    id: "5",
    candidateName: "Jessica Martinez",
    candidateAvatar: "/placeholder-avatar-5.png",
    currentPosition: "Product Manager",
    location: "Boston, MA",
    experience: "8+ years",
    savedDate: new Date(Date.now() - 86400000 * 10).toISOString(),
    email: "jessica.martinez@email.com",
    phone: "+1 (555) 456-7890",
    skills: [
      { id: "s21", skillName: "Agile" },
      { id: "s22", skillName: "Scrum" },
      { id: "s23", skillName: "Product Strategy" },
      { id: "s24", skillName: "Data Analysis" },
      { id: "s25", skillName: "Roadmapping" },
    ],
    education: "MBA - Harvard Business School",
    summary:
      "Strategic product manager with 8+ years of experience leading cross-functional teams. Proven track record of launching successful B2B and B2C products.",
    resumeUrl: "/resumes/jessica-martinez.pdf",
    linkedinUrl: "https://linkedin.com/in/jessicamartinez",
    availability: "1_month",
    salaryExpectation: {
      min: 145000,
      max: 185000,
      currency: "$",
    },
    tags: ["Product Lead", "Strategic", "B2B/B2C"],
  },
  {
    id: "6",
    candidateName: "Alex Thompson",
    candidateAvatar: "/placeholder-avatar-6.png",
    currentPosition: "DevOps Engineer",
    location: "Denver, CO",
    experience: "5+ years",
    savedDate: new Date(Date.now() - 86400000 * 14).toISOString(),
    email: "alex.thompson@email.com",
    skills: [
      { id: "s26", skillName: "AWS" },
      { id: "s27", skillName: "Terraform" },
      { id: "s28", skillName: "Jenkins" },
      { id: "s29", skillName: "Docker" },
      { id: "s30", skillName: "Kubernetes" },
    ],
    education: "BS Information Systems - University of Colorado",
    summary:
      "DevOps engineer passionate about automation and infrastructure as code. Experienced in building CI/CD pipelines and managing cloud infrastructure at scale.",
    resumeUrl: "/resumes/alex-thompson.pdf",
    linkedinUrl: "https://linkedin.com/in/alexthompson",
    availability: "immediate",
    salaryExpectation: {
      min: 120000,
      max: 150000,
      currency: "$",
    },
    tags: ["DevOps", "Cloud", "Automation"],
  },
];
