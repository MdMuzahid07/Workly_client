'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ChevronDown, Filter, Search, X } from 'lucide-react';

interface CategoryFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: 'ACTIVE' | 'INACTIVE' | null;
  onStatusFilterChange: (value: 'ACTIVE' | 'INACTIVE' | null) => void;
}

export function CategoryFilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: CategoryFilterBarProps) {
  return (
    <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search industries or sub-niches..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-muted/50 ring-offset-background focus-visible:ring-primary rounded-full border-none pr-10 pl-10 focus-visible:ring-1"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-primary/20 flex items-center gap-2 rounded-full font-bold"
            >
              <Filter className="h-4 w-4" />
              {statusFilter
                ? statusFilter === 'ACTIVE'
                  ? 'Active Only'
                  : 'Inactive Only'
                : 'Status'}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem onClick={() => onStatusFilterChange(null)} className="cursor-pointer">
              All Availability
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onStatusFilterChange('ACTIVE')}
              className="cursor-pointer text-emerald-600"
            >
              Active Only
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusFilterChange('INACTIVE')}
              className="text-destructive cursor-pointer"
            >
              Inactive Only
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {(searchTerm || statusFilter) && (
          <Button
            variant="ghost"
            onClick={() => {
              onSearchChange('');
              onStatusFilterChange(null);
            }}
            className="text-muted-foreground hover:text-primary rounded-full font-bold"
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
