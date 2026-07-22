'use client';

import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface CustomPlanBannerProps {
  onClick: () => void;
}

export function CustomPlanBanner({ onClick }: CustomPlanBannerProps) {
  return (
    <div className="border-primary/30 bg-primary/5 group hover:from-primary/5 hover:to-primary/10 mt-12 overflow-hidden rounded-xl border border-dashed p-12 text-center transition-all hover:bg-linear-to-br">
      <div className="bg-primary/10 text-primary mb-6 inline-flex h-16 w-16 transform items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20" />
          <path d="m17 7-5-5-5 5" />
          <path d="m17 17-5 5-5-5" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold tracking-tight">Custom Enterprise Tiers?</h3>
      <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg leading-relaxed font-bold opacity-70">
        Engineered for high-volume partners. Deploy custom plans with specific limits, visibility
        windows, and AI matchmaking priority.
      </p>
      <Button
        variant="outline"
        className="text-primary hover:bg-primary hover:shadow-primary/20 mt-8 h-12 rounded-full border-2 px-10 font-bold tracking-widest uppercase shadow-lg transition-all hover:text-white"
        onClick={onClick}
      >
        Launch Plan Builder <ChevronDown className="ml-3 h-5 w-5" />
      </Button>
    </div>
  );
}
