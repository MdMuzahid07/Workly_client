"use client";

import AddCategoryDialog from "@/components/dashboard/categories/AddCategoryDialog";
import AddSubcategoryDialog from "@/components/dashboard/categories/AddSubcategoryDialog";
import DashboardAdminCategoriesHeader from "@/components/dashboard/dashboard-nav/header/DashboardAdminCategoriesHeader";
import { useState } from "react";
import { CategoryFilterBar } from "./components/CategoryFilterBar";
import { CategoryStatsGrid } from "./components/CategoryStatsGrid";
import { CategoryTable } from "./components/CategoryTable";

const AdminCategoriesManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ACTIVE" | "INACTIVE" | null
  >(null);

  // Modal States
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddSubcategoryOpen, setIsAddSubcategoryOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Mock data for industries (categories)
  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "Software Engineering",
      slug: "software-engineering",
      icon: "Code",
      active: true,
      subcategories: ["Web Dev", "Mobile", "DevOps", "AI/ML"],
      jobCount: 452,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Healthcare",
      slug: "healthcare",
      icon: "Heart",
      active: true,
      subcategories: ["Nursing", "Dental", "Pharma", "Medical Tech"],
      jobCount: 890,
      createdAt: "2024-01-16",
    },
    {
      id: "3",
      name: "Marketing",
      slug: "marketing",
      icon: "TrendingUp",
      active: true,
      subcategories: ["Social Media", "SEO", "Content", "Brand"],
      jobCount: 230,
      createdAt: "2024-01-18",
    },
    {
      id: "4",
      name: "Financial Services",
      slug: "finance",
      icon: "Globe",
      active: false,
      subcategories: ["Banking", "Audit", "Crypto", "Insurance"],
      jobCount: 0,
      createdAt: "2024-01-20",
    },
    {
      id: "5",
      name: "Creative & Design",
      slug: "creative-design",
      icon: "Camera",
      active: true,
      subcategories: ["UI/UX", "Graphic", "Motion", "Product"],
      jobCount: 156,
      createdAt: "2024-01-22",
    },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddCategory = (data: any) => {
    const newCategory = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      slug: data.slug,
      icon: data.icon,
      active: true,
      subcategories: [],
      jobCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCategories([newCategory, ...categories]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddSubcategory = (data: any) => {
    setCategories(
      categories.map((cat) =>
        cat.id === data.parentId
          ? { ...cat, subcategories: [...cat.subcategories, data.name] }
          : cat,
      ),
    );
  };

  const filteredCategories = categories.filter(
    (cat) =>
      (cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.subcategories.some((sub) =>
          sub.toLowerCase().includes(searchTerm.toLowerCase()),
        )) &&
      (statusFilter === null
        ? true
        : statusFilter === "ACTIVE"
          ? cat.active
          : !cat.active),
  );

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminCategoriesHeader
        onAddCategoryClick={() => setIsAddCategoryOpen(true)}
      />

      <div className="space-y-8 px-4 py-8 pb-20 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <CategoryStatsGrid />

        {/* Filter Bar */}
        <CategoryFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {/* Categories Table */}
        <CategoryTable
          categories={filteredCategories}
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
        onSuccess={handleAddCategory}
      />
      <AddSubcategoryDialog
        open={isAddSubcategoryOpen}
        onOpenChange={setIsAddSubcategoryOpen}
        onSuccess={handleAddSubcategory}
        parentCategory={selectedParent}
      />
    </div>
  );
};

export default AdminCategoriesManagementView;
