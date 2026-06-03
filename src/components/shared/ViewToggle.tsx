"use client";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  viewType: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  className?: string;
}

const ViewToggle = ({
  viewType,
  onViewChange,
  className = "",
}: ViewToggleProps) => {
  return (
    <div
      className={`border-primary/10 flex items-center gap-1 rounded-full border bg-gray-50 p-1 select-none dark:border-slate-800 dark:bg-slate-900/60 ${className}`}
    >
      <Button
        variant={viewType === "list" ? "default" : "ghost"}
        size="icon"
        className="h-6 w-6 cursor-pointer rounded-full transition-all duration-300 active:scale-95"
        onClick={() => onViewChange("list")}
      >
        <List className="h-2 w-2" />
      </Button>
      <Button
        variant={viewType === "grid" ? "default" : "ghost"}
        size="icon"
        className="h-6 w-6 cursor-pointer rounded-full transition-all duration-300 active:scale-95"
        onClick={() => onViewChange("grid")}
      >
        <LayoutGrid className="h-2 w-2" />
      </Button>
    </div>
  );
};

export default ViewToggle;
