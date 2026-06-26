import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import { motion } from "motion/react";
import { features } from "../../constants";
import { Card } from "../ui/card";

const LandingFeatures = () => {
  return (
    <section className="bg-background relative overflow-hidden px-4 py-14 sm:py-24 lg:py-32">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-primary/5 absolute h-[500px] w-[500px] rounded-full blur-[120px]" />
        <div className="bg-accent/5 absolute top-0 right-0 h-[400px] w-[400px] rounded-full blur-[100px]" />
        <div className="bg-primary/5 absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 text-center sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex"
          >
            <Badge className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 gap-1.5 border px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm transition-all sm:px-4 sm:py-2 sm:text-sm">
              <Zap className="fill-primary/20 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Platform Superpowers
            </Badge>
          </motion.div>

          <h2 className="text-foreground mb-6 text-2xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Everything You Need to{" "}
            <span className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
              Elevate
            </span>{" "}
            Your Career
          </h2>

          <p className="text-muted-foreground mx-auto max-w-2xl text-xs leading-relaxed sm:text-xl">
            Empowering professionals with state-of-the-art tools to find, apply,
            and succeed in the modern job market.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
          {features?.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.15,
                duration: 0.7,
                ease: [0.21, 1.02, 0.47, 0.98],
              }}
              className="h-full"
            >
              <Card className="group border-border/40 bg-card/50 hover:border-primary hover:bg-card/80 relative h-full overflow-hidden rounded-2xl border p-4 backdrop-blur-md transition-all duration-500 sm:p-8">
                {/* Dynamic Gradient Overlay */}
                <div className="from-primary/5 to-accent/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    {/* Premium Icon Container */}
                    <div className="bg-primary/10 text-primary ring-primary/20 group-hover:bg-primary mb-4 inline-flex h-10 w-10 origin-center items-center justify-center rounded-xl ring-1 transition-all duration-500 will-change-transform group-hover:rotate-12 group-hover:text-white sm:mb-8 sm:h-16 sm:w-16 sm:rounded-2xl">
                      <feature.icon className="h-5 w-5 sm:h-8 sm:w-8" />
                    </div>

                    {/* Content */}
                    <h3 className="text-foreground group-hover:text-primary mb-2 text-sm font-bold tracking-tight transition-all duration-500 sm:mb-4 sm:text-2xl">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground group-hover:text-foreground/80 text-[10px] leading-relaxed transition-colors duration-300 sm:text-base">
                    {feature.description}
                  </p>

                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="bg-primary/40 h-1.5 w-1.5 rounded-full" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
