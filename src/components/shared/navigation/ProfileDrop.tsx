'use client';

import { AnimatePresence, motion } from 'motion/react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import {
  Bookmark,
  Briefcase,
  Building2,
  ChevronDown,
  FileText,
  LogOut,
  Settings,
  ShieldCheck,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetSavedJobsQuery } from '@/redux/feature/profile/profileApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: number;
  color?: string;
}

interface AuthTokenPayload extends JwtPayload {
  role?: string;
  companyId?: string | number;
}

interface UserProfile {
  fullName: string;
  email: string;
  avatar?: string;
  profilePicture?: string;
  avatarUrl?: string;
  initials?: string;
  role?: string;
  companyId?: string | number;
}

interface ProfileDropProps {
  user?: UserProfile;
  onSignOut?: () => void;
  className?: string;
}

const ProfileDrop: React.FC<ProfileDropProps> = ({ user, onSignOut, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, handleClickOutside]);

  let decodedToken: AuthTokenPayload | null = null;
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) decodedToken = jwtDecode<AuthTokenPayload>(token);
  } catch {
    decodedToken = null;
  }

  const isEmployer = decodedToken?.role === 'EMPLOYER' || user?.role === 'EMPLOYER';
  const isAdmin = decodedToken?.role === 'ADMIN' || user?.role === 'ADMIN';
  const isSuperAdmin = decodedToken?.role === 'SUPER_ADMIN' || user?.role === 'SUPER_ADMIN';
  const hasCompany = Boolean(decodedToken?.companyId) || Boolean(user?.companyId);

  const skipSavedJobs = typeof window === 'undefined' || isEmployer || isAdmin || isSuperAdmin;
  const { data: savedJobsResponse } = useGetSavedJobsQuery(undefined, {
    skip: skipSavedJobs,
  });
  const savedJobsCount = savedJobsResponse?.meta?.total ?? savedJobsResponse?.data?.length ?? 0;

  const menuItems: MenuItem[] = [
    ...(!isAdmin && !isSuperAdmin
      ? [
          {
            icon: User,
            label: 'Profile',
            href: isEmployer ? '/employer/company-profile' : '/dashboard/profile',
          },
        ]
      : []),
    ...(isAdmin || isSuperAdmin ? [{ icon: ShieldCheck, label: 'Admin', href: '/admin' }] : []),
    ...(isEmployer
      ? hasCompany
        ? [{ icon: FileText, label: 'Dashboard', href: '/employer' }]
        : [{ icon: Building2, label: 'Add Company', href: '/create-company' }]
      : []),
    ...(!isEmployer && !isAdmin && !isSuperAdmin
      ? [
          { icon: Briefcase, label: 'Dashboard', href: '/dashboard' },
          {
            icon: Bookmark,
            label: 'Saved Jobs',
            href: '/dashboard/saved-jobs',
            badge: savedJobsCount,
          },
        ]
      : []),
    {
      icon: Settings,
      label: 'Settings',
      href: isEmployer
        ? '/employer/settings'
        : isAdmin || isSuperAdmin
          ? '/admin/settings'
          : '/dashboard/settings',
    },
  ];

  const avatarSrc =
    user?.avatar || user?.profilePicture || user?.avatarUrl || user?.profile?.avatarUrl;
  const hasAvatar = Boolean(avatarSrc && avatarSrc.trim() && !avatarSrc.includes('placeholder'));

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80"
      >
        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-200 dark:border-slate-800">
          {hasAvatar ? (
            <Image
              src={avatarSrc!}
              alt={user?.fullName || 'User'}
              fill
              className="object-cover"
              sizes="32px"
            />
          ) : (
            <div className="bg-primary/10 text-primary flex h-full w-full items-center justify-center text-[10px] font-bold uppercase">
              {user?.fullName
                ?.split(' ')
                .filter(Boolean)
                .map((n) => n[0])
                .join('') || 'U'}
            </div>
          )}
        </div>
        <ChevronDown
          className={`text-muted-foreground h-3 w-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-3 w-56 origin-top-right overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="border-b border-gray-50 bg-gray-50/50 p-4 dark:border-slate-900 dark:bg-slate-900/50">
              <p className="text-foreground truncate text-sm font-bold">{user?.fullName}</p>
              <p className="text-muted-foreground truncate text-xs">{user?.email}</p>
            </div>

            <div className="p-1.5">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-all hover:bg-gray-50 dark:hover:bg-slate-900"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-primary/10 text-primary ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-50 p-1.5 dark:border-slate-900">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowLogoutModal(true);
                }}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent className="max-w-[340px] gap-0 rounded-2xl border-zinc-100 bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:max-w-md dark:border-zinc-800 dark:bg-zinc-950/95">
          <DialogHeader className="gap-2">
            <DialogTitle className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500 dark:bg-red-500/20">
                <LogOut className="h-4 w-4" />
              </span>
              Confirm Log Out
            </DialogTitle>
            <DialogDescription className="text-left text-sm text-zinc-500 dark:text-zinc-400">
              Are you sure you want to log out? You will need to sign in again to access your
              profile, saved jobs, and applications.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(false)}
              className="w-full cursor-pointer rounded-xl border-zinc-200 text-sm font-semibold transition-colors duration-200 hover:bg-zinc-50 sm:w-auto dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowLogoutModal(false);
                onSignOut?.();
              }}
              className="w-full cursor-pointer rounded-xl bg-red-600 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-95 sm:w-auto"
            >
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileDrop;
