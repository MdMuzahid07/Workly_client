/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AddCategoryDialog from '@/components/dashboard/categories/AddCategoryDialog';
import AddSubcategoryDialog from '@/components/dashboard/categories/AddSubcategoryDialog';
import AddSkillDialog from '@/components/dashboard/categories/AddSkillDialog';
import EditCategoryModal from '@/components/dashboard/category/EditCategoryModal';
import DashboardAdminCategoriesHeader from '@/components/dashboard/dashboard-nav/header/DashboardAdminCategoriesHeader';
import { Button } from '@/components/ui/button';
import debounce from 'debounce';
import { useEffect, useMemo, useState } from 'react';
import AdminCategoriesSkeleton from '@/skeleton/dashboard/admin/AdminCategoriesSkeleton';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { CategoryStatsGrid } from './components/CategoryStatsGrid';
import { CategoryTable } from './components/CategoryTable';

import { useGetCategoryStatisticsQuery } from '@/redux/feature/category/categoryApi';

const AdminCategoriesManagementView = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ACTIVE' | 'INACTIVE' | null>(null);

  // Modal States
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [isAddSubcategoryOpen, setIsAddSubcategoryOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<any>(null);

  // 300ms debounce — prevents API call on every keystroke
  const applyDebouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 300),
    [],
  );

  useEffect(() => {
    applyDebouncedSearch(searchValue);
    return () => applyDebouncedSearch.clear();
  }, [searchValue, applyDebouncedSearch]);

  const queryParams = {
    search: searchTerm || undefined,
    active: statusFilter === 'ACTIVE' ? 'true' : statusFilter === 'INACTIVE' ? 'false' : undefined,
  };

  const { data, isLoading, error, refetch } = useGetCategoryStatisticsQuery(queryParams);

  const categories = data?.data?.categories || [];
  const summary = data?.data?.summary;

  const hasActiveFilters = searchValue !== '' || statusFilter !== null;

  if (isLoading) {
    return <AdminCategoriesSkeleton />;
  }

  if (error) {
    const err = error as any;
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-destructive mt-4 text-xl font-bold">Failed to load data</h2>
          <p className="text-muted-foreground mt-2">
            {err?.data?.message || err?.message || 'An unexpected error occurred'}
          </p>
          <Button onClick={() => refetch()} className="mt-6">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminCategoriesHeader onAddCategoryClick={() => setIsAddCategoryOpen(true)} />

      <div className="space-y-8 px-4 py-8 pb-20 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <CategoryStatsGrid summary={summary} isLoading={isLoading} />

        {/* Filter Bar */}
        <CategoryFilterBar
          searchTerm={searchValue}
          onSearchChange={setSearchValue}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {/* Categories Table */}
        <CategoryTable
          categories={categories}
          isLoading={isLoading}
          hasActiveFilters={hasActiveFilters}
          onAddSubcategory={(cat) => {
            setSelectedParent(cat);
            setIsAddSubcategoryOpen(true);
          }}
          onAddSkill={(cat) => {
            setSelectedParent(cat);
            setIsAddSkillOpen(true);
          }}
          onEdit={(cat) => {
            setSelectedParent(cat);
            setIsEditCategoryOpen(true);
          }}
        />
      </div>

      {/* Dialogs */}
      <AddCategoryDialog
        open={isAddCategoryOpen}
        onOpenChange={setIsAddCategoryOpen}
        onSuccess={() => {}} // RTK Query handles invalidation
      />
      <EditCategoryModal
        open={isEditCategoryOpen}
        onOpenChange={setIsEditCategoryOpen}
        category={selectedParent}
      />
      <AddSubcategoryDialog
        open={isAddSubcategoryOpen}
        onOpenChange={setIsAddSubcategoryOpen}
        onSuccess={() => {}} // RTK Query handles invalidation
        parentCategory={selectedParent}
      />
      <AddSkillDialog
        open={isAddSkillOpen}
        onOpenChange={setIsAddSkillOpen}
        onSuccess={() => {}} // RTK Query handles invalidation
        parentCategory={selectedParent}
      />
    </div>
  );
};

export default AdminCategoriesManagementView;
