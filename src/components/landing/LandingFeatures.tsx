import { Badge, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { features } from "../../constants";
import { Card } from "../ui/card";

const LandingFeatures = () => {
  return (
    <section className="bg-background px-4 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center sm:mb-16"
        >
          <Badge className="bg-primary/10 text-primary mb-4 gap-2 px-4 py-2">
            <Sparkles className="h-4 w-4" />
            Why Choose Us
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
            Everything You Need to{" "}
            <span className="from-primary bg-linear-to-r to-green-600 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            Your trusted partner in building the career you deserve
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {features?.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="group border-border/50 bg-card/50 hover:border-primary/50 hover:bg-card hover:shadow-primary/5 relative h-full overflow-hidden p-6 backdrop-blur-sm transition-all duration-500 hover:shadow-xl sm:p-8">
                {/* Hover Gradient Background */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="from-primary/5 via-primary/3 absolute inset-0 bg-linear-to-br to-transparent" />
                </div>

                <div className="relative">
                  {/* Icon */}
                  <div className="bg-primary/10 text-primary ring-primary/20 group-hover:bg-primary group-hover:shadow-primary/30 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl ring-1 transition-all duration-500 group-hover:scale-110 group-hover:text-white group-hover:shadow-lg sm:h-16 sm:w-16">
                    <feature.icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-xl font-semibold sm:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    {feature.description}
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

export default LandingFeatures;
