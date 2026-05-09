/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AddCategoryDialog from "@/components/dashboard/categories/AddCategoryDialog";
import AddSubcategoryDialog from "@/components/dashboard/categories/AddSubcategoryDialog";
import DashboardAdminCategoriesHeader from "@/components/dashboard/dashboard-nav/header/DashboardAdminCategoriesHeader";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CategoryFilterBar } from "./components/CategoryFilterBar";
import { CategoryStatsGrid } from "./components/CategoryStatsGrid";
import { CategoryTable } from "./components/CategoryTable";

import { useGetCategoryStatisticsQuery } from "@/redux/feature/category/categoryApi";

const AdminCategoriesManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ACTIVE" | "INACTIVE" | null
  >(null);

  // Modal States
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddSubcategoryOpen, setIsAddSubcategoryOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<any>(null);

  const queryParams = {
    search: searchTerm || undefined,
    active:
      statusFilter === "ACTIVE"
        ? "true"
        : statusFilter === "INACTIVE"
          ? "false"
          : undefined,
  };

  const { data, isLoading, error } = useGetCategoryStatisticsQuery(queryParams);

  const categories = data?.data?.categories || [];
  const summary = data?.data?.summary;

  if (error) {
    const err = error as any;
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-destructive mt-4 text-xl font-bold">
            Failed to load data
          </h2>
          <p className="text-muted-foreground mt-2">
            {err?.data?.message ||
              err?.message ||
              "An unexpected error occurred"}
          </p>
          <Button onClick={() => window.location.reload()} className="mt-6">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminCategoriesHeader
        onAddCategoryClick={() => setIsAddCategoryOpen(true)}
      />

      <div className="space-y-8 px-4 py-8 pb-20 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <CategoryStatsGrid summary={summary} isLoading={isLoading} />

        {/* Filter Bar */}
        <CategoryFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {/* Categories Table */}
        <CategoryTable
          categories={categories}
          isLoading={isLoading}
          onAddSubcategory={(cat) => {
            setSelectedParent(cat);
            setIsAddSubcategoryOpen(true);
          }}
        />
      </div>

      {/* Dialogs */}
      <AddCategoryDialog
        open={isAddCategoryOpen}
        onOpenChange={setIsAddCategoryOpen}
        onSuccess={() => {}} // RTK Query handles invalidation
      />
      <AddSubcategoryDialog
        open={isAddSubcategoryOpen}
        onOpenChange={setIsAddSubcategoryOpen}
        onSuccess={() => {}} // RTK Query handles invalidation
        parentCategory={selectedParent}
      />
    </div>
  );
};

export default AdminCategoriesManagementView;
