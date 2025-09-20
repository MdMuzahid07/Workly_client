/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserCheck, Users, UserX } from "lucide-react";
import { Card, CardContent } from "../../ui/card";

const EmployeeStatusCards = ({
  employees,
  departments,
}: {
  employees: any;
  departments: any;
}) => {
  return (
    <div>
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
                  {employees.filter((e: any) => e.status === "active").length}
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
                  {employees.filter((e: any) => e.status === "pending").length}
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
    </div>
  );
};

export default EmployeeStatusCards;
