'use client';
import ThemeToggleButtonCompact from '@/components/shared/ThemeToggleButtonCompact';
import NotificationDropdown from '@/components/shared/navigation/NotificationDropdown';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { ChevronRight } from 'lucide-react';
import { ReactNode, useEffect, useRef } from 'react';

const DashboardHeaderContainer = ({ children }: { children: ReactNode }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { state, isMobile, toggleSidebar } = useSidebar();

  useEffect(() => {
    const updateParentPadding = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        const parent = headerRef.current.parentElement;
        if (parent) {
          parent.style.paddingTop = `${height + 32}px`;
        }
      }
    };

    // Run initially
    updateParentPadding();

    // Set up a ResizeObserver to handle layout/content wrap changes dynamically
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        updateParentPadding();
      });
      resizeObserver.observe(headerRef.current);
      return () => resizeObserver.disconnect();
    }

    window.addEventListener('resize', updateParentPadding);
    return () => window.removeEventListener('resize', updateParentPadding);
  }, []);

  return (
    <>
      <style>{`
        .dashboard-header + * {
          padding-top: 0 !important;
          margin-top: 0 !important;
        }
      `}</style>
      <header
        ref={headerRef}
        style={{
          left: isMobile
            ? 0
            : state === 'collapsed'
              ? 'var(--sidebar-width-icon)'
              : 'var(--sidebar-width)',
        }}
        className="dashboard-header border-border bg-card/95 ease-apple fixed top-0 right-0 z-50 border-b backdrop-blur-sm transition-[left] duration-300"
      >
        <div className="mx-auto flex h-auto min-h-12 shrink-0 items-center justify-between gap-3 py-3 pr-16 pl-4 sm:h-auto sm:min-h-14 sm:py-4 sm:pr-16 sm:pl-6 md:h-auto md:min-h-16 md:px-8 md:py-0 md:pr-8">
          {!isMobile && state === 'collapsed' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-muted-foreground hover:bg-muted hidden h-8 w-8 shrink-0 rounded-md md:flex"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
          <div className="min-w-0 flex-1">{children}</div>

          <div className="flex shrink-0 items-center gap-2">
            <NotificationDropdown />
            {!isMobile && state === 'collapsed' && <ThemeToggleButtonCompact />}
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardHeaderContainer;
