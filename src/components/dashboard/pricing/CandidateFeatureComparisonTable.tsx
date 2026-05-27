"use client";

import { CANDIDATE_COMPARISON_FEATURES } from "@/constants/pricing";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";
import React from "react";

export default function CandidateFeatureComparisonTable() {
  return (
    <div className="mt-20 space-y-12">
      <div className="text-center">
        <h2 className="text-foreground text-3xl font-bold tracking-tight">
          Compare Seeker features
        </h2>
        <p className="text-muted-foreground mt-4">
          Detailed breakdown of what you get with each subscription plan.
        </p>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-muted/30 border-b">
                <th className="text-muted-foreground px-6 py-5 text-sm font-bold tracking-wider uppercase">
                  Capabilities
                </th>
                <th className="text-muted-foreground px-6 py-5 text-center text-sm font-bold tracking-wider uppercase">
                  Free Seeker
                </th>
                <th className="text-primary px-6 py-5 text-center text-sm font-bold tracking-wider uppercase">
                  Pro Candidate
                </th>
                <th className="text-muted-foreground px-6 py-5 text-center text-sm font-bold tracking-wider uppercase">
                  Elite Seeker
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {CANDIDATE_COMPARISON_FEATURES.map((section, sIdx) => (
                <React.Fragment key={sIdx}>
                  <tr className="bg-muted/10">
                    <td
                      colSpan={4}
                      className="text-primary/60 px-6 py-3 text-xs font-black tracking-widest uppercase"
                    >
                      {section.category}
                    </td>
                  </tr>
                  {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    section.features.map((feature: any, fIdx) => (
                      <tr
                        key={fIdx}
                        className="hover:bg-muted/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-foreground text-sm font-medium">
                            {feature.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <ComparisonCell value={feature.free} />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <ComparisonCell value={feature.pro} isPro />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <ComparisonCell value={feature.elite} />
                        </td>
                      </tr>
                    ))
                  }
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ComparisonCell({
  value,
  isPro,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  isPro?: boolean;
}) {
  if (value === true)
    return (
      <Check
        className={cn(
          "mx-auto h-5 w-5",
          isPro ? "text-primary" : "text-emerald-500",
        )}
      />
    );
  if (value === false)
    return <Minus className="text-muted-foreground/30 mx-auto h-5 w-5" />;
  if (value === "-") return <span className="text-muted-foreground/30">-</span>;

  return (
    <span
      className={cn(
        "text-sm font-semibold",
        isPro ? "text-primary" : "text-foreground",
      )}
    >
      {value}
    </span>
  );
}
