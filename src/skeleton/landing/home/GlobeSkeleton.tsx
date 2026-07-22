import { motion } from 'motion/react';

const GlobeSkeleton = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="relative flex h-full w-full items-center justify-center"
      >
        {/* Main circular globe skeleton silhouette */}
        <div className="border-primary/10 from-primary/10 h-64 w-64 rounded-full border bg-radial to-transparent shadow-2xl sm:h-80 sm:w-80 md:h-[350px] md:w-[350px]" />

        {/* Dynamic primary-themed active connection dots */}
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-primary absolute top-1/4 left-1/3 h-2 w-2 rounded-full shadow-[0_0_8px_hsl(var(--primary))]"
        />
        <motion.div
          animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-accent absolute top-1/2 right-1/4 h-1.5 w-1.5 rounded-full shadow-[0_0_6px_hsl(var(--accent))]"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-primary/80 absolute bottom-1/3 left-1/4 h-2 w-2 rounded-full"
        />
        <motion.div
          animate={{ opacity: [0.8, 0.3, 0.8], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[65%] right-1/3 h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]"
        />
      </motion.div>
    </div>
  );
};

export default GlobeSkeleton;
