"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Code2,
  Palette,
  Layers,
  TrendingUp,
  CircleDollarSign,
  Headset,
  BarChart3,
  Briefcase,
} from "lucide-react";

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
          {categories.map((cat, index) => (
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
                className={`group border-border/40 bg-card/45 hover:border-primary/30 relative overflow-hidden p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl`}
              >
                {/* Decorative Hover Radial Light */}
                <div className="from-primary/10 pointer-events-none absolute -inset-px bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Category Icon Container */}
                  <div
                    className={`bg-muted/65 group-hover:bg-primary mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 group-hover:text-white`}
                  >
                    <cat.icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  {/* Content */}
                  <h3 className="text-foreground group-hover:text-primary text-lg font-bold tracking-tight transition-colors duration-300">
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
