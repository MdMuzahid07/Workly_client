import { Plus, Tag } from "lucide-react";
import { Button } from "../../../ui/button";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardCategoryHeader = ({
  setIsAddOpen,
}: {
  setIsAddOpen: (open: boolean) => void;
}) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 rounded-lg p-2 ring-4">
            <Tag className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              Job Categories
            </h1>
            <p className="text-muted-foreground inline-flex text-xs font-medium opacity-80 sm:text-sm">
              Manage and organize
              <span className="hidden sm:block">
                &nbsp;job categories for your platform
              </span>
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="w-full gap-2 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardCategoryHeader;
