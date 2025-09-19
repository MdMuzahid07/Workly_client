/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { UserPlus } from "lucide-react";
import { Button } from "../../../ui/button";
import { DialogHeader } from "../../../ui/dialog";
import AddEmployeeForm from "../../employee/AddEmployeeForm";

const DashboardEmployeeManagementHeader = ({
  isAddEmployeeOpen,
  setIsAddEmployeeOpen,
}: any) => {
  return (
    <div className="bg-card border-b">
      <div className="flex h-18 items-center justify-between px-6">
        <div className="flex w-full flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div>
            <h1 className="text-foreground text-xl font-bold sm:text-2xl">
              Employee Management
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your team members and their information
            </p>
          </div>
          <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="mx-4 max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Add a new team member to your company
                </DialogDescription>
              </DialogHeader>
              <AddEmployeeForm onClose={() => setIsAddEmployeeOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmployeeManagementHeader;
