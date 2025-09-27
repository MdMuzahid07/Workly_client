import {
  Briefcase,
  Calendar,
  ChevronRight,
  DollarSign,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";

// Mock data based on your screenshot
const jobs = [
  {
    id: "FE001",
    title: "Senior Frontend Developer",
    company: "TechFlow Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Senior",
    salary: "$130,000 - $150,000",
    applications: 42,
    status: "active" as const,
    postedDate: "2 days ago",
    isRemote: false,
    isFeatured: true,
  },
  {
    id: "BE002",
    title: "Backend Engineer",
    company: "TechFlow Inc.",
    location: "Remote",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$100,000 - $130,000",
    applications: 18,
    status: "active" as const,
    postedDate: "1 week ago",
    isRemote: true,
    isFeatured: false,
  },
  {
    id: "PM003",
    title: "Product Manager",
    company: "TechFlow Inc.",
    location: "New York, NY",
    type: "Full-time",
    experience: "Senior",
    salary: "$130,000 - $160,000",
    applications: 31,
    status: "active" as const,
    postedDate: "2 weeks ago",
    isRemote: false,
    isFeatured: true,
  },
];

const stats = {
  totalJobs: 7,
  activeJobs: 3,
  applications: 156,
};

const DashboardJobManagementView = () => {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Jobs
                  </p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {stats.totalJobs}
                  </p>
                  <p className="mt-1 text-sm text-green-600">
                    +12% from last month
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Jobs
                  </p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {stats.activeJobs}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">Currently hiring</p>
                </div>
                <Badge className="border-0 bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Applications
                  </p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {stats.applications}
                  </p>
                  <p className="mt-1 text-sm text-green-600">+78 this week</p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Jobs Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-gray-200 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">
                  Recent Job Postings
                </CardTitle>
                <CardDescription>
                  Latest job openings and their status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {job.title}
                        </h3>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            {job.applications} applications
                          </span>
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {job.postedDate}
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={
                          job.status === "active"
                            ? "border-0 bg-green-100 text-green-800"
                            : "border-0 bg-gray-100 text-gray-800"
                        }
                      >
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700"
                >
                  View All Jobs
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Jobs Table */}
          <div className="lg:col-span-2">
            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      All Job Postings
                    </CardTitle>
                    <CardDescription>
                      Manage and track your job listings
                    </CardDescription>
                  </div>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Job
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filter Bar */}
                <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                      placeholder="Search jobs by title, location, or type..."
                      className="border-gray-300 pl-10 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700"
                    >
                      All Types
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700"
                    >
                      All Locations
                    </Button>
                  </div>
                </div>

                {/* Jobs List */}
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {job.title}
                              </h3>
                              <p className="text-gray-600">{job.company}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {job.isFeatured && (
                                <Badge className="border-0 bg-blue-100 text-blue-800">
                                  Featured
                                </Badge>
                              )}
                              <Badge
                                className={
                                  job.status === "active"
                                    ? "border-0 bg-green-100 text-green-800"
                                    : "border-0 bg-gray-100 text-gray-800"
                                }
                              >
                                {job.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="mr-2 h-4 w-4" />
                              <span>{job.location}</span>
                              {job.isRemote && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 border-green-200 text-xs text-green-700"
                                >
                                  Remote
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Briefcase className="mr-2 h-4 w-4" />
                              <span>
                                {job.type} • {job.experience}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <DollarSign className="mr-2 h-4 w-4" />
                              <span>{job.salary}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Users className="mr-1 h-4 w-4" />
                                {job.applications} applications
                              </span>
                              <span className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4" />
                                Posted {job.postedDate}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 text-gray-700"
                              >
                                View Applications
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-gray-300 text-gray-700"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="w-48"
                                >
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit Job</DropdownMenuItem>
                                  <DropdownMenuItem>
                                    View Applications
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    Close Job
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardJobManagementView;
