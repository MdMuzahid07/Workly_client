'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUnfollowCompanyMutation } from '@/redux/feature/follow/followApi';
import { DisplayFollowedCompany } from '@/view/followed-company/FollowedCompaniesView';
import { Building2, ExternalLink, Loader2, MapPin, Users2 } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

interface FollowedCompanyCardProps {
  company: DisplayFollowedCompany;
  index: number;
}

const FollowedCompanyCard = ({ company, index }: FollowedCompanyCardProps) => {
  const [unfollowCompany, { isLoading: isUnfollowing }] = useUnfollowCompanyMutation();

  const handleUnfollow = async () => {
    try {
      await unfollowCompany(company.id).unwrap();
      toast.success(`Unfollowed ${company.name}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to unfollow company');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="group bg-card relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border transition-all hover:shadow-sm">
        <CardContent className="flex flex-1 flex-col justify-between p-4 sm:p-6">
          <div>
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="bg-background relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border shadow-2xs sm:h-16 sm:w-16 sm:rounded-2xl">
                  <Image src={company.logo} alt={company.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-1 text-base font-bold tracking-tight sm:text-lg">
                    {company.name}
                  </h3>
                  <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs font-medium sm:mt-1 sm:text-sm">
                    <Building2 className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{company.industry}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={isUnfollowing}
                onClick={handleUnfollow}
                className="text-destructive hover:bg-destructive hover:border-destructive/30 h-8 shrink-0 rounded-full border px-3 text-xs font-bold hover:text-white sm:px-4"
              >
                {isUnfollowing ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Unfollow'}
              </Button>
            </div>

            <div className="mt-3 sm:mt-4">
              <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed font-medium opacity-80 sm:text-sm">
                {company.description || 'Leading industry organization.'}
              </p>
            </div>
          </div>

          <div>
            <div className="border-border/40 mt-4 grid grid-cols-2 gap-3 border-t pt-3 sm:mt-6 sm:gap-4 sm:pt-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-[9px] font-black tracking-widest uppercase sm:text-[10px]">
                  Location
                </span>
                <div className="flex items-center gap-1.5 truncate text-xs font-bold">
                  <MapPin className="text-primary h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{company.location}</span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-[9px] font-black tracking-widest uppercase sm:text-[10px]">
                  Following Since
                </span>
                <div className="flex items-center gap-1.5 truncate text-xs font-bold">
                  <Users2 className="text-primary h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">
                    {new Date(company.followedSince).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 sm:mt-6">
              <div className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-[10px] font-black tracking-widest uppercase sm:px-3">
                {company.openPositions} Active Jobs
              </div>
              <Link
                href={`/companies/${company.slug}`}
                className="text-primary flex items-center gap-1.5 text-xs font-black tracking-tight underline-offset-4 hover:underline"
              >
                View Profile
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FollowedCompanyCard;
