"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type LucideIcon, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";

type ThemeType = "dark" | "light" | "system";

interface ThemeConfig {
  Icon: LucideIcon;
  label: string;
  sub: string;
  iconColor: string;
  iconBg: string;
  bg: string;
  border: string;
  shadow: string;
  headingColor: string;
  subColor: string;
}

const CONFIGS: Record<ThemeType, ThemeConfig> = {
  dark: {
    Icon: Moon,
    label: "Dark Mode",
    sub: "On",
    iconColor: "#a5b4fc",
    iconBg: "rgba(99,102,241,0.12)",
    bg: "#111827",
    border: "rgba(255,255,255,0.07)",
    shadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
    headingColor: "#f1f5f9",
    subColor: "#475569",
  },
  light: {
    Icon: Sun,
    label: "Light Mode",
    sub: "On",
    iconColor: "#d97706",
    iconBg: "rgba(245,158,11,0.10)",
    bg: "#ffffff",
    border: "rgba(0,0,0,0.07)",
    shadow: "0 24px 64px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05)",
    headingColor: "#0f172a",
    subColor: "#94a3b8",
  },
  system: {
    Icon: Monitor,
    label: "System",
    sub: "Auto",
    iconColor: "#10b981",
    iconBg: "rgba(16,185,129,0.10)",
    bg: "#ffffff",
    border: "rgba(0,0,0,0.07)",
    shadow: "0 24px 64px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05)",
    headingColor: "#0f172a",
    subColor: "#94a3b8",
  },
};

const AUTO_DISMISS_MS = 1600;

export function ThemeChangeNotification() {
  const { theme } = useTheme();
  const [activeTheme, setActiveTheme] = useState<ThemeType>("system");
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prevThemeRef = useRef<string | undefined>(undefined);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (prevThemeRef.current === undefined) {
      prevThemeRef.current = theme;
      return;
    }
    if (prevThemeRef.current === theme) return;
    prevThemeRef.current = theme;
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveTheme((theme as ThemeType) ?? "system");
    setVisible(true);
    timerRef.current = setTimeout(dismiss, AUTO_DISMISS_MS);
  }, [theme, mounted, dismiss]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  if (!mounted) return null;

  const cfg = CONFIGS[activeTheme] ?? CONFIGS.system;
  const { Icon } = cfg;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={dismiss}
          role="alertdialog"
          aria-label={`${cfg.label} activated`}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            backgroundColor: "rgba(0,0,0,0.38)",
          }}
        >
          <motion.div
            key={`card-${activeTheme}`}
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{
              duration: 0.52,
              ease: [0.87, 0, 0.13, 1], // easeInOutExpo
            }}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center rounded-3xl px-12 py-10 sm:px-16 sm:py-12"
            style={{
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              boxShadow: cfg.shadow,
              minWidth: "clamp(240px, 36vw, 340px)",
            }}
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.38,
                ease: [0.87, 0, 0.13, 1],
                delay: 0.14,
              }}
              className="mb-5 flex items-center justify-center rounded-2xl"
              style={{
                width: 72,
                height: 72,
                background: cfg.iconBg,
              }}
            >
              <Icon
                strokeWidth={1.5}
                style={{ width: 36, height: 36, color: cfg.iconColor }}
              />
            </motion.div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.32,
                ease: [0.87, 0, 0.13, 1],
                delay: 0.2,
              }}
              className="flex flex-col items-center gap-1 text-center"
            >
              <h2
                className="text-[22px] leading-tight font-semibold tracking-[-0.02em]"
                style={{ color: cfg.headingColor }}
              >
                {cfg.label}
              </h2>
              <p
                className="text-[13px] font-medium"
                style={{ color: cfg.subColor }}
              >
                {cfg.sub}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ThemeChangeNotification;
