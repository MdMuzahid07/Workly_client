"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { JobFormData } from "./schema";
import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2JobDetails from "./steps/Step2JobDetails";
import Step3Compensation from "./steps/Step3Compensation";
import Step4ApplicationSettings from "./steps/Step4ApplicationSettings";
import FormNavigation from "./components/FormNavigation";

interface CreateNewJobFormContentProps {
  onClose?: () => void;
  currentStep: number;
  onStepChange: (step: number) => void;
  jobId?: string;
  categories:
    | {
        data?: { id: string; name: string; subcategories: string[] }[];
      }
    | undefined;
  categoriesLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
}

export default function CreateNewJobFormContent({
  onClose,
  currentStep,
  onStepChange,
  jobId,
  categories,
  categoriesLoading,
  isCreating,
  isUpdating,
}: CreateNewJobFormContentProps) {
  const { watch, trigger, reset } = useFormContext<JobFormData>();

  // Load saved draft on mount
  useEffect(() => {
    if (!jobId) {
      const savedData = localStorage.getItem("workly_post_job_draft");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed && Object.keys(parsed).length > 0) {
            reset(parsed);
          }
        } catch (e) {
          console.error("Failed to parse saved job draft:", e);
        }
      }
    }
  }, [reset, jobId]);

  // Save draft to localStorage on values change
  const allFormValues = watch();
  useEffect(() => {
    if (!jobId && allFormValues && Object.keys(allFormValues).length > 0) {
      localStorage.setItem(
        "workly_post_job_draft",
        JSON.stringify(allFormValues),
      );
    }
  }, [allFormValues, jobId]);

  const handleCancel = () => {
    localStorage.removeItem("workly_post_job_draft");
    localStorage.removeItem("workly_post_job_step");
    if (onClose) onClose();
  };

  const handleNext = async () => {
    let fieldsToValidate: Array<keyof JobFormData> = [];
    if (currentStep === 1) {
      fieldsToValidate = [
        "title",
        "jobType",
        "experienceLevel",
        "location",
        "industryId",
        "discipline",
      ];
    } else if (currentStep === 2) {
      fieldsToValidate = ["description", "requirements"];
    } else if (currentStep === 3) {
      fieldsToValidate = ["salaryMin", "salaryMax", "currency"];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid && currentStep < 4) {
      onStepChange(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8">
      {currentStep === 1 && (
        <Step1BasicInfo
          categories={categories}
          categoriesLoading={categoriesLoading}
        />
      )}

      {currentStep === 2 && <Step2JobDetails />}

      {currentStep === 3 && <Step3Compensation />}

      {currentStep === 4 && <Step4ApplicationSettings />}

      <FormNavigation
        currentStep={currentStep}
        isCreating={isCreating}
        isUpdating={isUpdating}
        jobId={jobId}
        handleCancel={handleCancel}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </div>
  );
}
