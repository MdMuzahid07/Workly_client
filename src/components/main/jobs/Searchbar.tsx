"use client";
import { MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

interface searchbarProps {
  onSearch: (searchData: {
    search: string;
    location: string;
    category?: string;
  }) => void;
  initialSearch?: string;
  initialLocation?: string;
  hidePadding?: boolean;
  buttonLabel?: string;
  placeholder?: {
    search?: string;
    location?: string;
  };
}

const Searchbar = ({
  onSearch,
  initialSearch,
  initialLocation,
  hidePadding = false,
  buttonLabel = "Find Job",
  placeholder = {
    search: "Job Title, Keywords, or Phrase",
    location: "City, State or ZIP",
  },
}: searchbarProps) => {
  const [searchData, setSearchData] = useState({
    search: initialSearch || "",
    location: initialLocation || "",
    category: "",
  });

  useEffect(() => {
    setSearchData((prev) => ({
      ...prev,
      search: initialSearch || "",
      location: initialLocation || "",
    }));
  }, [initialSearch, initialLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchData);
  };

  return (
    <div
      className={`mx-auto w-full max-w-5xl ${hidePadding ? "pt-0" : "pt-4 md:pt-24"}`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2 rounded-2xl border bg-white p-2 shadow-md md:flex-row md:gap-0 md:rounded-full dark:border-slate-800 dark:bg-slate-900/90"
      >
        {/* Job Title Field */}
        <div className="md:border-border relative w-full flex-[1.5] md:border-r dark:md:border-slate-800">
          <Input
            placeholder={placeholder.search}
            value={searchData.search}
            onChange={(e) =>
              setSearchData((prev) => ({ ...prev, search: e.target.value }))
            }
            className="h-14 rounded-xl border-0 bg-transparent pr-4 pl-12 text-sm focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 md:rounded-l-full md:rounded-r-none md:text-base"
          />
          <Search className="text-primary absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 opacity-60" />
        </div>

        <div className="bg-border/60 my-0.5 block h-px w-full md:hidden dark:bg-slate-800" />

        {/* Location Field */}
        <div className="relative w-full flex-1">
          <Input
            placeholder={placeholder.location}
            value={searchData.location}
            onChange={(e) =>
              setSearchData((prev) => ({ ...prev, location: e.target.value }))
            }
            className="h-14 rounded-xl border-0 bg-transparent pr-4 pl-12 text-sm focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 md:rounded-none md:text-base"
          />
          <MapPin className="text-primary absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 opacity-60" />
        </div>

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/95 h-14 w-full cursor-pointer rounded-xl px-8 text-sm font-bold text-white transition-transform active:scale-95 md:ml-4 md:w-auto md:rounded-full md:text-base"
        >
          {buttonLabel}
        </Button>
      </form>
    </div>
  );
};

export default Searchbar;
