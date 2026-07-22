'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import CandidateSidebarFilter from './CandidateSidebarFilter';

interface FilterState {
  location: string;
  experienceRange: [number, number];
  industry: string;
  skills: string[];
}

interface MobileFilterDrawerProps {
  onFiltersChange: (filters: FilterState) => void;
}

const CandidateMobileSidebar = ({ onFiltersChange }: MobileFilterDrawerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-border flex h-7.5 cursor-pointer items-center rounded-md bg-white px-2 text-[11px] shadow-xs hover:bg-slate-50 sm:h-8.5 sm:px-2.5 sm:text-xs dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          <Filter className="text-primary mr-1 h-3 w-3 sm:mr-1.5 sm:h-3.5 sm:w-3.5" />
          <span className="font-semibold">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full p-0 sm:max-w-md">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle>Filter Candidates</SheetTitle>
        </SheetHeader>
        <div className="pt-0">
          <ScrollArea className="h-[87dvh]">
            <CandidateSidebarFilter
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

export default CandidateMobileSidebar;
