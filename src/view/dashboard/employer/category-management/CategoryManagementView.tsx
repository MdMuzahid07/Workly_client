/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Edit, FileText, Loader2, MoreVertical, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import AddCategoryModal from '../../../../components/dashboard/category/AddCategoryModal';
import EditCategoryModal from '../../../../components/dashboard/category/EditCategoryModal';
import DashboardCategoryHeader from '../../../../components/dashboard/dashboard-nav/header/DashboardCategoryHeader';
import DeleteConfirmationModal from '../../../../components/shared/DeleteConfirmationModal';
import {
  useDeleteCategoryMutation,
  useGetCategoryStatisticsQuery,
  useToggleCategoryStatusMutation,
} from '../../../../redux/feature/category/categoryApi';
import CategoryManagementSkeleton from '../../../../skeleton/dashboard/employer/category-management/CategoryManagementSkeleton';
import { CategoryStatus } from '../../../../types/categories';

const CategoryManagementView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<CategoryStatus | 'all'>('all');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);

  const {
    data: statisticsData,
    isLoading,
    error,
    refetch,
  } = useGetCategoryStatisticsQuery({
    search: searchQuery,
    active: activeTab === 'all' ? 'all' : activeTab === 'active' ? 'true' : 'false',
  });

  const [toggleStatus] = useToggleCategoryStatusMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = useMemo(() => statisticsData?.data?.categories || [], [statisticsData]);
  const summary = statisticsData?.data?.summary || {
    totalCategories: 0,
    activeCategories: 0,
    inactiveCategories: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    averageApplicationsPerCategory: 0,
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((cat: any) => {
      const matchesSearch =
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cat.subcategories &&
          Array.isArray(cat.subcategories) &&
          cat.subcategories.some((sub: string) =>
            sub.toLowerCase().includes(searchQuery.toLowerCase()),
          ));

      const matchesStatus =
        activeTab === 'all' ||
        (activeTab === 'active' && cat.active) ||
        (activeTab === 'inactive' && !cat.active);

      return matchesSearch && matchesStatus;
    });
  }, [categories, searchQuery, activeTab]);

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
    } catch (error: any) {
      throw new Error(error?.data?.message || 'Failed to delete category');
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatus(id).unwrap();
      toast.success('Category status updated successfully');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update category status');
    }
  };

  const openEditModal = (category: any) => {
    setSelectedCategory(category);
    setIsEditOpen(true);
  };

  if (isLoading) {
    return <CategoryManagementSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-6 pt-24">
        <div className="py-12 text-center">
          <FileText className="text-destructive mx-auto mb-4 h-16 w-16" />
          <h3 className="mb-2 text-lg font-semibold">Failed to load categories</h3>
          <p className="text-muted-foreground mb-4">
            {(error as any)?.data?.message ||
              'There was an error loading categories. Please try again.'}
          </p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardCategoryHeader setIsAddOpen={setIsAddOpen} />

      <div className="container mx-auto space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Status Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Total Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <>
                  <div className="text-2xl font-bold sm:text-3xl">{summary.totalCategories}</div>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {summary.activeCategories} active
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Total Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <>
                  <div className="text-2xl font-bold sm:text-3xl">{summary.totalJobs}</div>
                  <p className="text-muted-foreground mt-1 text-xs">{summary.activeJobs} active</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <>
                  <div className="text-2xl font-bold sm:text-3xl">{summary.totalApplications}</div>
                  <p className="text-muted-foreground mt-1 text-xs">Across all categories</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Avg Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <>
                  <div className="text-2xl font-bold sm:text-3xl">
                    {Math.round(summary.averageApplicationsPerCategory)}
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">Per category</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="bg-card flex flex-col gap-4 rounded-full sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search categories by name or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card rounded-full pl-10"
            />
          </div>
          {searchQuery && (
            <Button
              variant="outline"
              onClick={() => setSearchQuery('')}
              className="w-full sm:w-auto"
            >
              Clear
            </Button>
          )}
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as CategoryStatus | 'all')}
        >
          <TabsList className="w-full">
            <TabsTrigger value="all">
              All ({isLoading ? '...' : summary.totalCategories})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({isLoading ? '...' : summary.activeCategories})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive ({isLoading ? '...' : summary.inactiveCategories})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        {['Category', 'Jobs', 'Active', 'Applications', 'Status', 'Actions'].map(
                          (header, index) => (
                            <th
                              key={index}
                              className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase"
                            >
                              {header}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {isLoading ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-12 text-center">
                            <div className="flex flex-col items-center gap-2">
                              <Loader2 className="h-8 w-8 animate-spin" />
                              <p className="text-muted-foreground text-sm">Loading categories...</p>
                            </div>
                          </td>
                        </tr>
                      ) : filteredCategories.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-12 text-center">
                            <div className="flex flex-col items-center gap-2">
                              <FileText className="text-muted-foreground/50 h-12 w-12" />
                              <p className="text-muted-foreground text-sm">No categories found</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredCategories.map((category: any) => (
                          <tr key={category.id} className="hover:bg-muted/50">
                            <td className="px-4 py-4">
                              <div className="space-y-1">
                                <p className="font-medium">{category.name}</p>
                                <p className="text-muted-foreground text-sm">{category.slug}</p>
                                {category.subcategories && category.subcategories.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-muted-foreground mb-1 text-xs font-medium">
                                      Subcategories:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {category.subcategories
                                        .slice(0, 5)
                                        .map((sub: string, idx: number) => (
                                          <span
                                            key={idx}
                                            className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                                          >
                                            {sub}
                                          </span>
                                        ))}
                                      {category.subcategories.length > 5 && (
                                        <span className="bg-muted text-muted-foreground inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium">
                                          +{category.subcategories.length - 5} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <p className="font-medium">{category.totalJobs}</p>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <p className="text-primary font-medium">{category.activeJobs}</p>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <p className="font-medium">{category.totalApplications}</p>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={category.active}
                                  onCheckedChange={() => handleToggleStatus(category.id)}
                                />
                                <span className="text-muted-foreground text-sm capitalize">
                                  {category.active ? 'active' : 'inactive'}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right whitespace-nowrap">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => openEditModal(category)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setCategoryToDelete(category);
                                      setIsDeleteOpen(true);
                                    }}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddCategoryModal open={isAddOpen} onOpenChange={setIsAddOpen} />
      {selectedCategory && (
        <EditCategoryModal
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          category={selectedCategory}
        />
      )}

      <DeleteConfirmationModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={async () => {
          if (!categoryToDelete?.id) return Promise.reject(new Error('No category selected'));
          return handleDeleteCategory(categoryToDelete.id);
        }}
        title="Delete Category?"
        description="This will permanently delete"
        itemName={categoryToDelete?.name}
      />
    </div>
  );
};

export default CategoryManagementView;
