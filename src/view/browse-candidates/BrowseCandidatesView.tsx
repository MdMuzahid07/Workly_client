/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight, LayoutGrid, List, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CandidateCard from "../../components/main/candidates/CandidateCard";
import CandidateSidebarFilter from "../../components/main/candidates/filter/CandidateSidebarFilter";
import Searchbar from "../../components/main/jobs/Searchbar";
import Sidebar from "../../components/main/jobs/Sidebar";
import { useGetCandidatesQuery } from "../../redux/feature/candidate/candidateApi";
import CandidateCardSkeleton from "../../skeleton/candidate/CandidateCardSkeleton";

type Filters = {
  search: string;
  location: string;
  experienceRange: [number, number];
  industry: string;
  skills: string[];
};

const DEFAULT_FILTERS: Filters = {
  search: "",
  location: "",
  experienceRange: [0, 30],
  industry: "",
  skills: [],
};

const BrowseCandidatesView = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [allCandidates, setAllCandidates] = useState<any[]>([]);
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  const params = useMemo(() => {
    const p: any = {
      page: currentPage,
      limit: 12,
      sortBy: "fullName",
      sortOrder: "desc",
    };

    if (filters.search) p.search = filters.search;
    if (filters.location) p.location = filters.location;
    if (filters.industry) p.industry = filters.industry;
    if (
      filters.experienceRange &&
      (filters.experienceRange[0] !== 0 || filters.experienceRange[1] !== 30)
    ) {
      p.minExperience = filters.experienceRange[0];
      p.maxExperience = filters.experienceRange[1];
    }
    if (filters.skills.length > 0) p.skills = filters.skills.join(",");

    return p;
  }, [filters, currentPage]);

  const { data, isLoading, error } = useGetCandidatesQuery(params);

  console.log("Candidates Data:", data);

  useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllCandidates(data.data);
      } else {
        setAllCandidates((prev) => [...prev, ...data.data]);
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
    setAllCandidates([]);
  };

  const loadMore = () => {
    if (data?.meta && currentPage < data.meta.pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
    setAllCandidates([]);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[250px] w-full overflow-hidden bg-slate-900 md:h-[300px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1535957998253-26ae1ef29506?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Candidates background"
            className="h-full w-full object-cover opacity-40 grayscale"
            fill
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/40 via-slate-900/60 to-slate-900" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            Discover Top Talent
          </h1>

          <nav className="flex items-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-white">Browse Candidates</span>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto -mt-16 max-w-7xl px-4 pb-20 sm:-mt-10">
        <Searchbar onSearch={handleSearch} hidePadding />

        <div className="mt-8 mb-6 flex items-center justify-between sm:mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-foreground text-xl font-bold tracking-tight">
                {data?.meta?.total || 0} CANDIDATES FOUND
              </h2>
              <p className="text-muted-foreground text-xs font-medium">
                Browse and connect with top industry experts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 rounded-full border bg-gray-50 p-1 sm:gap-1.5 dark:bg-slate-900">
            <Button
              variant={viewType === "list" ? "default" : "ghost"}
              size="icon"
              className="h-7 w-7 rounded-full transition-all sm:h-10 sm:w-10"
              onClick={() => setViewType("list")}
            >
              <List className="h-5 w-5" />
            </Button>
            <Button
              variant={viewType === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-7 w-7 rounded-full transition-all sm:h-10 sm:w-10"
              onClick={() => setViewType("grid")}
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 hidden lg:block">
              {/* <ScrollArea className="dark:bg-foreground h-[calc(100vh-120px)] w-full overflow-hidden rounded-3xl border bg-white shadow-sm"> */}
              <CandidateSidebarFilter
                onFiltersChange={handleFiltersChange}
                className="w-full"
              />
              {/* </ScrollArea> */}
            </div>
            <div className="lg:hidden">
              <Sidebar onFiltersChange={handleFiltersChange} />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 xl:col-span-9">
            <InfiniteScroll
              dataLength={allCandidates.length}
              next={loadMore}
              hasMore={data?.meta ? currentPage < data.meta.pages : false}
              loader={<CandidateCardSkeleton viewType={viewType} />}
              endMessage={
                <p className="text-muted-foreground py-8 text-center font-medium italic">
                  {allCandidates.length > 0
                    ? "You've seen all available candidates"
                    : ""}
                </p>
              }
            >
              <div
                className={
                  viewType === "grid"
                    ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    : "flex flex-col gap-5"
                }
              >
                {isLoading &&
                  currentPage === 1 &&
                  [...Array(viewType === "grid" ? 12 : 6)].map((_, index) => (
                    <CandidateCardSkeleton key={index} viewType={viewType} />
                  ))}

                {error && (
                  <div className="text-destructive py-20 text-center font-bold">
                    Something went wrong, please try again later.
                  </div>
                )}

                {allCandidates.length === 0 && !isLoading && !error && (
                  <div className="bg-card rounded-3xl border border-dashed py-32 text-center font-medium opacity-50">
                    No candidates found matching your criteria.
                  </div>
                )}

                {allCandidates.map((candidate: any) => (
                  <Suspense
                    key={candidate?.id}
                    fallback={<CandidateCardSkeleton viewType={viewType} />}
                  >
                    <CandidateCard candidate={candidate} viewType={viewType} />
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

export default BrowseCandidatesView;
