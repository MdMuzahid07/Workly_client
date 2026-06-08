"use client";

import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  currentStep: number;
  isCreating: boolean;
  isUpdating: boolean;
  jobId?: string;
  handleCancel: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
}

export default function FormNavigation({
  currentStep,
  isCreating,
  isUpdating,
  jobId,
  handleCancel,
  handlePrevious,
  handleNext,
}: FormNavigationProps) {
  return (
    <div className="border-border flex items-center justify-between gap-3 border-t pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={currentStep === 1 ? handleCancel : handlePrevious}
        className="min-w-24"
      >
        {currentStep === 1 ? "Cancel" : "Previous"}
      </Button>

      <div className="flex gap-2">
        {currentStep < 4 ? (
          <Button type="button" onClick={handleNext} className="min-w-24">
            Next Step
          </Button>
        ) : (
          <Button
            type="submit"
            className="min-w-32"
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {jobId ? "Updating..." : "Creating..."}
              </span>
            ) : (
              <>{jobId ? "Update Job Posting" : "Create Job Posting"}</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
