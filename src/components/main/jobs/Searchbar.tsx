"use client";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const Searchbar = () => {
  const [searchData, setSearchData] = useState({ search: "", location: "" });

  return (
    <div className="mx-auto w-full max-w-2xl p-4 md:mt-24">
      <form className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm sm:flex-row sm:rounded-full">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Job title or company"
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
            placeholder="City"
            value={searchData.location}
            onChange={(e) =>
              setSearchData((prev) => ({ ...prev, location: e.target.value }))
            }
            className="border-0 bg-transparent pl-10 focus:ring-0"
          />
        </div>
        <Button
          size="sm"
          className="h-10 cursor-pointer rounded-full bg-green-400 px-6 text-lg font-semibold hover:bg-green-500"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default Searchbar;
