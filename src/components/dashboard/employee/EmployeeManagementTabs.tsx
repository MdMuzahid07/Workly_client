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
  Trash2,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";

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

interface EmployeeManagementTabsProps {
  searchTerm: string;
  selectedDepartment: string;
  activeTab: string;
  setActiveTab: (value: string) => void;
  employees: Employee[];
  filteredEmployees: Employee[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getStatusBadge: (status: Employee["status"]) => any;
  handleStatusChange: (
    employeeId: string,
    newStatus: Employee["status"],
  ) => void;
  handleDeleteEmployee: (employeeId: string) => void;
}

const EmployeeManagementTabs = ({
  searchTerm,
  selectedDepartment,
  activeTab,
  setActiveTab,
  employees,
  filteredEmployees,
  getStatusBadge,
  handleStatusChange,
  handleDeleteEmployee,
}: EmployeeManagementTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <div className="w-full overflow-x-auto">
        <TabsList className="bg-card grid w-full min-w-[400px] grid-cols-4 sm:min-w-0">
          <TabsTrigger value="all" className="text-xs sm:text-sm">
            All ({employees.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="text-xs sm:text-sm">
            Active ({employees.filter((e) => e.status === "active").length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-xs sm:text-sm">
            Pending ({employees.filter((e) => e.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="inactive" className="text-xs sm:text-sm">
            Inactive ({employees.filter((e) => e.status === "inactive").length})
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
                            <p className="font-medium">{employee.fullName}</p>
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
                      <TableCell>{getStatusBadge(employee.status)}</TableCell>
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
                                  handleStatusChange(employee.id, "inactive")
                                }
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteEmployee(employee.id)}
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
                            onClick={() => handleDeleteEmployee(employee.id)}
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
  );
};

export default EmployeeManagementTabs;
