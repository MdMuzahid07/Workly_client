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
  onStepChange?: (step: number) => void;
}

export default function StepProgress({
  steps,
  currentStep,
  onStepChange,
}: StepProgressProps) {
  return (
    <div className="w-full">
      {/* Mobile/Tablet Stepper: Minimal Progress Bar (Visible below lg) */}
      <div className="w-full lg:hidden">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <span className="text-primary/80 text-[10px] font-bold tracking-wider uppercase">
              Step {currentStep} of {steps.length}
            </span>
            <h3 className="text-foreground mt-0.5 text-sm font-bold">
              {steps[currentStep - 1]?.title}
            </h3>
          </div>
          <span className="text-foreground bg-muted/80 rounded px-2 py-0.5 text-xs font-bold">
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>
        <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Stepper: Premium Compact Vertical Timeline (Visible at lg and above) */}
      <div className="hidden space-y-6 lg:block">
        <div className="relative pl-0.5">
          {/* Central Vertical Connector Line */}
          <div className="bg-border absolute top-4 bottom-4 left-[15px] w-[1px] lg:left-[17px] xl:left-[21px]" />

          <div className="relative space-y-6 xl:space-y-8">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              const isUpcoming = stepNumber > currentStep;
              const isClickable = isCompleted && onStepChange;

              return (
                <div
                  key={step.id}
                  onClick={() => isClickable && onStepChange(stepNumber)}
                  className={cn(
                    "group flex gap-3 transition-all duration-200 select-none xl:gap-4",
                    isClickable ? "cursor-pointer" : "cursor-default",
                  )}
                >
                  {/* Step Indicator Circle */}
                  <div
                    className={cn(
                      "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 lg:h-9 lg:w-9 xl:h-10 xl:w-10",
                      isCompleted && [
                        "border-primary bg-primary text-primary-foreground",
                        isClickable &&
                          "group-hover:shadow-primary/20 group-hover:scale-105 group-hover:shadow-lg",
                      ],
                      isCurrent && [
                        "border-primary bg-primary/5 text-primary",
                        "ring-primary/20 ring-4",
                      ],
                      isUpcoming &&
                        "border-muted-foreground/20 bg-muted text-muted-foreground/60",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4.5 w-4.5 stroke-[2.5]" />
                    ) : (
                      <span className="text-xs font-black tracking-tight lg:text-sm">
                        {stepNumber}
                      </span>
                    )}
                  </div>

                  {/* Step Text Info */}
                  <div className="flex min-w-0 flex-col justify-center pt-0.5">
                    <p
                      className={cn(
                        "truncate text-[10px] font-bold tracking-wider uppercase transition-colors lg:text-xs",
                        isCurrent && "text-primary",
                        isCompleted && [
                          "text-foreground",
                          isClickable && "group-hover:text-primary",
                        ],
                        isUpcoming && "text-muted-foreground/50",
                      )}
                    >
                      {step.title}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 truncate text-[9px] leading-relaxed font-medium transition-colors lg:text-[10px] xl:text-[11px]",
                        isCurrent && "text-primary/70",
                        isCompleted && "text-muted-foreground/80",
                        isUpcoming && "text-muted-foreground/40",
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
