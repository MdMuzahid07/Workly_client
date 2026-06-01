/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Badge } from "@/components/ui/badge";
import EmployeeManagementSkeleton from "@/skeleton/dashboard/employer/employees/EmployeeManagementSkeleton";
import { useEffect, useState } from "react";
import DashboardEmployeeManagementHeader from "@/components/dashboard/dashboard-nav/header/DashboardEmployeeManagementHeader";
import EmployeeFiltersAndSearch from "@/components/dashboard/employee/EmployeeFiltersAndSearch";
import EmployeeManagementTabs from "@/components/dashboard/employee/EmployeeManagementTabs";
import EmployeeStatusCards from "@/components/dashboard/employee/EmployeeStatusCards";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16">
        <DashboardEmployeeManagementHeader
          isAddEmployeeOpen={isAddEmployeeOpen}
          setIsAddEmployeeOpen={setIsAddEmployeeOpen}
        />
        <EmployeeManagementSkeleton />
      </div>
    );
  }

  // fake data
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
        <EmployeeStatusCards employees={employees} departments={departments} />

        <EmployeeFiltersAndSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          departments={departments}
        />

        <EmployeeManagementTabs
          searchTerm={searchTerm}
          selectedDepartment={selectedDepartment}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          employees={employees}
          filteredEmployees={filteredEmployees}
          getStatusBadge={getStatusBadge}
          handleStatusChange={handleStatusChange}
          handleDeleteEmployee={handleDeleteEmployee}
        />
      </div>
    </div>
  );
}

export default EmployeeManagementView;
