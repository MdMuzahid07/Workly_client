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
    <Card className="bg-card group overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          id={testId ? `${testId}-title` : undefined}
          className="text-muted-foreground group-hover:text-foreground text-xs font-medium transition-colors duration-300 sm:text-sm"
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
      <CardContent>
        <p
          className="text-foreground mt-1 text-2xl font-bold tracking-tight tabular-nums"
          aria-labelledby={testId ? `${testId}-title` : undefined}
        >
          {value}
        </p>

        {trend && (
          <div className="mt-1.5 flex items-center gap-1">
            <span
              className={`text-xs font-bold ${
                trend.type === "up"
                  ? "text-emerald-500"
                  : trend.type === "down"
                    ? "text-amber-500"
                    : "text-muted-foreground"
              }`}
            >
              {trend.value.split(" ")[0]}
            </span>
            <span className="text-muted-foreground text-xs">
              {trend.value.split(" ").slice(1).join(" ")}
            </span>
          </div>
        )}

        {description && !trend && (
          <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
            {description}
          </p>
        )}

        {ctaHref && ctaLabel && (
          <div className="mt-2.5">
            <Link href={ctaHref}>
              <Button
                variant="link"
                className="text-primary h-auto p-0 text-xs font-semibold hover:underline"
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
