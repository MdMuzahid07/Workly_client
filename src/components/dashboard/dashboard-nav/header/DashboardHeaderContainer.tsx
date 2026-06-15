"use client";
import { ReactNode, useEffect, useRef } from "react";

const DashboardHeaderContainer = ({ children }: { children: ReactNode }) => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateParentPadding = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        const parent = headerRef.current.parentElement;
        if (parent) {
          parent.style.paddingTop = `${height}px`;
        }
      }
    };

    // Run initially
    updateParentPadding();

    // Set up a ResizeObserver to handle layout/content wrap changes dynamically
    if (typeof ResizeObserver !== "undefined" && headerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        updateParentPadding();
      });
      resizeObserver.observe(headerRef.current);
      return () => resizeObserver.disconnect();
    }

    window.addEventListener("resize", updateParentPadding);
    return () => window.removeEventListener("resize", updateParentPadding);
  }, []);

  return (
    <header
      ref={headerRef}
      className="border-border bg-card/95 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm lg:left-64"
    >
      <div className="mx-auto flex h-auto min-h-12 shrink-0 items-center justify-between gap-3 py-3 pr-16 pl-4 sm:h-auto sm:min-h-14 sm:py-4 sm:pr-16 sm:pl-6 lg:h-auto lg:min-h-16 lg:px-8 lg:py-0 lg:pr-8">
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </header>
  );
};

export default DashboardHeaderContainer;
