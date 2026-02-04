// import { Award, Briefcase, Building2, Users } from "lucide-react";
// import { motion } from "motion/react";

// const LandingStatus = () => {
//   return (
//     <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-16 sm:py-20 lg:py-24">
//       {/* Background Effects */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="bg-primary/20 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
//       </div>

//       <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
//           {[
//             { icon: Briefcase, value: "50K+", label: "Active Jobs" },
//             { icon: Building2, value: "10K+", label: "Companies" },
//             { icon: Users, value: "12M+", label: "Job Seekers" },
//             { icon: Award, value: "95%", label: "Success Rate" },
//           ].map((stat, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-50px" }}
//               transition={{ delay: index * 0.1, duration: 0.6 }}
//               className="group text-center"
//             >
//               <div className="bg-primary/10 ring-primary/20 group-hover:bg-primary/20 group-hover:shadow-primary/30 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl ring-1 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg sm:h-20 sm:w-20">
//                 <stat.icon className="text-primary h-8 w-8 sm:h-10 sm:w-10" />
//               </div>
//               <div className="mb-2 text-4xl font-bold text-white sm:text-5xl">
//                 {stat.value}
//               </div>
//               <div className="text-sm text-gray-400 sm:text-base">
//                 {stat.label}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LandingStatus;

import { Award, Briefcase, Building2, Users } from "lucide-react";
import { motion } from "motion/react";

const LandingStatus = () => {
  return (
    <section className="bg-background relative overflow-hidden py-16 sm:py-20 lg:py-24">
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
          className="mb-12 text-center lg:mb-16"
        >
          <h2 className="text-foreground text-3xl font-bold sm:text-4xl">
            Trusted by Millions
          </h2>
          <p className="text-muted-foreground mt-3 text-base sm:text-lg">
            Join our thriving community of job seekers and employers
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {[
            {
              icon: Briefcase,
              value: "50K+",
              label: "Active Jobs",
              color: "primary",
            },
            {
              icon: Building2,
              value: "10K+",
              label: "Companies",
              color: "accent",
            },
            {
              icon: Users,
              value: "12M+",
              label: "Job Seekers",
              color: "primary",
            },
            {
              icon: Award,
              value: "95%",
              label: "Success Rate",
              color: "accent",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group border-border/40 bg-card/50 hover:border-border hover:bg-card/80 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border p-6 text-center backdrop-blur-sm transition-all duration-500 hover:shadow-lg sm:p-8"
            >
              <div className="from-primary/5 to-accent/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div
                  className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-${stat.color}/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-${stat.color}/20 sm:h-16 sm:w-16`}
                >
                  <stat.icon
                    className={`h-7 w-7 text-${stat.color} sm:h-8 sm:w-8`}
                  />
                </div>

                <div className="text-foreground mb-2 text-3xl font-bold transition-all duration-500 group-hover:scale-105 sm:text-4xl lg:text-5xl">
                  {stat.value}
                </div>

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
