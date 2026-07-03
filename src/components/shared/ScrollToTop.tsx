"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed right-4 bottom-[88px] z-50 sm:right-6 sm:bottom-[84px] md:right-8 md:bottom-8"
        >
          <Button
            size="icon"
            onClick={scrollToTop}
            className="bg-primary text-primary-foreground border-primary-foreground/20 h-8 w-8 rounded-full border-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 sm:h-12 sm:w-12"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4 sm:h-6 sm:w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
