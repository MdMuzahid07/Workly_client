"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  isMobile?: boolean;
  className?: string;
  showLabel?: boolean;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  isMobile = false,
  className,
  showLabel = false,
}) => {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size={isMobile ? "sm" : "icon"}
        disabled
        className={className}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading theme</span>
      </Button>
    );
  }

  const getCurrentIcon = () => {
    const currentTheme = resolvedTheme || theme;
    switch (currentTheme) {
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />;
      case "system":
        return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
      default:
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  const getThemeLabel = (themeName: string) => {
    switch (themeName) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return "System";
      default:
        return "Light";
    }
  };

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <>
      {isMobile ? (
        <div className={cn("pb-3 pl-4", className)}>
          <Button
            className="dark:hover:text-accent dark:hover:border-accent"
            variant="outline"
            size="sm"
            onClick={cycleTheme}
            className="w-full justify-start"
          >
            {getCurrentIcon()}
            {showLabel && (
              <span className="ml-2">{getThemeLabel(theme || "light")}</span>
            )}
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "hover:bg-accent hover:text-accent-foreground transition-all duration-200",
                className,
              )}
            >
              {getCurrentIcon()}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={`z-9999 ${isMobile ? "" : ""}`}
            align={isMobile ? "start" : "end"}
            sideOffset={8}
          >
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className={cn(
                "cursor-pointer transition-colors duration-200",
                theme === "dark" && "bg-accent text-accent-foreground",
              )}
            >
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className={cn(
                "cursor-pointer transition-colors duration-200",
                theme === "system" && "bg-accent text-accent-foreground",
              )}
            >
              <Monitor className="mr-2 h-4 w-4" />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default ThemeSwitcher;
