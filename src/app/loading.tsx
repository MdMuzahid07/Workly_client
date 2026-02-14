"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-black">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="bg-primary/5 absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="bg-primary/5 absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Main Loader Animation */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              borderRadius: ["20%", "50%", "20%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-primary shadow-primary/20 h-12 w-12 shadow-lg"
          />
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-primary/20 absolute h-full w-full rounded-full blur-xl"
          />
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 flex flex-col items-center"
        >
          <p className="font-barlow text-foreground text-lg font-bold tracking-tight">
            {`Preparing your experience...`}
          </p>
          <div className="mt-2 flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="bg-primary h-1.5 w-1.5 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Brand Watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8"
      >
        <p className="font-barlow text-muted-foreground text-sm font-bold tracking-widest uppercase">
          WorklyJob
        </p>
      </motion.div>
    </div>
  );
}
