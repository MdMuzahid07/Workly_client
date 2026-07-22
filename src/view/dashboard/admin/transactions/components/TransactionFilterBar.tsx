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

interface TransactionFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string | null;
  onStatusFilterChange: (value: string | null) => void;
}

const STATUS_OPTIONS = [
  {
    value: 'PAID',
    label: 'Paid',
    description: 'Successfully completed',
    dot: 'bg-emerald-500',
    text: 'text-emerald-600',
  },
  {
    value: 'OVERDUE',
    label: 'Overdue',
    description: 'Under manual review',
    dot: 'bg-rose-500',
    text: 'text-rose-600',
  },
  {
    value: 'ABANDONED',
    label: 'Abandoned',
    description: 'Checkout opened, not paid',
    dot: 'bg-violet-500',
    text: 'text-violet-600',
  },
  {
    value: 'CANCELLED',
    label: 'Cancelled',
    description: 'Payment cancelled by user',
    dot: 'bg-slate-400',
    text: 'text-slate-500',
  },
  {
    value: 'REFUNDED',
    label: 'Refunded',
    description: 'Gateway returned failure',
    dot: 'bg-slate-400',
    text: 'text-slate-500',
  },
] as const;

export function TransactionFilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: TransactionFilterBarProps) {
  const activeOption = STATUS_OPTIONS.find((s) => s.value === statusFilter);

  return (
    <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search by invoice ID or company..."
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
              {activeOption ? (
                <span className="flex items-center gap-1.5">
                  <span className={`inline-block h-2 w-2 rounded-full ${activeOption.dot}`} />
                  {activeOption.label}
                </span>
              ) : (
                'Settlement Status'
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 rounded-xl border p-2 shadow-xl">
            <DropdownMenuItem
              onClick={() => onStatusFilterChange(null)}
              className="cursor-pointer rounded-lg py-2.5 font-bold"
            >
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 border-dashed" />
            {STATUS_OPTIONS.map((s) => (
              <DropdownMenuItem
                key={s.value}
                onClick={() => onStatusFilterChange(s.value)}
                className="cursor-pointer rounded-lg py-2 font-bold"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
                  <div>
                    <p className={`text-sm leading-none font-bold ${s.text}`}>{s.label}</p>
                    <p className="text-muted-foreground mt-0.5 text-[10px] font-medium">
                      {s.description}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
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
