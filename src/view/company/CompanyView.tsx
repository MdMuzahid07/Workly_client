"use client";
import { Button } from "@/components/ui/button";
import CompanyCard from "../../components/main/company/CompanyCard";
import CompanyFilter from "../../components/main/company/CompanyFilter";
import Searchbar from "../../components/main/jobs/Searchbar";
import CompanyCardSkeleton from "../../skeleton/company/CompanyCardSkeleton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CompanyView = ({ companies }: { companies?: any[] }) => {
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

      <main className="mx-auto max-w-7xl px-4 py-8 xl:px-0">
        <div className="mb-6">
          <h2 className="text-secondary-foreground mb-2 text-2xl font-bold">
            Companies
          </h2>
          <p className="text-secondary-foreground">
            Discover amazing companies and their open positions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies && companies.length > 0
            ? companies.map((company, index) => (
                <CompanyCard key={index} company={company} />
              ))
            : [...Array(6)].map((_, index) => (
                <CompanyCardSkeleton key={index} />
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
