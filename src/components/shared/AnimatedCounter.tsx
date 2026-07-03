"use client";

import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  formatType?: "K" | "M" | "commas" | "percent";
}

export default function AnimatedCounter({
  value,
  duration = 1500,
  formatType = "commas",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value, duration]);

  const formatNumber = (num: number) => {
    if (formatType === "M") {
      return `${(num / 1000000).toFixed(1)}M+`;
    }
    if (formatType === "K") {
      return `${(num / 1000).toFixed(1)}K+`;
    }
    if (formatType === "percent") {
      return `${num}%`;
    }
    return `${num.toLocaleString("en-US")}+`;
  };

  return <span>{formatNumber(count)}</span>;
}
