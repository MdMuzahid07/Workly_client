'use client';

import { useAppSelector } from '@/redux/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import Footer from '../../components/shared/footer/Footer';
import Navbar from '../../components/shared/navigation/Navbar';
import ScrollToTop from '../../components/shared/ScrollToTop';

const PROTECTED_PREFIXES = [
  '/jobs',
  '/companies',
  '/browse-candidates',
  '/create-company',
  '/saved-jobs',
  '/applied-jobs',
  '/messages',
  '/notifications',
];

export default function MainLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { user, accessToken } = useAppSelector((state) => state.auth) || {};

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isProtectedPath = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/'),
  );

  useEffect(() => {
    if (!isMounted) return;

    if (isProtectedPath) {
      const hasStoredToken = typeof window !== 'undefined' && localStorage.getItem('accessToken');
      const hasToken = accessToken || hasStoredToken;
      const hasUser = user && (user.email || user.id);

      if (!hasUser && !hasToken) {
        const callbackUrl = encodeURIComponent(pathname);
        router.replace(`/login?callbackUrl=${callbackUrl}`);
      }
    }
  }, [isMounted, isProtectedPath, pathname, user, accessToken, router]);

  // Show nothing or children (with smooth client guard)
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
