import { Plus, Tag } from "lucide-react";
import { Button } from "../../../ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DashboardCategoryHeader = ({ setIsAddOpen }: any) => {
  return (
    <header className="border-border bg-card sticky top-0 z-50 border-b">
      <div className="container mx-auto h-18 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-lg p-2">
              <Tag className="text-primary h-6 w-6" />
            </div>
            <div>
              <h1 className="text-foreground text-2xl font-bold">
                Job Categories
              </h1>
              <p className="text-muted-foreground text-sm">
                Manage and organize job categories for your platform
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
      </div>
    </header>
  );
};

export default DashboardCategoryHeader;
