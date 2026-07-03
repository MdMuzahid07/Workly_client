"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function ContentProtection() {
  useEffect(() => {
    // Only activate protection in production environments
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // Single consolidated handler for all security events
    const handleSecurityEvents = (e: Event) => {
      const showWarning = (message: string) => {
        toast.warning(message, {
          id: "content-protection-restricted", // prevents warnings stacking
          duration: 2500,
        });
      };

      if (e.type === "contextmenu") {
        e.preventDefault();
        showWarning(
          "Right-click menu is disabled to protect platform content.",
        );
        return;
      }

      if (e.type === "keydown") {
        const ke = e as KeyboardEvent;
        const isMac =
          typeof window !== "undefined" &&
          /Macintosh|Mac OS X/i.test(navigator.userAgent);

        const isF12 = ke.key === "F12";
        const isInspect =
          (ke.ctrlKey && ke.shiftKey && (ke.key === "I" || ke.key === "i")) ||
          (isMac &&
            ke.metaKey &&
            ke.altKey &&
            (ke.key === "I" || ke.key === "i"));
        const isConsole =
          (ke.ctrlKey && ke.shiftKey && (ke.key === "J" || ke.key === "j")) ||
          (isMac &&
            ke.metaKey &&
            ke.altKey &&
            (ke.key === "J" || ke.key === "j"));
        const isSelectElement =
          (ke.ctrlKey && ke.shiftKey && (ke.key === "C" || ke.key === "c")) ||
          (isMac &&
            ke.metaKey &&
            ke.altKey &&
            (ke.key === "C" || ke.key === "c"));
        const isViewSource =
          (ke.ctrlKey && (ke.key === "U" || ke.key === "u")) ||
          (isMac &&
            ke.metaKey &&
            ke.altKey &&
            (ke.key === "U" || ke.key === "u"));
        const isSavePage =
          (ke.ctrlKey && (ke.key === "S" || ke.key === "s")) ||
          (ke.metaKey && (ke.key === "S" || ke.key === "s"));

        if (
          isF12 ||
          isInspect ||
          isConsole ||
          isSelectElement ||
          isViewSource ||
          isSavePage
        ) {
          ke.preventDefault();
          showWarning("Developer shortcuts are restricted for security.");
        }
      }
    };

    // Industry-standard DevTools freeze loop (pauses debugger when console opens)
    const interval = setInterval(() => {
      try {
        const check = function () {};
        const func = check.constructor("debugger");
        func();
      } catch {}
    }, 150);

    document.addEventListener("contextmenu", handleSecurityEvents);
    document.addEventListener("keydown", handleSecurityEvents);

    return () => {
      document.removeEventListener("contextmenu", handleSecurityEvents);
      document.removeEventListener("keydown", handleSecurityEvents);
      clearInterval(interval);
    };
  }, []);

  return null;
}

export default ContentProtection;
