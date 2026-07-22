import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import type { ReactNode } from 'react';

export type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  trend?: {
    value: string;
    type: 'up' | 'down' | 'neutral';
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
    <Card className="bg-card group overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3.5 pb-1 sm:p-4 sm:pb-1.5 lg:p-5 lg:pb-2 xl:p-6 xl:pb-2">
        <CardTitle
          id={testId ? `${testId}-title` : undefined}
          className="text-muted-foreground group-hover:text-foreground line-clamp-1 text-[11px] font-semibold transition-colors duration-300 sm:text-xs lg:text-sm"
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
      <CardContent className="p-3.5 pt-0 sm:p-4 sm:pt-0 lg:p-5 lg:pt-0 xl:p-6 xl:pt-0">
        <p
          className="text-foreground mt-0.5 text-xl font-bold tracking-tight tabular-nums sm:mt-1 sm:text-2xl lg:text-3xl"
          aria-labelledby={testId ? `${testId}-title` : undefined}
        >
          {value}
        </p>

        {trend && (
          <div className="mt-1 flex items-center gap-1 sm:mt-1.5">
            <span
              className={`text-[10px] font-bold sm:text-xs ${
                trend.type === 'up'
                  ? 'text-emerald-500'
                  : trend.type === 'down'
                    ? 'text-amber-500'
                    : 'text-muted-foreground'
              }`}
            >
              {trend.value.split(' ')[0]}
            </span>
            <span className="text-muted-foreground text-[10px] sm:text-xs">
              {trend.value.split(' ').slice(1).join(' ')}
            </span>
          </div>
        )}

        {description && !trend && (
          <p className="text-muted-foreground mt-1 line-clamp-1 text-[10px] leading-relaxed leading-tight sm:mt-1.5 sm:text-xs">
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
