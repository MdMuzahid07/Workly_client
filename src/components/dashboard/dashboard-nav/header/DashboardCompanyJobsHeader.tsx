'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Briefcase, Plus } from 'lucide-react';
import { useState } from 'react';
import CreateNewJobForm from '@/components/dashboard/job/create-job-form';
import DashboardHeaderContainer from './DashboardHeaderContainer';

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
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <DashboardHeaderContainer>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 ring-primary/5 shrink-0 rounded-lg p-2 ring-4">
            <Briefcase className="text-primary h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-foreground truncate text-sm font-bold tracking-tight sm:text-xl md:text-2xl">
              Job Management
            </h1>
            <p className="text-muted-foreground hidden text-xs font-medium opacity-80 sm:block sm:text-sm">
              Create and manage your job postings
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex h-9 w-9 items-center justify-center rounded-full p-0 font-bold sm:h-9 sm:w-auto sm:px-4">
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Create New Job</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card max-h-[90vh] overflow-y-auto sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create New Job Posting</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new job posting
                </DialogDescription>
              </DialogHeader>
              <CreateNewJobForm
                onClose={onClose}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardCompanyJobsHeader;
