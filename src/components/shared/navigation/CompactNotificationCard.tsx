'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface CompactNotificationCardProps {
  id: string;
  icon: ReactNode;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  onClick?: () => void;
}

const CompactNotificationCard = ({
  icon,
  title,
  message,
  timestamp,
  isRead,
  onClick,
}: CompactNotificationCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={`group hover:border-primary/50 hover:bg-accent/50 cursor-pointer rounded-2xl border p-3 transition-all ${
        !isRead ? 'bg-primary/5 border-primary/20' : 'bg-card'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="mt-0.5 shrink-0">{icon}</div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4
              className={`line-clamp-1 text-sm font-semibold ${
                !isRead ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {title}
            </h4>
            {!isRead && <div className="bg-primary mt-1.5 h-2 w-2 shrink-0 rounded-full"></div>}
          </div>
          <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">{message}</p>
          <p className="text-muted-foreground mt-1 text-xs">{timestamp}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CompactNotificationCard;
