"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobCard from "../../components/main/jobs/JobCard";

const fakeData = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "Senior Frontend Developer - React & TypeScript",
    slug: "senior-frontend-developer-react-typescript",
    discipline: "Software Engineering",
    requirements:
      "4+ years of experience in frontend development with React, TypeScript, and modern JavaScript. Strong knowledge of state management, component architecture, and responsive design.",
    jobType: "FULL_TIME",
    location: "Remote",
    experienceLevel: "Senior",
    isRemote: true,
    salaryMin: 100000,
    salaryMax: 150000,
    currency: "USD",
    contactEmail: "careers@techcorp.com",
    applicationDeadline: "2025-10-15T23:59:59.000Z",
    maxApplications: 150,
    autoCloseApplications: true,
    isActive: true,
    isFeatured: true,
    expiresAt: "2025-12-31T23:59:59.000Z",
    viewCount: 45,
    applyCount: 12,
    deletedAt: null,
    benefits:
      "Health insurance, Stock options, Flexible hours, Learning budget",
    createdAt: "2025-09-25T10:30:00.000Z",
    updatedAt: "2025-09-25T10:30:00.000Z",
    companyId: "comp-1234-5678-90ab-cdefghijklmn",
    postedById: "user-1234-5678-90ab-cdefghijklmn",
    JobSkill: [
      {
        id: "skill-1111-2222-3333-444444444444",
        skillName: "React",
        experienceYears: 4,
        isRequired: true,
        priority: "HIGH",
        description: "Building complex user interfaces with React and hooks",
        createdAt: "2025-09-25T10:30:00.000Z",
        updatedAt: "2025-09-25T10:30:00.000Z",
        jobId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
      {
        id: "skill-2222-3333-4444-555555555555",
        skillName: "TypeScript",
        experienceYears: 3,
        isRequired: true,
        priority: "HIGH",
        description: "Strong TypeScript skills for type-safe applications",
        createdAt: "2025-09-25T10:30:00.000Z",
        updatedAt: "2025-09-25T10:30:00.000Z",
        jobId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
    ],
    postedBy: {
      id: "user-1234-5678-90ab-cdefghijklmn",
      fullName: "Sarah Johnson",
      email: "sarah@techcorp.com",
      phone: "+1-555-0101",
      role: "EMPLOYER",
    },
    company: {
      id: "comp-1234-5678-90ab-cdefghijklmn",
      name: "TechCorp Innovations",
      slug: "techcorp-innovations",
      description:
        "Leading provider of cutting-edge software solutions for enterprise clients worldwide.",
      websiteUrl: "https://www.techcorp.com",
      logoUrl: "https://cdn.example.com/logos/techcorp-logo.png",
      coverUrl: "https://cdn.example.com/covers/techcorp-cover.jpg",
      location: "New York, NY, USA",
      industry: "Technology",
      size: "201-500",
      contactEmail: "info@techcorp.com",
      contactPhone: "+1-555-0123",
      isVerified: true,
      verifiedAt: "2025-01-15T00:00:00.000Z",
      deletedAt: null,
      createdAt: "2025-01-10T00:00:00.000Z",
      updatedAt: "2025-09-01T00:00:00.000Z",
    },
    _count: {
      applications: 12,
    },
  },
  {
    id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
    title: "DevOps Engineer - AWS & Kubernetes",
    slug: "devops-engineer-aws-kubernetes",
    discipline: "DevOps",
    requirements:
      "3+ years of DevOps experience with AWS, Kubernetes, Docker, and CI/CD pipelines. Knowledge of infrastructure as code and monitoring tools.",
    jobType: "FULL_TIME",
    location: "Austin, TX, USA",
    experienceLevel: "Mid-Level",
    isRemote: false,
    salaryMin: 90000,
    salaryMax: 130000,
    currency: "USD",
    contactEmail: "devops-hiring@cloudtech.com",
    applicationDeadline: "2025-10-20T23:59:59.000Z",
    maxApplications: 100,
    autoCloseApplications: true,
    isActive: true,
    isFeatured: false,
    expiresAt: "2025-12-31T23:59:59.000Z",
    viewCount: 78,
    applyCount: 23,
    deletedAt: null,
    benefits: "Health insurance, 401k matching, Professional development",
    createdAt: "2025-09-20T14:15:00.000Z",
    updatedAt: "2025-09-20T14:15:00.000Z",
    companyId: "comp-2345-6789-01bc-defghijklmno",
    postedById: "user-2345-6789-01bc-defghijklmno",
    JobSkill: [
      {
        id: "skill-3333-4444-5555-666666666666",
        skillName: "AWS",
        experienceYears: 3,
        isRequired: true,
        priority: "HIGH",
        description: "Managing cloud infrastructure on AWS",
        createdAt: "2025-09-20T14:15:00.000Z",
        updatedAt: "2025-09-20T14:15:00.000Z",
        jobId: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
      },
      {
        id: "skill-4444-5555-6666-777777777777",
        skillName: "Kubernetes",
        experienceYears: 2,
        isRequired: true,
        priority: "HIGH",
        description: "Container orchestration and management",
        createdAt: "2025-09-20T14:15:00.000Z",
        updatedAt: "2025-09-20T14:15:00.000Z",
        jobId: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
      },
    ],
    postedBy: {
      id: "user-2345-6789-01bc-defghijklmno",
      fullName: "Mike Chen",
      email: "mike@cloudtech.com",
      phone: "+1-555-0102",
      role: "EMPLOYER",
    },
    company: {
      id: "comp-2345-6789-01bc-defghijklmno",
      name: "CloudTech Solutions",
      slug: "cloudtech-solutions",
      description:
        "Specialized in cloud infrastructure and DevOps services for growing businesses.",
      websiteUrl: "https://www.cloudtech.com",
      logoUrl: "https://cdn.example.com/logos/cloudtech-logo.png",
      coverUrl: "https://cdn.example.com/covers/cloudtech-cover.jpg",
      location: "Austin, TX, USA",
      industry: "Cloud Computing",
      size: "51-200",
      contactEmail: "info@cloudtech.com",
      contactPhone: "+1-555-0124",
      isVerified: true,
      verifiedAt: "2025-02-20T00:00:00.000Z",
      deletedAt: null,
      createdAt: "2025-02-15T00:00:00.000Z",
      updatedAt: "2025-08-15T00:00:00.000Z",
    },
    _count: {
      applications: 23,
    },
  },
  {
    id: "c3d4e5f6-g7h8-9012-cdef-345678901234",
    title: "Data Scientist - Machine Learning",
    slug: "data-scientist-machine-learning",
    discipline: "Data Science",
    requirements:
      "PhD or Master's in Computer Science with 2+ years experience in ML, Python, and data analysis. Experience with TensorFlow/PyTorch preferred.",
    jobType: "FULL_TIME",
    location: "Boston, MA, USA",
    experienceLevel: "Mid-Level",
    isRemote: true,
    salaryMin: 110000,
    salaryMax: 160000,
    currency: "USD",
    contactEmail: "data-science@ai-research.com",
    applicationDeadline: "2025-11-01T23:59:59.000Z",
    maxApplications: 80,
    autoCloseApplications: true,
    isActive: true,
    isFeatured: true,
    expiresAt: "2025-12-31T23:59:59.000Z",
    viewCount: 156,
    applyCount: 34,
    deletedAt: null,
    benefits: "Research budget, Conference attendance, Flexible schedule",
    createdAt: "2025-09-18T09:45:00.000Z",
    updatedAt: "2025-09-18T09:45:00.000Z",
    companyId: "comp-3456-7890-12cd-efghijklmnop",
    postedById: "user-3456-7890-12cd-efghijklmnop",
    JobSkill: [
      {
        id: "skill-5555-6666-7777-888888888888",
        skillName: "Python",
        experienceYears: 3,
        isRequired: true,
        priority: "HIGH",
        description: "Data analysis and machine learning with Python",
        createdAt: "2025-09-18T09:45:00.000Z",
        updatedAt: "2025-09-18T09:45:00.000Z",
        jobId: "c3d4e5f6-g7h8-9012-cdef-345678901234",
      },
      {
        id: "skill-6666-7777-8888-999999999999",
        skillName: "TensorFlow",
        experienceYears: 2,
        isRequired: false,
        priority: "MEDIUM",
        description: "Building and training neural networks",
        createdAt: "2025-09-18T09:45:00.000Z",
        updatedAt: "2025-09-18T09:45:00.000Z",
        jobId: "c3d4e5f6-g7h8-9012-cdef-345678901234",
      },
    ],
    postedBy: {
      id: "user-3456-7890-12cd-efghijklmnop",
      fullName: "Dr. Emily Watson",
      email: "emily@ai-research.com",
      phone: "+1-555-0103",
      role: "EMPLOYER",
    },
    company: {
      id: "comp-3456-7890-12cd-efghijklmnop",
      name: "AI Research Labs",
      slug: "ai-research-labs",
      description:
        "Pioneering artificial intelligence research and applications.",
      websiteUrl: "https://www.ai-research.com",
      logoUrl: "https://cdn.example.com/logos/ai-research-logo.png",
      coverUrl: "https://cdn.example.com/covers/ai-research-cover.jpg",
      location: "Boston, MA, USA",
      industry: "Artificial Intelligence",
      size: "11-50",
      contactEmail: "info@ai-research.com",
      contactPhone: "+1-555-0125",
      isVerified: true,
      verifiedAt: "2025-03-10T00:00:00.000Z",
      deletedAt: null,
      createdAt: "2025-03-01T00:00:00.000Z",
      updatedAt: "2025-09-10T00:00:00.000Z",
    },
    _count: {
      applications: 34,
    },
  },
];

const SavedJobsView = () => {
  const activeJobs = fakeData.filter((job) => job.isActive);
  const closedJobs = fakeData.filter((job) => !job.isActive);

  return (
    <div className="container mx-auto max-w-7xl py-6 pt-24">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Saved Jobs</h1>
        <p className="text-muted-foreground">
          Manage your saved job opportunities
        </p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4 w-full justify-end">
          <TabsTrigger value="active">Active ({activeJobs.length})</TabsTrigger>
          <TabsTrigger value="closed">Closed ({closedJobs.length})</TabsTrigger>
        </TabsList>

        <TabsContent
          value="active"
          className="grid grid-cols-1 gap-6 xl:grid-cols-2"
        >
          {activeJobs.length > 0 ? (
            activeJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="bg-muted/10 rounded-lg border py-12 text-center">
              <p className="text-muted-foreground">No active saved jobs</p>
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="closed"
          className="grid grid-cols-1 gap-6 xl:grid-cols-2"
        >
          {closedJobs.length > 0 ? (
            closedJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="bg-muted/10 rounded-lg border py-12 text-center">
              <p className="text-muted-foreground">No closed saved jobs</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavedJobsView;
