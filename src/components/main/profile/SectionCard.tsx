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
          className="flex cursor-pointer items-center justify-between px-6 py-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <ChevronDown
                className={cn(
                  "text-muted-foreground h-4 w-4 transition-transform",
                  isOpen ? "rotate-180" : "",
                )}
              />
              <h3 className="text-foreground text-lg font-medium">{title}</h3>
            </div>
            {(isCompleted ||
              (completionPercentage && completionPercentage > 0)) && (
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>
                  {isCompleted ? "Completed" : "In Progress"}
                  {completionPercentage ? ` (+${completionPercentage}%)` : ""}
                </span>
              </div>
            )}
            {noData && !isCompleted && (
              <div className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium">
                Not Added
              </div>
            )}
          </div>
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {onAdd && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1.5"
                onClick={onAdd}
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </Button>
            )}
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1.5"
                onClick={onEdit}
              >
                <Edit2 className="h-3.5 w-3.5" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="animate-in slide-in-from-top-2 px-6 pt-0 pb-6 duration-200">
          <div className="border-t pt-4">{children}</div>
        </CardContent>
      )}
    </Card>
  );
};
