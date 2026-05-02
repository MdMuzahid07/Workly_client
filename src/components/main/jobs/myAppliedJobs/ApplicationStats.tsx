"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Briefcase, LucideIcon, Search, Trophy, Users } from "lucide-react";

interface StatItemProps {
  label: string;
  value: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  delay?: number;
}

export const ApplicationStats = ({
  stats,
}: {
  stats: {
    total: number;
    inReview: number;
    interviewing: number;
    offer: number;
  };
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <StatItem
        label="Total Applications"
        value={stats.total}
        icon={Briefcase}
        iconColor="text-emerald-500"
        iconBg="bg-emerald-50 dark:bg-emerald-500/10"
        delay={0.1}
      />
      <StatItem
        label="In Review"
        value={stats.inReview}
        icon={Search}
        iconColor="text-blue-500"
        iconBg="bg-blue-50 dark:bg-blue-500/10"
        delay={0.2}
      />
      <StatItem
        label="Interviewing"
        value={stats.interviewing}
        icon={Users}
        iconColor="text-purple-500"
        iconBg="bg-purple-50 dark:bg-purple-500/10"
        delay={0.3}
      />
      <StatItem
        label="Offer Received"
        value={stats.offer}
        icon={Trophy}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-50 dark:bg-emerald-600/10"
        delay={0.4}
      />
    </div>
  );
};

const StatItem = ({
  label,
  value,
  icon: Icon,
  iconColor,
  iconBg,
  delay,
}: StatItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <Card className="bg-card relative overflow-hidden border">
      <CardContent>
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex items-center justify-center rounded-xl p-3 transition-transform hover:scale-105",
              iconBg,
            )}
          >
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-primary text-xl font-bold sm:text-2xl">
            {value}
          </h3>
          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
