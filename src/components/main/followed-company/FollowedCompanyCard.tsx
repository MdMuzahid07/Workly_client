"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FollowedCompany } from "@/data/mockFollowedCompanies";
import { motion } from "framer-motion";
import { Building2, ExternalLink, MapPin, Users2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FollowedCompanyCardProps {
  company: FollowedCompany;
  index: number;
}

const FollowedCompanyCard = ({ company, index }: FollowedCompanyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="group bg-card relative overflow-hidden border">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-muted/30 relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border p-2">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div>
                <h3 className="line-clamp-1 text-lg font-bold tracking-tight">
                  {company.name}
                </h3>
                <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 opacity-70" />
                    {company.industry}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive hover:border-destructive/30 h-8 rounded-full border px-4 text-xs font-bold hover:text-white"
            >
              Unfollow
            </Button>
          </div>

          <div className="mt-4">
            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed font-medium opacity-80">
              {company.description}
            </p>
          </div>

          <div className="border-border/40 mt-6 grid grid-cols-2 gap-4 border-t pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                Location
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <MapPin className="text-primary h-3.5 w-3.5" />
                {company.location}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                Following Since
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Users2 className="text-primary h-3.5 w-3.5" />
                {new Date(company.followedSince).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase">
              {company.openPositions} Active Jobs
            </div>
            <Link
              href={`/companies/${company.id}`}
              className="text-primary flex items-center gap-1.5 text-xs font-black tracking-tight underline-offset-4 hover:underline"
            >
              View Profile
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FollowedCompanyCard;
