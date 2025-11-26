"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  ChevronDown,
  FileText,
  Heart,
  LogOut,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import ThemeSwitcher from "../ThemeSwitcher";

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: number;
}

interface UserProfile {
  fullName: string;
  email: string;
  avatar?: string;
  initials: string;
}

interface ProfileDropProps {
  user?: UserProfile;
  onSignOut?: () => void;
  className?: string;
  isMobile?: boolean;
}

const ProfileDrop: React.FC<ProfileDropProps> = ({
  user,
  onSignOut,
  isMobile,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, handleClickOutside, handleEscapeKey]);

  const menuItems: MenuItem[] = [
    { icon: User, label: "My Profile", href: "/profile" },
    { icon: Briefcase, label: "Applied Jobs", href: "/applied-jobs", badge: 3 },
    { icon: Heart, label: "Saved Jobs", href: "/saved-jobs", badge: 12 },
    { icon: Building2, label: "Create Company", href: "/create-company" },
    { icon: FileText, label: "Company Dashboard", href: "/dashboard" },
  ];

  const handleSignOut = async () => {
    if (onSignOut) {
      await onSignOut();
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {!isMobile ? (
        <Button
          ref={buttonRef}
          onClick={toggleDropdown}
          variant="ghost"
          size="sm"
          className={`group ring-primary/50 bg-card relative flex cursor-pointer items-center gap-2 rounded-full border-none p-1 ring-2 transition-all duration-200 ${
            isOpen
              ? "focus:ring-primary hover:bg-primary hover:text-card bg-card focus:ring-2"
              : ""
          }`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="User menu"
        >
          <div className="relative">
            {user?.avatar ? (
              <Image
                src={user?.avatar}
                alt={user?.fullName}
                className="h-6 w-6 rounded-full border-2 border-white object-cover shadow-sm"
                width={25}
                height={25}
                priority
              />
            ) : (
              <div className="text-muted-foreground flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-[10px] font-semibold shadow-sm">
                {user?.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}
            <div className="bg-primary absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          <ChevronDown
            className={`text-muted-foreground h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            } group-hover:text-muted-foreground`}
          />
        </Button>
      ) : (
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className={`text-muted-foreground hover:text-foreground flex flex-col items-center rounded-lg p-1 text-xs font-medium transition-colors`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="User menu"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 * 0.05 }}
            className="flex flex-col items-center sm:gap-1 sm:p-2"
          >
            <User className="h-5 w-5" />
            <span className="text-[10px] sm:text-xs">Profile</span>
          </motion.div>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`bg-card z-50 overflow-hidden rounded-2xl border drop-shadow-2xl ${
              isMobile
                ? "absolute right-0 bottom-full mb-4 h-fit min-h-[65vh] w-full max-w-[82.5vw] min-w-[84vw]"
                : "absolute top-full right-0 mt-8 w-72"
            }`}
            role="menu"
            aria-orientation="vertical"
          >
            <div className="border-b border-gray-100/80 p-4">
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start">
                <div className="relative">
                  {user?.avatar ? (
                    <Image
                      src={user?.avatar}
                      alt={user?.fullName}
                      className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-sm sm:h-12 sm:w-12"
                      width={48}
                      height={48}
                      priority
                    />
                  ) : (
                    <div className="from-primary/50 border-primary/20 to-primary text-muted-foreground flex h-20 w-20 items-center justify-center rounded-full border text-lg font-semibold shadow-sm sm:h-12 sm:w-12">
                      {user?.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}
                  {/* <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-primary shadow-sm"></div> */}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground truncate text-center font-semibold sm:text-start">
                    {user?.fullName}
                  </p>
                  <p className="text-muted-foreground truncate text-center text-sm sm:text-start">
                    {user?.email}
                  </p>
                  {/* <div className="mt-1 flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-xs font-medium text-green-600">
                      Online
                    </span>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group hover:bg-primary/2/80 focus:bg-primary/2/80 text-muted-foreground flex items-center justify-between px-4 py-3 text-sm transition-all duration-150 focus:outline-none"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="group-hover:text-muted-foreground text-primary h-4 w-4 transition-colors" />
                    <span className="text-muted-foreground text-xs font-medium group-hover:text-white">
                      {item.label}
                    </span>
                  </div>
                  {item.badge && (
                    <span className="bg-primary/10 text-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold">
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {isMobile ? <ThemeSwitcher isMobile={isMobile} /> : ""}
            <div className="border-t border-gray-100/80">
              <button
                onClick={handleSignOut}
                className="group flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left text-sm font-medium text-red-600 transition-all duration-150 hover:bg-red-50/80 focus:bg-red-50/80 focus:outline-none"
                role="menuitem"
              >
                <LogOut className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDrop;
