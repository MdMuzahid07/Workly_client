"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { navLinks } from "../../../constants";
import { useLogoutUserMutation } from "../../../redux/feature/auth/authApi";
import { logout } from "../../../redux/feature/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ThemeSwitcher from "../ThemeSwitcher";
import WJLogo from "../WJLogo";
import MobileBottomNav from "./MobileBottomNav";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDrop from "./ProfileDrop";

const Navbar = () => {
  const pathname = usePathname();
  const { user, isVerified } = useAppSelector((state) => state.auth) || {
    email: null,
  };
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      const loadingToast = toast.loading("Logging out...");
      await logoutUser(undefined).unwrap();
      localStorage.clear();
      dispatch(logout());
      toast.dismiss(loadingToast);
      toast.success("Logged out successfully");
      window.location.href = "/";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      localStorage.clear();
      dispatch(logout());
      window.location.href = "/";
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-slate-200/40 bg-white/80 shadow-xs backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-950/80"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">
          {/* Left — logo + desktop nav */}
          <div className="flex items-center gap-10">
            <div className="flex items-center transition-opacity hover:opacity-80">
              <WJLogo />
            </div>

            {/* Desktop nav links — hidden on mobile (bottom nav handles it) */}
            {user?.email && isVerified && (
              <nav className="hidden items-center gap-8 md:flex">
                {navLinks.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group relative text-[14px] font-semibold tracking-tight transition-colors ${
                        active
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {item.name}
                      {active && (
                        <motion.div
                          layoutId="nav-underline"
                          className="bg-primary absolute -bottom-1 left-0 h-0.5 w-full rounded-full"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-3">
            {/* Notification — all devices, logged-in only */}
            {user?.email && isVerified && <NotificationDropdown />}

            {/* Theme switcher — all devices */}
            <ThemeSwitcher />

            {/* Authenticated: profile dropdown */}
            {user?.email && isVerified ? (
              <ProfileDrop onSignOut={handleLogout} user={user} />
            ) : (
              /* Guest: Log In + CTA */
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" className="text-sm font-bold">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button
                  asChild
                  className="btn-green-primary rounded-full px-5 text-sm font-bold shadow-xs"
                >
                  <Link href="/register">Post a Job</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile bottom navigation — replaces hamburger menu on mobile/tablet */}
      <MobileBottomNav />
    </>
  );
};

export default Navbar;
