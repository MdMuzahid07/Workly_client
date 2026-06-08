"use client";

import WKDatePicker from "@/components/form/WKDatePicker";
import WKInput from "@/components/form/WkInput";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { JobFormData } from "../schema";

export default function Step4ApplicationSettings() {
  const { watch, setValue } = useFormContext<JobFormData>();
  const isFeatured = watch("isFeatured") || false;
  const autoCloseApplications = watch("autoCloseApplications") || false;
  const statusValue = watch("status") || "DRAFT";

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="animate-in fade-in-50 space-y-6 duration-300">
      <div>
        <h2 className="text-foreground text-lg font-semibold">
          Application Settings
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Configure how candidates can apply
        </p>
      </div>

      <div className="space-y-4">
        {/* Contact Email & Deadline */}
        <div className="grid gap-4 sm:grid-cols-2">
          <WKInput
            name="contactEmail"
            label="Contact Email"
            type="email"
            placeholder="hr@company.com"
            required
          />

          <WKDatePicker
            name="applicationDeadline"
            label="Application Deadline"
            required
            min={getTodayDate()}
          />
        </div>

        {/* Max Applications */}
        <WKInput
          name="maxApplications"
          label="Maximum Applications"
          type="number"
          placeholder="e.g., 100"
        />

        {/* Additional Options */}
        <div className="space-y-4">
          <div>
            <p className="text-foreground text-sm font-semibold">
              Additional Settings
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Optional configurations to customize your posting visibility and
              automation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Feature Option Card */}
            <div
              onClick={() => setValue("isFeatured", !isFeatured)}
              className={cn(
                "bg-card flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-200 select-none",
                isFeatured
                  ? "border-primary bg-primary/1 ring-primary/10 ring-2"
                  : "border-border hover:border-muted-foreground/30",
              )}
            >
              <div className="flex gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
                    isFeatured
                      ? "border-amber-500/20 bg-amber-500/10 text-amber-500"
                      : "border-border text-muted-foreground/60",
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isFeatured ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499c.158-.381.69-.381.847 0l2.35 4.823 5.317.773c.417.06.584.57.281.862l-3.847 3.748 1.08 5.289c.085.418-.352.735-.726.538l-4.72-2.485-4.72 2.485c-.374.197-.811-.12-.726-.538l1.08-5.289-3.847-3.748c-.303-.292-.136-.802.281-.862l5.317-.773 2.35-4.823Z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-foreground text-xs font-bold">
                    Feature Job Posting
                  </p>
                  <p className="text-muted-foreground mt-1 text-[10px] leading-normal">
                    Pin your listing to the top of search results and highlight
                    it for maximum candidate views.
                  </p>
                </div>
              </div>

              {/* Switch toggle on the right */}
              <div
                className={cn(
                  "flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out",
                  isFeatured ? "bg-primary" : "bg-muted",
                )}
              >
                <div
                  className={cn(
                    "h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out",
                    isFeatured ? "translate-x-5" : "translate-x-0",
                  )}
                />
              </div>
            </div>

            {/* Auto Close Option Card */}
            <div
              onClick={() =>
                setValue("autoCloseApplications", !autoCloseApplications)
              }
              className={cn(
                "bg-card flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-200 select-none",
                autoCloseApplications
                  ? "border-primary bg-primary/1 ring-primary/10 ring-2"
                  : "border-border hover:border-muted-foreground/30",
              )}
            >
              <div className="flex gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
                    autoCloseApplications
                      ? "bg-primary/10 border-primary/20 text-primary"
                      : "border-border text-muted-foreground/60",
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-foreground text-xs font-bold">
                    Auto-Close Applications
                  </p>
                  <p className="text-muted-foreground mt-1 text-[10px] leading-normal">
                    Automatically stop accepting new applications once the
                    maximum applicant cap is reached.
                  </p>
                </div>
              </div>

              {/* Switch toggle on the right */}
              <div
                className={cn(
                  "flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out",
                  autoCloseApplications ? "bg-primary" : "bg-muted",
                )}
              >
                <div
                  className={cn(
                    "h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out",
                    autoCloseApplications ? "translate-x-5" : "translate-x-0",
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status Selection */}
        <div className="space-y-4">
          <div>
            <p className="text-foreground text-sm font-semibold">
              Publication Status
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Choose how you want to publish this job listing.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Draft Card */}
            <div
              onClick={() => setValue("status", "DRAFT")}
              className={cn(
                "flex cursor-pointer gap-3.5 rounded-2xl border p-4 text-left transition-all duration-200 select-none",
                statusValue === "DRAFT"
                  ? "border-primary bg-primary/5 dark:bg-primary/1 ring-primary/10 ring-2"
                  : "border-border hover:border-muted-foreground/30 hover:bg-muted/10 bg-card",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  statusValue === "DRAFT"
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-border text-muted-foreground/60",
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </div>
              <div>
                <p
                  className={cn(
                    "text-xs font-bold transition-colors",
                    statusValue === "DRAFT"
                      ? "text-primary"
                      : "text-foreground",
                  )}
                >
                  Save as Draft
                </p>
                <p className="text-muted-foreground mt-1 text-[11px] leading-relaxed">
                  Visible only to your team. Candidates cannot view or apply to
                  this job yet.
                </p>
              </div>
            </div>

            {/* Publish Card */}
            <div
              onClick={() => setValue("status", "ACTIVE")}
              className={cn(
                "flex cursor-pointer gap-3.5 rounded-2xl border p-4 text-left transition-all duration-200 select-none",
                statusValue === "ACTIVE"
                  ? "border-primary bg-primary/5 dark:bg-primary/2 ring-primary/10 ring-2"
                  : "border-border hover:border-muted-foreground/30 hover:bg-muted/10 bg-card",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  statusValue === "ACTIVE"
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-border text-muted-foreground/60",
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </div>
              <div>
                <p
                  className={cn(
                    "text-xs font-bold transition-colors",
                    statusValue === "ACTIVE"
                      ? "text-primary"
                      : "text-foreground",
                  )}
                >
                  Publish Immediately
                </p>
                <p className="text-muted-foreground mt-1 text-[11px] leading-relaxed">
                  Publish active listing. Candidates will immediately see it and
                  can submit applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
