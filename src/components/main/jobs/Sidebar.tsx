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
import { ScrollArea } from "../../ui/scroll-area";
import SidebarFilter from "./filter/SidebarFilter";

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
        <Button
          variant="outline"
          size="sm"
          className="border-border flex h-8.5 cursor-pointer items-center rounded-lg bg-white px-2.5 shadow-xs hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          <Filter className="text-primary mr-1.5 h-3.5 w-3.5" />
          <span className="text-xs font-semibold">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full p-0 sm:max-w-md">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle>Filter Jobs</SheetTitle>
        </SheetHeader>
        <div className="pt-0">
          <ScrollArea className="h-[87dvh]">
            <SidebarFilter
              onFiltersChange={(filters) => {
                onFiltersChange(filters);
                setOpen(false);
              }}
            />
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
