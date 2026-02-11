"use client";

import DashboardCompanyJobsHeader from "@/components/dashboard/dashboard-nav/header/DashboardCompanyJobsHeader";
import JobFiltersAndSearch from "@/components/dashboard/job/JobFiltersAndSearch";
import JobManagementTabs from "@/components/dashboard/job/JobManagementTabs";
import JobStatusCards from "@/components/dashboard/job/JobStatusCards";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  applications: number;
  status: "active" | "closed" | "draft";
  postedDate: string;
  isRemote: boolean;
  isFeatured: boolean;
}

const DashboardJobManagementView = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const [jobs] = useState<Job[]>([
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechFlow Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "Senior",
      salary: "$130,000 - $150,000",
      applications: 42,
      status: "active",
      postedDate: "2 days ago",
      isRemote: false,
      isFeatured: true,
    },
    {
      id: "2",
      title: "Backend Engineer",
      company: "TechFlow Inc.",
      location: "Remote",
      type: "Full-time",
      experience: "Mid-level",
      salary: "$100,000 - $130,000",
      applications: 18,
      status: "active",
      postedDate: "1 week ago",
      isRemote: true,
      isFeatured: false,
    },
    {
      id: "3",
      title: "Product Manager",
      company: "TechFlow Inc.",
      location: "New York, NY",
      type: "Full-time",
      experience: "Senior",
      salary: "$130,000 - $160,000",
      applications: 31,
      status: "active",
      postedDate: "2 weeks ago",
      isRemote: false,
      isFeatured: true,
    },
    {
      id: "4",
      title: "UX Designer",
      company: "TechFlow Inc.",
      location: "Austin, TX",
      type: "Full-time",
      experience: "Mid-level",
      salary: "$85,000 - $110,000",
      applications: 27,
      status: "closed",
      postedDate: "3 weeks ago",
      isRemote: false,
      isFeatured: false,
    },
    {
      id: "5",
      title: "DevOps Engineer",
      company: "TechFlow Inc.",
      location: "Remote",
      type: "Full-time",
      experience: "Senior",
      salary: "$115,000 - $145,000",
      applications: 15,
      status: "active",
      postedDate: "5 days ago",
      isRemote: true,
      isFeatured: false,
    },
    {
      id: "6",
      title: "Data Scientist",
      company: "TechFlow Inc.",
      location: "Boston, MA",
      type: "Full-time",
      experience: "Senior",
      salary: "$140,000 - $170,000",
      applications: 0,
      status: "draft",
      postedDate: "Not published",
      isRemote: false,
      isFeatured: false,
    },
    {
      id: "7",
      title: "Mobile Developer",
      company: "TechFlow Inc.",
      location: "Remote",
      type: "Full-time",
      experience: "Mid-level",
      salary: "$95,000 - $125,000",
      applications: 0,
      status: "draft",
      postedDate: "Not published",
      isRemote: true,
      isFeatured: false,
    },
  ]);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.experience.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === "all" || job.type === selectedType;

    const matchesExperience =
      selectedExperience === "all" || job.experience === selectedExperience;

    const matchesLocation =
      selectedLocation === "all" ||
      (selectedLocation === "remote" && job.isRemote) ||
      (selectedLocation === "onsite" && !job.isRemote) ||
      (selectedLocation === "hybrid" && job.location.includes("Hybrid"));

    return matchesSearch && matchesType && matchesExperience && matchesLocation;
  });

  return (
    <div className="min-h-screen pt-16">
      <DashboardCompanyJobsHeader
        onClose={() => setIsCreateModalOpen(false)}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        <JobStatusCards jobs={jobs} />

        <Card className="bg-card rounded-xl border">
          <div className="border-border border-b p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-foreground text-lg font-bold tracking-tight sm:text-xl">
                All Job Postings
              </h2>
              <p className="text-muted-foreground text-sm font-medium opacity-80">
                Manage and track your job listings
              </p>
            </div>
          </div>

          <div className="p-6">
            <JobFiltersAndSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedExperience={selectedExperience}
              setSelectedExperience={setSelectedExperience}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />

            <JobManagementTabs
              jobs={jobs}
              filteredJobs={filteredJobs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardJobManagementView;
