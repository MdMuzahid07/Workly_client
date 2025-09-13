"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useState } from "react";
import SidebarFilter from "./SidebarFilter";

interface FilterState {
  search: string;
  location: string;
  budgetRange: [number, number];
  jobType: string;
  experienceLevel: string;
  skills: string[];
  postedWithin: string;
}

interface MobileFilterDrawerProps {
  onFiltersChange: (filters: FilterState) => void;
}

const Sidebar = ({ onFiltersChange }: MobileFilterDrawerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-transparent md:hidden">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle>Filter Jobs</SheetTitle>
        </SheetHeader>
        <div className="p-6 pt-0">
          <SidebarFilter
            onFiltersChange={(filters) => {
              onFiltersChange(filters);
              setOpen(false);
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
