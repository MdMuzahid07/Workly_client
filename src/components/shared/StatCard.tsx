import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import type { ReactNode } from "react";

export type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  trend?: {
    value: string;
    type: "up" | "down" | "neutral";
  };
  testId?: string;
};

export function StatCard({
  title,
  value,
  description,
  icon,
  ctaHref,
  ctaLabel,
  trend,
  testId,
}: StatCardProps) {
  return (
    <Card className="bg-card group overflow-hidden rounded-xl border transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1 sm:p-6 sm:pb-2">
        <CardTitle
          id={testId ? `${testId}-title` : undefined}
          className="text-muted-foreground group-hover:text-foreground line-clamp-1 text-[11px] font-medium transition-colors duration-300 sm:text-sm"
        >
          {title}
        </CardTitle>
        <span
          className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors duration-300"
          aria-hidden
        >
          {icon}
        </span>
      </CardHeader>
      <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
        <p
          className="text-foreground mt-0.5 text-lg font-bold tracking-tight tabular-nums sm:mt-1 sm:text-2xl"
          aria-labelledby={testId ? `${testId}-title` : undefined}
        >
          {value}
        </p>

        {trend && (
          <div className="mt-1 flex items-center gap-1 sm:mt-1.5">
            <span
              className={`text-[10px] font-bold sm:text-xs ${
                trend.type === "up"
                  ? "text-emerald-500"
                  : trend.type === "down"
                    ? "text-amber-500"
                    : "text-muted-foreground"
              }`}
            >
              {trend.value.split(" ")[0]}
            </span>
            <span className="text-muted-foreground text-[10px] sm:text-xs">
              {trend.value.split(" ").slice(1).join(" ")}
            </span>
          </div>
        )}

        {description && !trend && (
          <p className="text-muted-foreground mt-1 line-clamp-1 text-[10px] leading-tight sm:mt-1.5 sm:text-xs sm:leading-relaxed">
            {description}
          </p>
        )}

        {ctaHref && ctaLabel && (
          <div className="mt-1.5 sm:mt-2.5">
            <Link href={ctaHref}>
              <Button
                variant="link"
                className="text-primary h-auto p-0 text-[11px] font-semibold hover:underline sm:text-xs"
                aria-describedby={testId ? `${testId}-title` : undefined}
              >
                {ctaLabel}
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
