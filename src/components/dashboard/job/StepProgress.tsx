"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
}

export default function StepProgress({
  steps,
  currentStep,
}: StepProgressProps) {
  return (
    <div className="w-full py-4 sm:py-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-0">
        {/* Mobile: Simple Progress Bar */}
        <div className="lg:hidden">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-muted-foreground text-xs font-medium sm:text-sm">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-muted-foreground text-xs sm:text-sm">
              {Math.round((currentStep / steps.length) * 100)}%
            </span>
          </div>
          <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full sm:h-2">
            <div
              className="bg-primary h-full transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
          <p className="text-foreground mt-2 text-xs font-semibold sm:text-sm">
            {steps[currentStep - 1]?.title}
          </p>
        </div>

        {/* Desktop: Full Step Indicator */}
        <div className="hidden lg:block">
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              const isUpcoming = stepNumber > currentStep;

              return (
                <div
                  key={step.id}
                  className="relative flex flex-1 last:flex-none"
                >
                  <div className="flex flex-col items-center">
                    {/* Step Circle */}
                    <div
                      className={cn(
                        "z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                        isCompleted &&
                          "border-primary bg-primary text-primary-foreground",
                        isCurrent &&
                          "border-primary bg-primary/10 text-primary ring-primary/20 ring-4",
                        isUpcoming &&
                          "border-muted-foreground/20 bg-muted text-muted-foreground",
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-semibold">
                          {stepNumber}
                        </span>
                      )}
                    </div>

                    {/* Step Label */}
                    <div
                      className="absolute top-12 w-32 text-center"
                      style={{ left: "4.5%", transform: "translateX(-50%)" }}
                    >
                      <p
                        className={cn(
                          "truncate text-xs font-semibold transition-colors xl:text-sm",
                          isCurrent && "text-primary",
                          isCompleted && "text-foreground",
                          isUpcoming && "text-muted-foreground",
                        )}
                      >
                        {step.title}
                      </p>
                      <p
                        className={cn(
                          "text-muted-foreground mt-0.5 truncate text-[10px] xl:text-xs",
                          isCurrent && "text-primary/70",
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="bg-muted absolute top-5 right-0 left-10 z-0 h-0.5 -translate-y-1/2">
                      <div
                        className={cn(
                          "bg-primary h-full transition-all duration-300",
                          isCompleted ? "w-full" : "w-0",
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Spacer for absolute positioned labels */}
          <div className="h-10" />
        </div>
      </div>
    </div>
  );
}
