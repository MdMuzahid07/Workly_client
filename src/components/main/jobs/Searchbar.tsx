"use client";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

interface searchbarProps {
  onSearch: (searchData: { search: string; location: string }) => void;
  initialSearch?: string;
  initialLocation?: string;
  placeholder?: {
    search?: string;
    location?: string;
  };
}

const Searchbar = ({
  onSearch,
  initialSearch,
  initialLocation,
  placeholder = {
    search: "Job title or company",
    location: "Location",
  },
}: searchbarProps) => {
  const [searchData, setSearchData] = useState({
    search: initialSearch || "",
    location: initialLocation || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchData);
  };

  return (
    <div className="mx-auto w-full max-w-2xl p-4 md:pt-24">
      <form
        onSubmit={handleSubmit}
        className="bg-card flex flex-col gap-2 rounded-2xl border border-gray-200 p-2 shadow-sm sm:flex-row sm:rounded-full"
      >
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={placeholder.search}
            value={searchData.search}
            onChange={(e) =>
              setSearchData((prev) => ({ ...prev, search: e.target.value }))
            }
            className="border-0 bg-transparent pl-10 focus:ring-0 focus:outline-0"
          />
        </div>
        <div className="w-px bg-gray-200" />
        <div className="relative flex-1">
          <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={placeholder.location}
            value={searchData.location}
            onChange={(e) =>
              setSearchData((prev) => ({ ...prev, location: e.target.value }))
            }
            className="border-0 bg-transparent pl-10 focus:ring-0"
          />
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/100 h-10 cursor-pointer rounded-full px-6 text-lg font-semibold"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default Searchbar;
