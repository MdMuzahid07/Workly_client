"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Briefcase,
  Camera,
  ChevronDown,
  Code,
  Edit,
  Filter,
  Globe,
  Heart,
  LayoutGrid,
  MoreVertical,
  Plus,
  Power,
  PowerOff,
  Search,
  Tag,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import AddCategoryDialog from "../../components/dashboard/categories/AddCategoryDialog";
import AddSubcategoryDialog from "../../components/dashboard/categories/AddSubcategoryDialog";
import DashboardAdminCategoriesHeader from "../../components/dashboard/dashboard-nav/header/DashboardAdminCategoriesHeader";

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

  const stats = [
    {
      label: "Total Categories",
      value: "24",
      icon: LayoutGrid,
      color: "text-primary",
    },
    {
      label: "Active Roles",
      value: "1,840",
      icon: Briefcase,
      color: "text-emerald-500",
    },
    {
      label: "Subcategories",
      value: "142",
      icon: Tag,
      color: "text-blue-500",
    },
    {
      label: "Trending Area",
      value: "AI/ML",
      icon: TrendingUp,
      color: "text-amber-500",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddCategory = (data: any) => {
    console.log("New Category Data:", data);
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
    console.log("New Subcategory Data:", data);
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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <Code className="h-4 w-4" />;
      case "Heart":
        return <Heart className="h-4 w-4" />;
      case "TrendingUp":
        return <TrendingUp className="h-4 w-4" />;
      case "Camera":
        return <Camera className="h-4 w-4" />;
      case "Globe":
        return <Globe className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminCategoriesHeader
        onAddCategoryClick={() => setIsAddCategoryOpen(true)}
      />

      <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-card rounded-xl border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-card flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search industries or sub-niches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-muted/50 ring-offset-background focus-visible:ring-primary rounded-full border-none pl-10 focus-visible:ring-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-primary/20 flex items-center gap-2 rounded-full font-bold"
                >
                  <Filter className="h-4 w-4" />
                  {statusFilter ? statusFilter : "Status"}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => setStatusFilter(null)}
                  className="cursor-pointer"
                >
                  All Status
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setStatusFilter("ACTIVE")}
                  className="cursor-pointer"
                >
                  Active Only
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("INACTIVE")}
                  className="cursor-pointer"
                >
                  Inactive Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {(searchTerm || statusFilter) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter(null);
                }}
                className="text-muted-foreground hover:text-primary rounded-full font-bold"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Categories Table */}
        <Card className="overflow-hidden rounded-xl border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[300px]">Industry Name</TableHead>
                  <TableHead>Sub-Categories</TableHead>
                  <TableHead>Job Count</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Manage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((cat) => (
                  <TableRow
                    key={cat.id}
                    className="group hover:bg-muted/40 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/5 text-primary group-hover:bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors">
                          {getIcon(cat.icon)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-bold">{cat.name}</p>
                          <p className="text-muted-foreground text-xs opacity-70">
                            /{cat.slug}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.subcategories.map((sub, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-muted/50 hover:bg-muted text-[10px] font-medium"
                          >
                            {sub}
                          </Badge>
                        ))}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-primary/10 hover:text-primary h-5 w-5 rounded-full"
                          onClick={() => {
                            setSelectedParent({ id: cat.id, name: cat.name });
                            setIsAddSubcategoryOpen(true);
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">
                          {cat.jobCount}
                        </span>
                        <Briefcase className="text-muted-foreground h-3 w-3 opacity-40" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`font-bold ${
                          cat.active
                            ? "border-emerald-200 bg-emerald-500/10 text-emerald-600"
                            : "bg-muted text-muted-foreground border-transparent"
                        }`}
                        variant="outline"
                      >
                        {cat.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:text-primary h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-52">
                            <DropdownMenuLabel>
                              Taxonomy Control
                            </DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                              {cat.active ? (
                                <>
                                  <PowerOff className="mr-2 h-4 w-4" />
                                  Deactivate Industry
                                </>
                              ) : (
                                <>
                                  <Power className="mr-2 h-4 w-4" />
                                  Activate Industry
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Rename Slug
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive cursor-pointer font-bold">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Category
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

          {filteredCategories.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted mb-4 rounded-full p-4">
                <LayoutGrid className="text-muted-foreground h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold">
                No results match your search
              </h3>
              <p className="text-muted-foreground mx-auto mt-2 max-w-xs">
                Try adjusting your keywords or status filters.
              </p>
            </div>
          )}
        </Card>
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
