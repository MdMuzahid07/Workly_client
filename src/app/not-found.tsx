"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Briefcase, FileSearch, Home } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-black">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="bg-primary/5 absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="bg-primary/5 absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Animated Illustration Area */}
          <div className="relative mb-8">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-primary/10 relative z-20 flex h-24 w-24 items-center justify-center rounded-2xl shadow-sm"
            >
              <FileSearch className="text-primary h-12 w-12" />
            </motion.div>
            <div className="bg-primary/5 absolute -top-4 -right-4 -z-10 h-16 w-16 rounded-full blur-xl" />
            <div className="bg-primary/5 absolute -bottom-4 -left-4 -z-10 h-20 w-20 rounded-full blur-xl" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-primary/10 text-7xl font-black tracking-tighter sm:text-9xl">
              404
            </h1>
          </motion.div>

          <h2 className="text-foreground mb-3 text-2xl font-bold tracking-tight sm:text-4xl">
            Lost in Space?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-[450px] px-2 text-base leading-relaxed sm:mb-10 sm:text-lg">
            The page {`you're`} searching for seems to have vanished or never
            existed. {`Let's`} get you back on track to your career journey.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/">
              <Button className="bg-primary shadow-primary/20 hover:bg-primary/90 h-12 rounded-full border-none px-8 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Button>
            </Link>
            <Link href="/jobs">
              <Button
                variant="outline"
                className="border-primary/20 bg-background text-primary hover:bg-primary/5 hover:border-primary/40 h-12 rounded-full px-8 text-base font-bold transition-all active:scale-95"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Browse Jobs
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Bottom branding or help text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-muted-foreground/50 absolute bottom-8 text-sm font-medium"
        >
          &copy; {new Date().getFullYear()} WorklyJob. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
