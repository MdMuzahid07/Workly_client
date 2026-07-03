import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, ChevronDown, Edit2, Plus } from "lucide-react";
import { useState } from "react";

interface SectionCardProps {
  title: string;
  isCompleted?: boolean;
  completionPercentage?: number; // e.g., 20
  onEdit?: () => void;
  onAdd?: () => void;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  noData?: boolean;
}

export const SectionCard = ({
  title,
  isCompleted = false,
  completionPercentage,
  onEdit,
  onAdd,
  children,
  className,
  defaultOpen = true,
  noData = false,
}: SectionCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className={cn("bg-card border transition-all", className)}>
      <CardHeader className="p-0">
        <div
          className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3.5 sm:px-6 sm:py-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-1 flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ChevronDown
                className={cn(
                  "text-muted-foreground h-4 w-4 transition-transform",
                  isOpen ? "rotate-180" : "",
                )}
              />
              <h3 className="text-foreground text-sm font-semibold sm:text-base md:text-lg">
                {title}
              </h3>
            </div>
            {(isCompleted ||
              (completionPercentage && completionPercentage > 0)) && (
              <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600 sm:gap-1.5 sm:px-2.5 sm:text-xs dark:bg-emerald-950/30 dark:text-emerald-400">
                <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>
                  {isCompleted ? "Completed" : "In Progress"}
                  {completionPercentage ? ` (+${completionPercentage}%)` : ""}
                </span>
              </div>
            )}
            {noData && !isCompleted && (
              <div className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:text-xs">
                Not Added
              </div>
            )}
          </div>
          <div
            className="flex items-center gap-1.5 sm:gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {onAdd && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2.5 text-xs sm:h-8 sm:gap-1.5 sm:px-3"
                onClick={onAdd}
              >
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            )}
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2.5 text-xs sm:h-8 sm:gap-1.5 sm:px-3"
                onClick={onEdit}
              >
                <Edit2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="animate-in slide-in-from-top-2 px-4 pt-0 pb-4 duration-200 sm:px-6 sm:pb-6">
          <div className="border-t pt-3 sm:pt-4">{children}</div>
        </CardContent>
      )}
    </Card>
  );
};
