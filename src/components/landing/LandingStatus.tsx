import { Award, Briefcase, Building2, Users } from "lucide-react";
import { motion } from "motion/react";
import { useGetLandingStatsQuery } from "../../redux/feature/statistics/statisticsApi";
import AnimatedCounter from "../shared/AnimatedCounter";

const LandingStatus = () => {
  const { data: statsRes, isLoading } = useGetLandingStatsQuery();
  const stats = statsRes?.data;

  const getFormatType = (val: number, isPercent = false) => {
    if (isPercent) return "percent" as const;
    if (val >= 1000000) return "M" as const;
    if (val >= 1000) return "K" as const;
    return "commas" as const;
  };

  const statItems = [
    {
      icon: Briefcase,
      value: stats?.activeJobs ?? 0,
      label: "Active Jobs",
      color: "primary",
      formatType: getFormatType(stats?.activeJobs ?? 0),
    },
    {
      icon: Building2,
      value: stats?.companies ?? 0,
      label: "Companies",
      color: "accent",
      formatType: getFormatType(stats?.companies ?? 0),
    },
    {
      icon: Users,
      value: stats?.jobSeekers ?? 0,
      label: "Job Seekers",
      color: "primary",
      formatType: getFormatType(stats?.jobSeekers ?? 0),
    },
    {
      icon: Award,
      value: stats?.successRate ?? 95,
      label: "Success Rate",
      color: "accent",
      formatType: getFormatType(stats?.successRate ?? 95, true),
    },
  ];

  return (
    <section className="bg-background relative overflow-hidden py-10 sm:py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-[0.08]" />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-primary/8 absolute top-1/2 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="bg-accent/6 absolute top-1/2 right-1/4 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-12 lg:mb-16"
        >
          <h2 className="text-foreground text-2xl font-bold sm:text-4xl">
            Designed for Your Success
          </h2>
          <p className="text-muted-foreground mt-2.5 text-xs sm:text-lg">
            Join our thriving community of job seekers and employers
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {statItems.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group border-border/40 bg-card/50 hover:border-primary hover:bg-card/80 relative overflow-hidden rounded-2xl border p-6 text-center backdrop-blur-sm transition-all duration-500 sm:p-8"
            >
              <div className="from-primary/5 to-accent/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                {(() => {
                  const colorMap = {
                    primary: {
                      bg: "bg-primary/10",
                      text: "text-primary",
                      hoverBg: "group-hover:bg-primary",
                    },
                    accent: {
                      bg: "bg-accent/10",
                      text: "text-accent",
                      hoverBg: "group-hover:bg-accent",
                    },
                  };
                  const colors =
                    colorMap[stat.color as "primary" | "accent"] ||
                    colorMap.primary;
                  return (
                    <div
                      className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-500 will-change-transform group-hover:scale-110 group-hover:text-white sm:h-16 sm:w-16 ${colors.bg} ${colors.text} ${colors.hoverBg}`}
                    >
                      <stat.icon className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                  );
                })()}

                {isLoading || !stats ? (
                  <div className="bg-muted/60 mx-auto my-2.5 h-8 w-20 animate-pulse rounded" />
                ) : (
                  <div className="text-foreground mb-2 text-3xl font-bold transition-all duration-500 sm:text-4xl lg:text-5xl">
                    <AnimatedCounter
                      value={stat.value}
                      formatType={stat.formatType}
                    />
                  </div>
                )}

                <div className="text-muted-foreground text-sm font-medium sm:text-base">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingStatus;
