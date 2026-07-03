"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookmarkCheck, LucideIcon, Timer } from "lucide-react";

interface StatItemProps {
  label: string;
  value: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  trend?: string;
  delay?: number;
}

const StatsCards = ({
  totalSaved,
  expiringSoon,
}: {
  totalSaved: number;
  expiringSoon: number;
}) => {
  return (
    <div className="mb-6 grid grid-cols-2 gap-2.5 sm:mb-8 sm:gap-4 lg:gap-6">
      <StatItem
        label="Total Saved Jobs"
        value={totalSaved}
        icon={BookmarkCheck}
        iconColor="text-primary"
        iconBg="bg-primary/10"
        trend="Keep tracking"
        delay={0.1}
      />
      <StatItem
        label="Expiring Soon"
        value={expiringSoon}
        icon={Timer}
        iconColor="text-amber-500"
        iconBg="bg-amber-50 dark:bg-amber-500/10"
        trend="Act fast"
        delay={0.2}
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
  trend,
  delay,
}: StatItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <Card className="bg-card relative overflow-hidden rounded-2xl border transition-all hover:shadow-sm">
      <CardContent className="p-3.5 sm:p-4 lg:p-5 xl:p-6">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex items-center justify-center rounded-xl p-2 transition-transform hover:scale-105 sm:p-2.5 lg:p-3",
              iconBg,
            )}
          >
            <Icon
              className={cn("h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6", iconColor)}
            />
          </div>
          {trend && (
            <div className="bg-muted text-muted-foreground shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase sm:text-[10px]">
              {trend}
            </div>
          )}
        </div>
        <div className="mt-3 sm:mt-4 lg:mt-5">
          <h3 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
            {value}
          </h3>
          <p className="text-muted-foreground mt-1 truncate text-[11px] leading-tight font-semibold sm:text-xs lg:text-sm">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default StatsCards;
