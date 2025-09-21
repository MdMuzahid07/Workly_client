"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { features, globeConfig, globeSampleAreas } from "../../constants";

const World = dynamic(
  () =>
    import("../../components/ui/globe").then((mod) => ({ default: mod.World })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute top-[10rem] right-0 left-0 z-10 flex h-[300px] w-full items-center justify-center sm:-bottom-20 md:h-full">
        <div className="animate-pulse text-neutral-400">Loading Globe...</div>
      </div>
    ),
  },
);

const LandingView = () => {
  return (
    <>
      <div className="relative mb-10 flex h-screen w-full flex-row items-center justify-center bg-green-50 pt-48 sm:mb-0 md:h-auto md:pt-30 dark:bg-black">
        <div className="relative z-50 mx-auto h-full min-h-screen w-full max-w-5xl overflow-hidden px-4 sm:h-[65rem]">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="div"
          >
            <h2 className="mx-auto max-w-4xl text-center text-xl font-bold text-green-400 sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl dark:text-white">
              Search Smarter, Apply Faster, Hire Better.
            </h2>
            <p className="sm:text-md mx-auto mt-4 max-w-5xl text-center text-base font-normal text-neutral-700 sm:mt-7 md:text-xl md:font-semibold lg:text-3xl dark:text-neutral-200">
              Navigate your career path with confidence. Find tailored
              opportunities, insider company info, and the tools you need to
              land your next great role.
            </p>
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full bg-gradient-to-b from-transparent to-green-50 select-none dark:to-black" />
          <div className="absolute top-[10rem] right-0 left-0 z-10 h-[300px] w-full sm:-bottom-20 md:h-full">
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center">
                  <div className="animate-pulse text-neutral-400">
                    Loading Globe...
                  </div>
                </div>
              }
            >
              <World data={globeSampleAreas} globeConfig={globeConfig} />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="bg-background px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold text-balance md:text-4xl">
              Turn Opportunities Into Success
            </h2>
            <p className="text-muted-foreground text-lg text-pretty">
              Your trusted partner in building the career you deserve.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="group cursor-pointer text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 transition-transform duration-300 group-hover:scale-110 group-hover:bg-green-400">
                  <feature.icon className="text-foreground h-10 w-10" />
                </div>
                <h3 className="text-foreground mb-2 text-lg font-bold text-balance">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm text-pretty">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingView;
