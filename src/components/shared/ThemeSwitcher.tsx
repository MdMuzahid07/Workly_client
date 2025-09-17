"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import HoverHint from "./HoverHint";

const ThemeSwitcher = ({ isMobile }: { isMobile?: boolean }) => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading theme</span>
      </Button>
    );
  }

  const getCurrentIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />;
      case "system":
        return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
      default:
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  return (
    <>
      {isMobile ? (
        <div className="pb-3 pl-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (theme === "light") {
                setTheme("dark");
              } else if (theme === "dark") {
                setTheme("system");
              } else {
                setTheme("light");
              }
            }}
          >
            {theme === "light" && (
              <>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </>
            )}
            {theme === "dark" && (
              <>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </>
            )}
            {theme === "system" && (
              <>
                <Monitor className="mr-2 h-4 w-4" />
                <span>System</span>
              </>
            )}
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <HoverHint hint="Change theme">
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                {getCurrentIcon()}
              </Button>
            </DropdownMenuTrigger>
          </HoverHint>
          <DropdownMenuContent align={isMobile ? "start" : "end"}>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
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
