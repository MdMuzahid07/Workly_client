"use client";

import { useEffect, useRef } from "react";

interface ParticlesBgProps {
  active: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function ParticlesBg({ active }: ParticlesBgProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let lastTime = performance.now();

    // Dynamic density mapping
    const getParticleCount = (width: number) => {
      if (width < 640) return 35; // Mobile
      if (width < 1024) return 60; // Tablet
      return 90; // Desktop
    };

    let particleCount = getParticleCount(window.innerWidth);
    const connectionDistance = 125;
    const connectionDistanceSq = connectionDistance * connectionDistance;

    // Mouse tracker
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150,
      radiusSq: 150 * 150,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || window.innerWidth;
      const height = parent?.clientHeight || window.innerHeight;

      // Retina DPI scaling (cap at 2 for performance)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      particleCount = getParticleCount(width);
      initParticles(width, height);
    };

    const initParticles = (width: number, height: number) => {
      particles = [];
      const colors = [
        "rgba(16, 185, 129, 0.45)", // Emerald
        "rgba(20, 184, 166, 0.45)", // Teal
        "rgba(52, 211, 153, 0.45)", // Mint
      ];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 45, // Pixels per second
          vy: (Math.random() - 0.5) * 45,
          radius: Math.random() * 2.5 + 1.5, // 1.5px to 4px
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const drawParticles = (deltaTime: number) => {
      if (!ctx || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      // 1. Group connection lines by discrete opacity brackets to batch GPU calls
      // We use 4 transparency buckets: 0.05, 0.12, 0.20, 0.28
      const lineBuckets: { p1: Particle; p2: Particle }[][] = [[], [], [], []];

      // Draw connections to mouse cursor (higher priority)
      if (mouse.x !== null && mouse.y !== null) {
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouse.radiusSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / mouse.radius) * 0.35;
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Check pairs for connections (avoid Math.sqrt where possible)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistanceSq) {
            const dist = Math.sqrt(distSq);
            const ratio = dist / connectionDistance;

            // Assign to an opacity bucket
            let bucketIndex = 0;
            if (ratio < 0.25) bucketIndex = 3;
            else if (ratio < 0.5) bucketIndex = 2;
            else if (ratio < 0.75) bucketIndex = 1;

            lineBuckets[bucketIndex].push({ p1, p2 });
          }
        }
      }

      // Batch draw connections (Only 4 stroke calls!)
      const strokeAlphas = [0.08, 0.16, 0.24, 0.32];
      for (let b = 0; b < 4; b++) {
        const lines = lineBuckets[b];
        if (lines.length === 0) continue;

        ctx.beginPath();
        for (let i = 0; i < lines.length; i++) {
          const { p1, p2 } = lines[i];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.strokeStyle = `rgba(16, 185, 129, ${strokeAlphas[b]})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // 2. Draw and update dots grouped by color for single fill call per color group
      const colorGroups: { [color: string]: Particle[] } = {};

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!colorGroups[p.color]) {
          colorGroups[p.color] = [];
        }
        colorGroups[p.color].push(p);

        // Update positions based on delta time (smooth across different screen refresh rates)
        p.x += p.vx * deltaTime;
        p.y += p.vy * deltaTime;

        // Bounce off canvas boundaries
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }
      }

      // Batch fill dots (Only 3 fill calls!)
      for (const color in colorGroups) {
        ctx.beginPath();
        const group = colorGroups[color];
        for (let i = 0; i < group.length; i++) {
          const p = group[i];
          ctx.moveTo(p.x + p.radius, p.y);
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }
        ctx.fillStyle = color;
        ctx.fill();
      }
    };

    const tick = (currentTime: number) => {
      if (!active) return;
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1); // Cap delta to prevent teleports
      lastTime = currentTime;

      drawParticles(deltaTime);
      animationFrameId = requestAnimationFrame(tick);
    };

    // Attach listeners directly to canvas container (better isolation)
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse events globally on the window to bypass pointer-events-none on wrapper div
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    if (active) {
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full transition-opacity duration-1000 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
