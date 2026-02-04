/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight, LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery(undefined);

  const params = useMemo(() => {
    const p: any = {
      page: currentPage,
      limit: 12, // Increased limit for grid
      sortBy: "createdAt",
      sortOrder: "desc",
    };

    if (filters.search) p.search = filters.search;
    if (filters.location) p.location = filters.location;
    if (filters.jobType) p.jobType = filters.jobType;
    if (filters.experienceLevel) p.experienceLevel = filters.experienceLevel;
    if (filters.postedWithin) p.postedWithin = filters.postedWithin;
    if (filters.isRemote !== undefined) p.isRemote = filters.isRemote;
    if (filters.skills.length > 0) p.skills = filters.skills.join(",");

    if (filters.categories && filters.categories.length > 0) {
      const industries = filters.categories
        .map((id) => CATEGORY_MAP[id])
        .filter(Boolean);
      if (industries.length > 0) {
        p.industry = industries.join(",");
      }
    }

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
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[250px] w-full overflow-hidden bg-slate-900 md:h-[300px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1440&q=40"
            alt="Office background"
            className="h-full w-full object-cover opacity-40 grayscale"
            fill
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/40 via-slate-900/60 to-slate-900" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            Browse Job Filter List
          </h1>

          <nav className="flex items-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-white">
              Browse Job Filter List
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto -mt-16 max-w-7xl px-4 pb-20 sm:-mt-10">
        <Searchbar onSearch={handleSearch} hidePadding />

        <div className="mt-8">
          <Industries
            onCategorySelect={handleCategorySelect}
            multipleSelect={false}
            categories={categories?.data}
            isLoading={categoriesLoading}
          />
        </div>

        <div className="mt-12 mb-6 flex items-center justify-between">
          <h2 className="text-foreground text-xl font-bold tracking-tight uppercase">
            {data?.meta?.total || 0} JOBS FOUND
          </h2>

          <div className="flex items-center gap-1.5 rounded-full border bg-gray-50 p-1 dark:bg-slate-900">
            <Button
              variant={viewType === "list" ? "default" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-full transition-all sm:h-10 sm:w-10"
              onClick={() => setViewType("list")}
            >
              <List className="h-5 w-5" />
            </Button>
            <Button
              variant={viewType === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-full transition-all sm:h-10 sm:w-10"
              onClick={() => setViewType("grid")}
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar - only show if list view or desktop */}
          <div className="col-span-12 lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 hidden lg:block">
              <ScrollArea className="h-[calc(100vh-120px)] w-full rounded-2xl">
                <SidebarFilter
                  onFiltersChange={handleFiltersChange}
                  className="w-full"
                />
              </ScrollArea>
            </div>
            <div className="lg:hidden">
              <Sidebar onFiltersChange={handleFiltersChange} />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 xl:col-span-9">
            <InfiniteScroll
              dataLength={allJobs.length}
              next={loadMore}
              hasMore={data?.meta ? currentPage < data.meta.pages : false}
              loader={<JobCardSkeleton />}
              endMessage={
                <p className="text-muted-foreground py-8 text-center font-medium italic">
                  {allJobs.length > 0
                    ? "You've reached the end of the list ✨"
                    : ""}
                </p>
              }
            >
              <div
                className={
                  viewType === "grid"
                    ? "grid grid-cols-1 gap-5 md:grid-cols-2"
                    : "flex flex-col gap-5"
                }
              >
                {isLoading &&
                  currentPage === 1 &&
                  [...Array(viewType === "grid" ? 12 : 6)].map((_, index) => (
                    <JobCardSkeleton key={index} />
                  ))}

                {error && (
                  <div className="text-destructive py-20 text-center font-bold">
                    Something went wrong, please try again later.
                  </div>
                )}

                {allJobs.length === 0 && !isLoading && !error && (
                  <div className="py-20 text-center font-medium opacity-50">
                    No jobs found.
                  </div>
                )}

                {allJobs.map((job: any) => (
                  <Suspense key={job?.id} fallback={<JobCardSkeleton />}>
                    <JobCard job={job} viewType={viewType} />
                  </Suspense>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobView;
