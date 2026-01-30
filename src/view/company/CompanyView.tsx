"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CompanyCard from "../../components/main/company/CompanyCard";
import CompanyFilter from "../../components/main/company/CompanyFilter";
import Searchbar from "../../components/main/jobs/Searchbar";
import CompanyCardSkeleton from "../../skeleton/company/CompanyCardSkeleton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CompanyView = ({ companies }: { companies?: any[] }) => {
  const [visibleCompaniesCount, setVisibleCompaniesCount] = useState(9);
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
    <div className="bg-primary/2 min-h-screen">
      <Searchbar
        onSearch={handleSearch}
        placeholder={{ search: "Company name", location: "Location" }}
      />

      <CompanyFilter />

      <main className="mx-auto max-w-7xl px-4 py-8 xl:px-0">
        <div className="mb-6">
          <h2 className="text-secondary-foreground mb-2 text-2xl font-bold">
            Companies
          </h2>
          <p className="text-secondary-foreground">
            Discover amazing companies and their open positions
          </p>
        </div>

        <InfiniteScroll
          dataLength={visibleCompanies.length}
          next={loadMoreCompanies}
          hasMore={hasMoreCompanies}
          loader={
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <CompanyCardSkeleton key={`loading-${index}`} />
              ))}
            </div>
          }
          scrollThreshold={0.8}
          style={{ overflow: "visible" }}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companies && companies.length > 0
              ? visibleCompanies.map((company, index) => (
                  <CompanyCard key={company.id || index} company={company} />
                ))
              : [...Array(6)].map((_, index) => (
                  <CompanyCardSkeleton key={index} />
                ))}
          </div>
        </InfiniteScroll>

        <div className="mt-12 text-center">
          <Button variant="outline" className="px-8">
            Load More Companies
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CompanyView;
