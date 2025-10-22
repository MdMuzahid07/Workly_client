"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Briefcase, Plus } from "lucide-react";
import CreateNewJobForm from "../../job/CreateNewJobForm";
import DashboardHeaderContainer from "./DashboardHeaderContainer";

interface DashboardCompanyJobsHeaderProps {
  onClose: () => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (value: boolean) => void;
}

const DashboardCompanyJobsHeader = ({
  onClose,
  isCreateModalOpen,
  setIsCreateModalOpen,
}: DashboardCompanyJobsHeaderProps) => {
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Briefcase className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-2xl font-bold">
              Job Management
            </h1>
            <p className="text-muted-foreground text-sm">
              Create and manage your job postings
            </p>
          </div>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="">
              <Plus className="mr-2 h-4 w-4" />
              Create New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card max-h-[90vh] overflow-y-auto sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Job Posting</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new job posting
              </DialogDescription>
            </DialogHeader>
            <CreateNewJobForm onClose={onClose} />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardCompanyJobsHeader;
