"use client";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const Searchbar = () => {
  const [searchData, setSearchData] = useState({ search: "", location: "" });

  return (
    <div className="mx-auto w-full max-w-2xl p-4 md:pt-24">
      <form className="border-border bg-card flex flex-col gap-2 rounded-2xl border p-2 shadow-sm sm:flex-row sm:rounded-full">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Job title or company"
            value={searchData.search}
            onChange={(e) =>
              setSearchData((prev) => ({ ...prev, search: e.target.value }))
            }
            className="border-0 bg-transparent pl-10 focus:ring-0 focus:outline-0"
          />
        </div>
        <div className="bg-border w-px" />
        <div className="relative flex-1">
          <MapPin className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
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
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 cursor-pointer rounded-full px-6 text-lg font-semibold"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default Searchbar;
