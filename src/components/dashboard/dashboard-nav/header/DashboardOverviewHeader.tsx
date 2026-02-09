/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Plus, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../ui/button";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

const DashboardOverviewHeader = ({ companyData }: { companyData: any }) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex min-w-0 flex-1 items-center space-x-3 sm:space-x-4">
        <Avatar className="bg-primary h-10 w-10 overflow-hidden rounded-full p-2 sm:h-12 sm:w-12">
          <AvatarImage
            src={companyData.logo || "/placeholder.svg"}
            alt={companyData.name}
          />
          <AvatarFallback>TF</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-lg md:text-xl lg:text-2xl">
            {companyData.name}
          </h1>
          <p className="text-muted-foreground truncate text-xs font-medium opacity-80 sm:text-sm">
            {companyData.industry}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link href="/employer/settings" className="sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 touch-manipulation"
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </Link>
        <Link href="/employer/settings" className="hidden sm:block">
          <Button variant="outline" size="sm" className="touch-manipulation">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
        <Link href="/employer/post-job">
          <Button
            size="sm"
            className="touch-manipulation active:opacity-70 sm:px-4"
          >
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Post Job</span>
          </Button>
        </Link>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardOverviewHeader;
