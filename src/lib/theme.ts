/**
 * Theme configuration and utilities for Workly Job
 * Professional green theme with your brand color #37DF72
 */

export type Theme = "light" | "dark" | "system";

export const THEME_CONFIG = {
  // Your brand color in different formats
  brand: {
    hex: "#37DF72",
    hsl: "142 76% 36%",
    rgb: "55, 223, 114",
  },

  // Theme storage key
  storageKey: "workly-theme",

  // Available themes
  themes: ["light", "dark", "system"] as const,

  // Default theme
  defaultTheme: "system" as Theme,

  // Theme attributes
  attribute: "class" as const,

  // Enable system theme detection
  enableSystem: true,

  // Disable transition on theme change (prevents flash)
  disableTransitionOnChange: false,
} as const;

/**
 * Color palette for the green theme
 */
export const COLOR_PALETTE = {
  light: {
    primary: "142 76% 36%", // Your brand green
    primaryForeground: "0 0% 98%",
    secondary: "142 20% 96%",
    secondaryForeground: "142 76% 36%",
    muted: "142 15% 97%",
    mutedForeground: "142 10% 45%",
    accent: "142 76% 36%",
    accentForeground: "0 0% 98%",
    success: "142 76% 36%",
    successForeground: "0 0% 98%",
    warning: "38 92% 50%",
    warningForeground: "0 0% 98%",
    destructive: "0 84% 60%",
    destructiveForeground: "0 0% 98%",
    background: "0 0% 100%",
    foreground: "0 0% 3.9%",
    card: "0 0% 100%",
    cardForeground: "0 0% 3.9%",
    popover: "0 0% 100%",
    popoverForeground: "0 0% 3.9%",
    border: "142 15% 90%",
    input: "142 15% 95%",
    ring: "142 76% 36%",
  },
  dark: {
    primary: "142 76% 50%", // Brighter for dark mode
    primaryForeground: "0 0% 3.9%",
    secondary: "142 20% 15%",
    secondaryForeground: "142 20% 90%",
    muted: "142 15% 15%",
    mutedForeground: "142 10% 65%",
    accent: "142 76% 50%",
    accentForeground: "0 0% 3.9%",
    success: "142 76% 50%",
    successForeground: "0 0% 3.9%",
    warning: "38 92% 60%",
    warningForeground: "0 0% 3.9%",
    destructive: "0 84% 70%",
    destructiveForeground: "0 0% 98%",
    background: "0 0% 3.9%",
    foreground: "0 0% 98%",
    card: "0 0% 3.9%",
    cardForeground: "0 0% 98%",
    popover: "0 0% 3.9%",
    popoverForeground: "0 0% 98%",
    border: "142 15% 20%",
    input: "142 15% 15%",
    ring: "142 76% 50%",
  },
} as const;

/**
 * Chart colors for data visualization
 */
export const CHART_COLORS = {
  light: {
    chart1: "142 76% 36%", // Main brand green
    chart2: "160 60% 45%", // Teal
    chart3: "120 50% 40%", // Forest green
    chart4: "180 40% 50%", // Light blue-green
    chart5: "100 60% 30%", // Dark green
  },
  dark: {
    chart1: "142 76% 50%", // Brighter brand green
    chart2: "160 60% 55%", // Brighter teal
    chart3: "120 50% 50%", // Brighter forest green
    chart4: "180 40% 60%", // Brighter blue-green
    chart5: "100 60% 40%", // Brighter dark green
  },
} as const;

/**
 * Sidebar colors
 */
export const SIDEBAR_COLORS = {
  light: {
    sidebar: "142 15% 98%",
    sidebarForeground: "142 20% 20%",
    sidebarPrimary: "142 76% 36%",
    sidebarPrimaryForeground: "0 0% 98%",
    sidebarAccent: "142 20% 94%",
    sidebarAccentForeground: "142 20% 25%",
    sidebarBorder: "142 15% 90%",
    sidebarRing: "142 76% 36%",
  },
  dark: {
    sidebar: "142 15% 8%",
    sidebarForeground: "142 20% 90%",
    sidebarPrimary: "142 76% 50%",
    sidebarPrimaryForeground: "0 0% 3.9%",
    sidebarAccent: "142 20% 18%",
    sidebarAccentForeground: "142 20% 90%",
    sidebarBorder: "142 15% 20%",
    sidebarRing: "142 76% 50%",
  },
} as const;

/**
 * Utility function to get theme-aware color
 */
export const getThemeColor = (
  colorKey: keyof typeof COLOR_PALETTE.light,
  theme: "light" | "dark",
) => {
  return COLOR_PALETTE[theme][colorKey];
};

/**
 * Utility function to get chart color
 */
export const getChartColor = (
  colorKey: keyof typeof CHART_COLORS.light,
  theme: "light" | "dark",
) => {
  return CHART_COLORS[theme][colorKey];
};

/**
 * Utility function to get sidebar color
 */
export const getSidebarColor = (
  colorKey: keyof typeof SIDEBAR_COLORS.light,
  theme: "light" | "dark",
) => {
  return SIDEBAR_COLORS[theme][colorKey];
};

/**
 * CSS custom properties generator
 */
export const generateThemeCSS = (theme: "light" | "dark") => {
  const colors = COLOR_PALETTE[theme];
  const chartColors = CHART_COLORS[theme];
  const sidebarColors = SIDEBAR_COLORS[theme];

  return {
    ...colors,
    ...chartColors,
    ...sidebarColors,
  };
};
