"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
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
        className="flex flex-col items-center gap-0 rounded-xl border border-gray-100 bg-white p-2 shadow-xl sm:flex-row sm:rounded-lg dark:border-slate-800 dark:bg-slate-900/90"
      >
        {/* Job Title Field */}
        <div className="relative w-full flex-[1.5] border-b border-gray-100 sm:border-r sm:border-b-0 dark:border-slate-800">
          <Input
            placeholder={placeholder.search}
            value={searchData.search}
            onChange={(e) =>
              setSearchData((prev) => ({ ...prev, search: e.target.value }))
            }
            className="h-14 border-0 bg-transparent pr-10 text-base focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Search className="text-primary absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 opacity-60" />
        </div>

        {/* Location Field */}
        <div className="relative w-full flex-1 border-b border-gray-100 sm:border-r sm:border-b-0 dark:border-slate-800">
          <Input
            placeholder={placeholder.location}
            value={searchData.location}
            onChange={(e) =>
              setSearchData((prev) => ({ ...prev, location: e.target.value }))
            }
            className="h-14 border-0 bg-transparent pr-10 text-base focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <MapPin className="text-primary absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 opacity-60" />
        </div>

        {/* Category/Sector Field */}
        <div className="relative w-full flex-1 border-b border-gray-100 sm:border-b-0 dark:border-slate-800">
          <Select
            onValueChange={(val) =>
              setSearchData((prev) => ({ ...prev, category: val }))
            }
          >
            <SelectTrigger className="text-muted-foreground h-14 border-0 bg-transparent text-base focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="it">Information Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 h-12 w-full cursor-pointer rounded-lg px-8 text-base font-bold text-white shadow-lg transition-transform active:scale-95 sm:ml-4 sm:w-auto"
        >
          Find Job
        </Button>
      </form>
    </div>
  );
};

export default Searchbar;
