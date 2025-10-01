/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Suspense, useMemo, useState } from "react";
import Industries from "../../components/main/jobs/Industries";
import JobCard from "../../components/main/jobs/JobCard";
import Searchbar from "../../components/main/jobs/Searchbar";
import Sidebar from "../../components/main/jobs/Sidebar";
import SidebarFilter from "../../components/main/jobs/filter/SidebarFilter";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useGetJobsQuery } from "../../redux/feature/job/jobApi";
import JobCardSkeleton from "../../skeleton/job/JobCardSkeleton";

type Filters = {
  search: string;
  location: string;
  budgetRange: [number, number];
  jobType: string;
  experienceLevel: string;
  skills: string[];
  postedWithin: string;
  isRemote?: boolean;
};

const DEFAULT_FILTERS: Filters = {
  search: "",
  location: "",
  budgetRange: [0, 10000],
  jobType: "",
  experienceLevel: "",
  skills: [],
  postedWithin: "",
  isRemote: undefined,
};

const JobView = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const params = useMemo(() => {
    const p: any = {
      page: 1,
      limit: 12,
      sortBy: "createdAt",
      sortOrder: "desc",
      isActive: true,
    };

    if (filters.search) p.q = filters.search;
    if (filters.location) p.location = filters.location;
    if (filters.jobType) p.jobType = filters.jobType;
    if (filters.experienceLevel) p.experienceLevel = filters.experienceLevel;
    if (filters.postedWithin) p.postedWithin = filters.postedWithin;
    if (filters.isRemote !== undefined) p.isRemote = filters.isRemote;
    if (filters.skills.length > 0) p.skills = filters.skills;

    // Only include budget if changed from default
    if (filters.budgetRange[0] > 0) p.salaryMin = filters.budgetRange[0];
    if (filters.budgetRange[1] < 10000) p.salaryMax = filters.budgetRange[1];

    return p;
  }, [filters]);

  const { data, isLoading, error } = useGetJobsQuery(params);

  const handleSearch = (searchData: { search: string; location: string }) => {
    setFilters((prev) => ({
      ...prev,
      search: searchData.search,
      location: searchData.location,
    }));
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="bg-primary/2 pb-12">
      <Searchbar onSearch={handleSearch} />
      <Industries />
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 pt-5 xl:px-0">
        <div className="col-span-12 md:col-span-4">
          <div className="sticky top-24 hidden md:flex">
            <ScrollArea className="h-[87dvh] w-full rounded-2xl">
              {
                //@ts-ignore
                <SidebarFilter
                  onFiltersChange={handleFiltersChange}
                  className="w-full"
                />
              }
            </ScrollArea>
          </div>
          <div className="flex md:hidden">
            {
              //@ts-ignore
              <Sidebar onFiltersChange={handleFiltersChange} />
            }
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="flex flex-col md:gap-4">
            {isLoading &&
              [...Array(6)].map((_, index) => <JobCardSkeleton key={index} />)}

            {error && (
              <div className="text-destructive text-center">
                Something went wrong, please try again later.
              </div>
            )}
            {data && data?.data?.length === 0 && (
              <div className="text-center">No jobs found.</div>
            )}
            {data &&
              data?.data?.map((job: any) => (
                //@ts-ignore
                <Suspense key={job?.id} fallback={<JobCardSkeleton />}>
                  <JobCard key={job?.id} job={job} />
                </Suspense>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobView;
