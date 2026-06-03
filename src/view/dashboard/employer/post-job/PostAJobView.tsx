"use client";

import { useState } from "react";
import DashboardPostAJobHeader from "../../../../components/dashboard/dashboard-nav/header/DashboardPostAJobHeader";
import CreateNewJobForm from "../../../../components/dashboard/job/CreateNewJobForm";
import StepProgress from "../../../../components/dashboard/job/StepProgress";

interface Step {
  id: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  { id: 1, title: "Basic Info", description: "Job details" },
  { id: 2, title: "Job Details", description: "Description & skills" },
  { id: 3, title: "Compensation", description: "Salary & benefits" },
  { id: 4, title: "Final Settings", description: "Application details" },
];

const PostAJobView = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen pt-16">
      <DashboardPostAJobHeader
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        currentStep={currentStep}
      />

      <div className="space-y-6 px-4 pb-8 sm:px-6 sm:py-8">
        <div className="w-full">
          <StepProgress steps={STEPS} currentStep={currentStep} />
        </div>
        <div className="bg-card rounded-xl border p-6 md:p-8">
          <CreateNewJobForm
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>
      </div>
    </div>
  );
};

export default PostAJobView;
