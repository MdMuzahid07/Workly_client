/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Plus, Settings } from "lucide-react";
import { Button } from "../../../ui/button";

const DashboardOverviewHeader = ({ companyData }: { companyData: any }) => {
  return (
    <header className="bg-card sticky top-0 border-b">
      <div className="flex h-18 items-center justify-between px-6">
        <div className="flex min-w-0 flex-1 items-center space-x-3 sm:space-x-4">
          <Avatar className="bg-card h-10 w-10 flex-shrink-0 rounded-full sm:h-12 sm:w-12">
            <AvatarImage
              src={companyData.logo || "/placeholder.svg"}
              alt={companyData.name}
            />
            <AvatarFallback>TF</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h1 className="text-foreground truncate text-lg font-bold sm:text-xl lg:text-2xl">
              {companyData.name}
            </h1>
            <p className="text-muted-foreground truncate text-sm">
              {companyData.industry}
            </p>
          </div>
        </div>

        <div className="hidden items-center space-x-3 sm:flex">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Post Job
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardOverviewHeader;
