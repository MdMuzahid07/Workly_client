"use client";

import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Info } from "lucide-react";

interface ProfileHeaderProps {
  profileCompletion: number;
}

/**
 * Profile header component displaying completion status and progress
 */
export const ProfileHeader = ({ profileCompletion }: ProfileHeaderProps) => {
  return (
    <div className="mb-8 space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-foreground text-2xl font-bold tracking-tight">
            Corporate Identity
          </h1>
          <p className="text-muted-foreground text-sm">
            Fine-tune your brand presence and company details for potential
            candidates.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-3">
            <span className="text-primary text-2xl font-bold">
              {Math.round(profileCompletion)}%
            </span>
            <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Profile Strength
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Progress value={profileCompletion} className="h-2.5" />
        <div
          className={`flex items-center gap-2 rounded-xl p-3.5 text-sm ring-1 transition-all ${
            profileCompletion >= 80
              ? "bg-emerald-500/5 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400"
              : "bg-primary/5 ring-primary/20 text-primary"
          }`}
        >
          {profileCompletion >= 80 ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <Info className="h-4 w-4 shrink-0" />
          )}
          <p className="font-medium">
            {profileCompletion >= 80
              ? "Excellent! Your company profile is highly detailed and ready to attract top talent."
              : "Boosting your profile strength to 80% or above significantly increases candidate engagement."}
          </p>
        </div>
      </div>
    </div>
  );
};
