"use client";
import { Button } from "@/components/ui/button";
import CompanyCard from "../../components/main/company/CompanyCard";
import CompanyFilter from "../../components/main/company/CompanyFilter";
import Searchbar from "../../components/main/jobs/Searchbar";

//fake data
const companies = [
  {
    id: 1,
    name: "TechFlow Inc.",
    industry: "Technology",
    logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
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
    industry: "Data Analytics",
    logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
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
    industry: "SaaS",
    logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
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
    industry: "Design",
    logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
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
    industry: "Cloud Services",
    logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
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
    industry: "Marketing",
    logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
    size: "100-200 employees",
    location: "Los Angeles, CA",
    description:
      "Digital marketing agency helping brands grow through data-driven strategies.",
    openJobs: 7,
    website: "growthco.com",
    founded: "2017",
    featured: false,
  },
  {
    id: 11,
    name: "TechFlow Inc.",
    industry: "Technology",
    logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
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
    id: 21,
    name: "DataVision Labs",
    industry: "Data Analytics",
    logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
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
    id: 13,
    name: "InnovateCorp",
    industry: "SaaS",
    logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
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
    id: 14,
    name: "DesignStudio Pro",
    industry: "Design",
    logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
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
    id: 51,
    name: "CloudTech Solutions",
    industry: "Cloud Services",
    logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
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
    id: 62,
    name: "GrowthCo",
    industry: "Marketing",
    logo: "https://mdmuzahid.vercel.app/assets/logo-DuOSblLl.png",
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

const CompanyView = () => {
  const handleSearch = (searchData: { search: string; location: string }) => {
    console.log(searchData);
  };

  return (
    <div className="bg-primary/2 min-h-screen">
      <Searchbar
        onSearch={handleSearch}
        placeholder={{ search: "Company name", location: "Location" }}
      />
      <CompanyFilter />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 xl:px-0">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Companies</h2>
          <p className="text-gray-600">
            Discover amazing companies and their open positions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company, index) => (
            <CompanyCard key={index} company={company} />
            // <CompanyCardSkeleton key={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="cursor-pointer bg-transparent px-8"
          >
            Load More Companies
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CompanyView;
