'use client';

import Image from 'next/image';

export default function Loading() {
  return (
    <div className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Inline styles for custom premium loading animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(0.97);
            filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.12));
            opacity: 0.85;
          }
          50% {
            transform: scale(1.03);
            filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.28));
            opacity: 1;
          }
        }
        @keyframes bg-orb-float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.03);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2.5s infinite ease-in-out;
        }
        .animate-orb-1 {
          animation: bg-orb-float 6s infinite ease-in-out;
        }
        .animate-orb-2 {
          animation: bg-orb-float 8s infinite ease-in-out 1s;
        }
      `,
        }}
      />

      {/* Floating background glowing ambient lights */}
      <div className="bg-background absolute inset-0 -z-10">
        {/* Top-Right Soft Green Glow */}
        <div className="animate-orb-1 absolute -top-[20%] -right-[10%] h-[60vw] w-[60vw] rounded-full bg-emerald-500/[0.04] blur-[120px] dark:bg-emerald-500/[0.08]" />
        {/* Bottom-Left Soft Teal Glow */}
        <div className="animate-orb-2 absolute -bottom-[20%] -left-[10%] h-[50vw] w-[50vw] rounded-full bg-teal-500/[0.03] blur-[100px] dark:bg-teal-500/[0.06]" />
      </div>

      {/* Loading Box Container */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Centered Circular Progress Wrapper */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          {/* Inner Pulsing Logo */}
          <div className="animate-pulse-glow pointer-events-none absolute z-10 select-none">
            <Image
              src="/logo/workly_job-logo.png"
              alt="Workly"
              width={52}
              height={52}
              priority
              className="object-contain"
            />
          </div>

          {/* Premium Thick Gradient Spinner Arc (Fades out completely with rounded caps) */}
          <svg className="absolute h-full w-full animate-spin" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="thick-spinner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="90%" stopColor="#10b981" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="url(#thick-spinner-grad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeDasharray="264"
              strokeDashoffset="115"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
