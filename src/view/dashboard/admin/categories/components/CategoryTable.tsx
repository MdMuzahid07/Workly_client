/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Award,
  Briefcase,
  Edit,
  LayoutGrid,
  MoreVertical,
  Plus,
  Power,
  PowerOff,
  Search,
  Tag,
  Trash2,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  active: boolean;
  subcategories: string[];
  taxonomySkills?: { id: string; name: string; active: boolean }[];
  totalJobs: number;
  totalApplications: number;
}

interface CategoryTableProps {
  categories: Category[];
  isLoading?: boolean;
  onAddSubcategory: (cat: Category) => void;
  onAddSkill: (cat: Category) => void;
  onEdit: (cat: Category) => void;
  hasActiveFilters?: boolean;
}

import * as LucideIcons from "lucide-react";

const getIcon = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[iconName];
  if (IconComponent) {
    return <IconComponent className="h-4 w-4" />;
  }
  return <Tag className="h-4 w-4" />;
};

import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteCategoryMutation,
  useToggleCategoryStatusMutation,
} from "@/redux/feature/category/categoryApi";
import { toast } from "sonner";

export function CategoryTable({
  categories,
  isLoading,
  onAddSubcategory,
  onAddSkill,
  onEdit,
  hasActiveFilters,
}: CategoryTableProps) {
  const [toggleStatus] = useToggleCategoryStatusMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [viewDialog, setViewDialog] = useState<{
    open: boolean;
    title: string;
    items: string[];
    type: "sub" | "skill";
  }>({
    open: false,
    title: "",
    items: [],
    type: "sub",
  });
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const renderItemsWithTooltip = (
    items: string[],
    type: "sub" | "skill",
    cat: Category,
  ) => {
    const maxVisible = 2;
    const visibleItems = items.slice(0, maxVisible);
    const remainingItems = items.slice(maxVisible);
    const onAdd =
      type === "sub" ? () => onAddSubcategory(cat) : () => onAddSkill(cat);
    const title = type === "sub" ? "Add Subcategory" : "Add Skill";

    return (
      <TooltipProvider>
        <div className="flex max-w-[280px] flex-wrap items-center gap-1.5">
          {visibleItems.map((item, i) => (
            <Badge
              key={i}
              variant="secondary"
              className={cn(
                "border-none px-2 py-0.5 text-[10px] font-bold whitespace-nowrap transition-colors",
                type === "skill"
                  ? "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground",
              )}
            >
              {item}
            </Badge>
          ))}
          {remainingItems.length > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className="bg-muted/35 hover:bg-muted/60 border-muted-foreground/35 text-muted-foreground cursor-pointer border-dashed px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap transition-all"
                  onClick={() =>
                    setViewDialog({
                      open: true,
                      title: `${cat.name} — ${type === "sub" ? "Sub-categories" : "Skills"}`,
                      items: items,
                      type: type,
                    })
                  }
                >
                  +{remainingItems.length} more
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="bg-popover text-popover-foreground border-border z-50 max-w-[280px] rounded-xl border p-2.5 shadow-xl">
                <div className="space-y-1.5">
                  <p className="text-muted-foreground/85 text-[9px] font-bold tracking-wider uppercase">
                    {type === "sub" ? "Sub-categories" : "Skills"} (
                    {items.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {remainingItems.map((item, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className={cn(
                          "border-none px-2 py-0.5 text-[10px] font-bold",
                          type === "skill"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted/60 text-muted-foreground",
                        )}
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
          <button
            className="bg-primary shadow-primary/20 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-lg text-white shadow-lg transition-transform hover:scale-110"
            onClick={onAdd}
            title={title}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={4} />
          </button>
        </div>
      </TooltipProvider>
    );
  };

  const handleToggleStatus = async (id: string, name: string) => {
    try {
      await toggleStatus(id).unwrap();
      toast.success(`Category ${name} status toggled`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to toggle status");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success(`Category ${name} deleted successfully`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };
  return (
    <div className="bg-card overflow-hidden rounded-xl border">
      <div className="overflow-x-auto">
        <Table className="min-w-[950px]">
          <TableHeader className="bg-muted/40 border-b-2">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-12 w-[250px] text-[10px] font-bold tracking-widest uppercase opacity-70">
                Industry Name
              </TableHead>
              <TableHead className="h-12 text-[10px] font-bold tracking-widest uppercase opacity-70">
                Sub-Categories
              </TableHead>
              <TableHead className="h-12 text-[10px] font-bold tracking-widest uppercase opacity-70">
                Skills
              </TableHead>
              <TableHead className="h-12 text-[10px] font-bold tracking-widest uppercase opacity-70">
                Job Count
              </TableHead>
              <TableHead className="h-12 text-[10px] font-bold tracking-widest uppercase opacity-70">
                Status
              </TableHead>
              <TableHead className="h-12 pr-8 text-right text-[10px] font-bold tracking-widest uppercase opacity-70">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j} className="py-5">
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : categories.map((cat) => (
                  <TableRow
                    key={cat.id}
                    className="group hover:bg-muted/20 border-b transition-all last:border-0"
                  >
                    <TableCell className="py-5">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/5 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors">
                          {getIcon(cat.icon)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-bold">{cat.name}</p>
                          <p className="text-muted-foreground text-[10px] font-medium opacity-70">
                            /{cat.slug}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {renderItemsWithTooltip(cat.subcategories, "sub", cat)}
                    </TableCell>
                    <TableCell>
                      {renderItemsWithTooltip(
                        (cat.taxonomySkills || []).map((s) => s.name),
                        "skill",
                        cat,
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">
                          {cat.totalJobs}
                        </span>
                        <Briefcase className="text-muted-foreground h-3 w-3 opacity-40" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`rounded-full border px-3 py-0.5 text-[9px] font-bold tracking-widest uppercase ${
                          cat.active
                            ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                            : "bg-muted text-muted-foreground border-transparent opacity-70"
                        }`}
                        variant="outline"
                      >
                        {cat.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="hover:text-primary h-8 w-8 rounded-lg"
                          onClick={() => onEdit(cat)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="hover:bg-muted h-8 w-8 rounded-lg"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-52 rounded-xl border p-2 shadow-lg"
                          >
                            <DropdownMenuLabel className="px-3 pb-2 text-[10px] font-bold tracking-widest uppercase opacity-50">
                              Taxonomy Control
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                              className="cursor-pointer rounded-lg py-2 font-bold"
                              onClick={() =>
                                handleToggleStatus(cat.id, cat.name)
                              }
                            >
                              {cat.active ? (
                                <>
                                  <PowerOff className="text-destructive mr-2 h-4 w-4" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Power className="mr-2 h-4 w-4 text-emerald-600" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 border-dashed" />
                            <DropdownMenuItem
                              className="text-destructive cursor-pointer rounded-lg py-2 font-bold"
                              onClick={() =>
                                setCategoryToDelete({
                                  id: cat.id,
                                  name: cat.name,
                                })
                              }
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {!isLoading && categories.length === 0 && (
        <div className="bg-muted/5 flex flex-col items-center justify-center py-24 text-center">
          <div className="bg-primary/10 text-primary/40 mb-6 rounded-4xl p-8 shadow-inner">
            {hasActiveFilters ? (
              <Search className="h-12 w-12" strokeWidth={1} />
            ) : (
              <LayoutGrid className="h-12 w-12" strokeWidth={1} />
            )}
          </div>
          <h3 className="text-xl font-bold tracking-tight">
            {hasActiveFilters ? "No matches found" : "No categories found"}
          </h3>
          <p className="text-muted-foreground mx-auto mt-2 max-w-sm font-medium opacity-60">
            {hasActiveFilters
              ? "Try adjusting your keywords or clearing the filters to find what you are looking for."
              : "Excellent! The category list is currently clear or matches no criteria."}
          </p>
        </div>
      )}

      {/* View All Modal */}
      <Dialog
        open={viewDialog.open}
        onOpenChange={(open) => setViewDialog((prev) => ({ ...prev, open }))}
      >
        <DialogContent className="bg-card rounded-2xl sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              {viewDialog.type === "sub" ? (
                <LayoutGrid className="text-primary h-5 w-5" />
              ) : (
                <Award className="text-primary h-5 w-5" />
              )}
              {viewDialog.title}
            </DialogTitle>
            <DialogDescription>
              All registered{" "}
              {viewDialog.type === "sub"
                ? "sub-categories"
                : "technical skills"}{" "}
              under this category.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex max-h-[250px] flex-wrap gap-2 overflow-y-auto pr-1">
              {viewDialog.items.map((item, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className={cn(
                    "rounded-lg border-none px-3 py-1 text-xs font-semibold",
                    viewDialog.type === "skill"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 border-t pt-3">
            <Button
              onClick={() =>
                setViewDialog((prev) => ({ ...prev, open: false }))
              }
              className="bg-primary hover:bg-primary/95 rounded-full px-5 text-xs font-bold text-white"
              size="sm"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        open={categoryToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setCategoryToDelete(null);
        }}
      >
        <AlertDialogContent className="bg-card max-w-[420px] rounded-2xl border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive flex items-center gap-2 text-lg font-bold">
              <Trash2 className="h-5 w-5" />
              Delete Category?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground/80 pt-2 text-sm leading-relaxed font-semibold">
              Are you sure you want to delete{" "}
              <span className="text-foreground font-bold">
                &quot;{categoryToDelete?.name}&quot;
              </span>
              ? This will permanently remove the category, its subcategories,
              and all associated technical skills.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 gap-2">
            <AlertDialogCancel className="border-muted-foreground/20 hover:bg-muted rounded-full px-5 text-xs font-bold">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (categoryToDelete) {
                  await handleDelete(
                    categoryToDelete.id,
                    categoryToDelete.name,
                  );
                  setCategoryToDelete(null);
                }
              }}
              className="bg-destructive hover:bg-destructive/90 rounded-full px-5 text-xs font-bold text-white"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
