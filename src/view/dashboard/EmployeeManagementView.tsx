/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Edit,
  Eye,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Search,
  Trash2,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import { useState } from "react";
import DashboardEmployeeManagementHeader from "../../components/dashboard/dashboard-nav/header/DashboardEmployeeManagementHeader";

interface Employee {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  status: "active" | "inactive" | "pending";
  avatar: string;
  location: string;
  salary?: number;
  manager?: string;
  skills: string[];
}

export function EmployeeManagementView() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);

  // fake data
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      fullName: "John Doe",
      email: "john.doe@techflow.com",
      phone: "+1 (555) 123-4567",
      role: "Senior Frontend Developer",
      department: "Engineering",
      joinDate: "2023-01-15",
      status: "active",
      avatar: "/employee-1.jpg",
      location: "San Francisco, CA",
      salary: 120000,
      manager: "Jane Smith",
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      id: "2",
      fullName: "Jane Smith",
      email: "jane.smith@techflow.com",
      phone: "+1 (555) 234-5678",
      role: "Engineering Manager",
      department: "Engineering",
      joinDate: "2022-03-20",
      status: "active",
      avatar: "/employee-2.jpg",
      location: "San Francisco, CA",
      salary: 150000,
      skills: ["Leadership", "React", "System Design"],
    },
    {
      id: "3",
      fullName: "Mike Johnson",
      email: "mike.johnson@techflow.com",
      phone: "+1 (555) 345-6789",
      role: "UX Designer",
      department: "Design",
      joinDate: "2023-02-10",
      status: "active",
      avatar: "/employee-3.jpg",
      location: "Remote",
      salary: 95000,
      manager: "Sarah Wilson",
      skills: ["Figma", "User Research", "Prototyping"],
    },
    {
      id: "4",
      fullName: "Sarah Wilson",
      email: "sarah.wilson@techflow.com",
      phone: "+1 (555) 456-7890",
      role: "Design Director",
      department: "Design",
      joinDate: "2021-11-05",
      status: "active",
      avatar: "/placeholder.svg",
      location: "New York, NY",
      salary: 140000,
      skills: ["Design Strategy", "Team Leadership", "Brand Design"],
    },
    {
      id: "5",
      fullName: "Alex Chen",
      email: "alex.chen@techflow.com",
      phone: "+1 (555) 567-8901",
      role: "Backend Developer",
      department: "Engineering",
      joinDate: "2023-06-01",
      status: "pending",
      avatar: "/placeholder.svg",
      location: "Austin, TX",
      skills: ["Python", "PostgreSQL", "AWS"],
    },
  ]);

  const departments = [
    "Engineering",
    "Design",
    "Product",
    "Marketing",
    "Sales",
    "HR",
  ];
  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Engineering Manager",
    "UX Designer",
    "UI Designer",
    "Design Director",
    "Product Manager",
    "Marketing Manager",
  ];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" ||
      employee.department === selectedDepartment;
    const matchesTab = activeTab === "all" || employee.status === activeTab;

    return matchesSearch && matchesDepartment && matchesTab;
  });

  const getStatusBadge = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleStatusChange = (
    employeeId: string,
    newStatus: Employee["status"],
  ) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employeeId ? { ...emp, status: newStatus } : emp,
      ),
    );
  };

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
  };

  return (
    <div className="min-h-screen">
      <DashboardEmployeeManagementHeader
        isAddEmployeeOpen={isAddEmployeeOpen}
        setIsAddEmployeeOpen={setIsAddEmployeeOpen}
      />

      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8">
        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs font-medium sm:text-sm">
                    Total Employees
                  </p>
                  <p className="text-primary text-xl font-bold sm:text-2xl">
                    {employees.length}
                  </p>
                </div>
                <Users className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs font-medium sm:text-sm">
                    Active
                  </p>
                  <p className="text-xl font-bold text-green-600 sm:text-2xl">
                    {employees.filter((e) => e.status === "active").length}
                  </p>
                </div>
                <UserCheck className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs font-medium sm:text-sm">
                    Pending
                  </p>
                  <p className="text-xl font-bold text-yellow-600 sm:text-2xl">
                    {employees.filter((e) => e.status === "pending").length}
                  </p>
                </div>
                <UserX className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs font-medium sm:text-sm">
                    Departments
                  </p>
                  <p className="text-primary text-xl font-bold sm:text-2xl">
                    {departments.length}
                  </p>
                </div>
                <Users className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    placeholder="Search employees by name, email, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10 pl-10 sm:h-11"
                  />
                </div>
              </div>
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger className="h-10 w-full sm:h-11 sm:w-48">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Employee Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="w-full overflow-x-auto">
            <TabsList className="grid w-full min-w-[400px] grid-cols-4 sm:min-w-0">
              <TabsTrigger value="all" className="text-xs sm:text-sm">
                All ({employees.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="text-xs sm:text-sm">
                Active ({employees.filter((e) => e.status === "active").length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-xs sm:text-sm">
                Pending (
                {employees.filter((e) => e.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="inactive" className="text-xs sm:text-sm">
                Inactive (
                {employees.filter((e) => e.status === "inactive").length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab}>
            <Card>
              <CardContent className="p-0">
                {/* Desktop Table View */}
                <div className="hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Role & Department</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage
                                  src={employee.avatar || "/placeholder.svg"}
                                  alt={employee.fullName}
                                />
                                <AvatarFallback>
                                  {employee.fullName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {employee.fullName}
                                </p>
                                <p className="text-muted-foreground flex items-center text-sm">
                                  <MapPin className="mr-1 h-3 w-3" />
                                  {employee.location}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{employee.role}</p>
                              <p className="text-muted-foreground text-sm">
                                {employee.department}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="flex items-center text-sm">
                                <Mail className="mr-1 h-3 w-3" />
                                {employee.email}
                              </p>
                              <p className="text-muted-foreground flex items-center text-sm">
                                <Phone className="mr-1 h-3 w-3" />
                                {employee.phone}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-1 h-3 w-3" />
                              {new Date(employee.joinDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(employee.status)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Employee
                                </DropdownMenuItem>
                                {employee.status === "pending" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(employee.id, "active")
                                    }
                                  >
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    Activate
                                  </DropdownMenuItem>
                                )}
                                {employee.status === "active" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(
                                        employee.id,
                                        "inactive",
                                      )
                                    }
                                  >
                                    <UserX className="mr-2 h-4 w-4" />
                                    Deactivate
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() =>
                                    handleDeleteEmployee(employee.id)
                                  }
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="space-y-4 p-4 lg:hidden">
                  {filteredEmployees.map((employee) => (
                    <Card key={employee.id} className="p-4">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex min-w-0 flex-1 items-center space-x-3">
                          <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarImage
                              src={employee.avatar || "/placeholder.svg"}
                              alt={employee.fullName}
                            />
                            <AvatarFallback className="text-xs">
                              {employee.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {employee.fullName}
                            </p>
                            <p className="text-muted-foreground truncate text-xs">
                              {employee.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(employee.status)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Employee
                              </DropdownMenuItem>
                              {employee.status === "pending" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(employee.id, "active")
                                  }
                                >
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              {employee.status === "active" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(employee.id, "inactive")
                                  }
                                >
                                  <UserX className="mr-2 h-4 w-4" />
                                  Deactivate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() =>
                                  handleDeleteEmployee(employee.id)
                                }
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="text-muted-foreground flex items-center">
                          <MapPin className="mr-1 h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{employee.location}</span>
                        </div>
                        <div className="text-muted-foreground flex items-center">
                          <Mail className="mr-1 h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{employee.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-muted-foreground flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>
                              {new Date(employee.joinDate).toLocaleDateString()}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {employee.department}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {filteredEmployees.length === 0 && (
                  <div className="py-12 text-center">
                    <Users className="text-muted-foreground mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12" />
                    <h3 className="text-foreground mb-2 text-base font-medium sm:text-lg">
                      No employees found
                    </h3>
                    <p className="text-muted-foreground px-4 text-sm">
                      {searchTerm || selectedDepartment !== "all"
                        ? "Try adjusting your search or filters"
                        : "Add your first employee to get started"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default EmployeeManagementView;
