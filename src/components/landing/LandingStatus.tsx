import { Award, Briefcase, Building2, Users } from "lucide-react";
import { motion } from "motion/react";

const LandingStatus = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-16 sm:py-20 lg:py-24">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-primary/20 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            { icon: Briefcase, value: "50K+", label: "Active Jobs" },
            { icon: Building2, value: "10K+", label: "Companies" },
            { icon: Users, value: "12M+", label: "Job Seekers" },
            { icon: Award, value: "95%", label: "Success Rate" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group text-center"
            >
              <div className="bg-primary/10 ring-primary/20 group-hover:bg-primary/20 group-hover:shadow-primary/30 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl ring-1 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg sm:h-20 sm:w-20">
                <stat.icon className="text-primary h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="mb-2 text-4xl font-bold text-white sm:text-5xl">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 sm:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingStatus;
