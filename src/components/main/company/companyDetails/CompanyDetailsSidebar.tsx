import {
  ExternalLink,
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  Phone,
  Twitter,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { Button } from '../../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import {
  useFollowCompanyMutation,
  useIsFollowingQuery,
  useUnfollowCompanyMutation,
} from '@/redux/feature/follow/followApi';
import { useGetCompaniesQuery } from '@/redux/feature/company/companyApi';
import { toast } from 'sonner';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface CompanyCount {
  employees?: number;
  jobs?: number;
}

interface Company {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  industry?: string | { name: string } | null;
  location?: string | null;
  size?: string | null;
  founded?: string | number | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  socialLinks?: SocialLink[];
  _count?: CompanyCount;
  openJobs?: number;
}

const CompanyDetailsSidebar = ({ company }: { company: Company }) => {
  const { data: followStatus, isLoading: isStatusLoading } = useIsFollowingQuery(company.id);
  const [followCompany, { isLoading: isFollowingMutation }] = useFollowCompanyMutation();
  const [unfollowCompany, { isLoading: isUnfollowingMutation }] = useUnfollowCompanyMutation();

  const isFollowing = followStatus?.data;

  const handleToggleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowCompany(company.id).unwrap();
        toast.success(`Unfollowed ${company.name}`);
      } else {
        await followCompany(company.id).unwrap();
        toast.success(`Following ${company.name}`);
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || 'Something went wrong');
    }
  };

  const industryName =
    typeof company.industry === 'string' ? company.industry : company.industry?.name || '';

  const { data: companiesData, isLoading: companiesLoading } = useGetCompaniesQuery({
    limit: 10,
  });

  const similarCompaniesList = useMemo(() => {
    const raw = (companiesData?.data?.result || companiesData?.data || []) as Company[];
    const filtered = raw.filter((c: Company) => c.id !== company.id);

    // Filter by same industry
    const matching = filtered.filter((c: Company) => {
      const cIndustry = typeof c.industry === 'string' ? c.industry : c.industry?.name;
      return cIndustry === industryName;
    });

    if (matching.length > 0) {
      return matching.slice(0, 3);
    }
    // Fallback to any other companies if no industry matches
    return filtered.slice(0, 3);
  }, [companiesData, company.id, industryName]);

  return (
    <div className="space-y-6">
      <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
        <CardContent className="p-6">
          <Button
            disabled={isStatusLoading || isFollowingMutation || isUnfollowingMutation}
            onClick={handleToggleFollow}
            className="bg-primary hover:bg-primary/95 mb-3 h-11 w-full rounded-xl font-bold text-white shadow-sm transition-transform active:scale-98"
          >
            {isFollowingMutation || isUnfollowingMutation ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isFollowing ? 'Unfollow Company' : 'Follow Company'}
          </Button>
          <Button
            variant="outline"
            className="border-primary/20 hover:bg-primary/5 hover:text-primary h-11 w-full rounded-xl bg-transparent font-bold transition-all duration-300 active:scale-98"
            onClick={() => {
              document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View All Jobs
          </Button>
        </CardContent>
      </Card>

      <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Company Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-secondary-foreground">Team members</span>
            <span className="font-medium">{company?._count?.employees || 0}</span>
          </div>
          <div className="bg-border/20 h-px w-full" />
          <div
            className="group/stat hover:text-primary flex cursor-pointer items-center justify-between transition-colors duration-200"
            onClick={() => {
              document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-secondary-foreground group-hover/stat:text-primary transition-colors">
              Open Jobs
            </span>
            <span className="text-primary decoration-primary/20 group-hover/stat:decoration-primary font-semibold underline underline-offset-4 transition-colors">
              {company?._count?.jobs || 0}
            </span>
          </div>
          <div className="bg-border/20 h-px w-full" />
          <div className="flex items-center justify-between">
            <span className="text-secondary-foreground">Founded</span>
            <span className="font-medium">{company?.founded || 'Not specified'}</span>
          </div>
          <div className="bg-border/20 h-px w-full" />
          <div className="flex items-center justify-between">
            <span className="text-secondary-foreground">Company Size</span>
            <span className="font-medium">{company?.size || 'Not specified'}</span>
          </div>
        </CardContent>
      </Card>

      {(company?.contactEmail || company?.contactPhone) && (
        <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {company?.contactEmail && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                  <Mail className="text-primary h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                    Email
                  </span>
                  <a
                    href={`mailto:${company.contactEmail}`}
                    className="text-foreground hover:text-primary text-sm font-medium transition-colors"
                  >
                    {company.contactEmail}
                  </a>
                </div>
              </div>
            )}
            {company?.contactPhone && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                  <Phone className="text-primary h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                    Phone
                  </span>
                  <a
                    href={`tel:${company.contactPhone}`}
                    className="text-foreground hover:text-primary text-sm font-medium transition-colors"
                  >
                    {company.contactPhone}
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Connect With Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {company?.socialLinks && company.socialLinks.length > 0 ? (
            company.socialLinks.map((link: SocialLink) => {
              const platformMetaData: Record<
                string,
                {
                  icon: React.ComponentType<{ className?: string }>;
                  color: string;
                }
              > = {
                linkedin: { icon: Linkedin, color: 'bg-[#0A66C2]' },
                twitter: { icon: Twitter, color: 'bg-[#1DA1F2]' },
                github: { icon: Github, color: 'bg-[#333]' },
                facebook: { icon: Facebook, color: 'bg-[#1877F2]' },
                instagram: { icon: Instagram, color: 'bg-[#E4405F]' },
                website: { icon: Globe, color: 'bg-primary' },
              };

              const meta = platformMetaData[link.platform.toLowerCase()] || {
                icon: ExternalLink,
                color: 'bg-gray-600',
              };
              const Icon = meta.icon;

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-primary/5 border-primary/10 flex items-center gap-3 rounded-xl border p-3 transition-all duration-200"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded ${meta.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-secondary-foreground font-medium capitalize">
                    {link.platform}
                  </span>
                  <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
                </a>
              );
            })
          ) : (
            <p className="text-muted-foreground text-center text-sm italic">
              No social links provided.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Similar Companies */}
      <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Similar Companies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {companiesLoading ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-primary/10 animate-pulse space-y-2 rounded-xl border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-gray-200 dark:bg-slate-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-slate-800" />
                    <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-slate-800" />
                  </div>
                </div>
                <div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-slate-800" />
              </div>
            ))
          ) : similarCompaniesList.length === 0 ? (
            <div className="text-muted-foreground py-4 text-center text-xs font-semibold">
              No similar companies found
            </div>
          ) : (
            similarCompaniesList.map((similarCompany: Company, index: number) => {
              const openJobsCount = similarCompany._count?.jobs ?? similarCompany.openJobs ?? 0;
              return (
                <Link
                  key={similarCompany.id || index}
                  href={`/companies/${similarCompany.slug}`}
                  className="group block"
                >
                  <div className="border-primary/10 hover:border-primary/30 hover:bg-primary/5 cursor-pointer rounded-xl border p-3 transition-all">
                    <div className="mb-2 flex items-center gap-3">
                      {similarCompany.logoUrl ? (
                        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded bg-white">
                          <Image
                            src={similarCompany.logoUrl}
                            alt={`${similarCompany.name} logo`}
                            fill
                            sizes="32px"
                            className="object-contain p-0.5"
                          />
                        </div>
                      ) : (
                        <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded text-xs font-black">
                          {similarCompany.name ? similarCompany.name[0].toUpperCase() : 'C'}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="group-hover:text-primary truncate text-sm font-semibold transition-colors">
                          {similarCompany.name}
                        </h4>
                        <p className="text-muted-foreground truncate text-xs">
                          {typeof similarCompany.industry === 'string'
                            ? similarCompany.industry
                            : similarCompany.industry?.name || 'Technology'}{' '}
                          • {similarCompany.location || 'Remote'}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {openJobsCount > 0 ? `${openJobsCount} open jobs` : 'Hiring actively'}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetailsSidebar;
