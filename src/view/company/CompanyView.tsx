/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight, LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CompanyCard from "../../components/main/company/CompanyCard";
import CompanyFilter from "../../components/main/company/CompanyFilter";
import Searchbar from "../../components/main/jobs/Searchbar";
import CompanyCardSkeleton from "../../skeleton/company/CompanyCardSkeleton";

const CompanyView = ({ companies }: { companies?: any[] }) => {
  const [visibleCompaniesCount, setVisibleCompaniesCount] = useState(12);
  const [viewType, setViewType] = useState<"grid" | "list">("grid"); // Companies often look better in grid initially
  const companiesPerLoad = 6;

  const handleSearch = (searchData: { search: string; location: string }) => {
    console.log(searchData);
  };

  const hasMoreCompanies = companies
    ? visibleCompaniesCount < companies.length
    : false;

  const loadMoreCompanies = () => {
    setVisibleCompaniesCount((prev) => prev + companiesPerLoad);
  };

  const visibleCompanies = companies?.slice(0, visibleCompaniesCount) || [];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[250px] w-full overflow-hidden bg-slate-900 md:h-[300px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1440&q=40"
            alt="Commercial buildings"
            className="h-full w-full object-cover opacity-30 grayscale"
            width={1440}
            height={300}
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/40 via-slate-900/60 to-slate-900" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            Explore Top Companies
          </h1>

          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-white">Companies</span>
          </nav>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-10 max-w-7xl px-4 pb-20">
        <Searchbar
          onSearch={handleSearch}
          hidePadding
          placeholder={{
            search: "Search by company name...",
            location: "Location",
          }}
        />

        <div className="mt-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          <CompanyFilter />

          <div className="flex items-center gap-1.5 self-center rounded-full border bg-gray-50 p-1 md:self-end dark:bg-slate-900">
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

        <main className="mt-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-foreground text-2xl font-bold">
                Featured Partners
              </h2>
              <p className="text-muted-foreground mt-1 text-sm font-medium">
                Showing {visibleCompanies.length} of {companies?.length || 0}{" "}
                companies
              </p>
            </div>
          </div>

          <InfiniteScroll
            dataLength={visibleCompanies.length}
            next={loadMoreCompanies}
            hasMore={hasMoreCompanies}
            loader={
              <div
                className={
                  viewType === "grid"
                    ? "mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    : "mt-6 flex flex-col gap-5"
                }
              >
                {[...Array(3)].map((_, index) => (
                  <CompanyCardSkeleton key={`loading-${index}`} />
                ))}
              </div>
            }
            scrollThreshold={0.8}
            style={{ overflow: "visible" }}
          >
            <div
              className={
                viewType === "grid"
                  ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "flex flex-col gap-5"
              }
            >
              {companies && companies.length > 0
                ? visibleCompanies.map((company, index) => (
                    <CompanyCard
                      key={company.id || index}
                      company={company}
                      viewType={viewType}
                    />
                  ))
                : [...Array(viewType === "grid" ? 12 : 6)].map((_, index) => (
                    <CompanyCardSkeleton key={index} />
                  ))}
            </div>
          </InfiniteScroll>

          {hasMoreCompanies && (
            <div className="mt-16 border-t border-gray-50 pt-16 text-center dark:border-slate-800">
              <Button
                variant="default"
                size="lg"
                className="shadow-primary/20 transform rounded-full px-12 font-bold shadow-xl transition-all hover:scale-105"
                onClick={loadMoreCompanies}
              >
                Load More Companies
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CompanyView;
