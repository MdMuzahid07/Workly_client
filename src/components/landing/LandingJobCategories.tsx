/* eslint-disable @typescript-eslint/no-explicit-any */
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

const categories = [
  {
    icon: Code2,
    title: "Software Engineering",
    count: "12,540+ open positions",
    color: "primary",
    bgColor: "bg-primary/5",
    hoverBg: "hover:bg-primary/10",
  },
  {
    icon: Palette,
    title: "UI/UX & Creative Design",
    count: "8,210+ open positions",
    color: "accent",
    bgColor: "bg-accent/5",
    hoverBg: "hover:bg-accent/10",
  },
  {
    icon: Layers,
    title: "Product Management",
    count: "4,190+ open positions",
    color: "primary",
    bgColor: "bg-primary/5",
    hoverBg: "hover:bg-primary/10",
  },
  {
    icon: TrendingUp,
    title: "Marketing & Growth",
    count: "6,800+ open positions",
    color: "accent",
    bgColor: "bg-accent/5",
    hoverBg: "hover:bg-accent/10",
  },
  {
    icon: CircleDollarSign,
    title: "Finance & Accounting",
    count: "5,340+ open positions",
    color: "primary",
    bgColor: "bg-primary/5",
    hoverBg: "hover:bg-primary/10",
  },
  {
    icon: Headset,
    title: "Customer Support & Success",
    count: "3,110+ open positions",
    color: "accent",
    bgColor: "bg-accent/5",
    hoverBg: "hover:bg-accent/10",
  },
  {
    icon: BarChart3,
    title: "Data Science & AI",
    count: "7,850+ open positions",
    color: "primary",
    bgColor: "bg-primary/5",
    hoverBg: "hover:bg-primary/10",
  },
  {
    icon: Briefcase,
    title: "Human Resources & Recruiting",
    count: "2,490+ open positions",
    color: "accent",
    bgColor: "bg-accent/5",
    hoverBg: "hover:bg-accent/10",
  },
];

const LandingJobCategories = () => {
  const router = useRouter();
  const { data: categoriesData } = useGetCategoriesQuery(undefined);
  const fetchedCategories = categoriesData?.data || [];

  const displayCategories =
    fetchedCategories?.length > 0
      ? fetchedCategories.slice(0, 8).map((cat: any) => {
          const { icon: IconComponent, color } = getIconComponent(cat.icon);
          return {
            icon: IconComponent,
            title: cat.name,
            count: cat.count
              ? `${cat.count.split(" ")[0]} open positions`
              : `${Math.floor(Math.random() * 50) + 10} open positions`,
            color: color || "bg-emerald-500",
            isReal: true,
          };
        })
      : categories.map((cat) => ({
          icon: cat.icon,
          title: cat.title,
          count: cat.count,
          color: cat.color === "primary" ? "bg-primary" : "bg-accent",
          isReal: false,
        }));

  const handleCategoryClick = (cat: any) => {
    router.push(`/jobs?category=${encodeURIComponent(cat.title)}`);
  };

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
          {displayCategories.map((cat: any, index: number) => (
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
                className="group border-border/40 bg-card/50 hover:border-border hover:bg-card/80 hover:shadow-primary/5 relative cursor-pointer overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition-all duration-500 hover:shadow-lg"
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
