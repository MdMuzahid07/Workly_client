import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Award,
  Briefcase,
  Building,
  Calendar,
  ExternalLink,
  Globe,
  Heart,
  MapPin,
  Share2,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";

// fake data for company details
const companyData = {
  id: "1",
  name: "TechFlow Inc.",
  logo: "/abstract-tech-logo.png",
  industry: "Technology",
  size: "100-500 employees",
  location: "San Francisco, CA",
  website: "techflow.com",
  founded: "2018",
  description:
    "TechFlow Inc. is a leading software development company specializing in web applications and cloud solutions. We're passionate about creating innovative technology that solves real-world problems and helps businesses thrive in the digital age.",
  mission:
    "To empower businesses through cutting-edge technology solutions that drive growth and innovation.",
  values: [
    "Innovation First",
    "Customer Success",
    "Team Collaboration",
    "Quality Excellence",
    "Continuous Learning",
  ],
  benefits: [
    "Comprehensive health insurance",
    "Flexible working hours",
    "Remote work options",
    "Professional development budget",
    "Annual performance bonus",
    "Stock options",
    "Unlimited PTO",
    "Modern office space",
    "Free meals and snacks",
    "Gym membership",
  ],
  culture:
    "We foster a collaborative environment where creativity and innovation thrive. Our team values work-life balance, continuous learning, and making a positive impact through technology.",
  socialLinks: {
    linkedin: "linkedin.com/company/techflow",
    twitter: "twitter.com/techflow",
    github: "github.com/techflow",
  },
  stats: {
    employees: 250,
    offices: 3,
    countries: 2,
    founded: 2018,
  },
  openJobs: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      type: "Full-time",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      type: "Full-time",
      location: "Remote",
      salary: "$110,000 - $140,000",
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Engineering",
      type: "Full-time",
      location: "San Francisco, CA",
      salary: "$100,000 - $130,000",
      posted: "3 days ago",
    },
    {
      id: 4,
      title: "UX Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
      salary: "$85,000 - $110,000",
      posted: "5 days ago",
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const page = ({ params }: { params: { id: string } }) => {
  const company = companyData;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Workly_job
              </h1>
            </div>
            <nav className="hidden space-x-8 md:flex">
              <a href="#" className="text-gray-500">
                Jobs
              </a>
              <a href="#" className="font-medium text-gray-900">
                Companies
              </a>
              <a href="#" className="text-gray-500">
                Messages
              </a>
              <a href="#" className="text-gray-500">
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
            {/* Company Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-6">
                  <Image
                    width={100}
                    height={100}
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {company.name}
                      </h1>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700"
                      >
                        Featured
                      </Badge>
                    </div>
                    <p className="mb-4 text-lg text-gray-600">
                      {company.industry}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{company.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{company.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Founded {company.founded}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <a
                          href={`https://${company.website}`}
                          className="text-green-600 hover:underline"
                        >
                          {company.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* About Company */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  About {company.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 leading-relaxed text-gray-700">
                  {company.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-medium text-gray-900">
                      Our Mission
                    </h4>
                    <p className="text-gray-700">{company.mission}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Values */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {company.values.map((value, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                    >
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits & Perks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Benefits & Perks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {company.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company Culture */}
            <Card>
              <CardHeader>
                <CardTitle>Company Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-gray-700">
                  {company.culture}
                </p>
              </CardContent>
            </Card>

            {/* Open Positions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Open Positions ({company.openJobs.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {company.openJobs.map((job) => (
                    <div
                      key={job.id}
                      className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="mb-1 font-medium text-gray-900">
                            {job.title}
                          </h4>
                          <div className="mb-2 flex items-center gap-4 text-sm text-gray-600">
                            <span>{job.department}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="font-medium text-green-600">
                              {job.salary}
                            </span>
                            <span className="text-gray-500">
                              Posted {job.posted}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-green-500 text-white hover:bg-green-600"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    className="border-green-600 bg-transparent text-green-600 hover:bg-green-50"
                  >
                    View All Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <Button className="mb-3 w-full bg-green-500 text-white hover:bg-green-600">
                  Follow Company
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  View All Jobs
                </Button>
              </CardContent>
            </Card>

            {/* Company Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Company Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Employees</span>
                  <span className="font-medium">{company.stats.employees}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Offices</span>
                  <span className="font-medium">{company.stats.offices}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Countries</span>
                  <span className="font-medium">{company.stats.countries}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Founded</span>
                  <span className="font-medium">{company.stats.founded}</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href={`https://${company.socialLinks.linkedin}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
                    <span className="text-xs font-bold text-white">in</span>
                  </div>
                  <span className="text-gray-700">LinkedIn</span>
                  <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
                </a>

                <a
                  href={`https://${company.socialLinks.twitter}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-400">
                    <span className="text-xs font-bold text-white">𝕏</span>
                  </div>
                  <span className="text-gray-700">Twitter</span>
                  <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
                </a>

                <a
                  href={`https://${company.socialLinks.github}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-900">
                    <span className="text-xs font-bold text-white">GH</span>
                  </div>
                  <span className="text-gray-700">GitHub</span>
                  <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
                </a>
              </CardContent>
            </Card>

            {/* Similar Companies */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Companies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-2 flex items-center gap-3">
                    <Image
                      width={100}
                      height={100}
                      src="/abstract-tech-logo.png"
                      alt="Company logo"
                      className="h-8 w-8 rounded"
                    />
                    <div>
                      <h4 className="text-sm font-medium">InnovateCorp</h4>
                      <p className="text-xs text-gray-600">SaaS • New York</p>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-green-600">
                    15 open jobs
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-2 flex items-center gap-3">
                    <Image
                      width={100}
                      height={100}
                      src="/cloud-company-logo.png"
                      alt="Company logo"
                      className="h-8 w-8 rounded"
                    />
                    <div>
                      <h4 className="text-sm font-medium">
                        CloudTech Solutions
                      </h4>
                      <p className="text-xs text-gray-600">Cloud • Seattle</p>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-green-600">
                    22 open jobs
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-2 flex items-center gap-3">
                    <Image
                      width={100}
                      height={100}
                      src="/data-company-logo.png"
                      alt="Company logo"
                      className="h-8 w-8 rounded"
                    />
                    <div>
                      <h4 className="text-sm font-medium">DataVision Labs</h4>
                      <p className="text-xs text-gray-600">
                        Analytics • Remote
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-green-600">
                    8 open jobs
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
