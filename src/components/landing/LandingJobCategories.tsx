"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  BarChart3,
  Briefcase,
  CircleDollarSign,
  Code2,
  Compass,
  Headset,
  Layers,
  Palette,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import getIconComponent from "../../helper/getIconComponent";
import { useGetCategoriesQuery } from "../../redux/feature/category/categoryApi";
import type { ComponentType } from "react";

interface RawCategory {
  id?: string;
  name: string;
  icon?: string;
  _count?: { jobs?: number };
}

interface DisplayCategory {
  icon: ComponentType<{ className?: string }>;
  title: string;
  count: string;
  color: string;
  isReal?: boolean;
}

const categories: DisplayCategory[] = [
  {
    icon: Code2,
    title: "Software Engineering",
    count: "12,540+ open positions",
    color: "bg-primary",
  },
  {
    icon: Palette,
    title: "UI/UX & Creative Design",
    count: "8,210+ open positions",
    color: "bg-accent",
  },
  {
    icon: Layers,
    title: "Product Management",
    count: "4,190+ open positions",
    color: "bg-primary",
  },
  {
    icon: TrendingUp,
    title: "Marketing & Growth",
    count: "6,800+ open positions",
    color: "bg-accent",
  },
  {
    icon: CircleDollarSign,
    title: "Finance & Accounting",
    count: "5,340+ open positions",
    color: "bg-primary",
  },
  {
    icon: Headset,
    title: "Customer Support & Success",
    count: "3,110+ open positions",
    color: "bg-accent",
  },
  {
    icon: BarChart3,
    title: "Data Science & AI",
    count: "7,850+ open positions",
    color: "bg-primary",
  },
  {
    icon: Briefcase,
    title: "Human Resources & Recruiting",
    count: "2,490+ open positions",
    color: "bg-accent",
  },
];

const LandingJobCategoriesSkeleton = () => {
  return (
    <section className="bg-background/95 relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header Skeleton */}
        <div className="mb-16 flex flex-col items-center text-center sm:mb-20">
          <div className="bg-muted mb-4 h-9 w-44 animate-pulse rounded-full" />
          <div className="bg-muted mb-4 h-10 w-96 animate-pulse rounded-md" />
          <div className="bg-muted h-5 w-80 animate-pulse rounded-md" />
        </div>

        {/* Categories Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <Card
              key={index}
              className="border-border/40 bg-card/50 relative rounded-2xl border p-6 backdrop-blur-md"
            >
              <div className="space-y-4">
                <div className="bg-muted h-12 w-12 animate-pulse rounded-xl" />
                <div className="bg-muted h-6 w-3/4 animate-pulse rounded-md" />
                <div className="bg-muted h-4 w-1/2 animate-pulse rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const LandingJobCategories = () => {
  const router = useRouter();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery(undefined);
  const fetchedCategories: RawCategory[] = categoriesData?.data || [];

  const displayCategories: DisplayCategory[] =
    fetchedCategories.length > 0
      ? fetchedCategories.slice(0, 8).map((cat: RawCategory) => {
          const { icon: IconComponent, color } = getIconComponent(cat.icon);
          return {
            icon: IconComponent,
            title: cat.name,
            count:
              cat._count?.jobs !== undefined
                ? `${cat._count.jobs} open positions`
                : `${Math.floor(Math.random() * 50) + 10} open positions`,
            color: color || "bg-emerald-500",
            isReal: true,
          };
        })
      : categories;

  const handleCategoryClick = (cat: DisplayCategory) => {
    router.push(`/jobs?category=${encodeURIComponent(cat.title)}`);
  };

  if (categoriesLoading) {
    return <LandingJobCategoriesSkeleton />;
  }

  return (
    <section className="bg-background/95 relative overflow-hidden py-24 sm:py-32">
      {/* Interactive Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-primary/5 absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full blur-[130px]" />
        <div className="bg-accent/5 absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex"
          >
            <Badge className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 gap-2 border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all">
              <Compass className="h-4 w-4" />
              Explore by Industry
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Browse Jobs by{" "}
            <span className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
              Category
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base sm:text-lg"
          >
            Find your perfect niche. Search thousands of highly-rewarding career
            options cataloged by sector.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayCategories.map((cat: DisplayCategory, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Card
                onClick={() => handleCategoryClick(cat)}
                className="group border-border/40 bg-card/50 hover:border-primary hover:bg-card/80 relative cursor-pointer overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition-all duration-500"
              >
                {/* Dynamic Gradient Overlay */}
                <div className="from-primary/5 to-accent/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Category Icon Container */}
                  <div className="bg-muted/65 group-hover:bg-primary mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 group-hover:text-white">
                    <cat.icon className="h-6 w-6 transition-transform duration-500" />
                  </div>

                  {/* Content */}
                  <h3 className="text-foreground group-hover:text-primary text-lg font-bold tracking-tight transition-all duration-500">
                    {cat.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {cat.count}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingJobCategories;
