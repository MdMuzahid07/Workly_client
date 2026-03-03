"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, Filter, Search } from "lucide-react";

interface TransactionFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string | null;
  onStatusFilterChange: (value: string | null) => void;
}

export function TransactionFilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: TransactionFilterBarProps) {
  return (
    <div className="bg-card flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 opacity-50" />
        <Input
          placeholder="Search by invoice ID or company..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-muted/30 ring-offset-background focus-visible:ring-primary/20 h-11 rounded-xl border-none pl-11 font-bold focus-visible:ring-4"
        />
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="hover:bg-muted h-11 items-center gap-3 rounded-full border-2 px-6 text-[11px] font-bold tracking-widest uppercase"
            >
              <Filter className="text-primary h-4 w-4" />
              {statusFilter ? statusFilter : "Settlement Status"}
              <ChevronDown className="h-4 w-4 opacity-30" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-52 rounded-xl border p-2 shadow-xl"
          >
            <DropdownMenuItem
              onClick={() => onStatusFilterChange(null)}
              className="cursor-pointer rounded-lg py-2.5 font-bold"
            >
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 border-dashed" />
            {["PAID", "UNPAID", "OVERDUE", "REFUNDED"].map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => onStatusFilterChange(status)}
                className={`cursor-pointer rounded-lg py-2.5 font-bold ${status === "PAID" ? "text-emerald-600" : ""}`}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {(searchTerm || statusFilter) && (
          <Button
            variant="ghost"
            onClick={() => {
              onSearchChange("");
              onStatusFilterChange(null);
            }}
            className="text-muted-foreground hover:text-primary rounded-full text-[10px] font-bold tracking-widest uppercase"
          >
            Clear Search
          </Button>
        )}
      </div>
    </div>
  );
}
