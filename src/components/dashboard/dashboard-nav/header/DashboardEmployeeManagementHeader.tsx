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
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardEmployeeManagementHeader = ({
  isAddEmployeeOpen,
  setIsAddEmployeeOpen,
}: any) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div className="w-full sm:w-auto">
          <h1 className="text-foreground text-sm font-bold tracking-tight sm:text-lg md:text-xl lg:text-2xl">
            Employee Management
          </h1>
          <p className="text-muted-foreground text-xs font-medium opacity-80 sm:text-sm">
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

          <DialogContent className="bg-card mx-4 flex max-h-[90vh] w-[calc(100vw-2rem)] max-w-[90vw] flex-col overflow-hidden sm:mx-auto sm:w-full sm:max-w-2xl lg:max-w-4xl">
            <DialogHeader className="border-b pb-4">
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
    </DashboardHeaderContainer>
  );
};

export default DashboardEmployeeManagementHeader;
