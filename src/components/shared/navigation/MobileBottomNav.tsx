'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '../../../constants';
import { useAppSelector } from '../../../redux/hooks';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user, isVerified } = useAppSelector((state) => state.auth) || {};

  // Only show for authenticated users — guests use Log In / Post a Job in the top bar
  if (!user?.email || !isVerified) return null;

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      {/* Spacer so page content isn't hidden behind the bar */}
      <div className="h-[68px] md:hidden" aria-hidden />

      {/* Fixed bottom nav */}
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-40 md:hidden"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Glassmorphic bar */}
        <div className="mx-auto flex h-[60px] items-center justify-around border-t border-slate-200/40 bg-white/80 px-2 backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-950/80">
          {navLinks.map(({ name, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={name}
                href={href}
                aria-label={name}
                aria-current={active ? 'page' : undefined}
                className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-opacity"
              >
                {/* Active pill indicator above icon */}
                {active && <span className="bg-primary absolute top-1 h-0.5 w-6 rounded-full" />}

                <Icon
                  strokeWidth={active ? 2.2 : 1.6}
                  className={`h-5 w-5 transition-colors ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />

                <span
                  className={`max-w-[64px] truncate text-center text-[10px] leading-none font-semibold transition-colors ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {name === 'Browse Candidates' ? 'Candidates' : name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default MobileBottomNav;
