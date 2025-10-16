import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  Briefcase,
  Building,
  Calendar,
  Globe,
  Heart,
  MapPin,
  Share2,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";
import CompanyDetailsSidebar from "../../components/main/company/companyDetails/CompanyDetailsSidebar";

export type Company = {
  id?: string | number;
  name?: string;
  logo?: string;
  industry?: string;
  size?: string;
  location?: string;
  website?: string;
  founded?: string | number;
  description?: string;
  mission?: string;
  values?: string[];
  benefits?: string[];
  culture?: string;
  openJobs?: Array<{
    id: string | number;
    title: string;
    department: string;
    type: string;
    location: string;
    salary?: string;
    posted?: string;
  }>;
};

// Allow either direct company data or legacy params prop
type CompanyDetailsViewProps =
  | { company: Company | null }
  | { params: { slug: string } };

const CompanyDetailsView = (props: CompanyDetailsViewProps) => {
  const company: Company | null = "company" in props ? props.company : null;
  if (!company) {
    return (
      <div className="bg-primary/2 min-h-screen md:pt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-secondary-foreground">Company not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary/2 min-h-screen md:pt-16">
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
                    className="bg-primary h-20 w-20 rounded-full object-cover object-center"
                  />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h1 className="text-foreground/90 text-3xl font-bold">
                        {company.name}
                      </h1>
                      <Badge variant="default">Featured</Badge>
                    </div>
                    <p className="text-foreground/60 mb-4 text-lg">
                      {company.industry}
                    </p>

                    <div className="text-foreground/60 flex flex-wrap items-center gap-6 text-sm">
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
                <p className="text-secondary-foreground mb-6 leading-relaxed">
                  {company.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-secondary-foreground mb-2 font-medium">
                      Our Mission
                    </h4>
                    <p className="text-secondary-foreground">
                      {company.mission}
                    </p>
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
                  {(company.values || []).map((value, index) => (
                    <div
                      key={index}
                      className="bg-primary/2 flex items-center gap-3 rounded-lg p-3"
                    >
                      <div className="bg-primary/100 h-2 w-2 rounded-full"></div>
                      <span className="text-secondary-foreground font-medium">
                        {value}
                      </span>
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
                  {(company.benefits || []).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-primary/100 mt-2 h-2 w-2 rounded-full"></div>
                      <span className="text-secondary-foreground">
                        {benefit}
                      </span>
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
                <p className="text-secondary-foreground leading-relaxed">
                  {company.culture}
                </p>
              </CardContent>
            </Card>

            {/* Open Positions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Open Positions ({(company.openJobs || []).length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(company.openJobs || []).map((job) => (
                    <div
                      key={job.id}
                      className="hover:bg-primary/2 rounded-lg border border-gray-200 p-4 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-secondary-foreground mb-1 font-medium">
                            {job.title}
                          </h4>
                          <div className="text-foreground/60 mb-2 flex items-center gap-4 text-sm">
                            <span>{job.department}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            {job.salary && (
                              <span className="font-medium text-green-600">
                                {job.salary}
                              </span>
                            )}
                            {job.posted && (
                              <span className="text-secondary-foreground">
                                Posted {job.posted}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-primary/100 hover:bg-primary text-white"
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
                    className="hover:bg-primary/10 border-green-600 bg-transparent text-green-600"
                  >
                    View All Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <CompanyDetailsSidebar company={company} />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsView;
