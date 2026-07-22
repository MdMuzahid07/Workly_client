'use client';

import { ArrowRight, ArrowUpRight, Bookmark, Building2, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { startTransition, useOptimistic } from 'react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

interface Company {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  description?: string | null;
  location: string;
  size?: string | null;
  openJobs: number;
  featured?: boolean;
  industry?: {
    name: string;
  } | null;
}

interface CompanyCardProps {
  company: Company;
  viewType?: 'grid' | 'list';
  onBookmark?: (companyId: string) => Promise<void>;
  isBookmarked?: boolean;
}

export function CompanyCard({
  company,
  viewType = 'list',
  onBookmark,
  isBookmarked = false,
}: CompanyCardProps) {
  // Use optimistic UI for bookmark state
  const [optimisticBookmarked, setOptimisticBookmarked] = useOptimistic(isBookmarked);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!onBookmark) return;

    // Optimistically update UI
    startTransition(() => {
      setOptimisticBookmarked(!optimisticBookmarked);
    });

    try {
      await onBookmark(company.id);
    } catch (error) {
      console.error('Failed to bookmark company:', error);
    }
  };

  // Grid View Card
  if (viewType === 'grid') {
    return (
      <Card className="group hover:border-primary/50 bg-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 p-5 transition-all duration-300 dark:border-slate-800">
        <Link
          href={`/companies/${company.slug}`}
          className="relative flex h-full flex-col"
          prefetch={false}
        >
          {/* Top section: Logo, Title, Featured */}
          <div className="mb-4 flex gap-3">
            <div className="border-border/30 relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-slate-800">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  sizes="56px"
                  className="rounded-xl object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Building2 className="text-primary/40 h-7 w-7" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-foreground line-clamp-2 text-base leading-tight font-bold">
                    {company.name}
                  </h3>
                </div>
                {company.featured && (
                  <Badge className="bg-primary shrink-0 rounded-md text-xs whitespace-nowrap text-white">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-primary mt-1 text-xs font-medium">
                {company.industry?.name ?? 'Industry'}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-4 line-clamp-2 flex-1 text-sm leading-relaxed">
            {company.description ?? 'No description available'}
          </p>

          {/* Info pills */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-1.5">
              <MapPin className="h-3 w-3" />
              <span className="text-xs">{company.location}</span>
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <Users className="h-3 w-3" />
              <span className="text-xs">{company.size ?? 'N/A'} staff</span>
            </Badge>
          </div>

          {/* Footer */}
          <div className="border-border/20 flex items-center justify-between gap-3 border-t pt-3">
            <div>
              {company.openJobs > 0 ? (
                <span className="text-primary inline-flex items-center gap-1 text-xs font-semibold">
                  <span className="bg-primary h-2 w-2 rounded-full" />
                  {company.openJobs} {company.openJobs === 1 ? 'Opening' : 'Openings'}
                </span>
              ) : (
                <span className="text-muted-foreground text-xs">No openings</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="group/btn gap-1.5 bg-transparent"
                asChild
              >
                <span>
                  Visit
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </span>
              </Button>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="group hover:border-primary/50 bg-card relative overflow-hidden rounded-2xl border border-gray-100 transition-all duration-300 dark:border-slate-800">
      <div className="relative flex items-start justify-between gap-3 p-3 sm:gap-5 sm:p-5">
        {/* Left section */}
        <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-4">
          {/* Logo */}
          <Link
            href={`/companies/${company.slug}`}
            className="border-border/20 relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border bg-white shadow-sm sm:h-16 sm:w-16 dark:bg-slate-800"
            prefetch={false}
          >
            {company.logo ? (
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                fill
                sizes="(max-width: 640px) 40px, 64px"
                className="rounded-xl object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Building2 className="text-primary/40 h-5 w-5 sm:h-8 sm:w-8" />
              </div>
            )}
          </Link>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-start gap-1.5 sm:mb-1 sm:gap-2">
              <div className="min-w-0 flex-1">
                <Link
                  href={`/companies/${company.slug}`}
                  className="hover:text-primary transition-colors"
                  prefetch={false}
                >
                  <h3 className="text-foreground line-clamp-1 text-sm font-bold sm:text-base">
                    {company.name}
                  </h3>
                </Link>
              </div>
              {company.featured && (
                <Badge className="bg-primary shrink-0 rounded-md text-[9px] whitespace-nowrap text-white sm:text-xs">
                  Featured
                </Badge>
              )}
            </div>

            <p className="text-primary mb-1 text-[10px] font-semibold sm:mb-2 sm:text-xs">
              {company.industry?.name ?? 'Industry'}
            </p>

            <p className="text-muted-foreground mb-1.5 line-clamp-1 text-[11px] sm:mb-2.5 sm:line-clamp-2 sm:text-sm">
              {company.description ?? 'No description available'}
            </p>

            <div className="text-muted-foreground flex flex-wrap gap-2 text-[10px] sm:gap-3 sm:text-xs">
              <span className="flex items-center gap-0.5 sm:gap-1">
                <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                <span className="truncate">{company.location}</span>
              </span>
              <span className="flex items-center gap-0.5 sm:gap-1">
                <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                {company.size ?? 'N/A'} emp
              </span>
            </div>
          </div>
        </div>

        {/* Right section: Status + Actions */}
        <div className="flex shrink-0 flex-col items-end gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {company.openJobs > 0 && (
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary text-[9px] sm:text-xs"
              >
                {company.openJobs} Open
              </Badge>
            )}
            {onBookmark && (
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 sm:h-8 sm:w-8"
                aria-label={optimisticBookmarked ? 'Remove bookmark' : 'Bookmark company'}
                onClick={handleBookmark}
                type="button"
              >
                <Bookmark
                  className={`h-3.5 w-3.5 transition-colors sm:h-4 sm:w-4 ${
                    optimisticBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground'
                  }`}
                />
              </Button>
            )}
          </div>

          <Button
            size="icon"
            className="group/btn h-7 w-7 sm:h-8 sm:w-auto sm:gap-1.5 sm:px-3"
            asChild
          >
            <Link href={`/companies/${company.slug}`} prefetch={false}>
              <span className="hidden sm:inline sm:text-xs">View</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1 sm:h-3.5 sm:w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default CompanyCard;
