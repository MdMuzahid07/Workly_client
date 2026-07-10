'use client';
import { motion } from 'motion/react';

const GlobeSkeleton = () => {
  return (
    <div className="absolute top-40 right-0 left-0 z-10 h-75 w-full sm:-bottom-20 md:h-full">
      <div className="flex h-full items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative"
        >
          <div className="h-75 w-75 rounded-full bg-neutral-200/40 md:h-125 md:w-125 dark:bg-neutral-800/40" />

          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-primary absolute top-1/4 left-1/3 h-2 w-2 rounded-full md:h-3 md:w-3"
          />
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 right-1/4 h-2 w-2 rounded-full bg-blue-400 md:h-3 md:w-3"
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/3 left-1/4 h-2 w-2 rounded-full bg-purple-400 md:h-3 md:w-3"
          />
          <motion.div
            animate={{ opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-3/4 right-1/3 h-2 w-2 rounded-full bg-cyan-400 md:h-3 md:w-3"
          />
        </motion.div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 text-center"
        ></motion.div>
      </div>
    </div>
  );
};

export default GlobeSkeleton;
