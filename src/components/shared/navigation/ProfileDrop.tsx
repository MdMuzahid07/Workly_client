"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  FileText,
  Heart,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: number;
}

interface UserProfile {
  name: string;
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
  user = {
    name: "John Doe",
    email: "john.doe@email.com",
    initials: "JD",
  },
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
    { icon: Briefcase, label: "My Jobs", href: "/my-jobs", badge: 3 },
    { icon: Heart, label: "Saved Jobs", href: "/saved", badge: 12 },
    { icon: FileText, label: "My Resume", href: "/resume" },
    { icon: FileText, label: "Company Dashboard", href: "/dashboard" },
    { icon: Settings, label: "Settings", href: "/settings" },
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
          className={`group relative flex cursor-pointer items-center gap-2 rounded-full border-none bg-gray-100/80 p-1 ring-2 ring-green-400/30 transition-all duration-200 ${
            isOpen ? "bg-gray-100/80 focus:ring-2 focus:ring-green-400/70" : ""
          }`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="User menu"
        >
          <div className="relative">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                className="h-6 w-6 rounded-full border-2 border-white object-cover shadow-sm"
                width={25}
                height={25}
                priority
              />
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-sm font-semibold text-white shadow-sm">
                {user.initials}
              </div>
            )}
            <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 shadow-sm"></div>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            } group-hover:text-gray-700`}
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
            className={`z-50 overflow-hidden rounded-2xl border bg-white drop-shadow-2xl ${
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
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-sm sm:h-12 sm:w-12"
                      width={48}
                      height={48}
                      priority
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-lg font-semibold text-white shadow-sm sm:h-12 sm:w-12">
                      {user.initials}
                    </div>
                  )}
                  {/* <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-sm"></div> */}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-center font-semibold text-gray-900 sm:text-start">
                    {user.name}
                  </p>
                  <p className="truncate text-center text-sm text-gray-600 sm:text-start">
                    {user.email}
                  </p>
                  {/* <div className="mt-1 flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
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
                  className="group flex items-center justify-between px-4 py-3 text-sm text-gray-700 transition-all duration-150 hover:bg-gray-50/80 focus:bg-gray-50/80 focus:outline-none"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-gray-500 transition-colors group-hover:text-gray-700" />
                    <span className="text-xs font-medium text-slate-700">
                      {item.label}
                    </span>
                  </div>
                  {item.badge && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

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
