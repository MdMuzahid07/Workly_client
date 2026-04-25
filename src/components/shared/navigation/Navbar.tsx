"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  Briefcase,
  Building2,
  FileText,
  Heart,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
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
import NotificationDropdown from "./NotificationDropdown";
import ProfileDrop from "./ProfileDrop";

interface AuthTokenPayload extends JwtPayload {
  role?: string;
  companyId?: string | number;
}

const Navbar = () => {
  const pathname = usePathname();
  const { user, isVerified } = useAppSelector((state) => state.auth) || {
    email: null,
  };
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const profileMenuItems = [
    {
      icon: User,
      label: "My Profile",
      href: isEmployer ? "/profile" : "/dashboard/profile",
    },
    ...(isAdmin || isSuperAdmin
      ? [{ icon: Building2, label: "Admin Panel", href: "/admin" }]
      : []),
    ...(isEmployer
      ? hasCompany
        ? [{ icon: FileText, label: "Employer Hub", href: "/employer" }]
        : [
            {
              icon: Building2,
              label: "Register Company",
              href: "/create-company",
            },
          ]
      : []),
    ...(!isEmployer && !isAdmin && !isSuperAdmin
      ? [
          { icon: Briefcase, label: "Dashboard", href: "/dashboard" },
          {
            icon: Heart,
            label: "Saved",
            href: "/dashboard/saved-jobs",
            badge: 12,
          },
        ]
      : []),
  ];

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-gray-100 bg-white/80 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <WJLogo />
          </Link>

          {/* Minimalist Desktop Navigation */}
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
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 md:flex">
            {/* <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
                <Search className="h-5 w-5" />
             </Button> */}
            <NotificationDropdown />
            <ThemeSwitcher />
          </div>

          {user?.email && isVerified ? (
            <ProfileDrop onSignOut={handleLogout} user={user} />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                className="hidden text-sm font-bold md:flex"
              >
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

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-green-500 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Modern Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/20 backdrop-blur-xs md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-background fixed top-0 right-0 z-50 flex h-full w-full max-w-[320px] flex-col border-l shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between border-b p-6">
                <WJLogo />
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
                      Navigation
                    </p>
                    <div className="grid gap-4">
                      {navLinks.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-foreground flex items-center gap-3 text-lg font-bold transition-opacity hover:opacity-70"
                        >
                          <item.icon className="text-primary h-5 w-5" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {user?.email && isVerified && (
                    <div className="space-y-4 border-t pt-4">
                      <p className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">
                        Account
                      </p>
                      <div className="grid gap-4">
                        {profileMenuItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-foreground flex items-center justify-between text-lg font-bold transition-opacity hover:opacity-70"
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="text-muted-foreground h-5 w-5" />
                              {item.label}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 border-t bg-gray-50/50 p-6 dark:bg-slate-900/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Appearance</span>
                  <ThemeSwitcher />
                </div>
                {user?.email && isVerified ? (
                  <Button
                    onClick={handleLogout}
                    className="w-full justify-center gap-3 rounded-full bg-red-500 font-bold text-white shadow-lg shadow-red-500/20"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </Button>
                ) : (
                  <div className="grid gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="h-12 rounded-full border-2"
                    >
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button
                      asChild
                      className="btn-green-primary h-12 rounded-full"
                    >
                      <Link href="/register">Join Now</Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
