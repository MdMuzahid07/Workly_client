"use client";

import { AnimatePresence, motion } from "framer-motion";
import { JwtPayload, jwtDecode } from "jwt-decode";
import {
  Briefcase,
  Building2,
  ChevronDown,
  FileText,
  Heart,
  LogOut,
  User,
  Settings,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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
  initials: string;
  role?: string;
  companyId?: string | number;
}

interface ProfileDropProps {
  user?: UserProfile;
  onSignOut?: () => void;
  className?: string;
}

const ProfileDrop: React.FC<ProfileDropProps> = ({
  user,
  onSignOut,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  let decodedToken: AuthTokenPayload | null = null;
  try {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    if (token) decodedToken = jwtDecode<AuthTokenPayload>(token);
  } catch {
    decodedToken = null;
  }

  const isEmployer =
    decodedToken?.role === "EMPLOYER" || user?.role === "EMPLOYER";
  const isAdmin = decodedToken?.role === "ADMIN" || user?.role === "ADMIN";
  const isSuperAdmin =
    decodedToken?.role === "SUPER_ADMIN" || user?.role === "SUPER_ADMIN";
  const hasCompany =
    Boolean(decodedToken?.companyId) || Boolean(user?.companyId);

  const menuItems: MenuItem[] = [
    {
      icon: User,
      label: "Profile",
      href: isEmployer ? "/profile" : "/dashboard/profile",
    },
    ...(isAdmin || isSuperAdmin
      ? [{ icon: ShieldCheck, label: "Admin", href: "/admin" }]
      : []),
    ...(isEmployer
      ? hasCompany
        ? [{ icon: FileText, label: "Dashboard", href: "/employer" }]
        : [{ icon: Building2, label: "Add Company", href: "/create-company" }]
      : []),
    ...(!isEmployer && !isAdmin && !isSuperAdmin
      ? [
          { icon: Briefcase, label: "Dashboard", href: "/dashboard" },
          {
            icon: Heart,
            label: "Saved Jobs",
            href: "/dashboard/saved-jobs",
            badge: 12,
          },
        ]
      : []),
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 transition-opacity hover:opacity-80"
      >
        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-200 dark:border-slate-800">
          {user?.avatar ? (
            <Image
              src={user?.avatar}
              alt={user?.fullName}
              fill
              className="object-cover"
              sizes="32px"
            />
          ) : (
            <div className="bg-primary/10 text-primary flex h-full w-full items-center justify-center text-[10px] font-bold uppercase">
              {user?.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
        </div>
        <ChevronDown
          className={`text-muted-foreground h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-56 origin-top-right overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="border-b border-gray-50 bg-gray-50/50 p-4 dark:border-slate-900 dark:bg-slate-900/50">
              <p className="text-foreground truncate text-sm font-bold">
                {user?.fullName}
              </p>
              <p className="text-muted-foreground truncate text-xs">
                {user?.email}
              </p>
            </div>

            <div className="p-1.5">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-all hover:bg-gray-50 dark:hover:bg-slate-900"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {item.badge && (
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
                  onSignOut?.();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDrop;
