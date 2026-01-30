"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { PaginationMeta } from "@/types/pagination";

interface PaginationControlsProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  className?: string;
  compact?: boolean;
}

const PaginationBar = ({
  meta,
  onPageChange,
  className,
  compact = false,
}: PaginationControlsProps) => {
  const { page, pages, total, limit } = meta;

  if (pages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pages && newPage !== page) {
      onPageChange(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    if (pages <= 7) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }

    const items: (number | string)[] = [];

    if (page <= 3) {
      items.push(1, 2, 3, 4, "...", pages);
    } else if (page >= pages - 2) {
      items.push(1, "...", pages - 3, pages - 2, pages - 1, pages);
    } else {
      items.push(1, "...", page - 1, page, page + 1, "...", pages);
    }

    return items;
  };

  const pageNumbers = getPageNumbers();

  if (compact) {
    return (
      <div
        className={cn(
          "flex w-full items-center justify-between gap-4",
          className,
        )}
      >
        <div className="text-muted-foreground text-sm">
          Page <span className="font-semibold">{page}</span> of{" "}
          <span className="font-semibold">{pages}</span>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
                className={cn(
                  "cursor-pointer",
                  page <= 1 && "pointer-events-none opacity-50",
                )}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                className={cn(
                  "cursor-pointer",
                  page >= pages && "pointer-events-none opacity-50",
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-between gap-4 sm:flex-row",
        className,
      )}
    >
      <div className="text-muted-foreground text-sm">
        Showing{" "}
        <span className="font-semibold">
          {Math.min((page - 1) * limit + 1, total)}
        </span>{" "}
        to{" "}
        <span className="font-semibold">{Math.min(page * limit, total)}</span>{" "}
        of <span className="font-semibold">{total}</span> results
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(page - 1)}
              className={cn(
                "cursor-pointer",
                page <= 1 && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>

          {pageNumbers.map((pageNum, idx) => (
            <PaginationItem key={idx} className="hidden sm:inline-flex">
              {pageNum === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => handlePageChange(pageNum as number)}
                  isActive={page === pageNum}
                  className="cursor-pointer"
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              className={cn(
                "cursor-pointer",
                page >= pages && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationBar;
