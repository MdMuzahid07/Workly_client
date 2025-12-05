"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Category, CategoryStatus } from "@/types/categories";
import { Edit, FileText, MoreVertical, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import AddCategoryModal from "../../components/dashboard/category/AddCategoryModal";
import EditCategoryModal from "../../components/dashboard/category/EditCategoryModal";
import DashboardCategoryHeader from "../../components/dashboard/dashboard-nav/header/DashboardCategoryHeader";

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Engineering",
    slug: "engineering",
    jobCount: 45,
    activeJobs: 32,
    applications: 567,
    description: "Software development and technical roles",
    status: "active",
    subcategories: [
      {
        id: "1-sub-frontend",
        name: "Frontend",
        slug: "frontend",
        description: "Web UI engineering",
        status: "active",
      },
      {
        id: "1-sub-backend",
        name: "Backend",
        slug: "backend",
        description: "API and services",
        status: "active",
      },
    ],
  },
  {
    id: "2",
    name: "Product Management",
    slug: "product-management",
    jobCount: 12,
    activeJobs: 8,
    applications: 234,
    description: "Product strategy and management positions",
    status: "active",
    subcategories: [
      {
        id: "2-sub-platform",
        name: "Platform",
        slug: "platform",
        description: "Internal platforms",
        status: "active",
      },
    ],
  },
  {
    id: "3",
    name: "Design",
    slug: "design",
    jobCount: 18,
    activeJobs: 14,
    applications: 312,
    description: "UI/UX and graphic design roles",
    status: "active",
    subcategories: [
      {
        id: "3-sub-ux",
        name: "UX",
        slug: "ux",
        description: "User experience",
        status: "active",
      },
      {
        id: "3-sub-visual",
        name: "Visual Design",
        slug: "visual-design",
        description: "Brand and visual systems",
        status: "active",
      },
    ],
  },
  {
    id: "4",
    name: "Marketing",
    slug: "marketing",
    jobCount: 23,
    activeJobs: 19,
    applications: 445,
    description: "Digital marketing and growth positions",
    status: "active",
    subcategories: [
      {
        id: "4-sub-content",
        name: "Content",
        slug: "content",
        description: "Content strategy",
        status: "active",
      },
      {
        id: "4-sub-performance",
        name: "Performance",
        slug: "performance",
        description: "Paid acquisition",
        status: "active",
      },
    ],
  },
  {
    id: "5",
    name: "Sales",
    slug: "sales",
    jobCount: 15,
    activeJobs: 12,
    applications: 289,
    description: "Sales and business development roles",
    status: "active",
    subcategories: [
      {
        id: "5-sub-enterprise",
        name: "Enterprise",
        slug: "enterprise",
        description: "Large accounts",
        status: "active",
      },
      {
        id: "5-sub-smb",
        name: "SMB",
        slug: "smb",
        description: "Small and medium business",
        status: "active",
      },
    ],
  },
  {
    id: "6",
    name: "Operations",
    slug: "operations",
    jobCount: 9,
    activeJobs: 0,
    applications: 156,
    description: "Operations and logistics positions",
    status: "inactive",
    subcategories: [
      {
        id: "6-sub-logistics",
        name: "Logistics",
        slug: "logistics",
        description: "Supply chain",
        status: "inactive",
      },
    ],
  },
];

const CategoryManagementView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [activeTab, setActiveTab] = useState<CategoryStatus | "all">("all");
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const filteredCategories = useMemo(
    () =>
      categories.filter((cat) => {
        const matchesSearch =
          cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.subcategories.some((sub) =>
            sub.name.toLowerCase().includes(searchQuery.toLowerCase()),
          );

        const matchesStatus = activeTab === "all" || cat.status === activeTab;
        return matchesSearch && matchesStatus;
      }),
    [activeTab, categories, searchQuery],
  );

  const getCategoriesByStatus = (status: CategoryStatus | "all") => {
    if (status === "all") return categories;
    return categories.filter((cat) => cat.status === status);
  };

  const totals = useMemo(
    () =>
      categories.reduce(
        (acc, cat) => {
          acc.totalJobs += cat.jobCount;
          acc.activeJobs += cat.activeJobs;
          acc.totalApplications += cat.applications;
          acc.activeCategories += cat.status === "active" ? 1 : 0;
          return acc;
        },
        {
          totalJobs: 0,
          activeJobs: 0,
          totalApplications: 0,
          activeCategories: 0,
        },
      ),
    [categories],
  );

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id
          ? { ...cat, status: cat.status === "active" ? "inactive" : "active" }
          : cat,
      ),
    );
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setIsEditOpen(true);
  };

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
              <div className="text-2xl font-bold sm:text-3xl">
                {categories.length}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                {totals.activeCategories} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Total Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold sm:text-3xl">
                {totals.totalJobs}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                {totals.activeJobs} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold sm:text-3xl">
                {totals.totalApplications}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                Across all categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Avg Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold sm:text-3xl">
                {Math.round(
                  totals.totalApplications / Math.max(categories.length, 1),
                )}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">Per category</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
              onClick={() => setSearchQuery("")}
              className="w-full sm:w-auto"
            >
              Clear
            </Button>
          )}
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as CategoryStatus | "all")
          }
        >
          <TabsList className="w-full">
            <TabsTrigger value="all">All ({categories.length})</TabsTrigger>
            <TabsTrigger value="active">
              Active ({getCategoriesByStatus("active").length})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive ({getCategoriesByStatus("inactive").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                          Category
                        </th>
                        <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                          Jobs
                        </th>
                        <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                          Active
                        </th>
                        <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                          Applications
                        </th>
                        <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                          Status
                        </th>
                        <th className="text-muted-foreground px-4 py-3 text-right text-xs font-medium tracking-wider uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredCategories.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-12 text-center">
                            <div className="flex flex-col items-center gap-2">
                              <FileText className="text-muted-foreground/50 h-12 w-12" />
                              <p className="text-muted-foreground text-sm">
                                No categories found
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredCategories.map((category) => (
                          <tr key={category.id} className="hover:bg-muted/50">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div>
                                <p className="font-medium">{category.name}</p>
                                <p className="text-muted-foreground text-sm">
                                  {category.slug}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  {category.subcategories.length > 0
                                    ? `Subcategories: ${category.subcategories
                                        .map((sub) => sub.name)
                                        .join(", ")}`
                                    : "No subcategories"}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <p className="font-medium">{category.jobCount}</p>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <p className="text-primary font-medium">
                                {category.activeJobs}
                              </p>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <p className="font-medium">
                                {category.applications}
                              </p>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={category.status === "active"}
                                  onCheckedChange={() =>
                                    handleToggleStatus(category.id)
                                  }
                                />
                                <span className="text-muted-foreground text-sm capitalize">
                                  {category.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right whitespace-nowrap">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => openEditModal(category)}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleDeleteCategory(category.id)
                                    }
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
    </div>
  );
};

export default CategoryManagementView;
