"use client";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { memo, useEffect, useState } from "react";

/**
 * Compact theme toggle button for sidebars
 * Cycles through light -> dark -> system themes on click
 */
const ThemeToggleButtonCompact = memo(function ThemeToggleButtonCompact() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground h-8 w-8 shrink-0"
        disabled
        aria-label="Theme toggle"
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const handleThemeToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="h-4 w-4" />;
      case "system":
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted-foreground hover:text-foreground h-8 w-8 shrink-0 touch-manipulation"
      onClick={handleThemeToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} mode`}
    >
      {getThemeIcon()}
    </Button>
  );
});

export default ThemeToggleButtonCompact;
