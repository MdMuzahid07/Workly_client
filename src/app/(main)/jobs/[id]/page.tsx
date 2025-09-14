import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Bookmark,
  Building,
  Clock,
  DollarSign,
  Heart,
  MapPin,
  Share2,
  Users,
} from "lucide-react";

// Mock data for different job examples
const jobExamples = {
  "1": {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechHive Solutions",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    salary: "$1200",
    salaryType: "fixed price",
    postedTime: "2 hours ago",
    description:
      "We are looking for a React.js developer to build scalable and interactive web applications. You will work with our dynamic team to create user-friendly interfaces and implement modern web technologies.",
    requirements: [
      "3+ years of experience with React.js",
      "Strong knowledge of TypeScript",
      "Experience with Tailwind CSS",
      "Understanding of modern JavaScript (ES6+)",
      "Experience with state management (Redux/Zustand)",
      "Knowledge of RESTful APIs",
      "Git version control experience",
    ],
    responsibilities: [
      "Develop and maintain React.js applications",
      "Collaborate with UI/UX designers",
      "Write clean, maintainable code",
      "Participate in code reviews",
      "Optimize applications for performance",
      "Stay updated with latest React trends",
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "Redux"],
    benefits: [
      "Health insurance",
      "Flexible working hours",
      "Remote work options",
      "Professional development budget",
      "Annual bonus",
    ],
    companySize: "50-100 employees",
    industry: "Technology",
    featured: true,
    urgent: true,
  },
  "2": {
    id: "2",
    title: "Backend Engineer",
    company: "CloudBridge Ltd",
    location: "Remote",
    type: "Contract",
    salary: "$25",
    salaryType: "/hour",
    postedTime: "1 day ago",
    description:
      "Seeking an experienced Node.js developer with expertise in PostgreSQL and Prisma. You'll be responsible for building robust backend systems and APIs for our cloud infrastructure platform.",
    requirements: [
      "4+ years of Node.js experience",
      "Strong PostgreSQL knowledge",
      "Experience with Prisma ORM",
      "REST API development",
      "Docker containerization",
      "AWS/GCP experience",
      "Testing frameworks knowledge",
    ],
    responsibilities: [
      "Design and implement backend APIs",
      "Database schema design and optimization",
      "Implement authentication and authorization",
      "Write comprehensive tests",
      "Deploy and monitor applications",
      "Collaborate with frontend team",
    ],
    skills: ["Node.js", "Prisma", "PostgreSQL", "REST APIs", "Docker", "AWS"],
    benefits: [
      "Competitive hourly rate",
      "Flexible schedule",
      "100% remote work",
      "Learning stipend",
      "Equipment provided",
    ],
    companySize: "10-50 employees",
    industry: "Cloud Services",
    featured: false,
    urgent: false,
  },
};

const JobDetailsPage = ({ params }: { params: { id: string } }) => {
  // In a real app, you'd fetch this data based on the ID
  const job =
    jobExamples[params.id as keyof typeof jobExamples] || jobExamples["1"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Workly_job</h1>
            </div>
            <nav className="hidden space-x-8 md:flex">
              <a href="#" className="text-gray-900 hover:text-gray-700">
                Jobs
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Companies
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Messages
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Notifications
              </a>
            </nav>
            <Button className="bg-green-500 text-white hover:bg-green-600">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      {job.featured && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          Featured
                        </Badge>
                      )}
                      {job.urgent && (
                        <Badge variant="destructive">Urgent</Badge>
                      )}
                    </div>
                    <CardTitle className="mb-2 text-2xl font-bold text-gray-900">
                      {job.title}
                    </CardTitle>
                    <div className="mb-4 flex items-center text-gray-600">
                      <Building className="mr-2 h-4 w-4" />
                      <span className="font-medium">{job.company}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="mr-1 h-4 w-4" />
                      <span>{job.location}</span>
                      <span className="mx-2">•</span>
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{job.postedTime}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4" />
                        <span className="text-lg font-semibold text-gray-900">
                          {job.salary}
                        </span>
                        <span className="ml-1">{job.salaryType}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-gray-700">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                      <span className="text-gray-700">{resp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-gray-100 text-gray-800"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card>
              <CardContent className="p-6">
                <Button className="mb-4 w-full bg-green-500 text-white hover:bg-green-600">
                  Apply Now
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Save Job
                </Button>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.company}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Industry</span>
                  <span className="font-medium">{job.industry}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Company Size</span>
                  <span className="font-medium">{job.companySize}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Job Type</span>
                  <span className="font-medium">{job.type}</span>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 w-full bg-transparent"
                >
                  View Company Profile
                </Button>
              </CardContent>
            </Card>

            {/* Job Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Job Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-medium">23</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-medium">156</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-medium">{job.postedTime}</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-3">
                  <h4 className="text-sm font-medium">Full Stack Developer</h4>
                  <p className="text-xs text-gray-600">WebTech Inc • Remote</p>
                  <p className="text-xs font-medium text-green-600">$30/hour</p>
                </div>
                <div className="rounded-lg border p-3">
                  <h4 className="text-sm font-medium">React Developer</h4>
                  <p className="text-xs text-gray-600">StartupXYZ • New York</p>
                  <p className="text-xs font-medium text-green-600">
                    $1500 fixed
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <h4 className="text-sm font-medium">UI/UX Developer</h4>
                  <p className="text-xs text-gray-600">DesignCorp • London</p>
                  <p className="text-xs font-medium text-green-600">$28/hour</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
