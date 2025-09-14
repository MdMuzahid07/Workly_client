"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Filter, Globe, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Searchbar from "../../../components/main/jobs/Searchbar";

const companies = [
  {
    id: 1,
    name: "TechFlow Inc.",
    logo: "/abstract-tech-logo.png",
    industry: "Technology",
    size: "100-500 employees",
    location: "San Francisco, CA",
    description:
      "Leading software development company specializing in web applications and cloud solutions.",
    openJobs: 12,
    website: "techflow.com",
    founded: "2018",
    featured: true,
  },
  {
    id: 2,
    name: "DataVision Labs",
    logo: "/data-analytics-logo.png",
    industry: "Data Analytics",
    size: "50-100 employees",
    location: "Remote",
    description:
      "Advanced data analytics and machine learning solutions for enterprise clients.",
    openJobs: 8,
    website: "datavision.com",
    founded: "2020",
    featured: false,
  },
  {
    id: 3,
    name: "InnovateCorp",
    logo: "/innovation-company-logo.png",
    industry: "SaaS",
    size: "200-500 employees",
    location: "New York, NY",
    description:
      "Building innovative SaaS platforms that transform how businesses operate.",
    openJobs: 15,
    website: "innovatecorp.com",
    founded: "2016",
    featured: true,
  },
  {
    id: 4,
    name: "DesignStudio Pro",
    logo: "/design-studio-logo.png",
    industry: "Design",
    size: "20-50 employees",
    location: "Austin, TX",
    description:
      "Creative design studio focused on user experience and digital product design.",
    openJobs: 5,
    website: "designstudio.com",
    founded: "2019",
    featured: false,
  },
  {
    id: 5,
    name: "CloudTech Solutions",
    logo: "/cloud-technology-logo.jpg",
    industry: "Cloud Services",
    size: "500+ employees",
    location: "Seattle, WA",
    description:
      "Enterprise cloud infrastructure and DevOps solutions provider.",
    openJobs: 22,
    website: "cloudtech.com",
    founded: "2015",
    featured: true,
  },
  {
    id: 6,
    name: "GrowthCo",
    logo: "/marketing-company-logo.png",
    industry: "Marketing",
    size: "100-200 employees",
    location: "Los Angeles, CA",
    description:
      "Digital marketing agency helping brands grow through data-driven strategies.",
    openJobs: 7,
    website: "growthco.com",
    founded: "2017",
    featured: false,
  },
];

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Searchbar />
      {/* Filters */}
      <div className="mx-auto max-w-7xl rounded-lg bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 overflow-x-auto">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters</span>
          </div>
          <div className="flex gap-3">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-gray-50"
            >
              Technology
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-gray-50"
            >
              Startup
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-gray-50"
            >
              Remote
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-gray-50"
            >
              100+ employees
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl py-8">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Companies</h2>
          <p className="text-gray-600">
            Discover amazing companies and their open positions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Card
              key={company.id}
              className="cursor-pointer rounded-2xl bg-white"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    className="h-12 w-12 rounded-lg object-cover"
                    width={100}
                    height={100}
                    priority
                  />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {company.name}
                      </h3>
                      {company.featured && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-xs text-blue-700"
                        >
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{company.industry}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <p className="line-clamp-2 text-sm leading-relaxed text-gray-700">
                    {company.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{company.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>{company.website}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="text-sm">
                      <span className="font-medium text-green-600">
                        {company.openJobs}
                      </span>
                      <span className="ml-1 text-gray-600">open jobs</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-600 bg-transparent text-green-600 hover:bg-green-50"
                    >
                      View Company
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" className="bg-transparent px-8">
            Load More Companies
          </Button>
        </div>
      </main>
    </div>
  );
};

export default page;
