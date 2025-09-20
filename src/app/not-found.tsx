"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-[100dvh] bg-green-50">
      <div className="flex h-[80vh] flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center justify-center rounded-full bg-red-100 p-6 dark:bg-red-900"
        >
          <AlertTriangle className="h-12 w-12 text-red-500 dark:text-red-400" />
        </motion.div>

        <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Sorry, we couldn’t find the page you’re looking for. It might have
          been removed, renamed, or doesn’t exist anymore.
        </p>

        <div className="flex gap-4">
          <Link href="/">
            <Button className="rounded-full bg-green-400 font-semibold text-black hover:bg-green-500">
              Go Home
            </Button>
          </Link>
          <Link href="/jobs">
            <Button variant="outline" className="rounded-full">
              Browse Jobs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
