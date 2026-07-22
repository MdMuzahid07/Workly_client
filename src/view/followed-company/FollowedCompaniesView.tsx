'use client';

import DashboardFollowedCompaniesHeader from '@/components/dashboard/dashboard-nav/header/DashboardFollowedCompaniesHeader';
import FollowedCompanyCard from '@/components/main/followed-company/FollowedCompanyCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetFollowedCompaniesQuery } from '@/redux/feature/follow/followApi';
import FollowedCompaniesSkeleton from '@/skeleton/followed-company/FollowedCompaniesSkeleton';
import { Search } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export interface DisplayFollowedCompany {
  id: string;
  slug: string;
  name: string;
  logo: string;
  industry: string;
  description?: string;
  location: string;
  followedSince: string;
  openPositions: number;
}

interface CompanyIndustry {
  id: string;
  name: string;
}

interface FollowedCompanyInfo {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  description?: string;
  location?: string;
  industry?: CompanyIndustry;
  _count?: {
    jobs: number;
  };
}

interface FollowedCompanyItem {
  id: string;
  userId: string;
  companyId: string;
  followedAt: string;
  company: FollowedCompanyInfo;
}

const FollowedCompaniesView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: followedData, isLoading } = useGetFollowedCompaniesQuery({
    search: debouncedSearch || undefined,
    industry: categoryFilter !== 'all' ? categoryFilter : undefined,
  });

  const followedCompanies = useMemo(() => {
    if (!followedData?.data) return [];

    return (followedData.data as FollowedCompanyItem[]).map((follow) => ({
      id: follow.company.id,
      slug: follow.company.slug,
      name: follow.company.name,
      logo: follow.company.logoUrl || '/placeholder-logo.png',
      industry: follow.company.industry?.name || 'Other',
      description: follow.company.description || '',
      location: follow.company.location || 'Remote',
      followedSince: follow.followedAt,
      openPositions: follow.company._count?.jobs || 0,
    }));
  }, [followedData]);

  const industries = useMemo(() => {
    return ['all', ...(followedData?.meta?.industries || [])];
  }, [followedData?.meta?.industries]);

  return (
    <div className="min-h-screen pt-8">
      <DashboardFollowedCompaniesHeader />

      {isLoading ? (
        <FollowedCompaniesSkeleton />
      ) : (
        <div className="space-y-4 px-3.5 py-4 sm:space-y-6 sm:px-6 sm:py-8">
          {/* Filter Bar */}
          <Card className="bg-card rounded-2xl border">
            <CardContent className="flex flex-col gap-3 p-3.5 sm:p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
                {/* Search Input */}
                <div className="group relative w-full max-w-md flex-1">
                  <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
                  <Input
                    placeholder="Search followed companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-muted/20 border-border focus:bg-background h-9 rounded-full pl-9 text-xs transition-all sm:h-10 sm:text-sm"
                  />
                </div>

                {/* Filter and Button Row on Mobile */}
                <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-start">
                  <div className="flex flex-1 items-center gap-2 md:flex-initial">
                    <span className="text-muted-foreground/60 hidden text-[10px] font-black tracking-widest uppercase sm:inline-block">
                      Industry:
                    </span>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="bg-muted/20 border-border h-8 w-full cursor-pointer rounded-full text-xs font-bold sm:h-10 sm:text-sm md:w-48">
                        <SelectValue placeholder="All industries" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {industries.map((ind: string) => (
                          <SelectItem
                            key={ind}
                            className="cursor-pointer rounded-lg text-xs font-medium sm:text-sm"
                            value={ind}
                          >
                            {ind === 'all' ? 'All Industries' : ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Link href="/companies" className="shrink-0">
                    <Button className="h-8 rounded-full px-3 text-xs font-bold shadow-xs sm:h-10 sm:px-6 sm:text-sm">
                      Find More
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {followedCompanies.length > 0 ? (
                followedCompanies.map((company: DisplayFollowedCompany, index: number) => (
                  <FollowedCompanyCard key={company.id} company={company} index={index} />
                ))
              ) : (
                <div className="bg-card col-span-full flex flex-col items-center gap-4 rounded-xl border-2 border-dashed py-24 text-center">
                  <div className="bg-muted/20 rounded-full p-6">
                    <Search className="text-muted-foreground/20 h-10 w-10" />
                  </div>
                  <h3 className="text-foreground text-lg font-bold">No companies found</h3>
                  <p className="text-muted-foreground max-w-sm text-sm">
                    {searchTerm || categoryFilter !== 'all'
                      ? "Try adjusting your filters to find what you're looking for."
                      : "You haven't followed any companies yet."}
                  </p>
                  {!searchTerm && categoryFilter === 'all' && (
                    <Link href="/companies">
                      <Button className="mt-6 rounded-full font-bold">Explore Companies</Button>
                    </Link>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowedCompaniesView;
