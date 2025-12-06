/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Industries from "../../components/main/jobs/Industries";
import JobCard from "../../components/main/jobs/JobCard";
import Searchbar from "../../components/main/jobs/Searchbar";
import Sidebar from "../../components/main/jobs/Sidebar";
import SidebarFilter from "../../components/main/jobs/filter/SidebarFilter";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useGetCategoriesQuery } from "../../redux/feature/category/categoryApi";
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
  categories?: number[];
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
  categories: [],
};

const CATEGORY_MAP: Record<number, string> = {
  1: "Software Development",
  2: "Healthcare",
  3: "Finance",
  4: "Marketing",
  5: "Design",
  6: "Sales",
  7: "Education",
  8: "Remote",
};

const JobView = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [allJobs, setAllJobs] = useState<any[]>([]);
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery(undefined);

  const params = useMemo(() => {
    const p: any = {
      page: currentPage,
      limit: 6,
      sortBy: "createdAt",
      sortOrder: "desc",
    };

    // =========== search term ==============>
    if (filters.search) p.search = filters.search;

    // ============== location ============>
    if (filters.location) p.location = filters.location;

    // =========== job type (backend expects: FULL_TIME, PART_TIME, CONTRACT, etc.) ==========>
    if (filters.jobType) p.jobType = filters.jobType;

    // ===== experience level ===============>
    if (filters.experienceLevel) p.experienceLevel = filters.experienceLevel;

    // ======================== posted within (backend expects: 24h, 3d, 1w, 1m) =============>
    if (filters.postedWithin) p.postedWithin = filters.postedWithin;

    // ============= remote filter =========>
    if (filters.isRemote !== undefined) p.isRemote = filters.isRemote;

    // ================= skills (send as comma-separated or array) ========>
    if (filters.skills.length > 0) p.skills = filters.skills.join(",");

    // ========== convert category IDs to industry names ===========>
    if (filters.categories && filters.categories.length > 0) {
      const industries = filters.categories
        .map((id) => CATEGORY_MAP[id])
        .filter(Boolean);
      if (industries.length > 0) {
        p.industry = industries.join(",");
      }
    }

    // ================= salary range (only if changed from default) =================>
    if (filters.budgetRange[0] > 0) p.salaryMin = filters.budgetRange[0];
    if (filters.budgetRange[1] < 10000) p.salaryMax = filters.budgetRange[1];

    return p;
  }, [filters, currentPage]);

  const { data, isLoading, error } = useGetJobsQuery(params);

  useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllJobs(data.data);
      } else {
        setAllJobs((prev) => [...prev, ...data.data]);
      }
    }
  }, [data, currentPage]);

  const handleSearch = (searchData: { search: string; location: string }) => {
    setFilters((prev) => ({
      ...prev,
      search: searchData.search,
      location: searchData.location,
    }));
    setCurrentPage(1);
    setAllJobs([]);
  };

  const loadMore = () => {
    if (data?.meta && currentPage < data.meta.pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setAllJobs([]);
  };

  const handleCategorySelect = (selectedCategoryIds: number[]) => {
    setFilters((prev) => ({
      ...prev,
      categories: selectedCategoryIds,
    }));
    setCurrentPage(1);
    setAllJobs([]);
  };

  return (
    <div className="bg-primary/2 pb-12">
      <Searchbar onSearch={handleSearch} />
      <Industries
        onCategorySelect={handleCategorySelect}
        multipleSelect={false}
        categories={categories?.data}
        isLoading={categoriesLoading}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 pt-5 xl:px-0">
        <div className="col-span-12 md:col-span-4">
          <div className="sticky top-24 hidden md:flex">
            <ScrollArea className="h-[87dvh] w-full rounded-2xl">
              {
                <SidebarFilter
                  onFiltersChange={handleFiltersChange}
                  className="w-full"
                />
              }
            </ScrollArea>
          </div>
          <div className="flex md:hidden">
            {<Sidebar onFiltersChange={handleFiltersChange} />}
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <InfiniteScroll
            dataLength={allJobs.length}
            next={loadMore}
            hasMore={data?.meta ? currentPage < data.meta.pages : false}
            loader={<JobCardSkeleton />}
            endMessage={
              <p className="text-muted-foreground py-4 text-center">
                {allJobs.length > 0 ? "No more jobs to load" : ""}
              </p>
            }
          >
            <div className="flex flex-col md:gap-4">
              {isLoading &&
                currentPage === 1 &&
                [...Array(6)].map((_, index) => (
                  <JobCardSkeleton key={index} />
                ))}

              {error && (
                <div className="text-destructive text-center">
                  Something went wrong, please try again later.
                </div>
              )}

              {allJobs.length === 0 && !isLoading && (
                <div className="text-center">No jobs found.</div>
              )}

              {allJobs.map((job: any) => (
                <Suspense key={job?.id} fallback={<JobCardSkeleton />}>
                  <JobCard key={job?.id} job={job} />
                </Suspense>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default JobView;
