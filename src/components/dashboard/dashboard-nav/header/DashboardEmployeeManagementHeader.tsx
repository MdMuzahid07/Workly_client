/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { Button } from "../../../ui/button";
import AddEmployeeForm from "../../employee/AddEmployeeForm";

const DashboardEmployeeManagementHeader = ({
  isAddEmployeeOpen,
  setIsAddEmployeeOpen,
}: any) => {
  return (
    <div className="bg-card sticky top-0 border-b">
      <div className="flex h-auto min-h-[4.5rem] items-center justify-between px-4 py-4 sm:h-18 sm:px-6 sm:py-0">
        <div className="flex w-full flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div className="w-full sm:w-auto">
            <h1 className="text-foreground text-lg font-bold sm:text-xl lg:text-2xl">
              Employee Management
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Manage your team members and their information
            </p>
          </div>

          <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto sm:min-w-[140px]">
                <UserPlus className="mr-2 h-4 w-4" />
                <span className="text-sm sm:text-base">Add Employee</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="mx-4 flex max-h-[90vh] w-[calc(100vw-2rem)] max-w-[90vw] flex-col overflow-hidden sm:mx-auto sm:w-full sm:max-w-2xl lg:max-w-4xl">
              <DialogHeader className="flex-shrink-0 border-b pb-4">
                <DialogTitle className="text-lg font-semibold sm:text-xl">
                  Add New Employee
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm sm:text-base">
                  Add a new team member to your company. Fill in the required
                  information below.
                </DialogDescription>
              </DialogHeader>

              <div className="-mr-2 flex-1 overflow-y-auto py-4 pr-2">
                <AddEmployeeForm onClose={() => setIsAddEmployeeOpen(false)} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmployeeManagementHeader;
