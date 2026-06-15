import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus, Users } from "lucide-react";
import { Button } from "../../../ui/button";
import AddTeamMemberForm from "../../team-member/AddTeamMemberForm";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardTeamMemberManagementHeader = ({
  isAddTeamMemberOpen,
  setIsAddTeamMemberOpen,
}: {
  isAddTeamMemberOpen: boolean;
  setIsAddTeamMemberOpen: (open: boolean) => void;
}) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
            <Users className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-lg md:text-xl lg:text-2xl">
              Team member management
            </h1>
            <p className="text-muted-foreground hidden text-xs font-medium opacity-80 sm:block sm:text-sm">
              Manage your team members and their information
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Dialog
            open={isAddTeamMemberOpen}
            onOpenChange={setIsAddTeamMemberOpen}
          >
            <DialogTrigger asChild>
              <Button className="flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold sm:h-9 sm:w-auto sm:px-4">
                <UserPlus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Add team member</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-card mx-4 flex max-h-[90vh] w-[calc(100vw-2rem)] max-w-[90vw] flex-col overflow-hidden sm:mx-auto sm:w-full sm:max-w-2xl lg:max-w-4xl">
              <DialogHeader className="border-b pb-4">
                <DialogTitle className="text-lg font-semibold sm:text-xl">
                  Add new team member
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm sm:text-base">
                  Add a new team member to your company. Fill in the required
                  information below.
                </DialogDescription>
              </DialogHeader>

              <div className="-mr-2 flex-1 overflow-y-auto py-4 pr-2">
                <AddTeamMemberForm
                  onClose={() => setIsAddTeamMemberOpen(false)}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardTeamMemberManagementHeader;
