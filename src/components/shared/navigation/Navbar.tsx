"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  Briefcase,
  Building2,
  FileText,
  Heart,
  LogOut,
  Menu,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { navLinks } from "../../../constants";
import { useLogoutUserMutation } from "../../../redux/feature/auth/authApi";
import { logout } from "../../../redux/feature/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useAuthDialog } from "../../main/auth/AuthDialogProvider";
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
  const { openAuth } = useAuthDialog();
  const { user, isVerified } = useAppSelector((state) => state.auth) || {
    email: null,
  };
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
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
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error("Logout error:", error);

      localStorage.clear();
      dispatch(logout());
      window.location.href = "/";
    }
  };

  // Get user role and company info
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
    decodedToken?.role === "EMPLOYER" ||
    user?.role === "EMPLOYER" ||
    (user?.role as string) === "EMPLOYER";
  const isAdmin = decodedToken?.role === "ADMIN" || user?.role === "ADMIN";
  const isSuperAdmin =
    decodedToken?.role === "SUPER_ADMIN" || user?.role === "SUPER_ADMIN";
  const hasCompany =
    Boolean(decodedToken?.companyId) || Boolean(user?.companyId);

  // Profile menu items
  const profileMenuItems = [
    {
      icon: User,
      label: "My Profile",
      href: isEmployer ? "/profile" : "/dashboard/profile",
    },
    ...(!isEmployer
      ? [{ icon: Briefcase, label: "My Dashboard", href: "/dashboard" }]
      : []),
    ...(!isEmployer && !hasCompany
      ? [
          {
            icon: Briefcase,
            label: "Applied Jobs",
            href: "/dashboard/applied-jobs",
            badge: 3,
          },
        ]
      : []),
    ...(!isEmployer && hasCompany
      ? [
          {
            icon: Heart,
            label: "Saved Jobs",
            href: "/dashboard/saved-jobs",
            badge: 12,
          },
        ]
      : []),
    ...(!hasCompany && isEmployer
      ? [{ icon: Building2, label: "Create Company", href: "/create-company" }]
      : []),
    ...((isEmployer && hasCompany) || isAdmin || isSuperAdmin
      ? [{ icon: FileText, label: "Company Dashboard", href: "/employer" }]
      : []),
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className={`fixed top-0 right-0 left-0 z-999999 ${pathname === "/" && !user?.email && isVerified ? "" : "hidden"} border-border bg-background/80 h-16 border-b shadow-sm backdrop-blur-md sm:h-18 md:flex`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <WJLogo />
          </motion.div>

          <div
            className={`${pathname === "/" ? "flex" : "hidden"} items-center gap-3 md:flex`}
          >
            {user?.email && isVerified ? (
              <>
                <div className="hidden items-center gap-3 md:flex">
                  {navLinks.map((item, i) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="relative"
                        title={item.name || ""}
                      >
                        <motion.div
                          className={`relative flex items-center gap-2 rounded-full border bg-white p-2.5 text-sm font-medium transition-all duration-200 ${
                            active
                              ? "text-primary"
                              : "text-muted-foreground hover:text-primary"
                          }`}
                          whileHover={{ y: -1 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <item.icon
                            className={`h-4 w-4 transition-all ${
                              active ? "text-primary scale-110" : ""
                            }`}
                          />

                          {active && (
                            <motion.div
                              layoutId="activeTab"
                              className="border-primary bg-primary/10 absolute inset-0 rounded-full border"
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30,
                              }}
                            />
                          )}
                        </motion.div>
                      </Link>
                    );
                  })}
                  <div className="hidden md:block">
                    <NotificationDropdown />
                  </div>
                </div>

                <ThemeSwitcher />
                <div className="hidden md:block">
                  <ProfileDrop onSignOut={handleLogout} user={user} />
                </div>
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 flex cursor-pointer items-center gap-2 rounded-full px-6 py-2.5 text-base font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
                  onClick={() => openAuth("signIn")}
                >
                  Sign In
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      {user?.email && isVerified && (
        <motion.nav
          className="border-border bg-background/95 fixed top-0 right-0 left-0 z-9999 flex h-16 items-center justify-between border-b px-4 backdrop-blur-md md:hidden"
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          {/* Left: Hamburger Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle className="flex items-center gap-2">
                  <WJLogo />
                </SheetTitle>
              </SheetHeader>

              <div className="flex h-full flex-col">
                {/* User Profile Section */}
                <div className="border-b p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {user?.avatar ? (
                        <Image
                          src={user?.avatar}
                          alt={user?.fullName}
                          className="border-primary h-14 w-14 rounded-full border-2 object-cover"
                          width={56}
                          height={56}
                          priority
                        />
                      ) : (
                        <div className="border-primary bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-full border-2 text-base font-semibold">
                          {user?.fullName
                            ?.split(" ")
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .map((n: any) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                      )}
                      <div className="border-background bg-primary absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full border-2"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground truncate font-semibold">
                        {user?.fullName}
                      </p>
                      <p className="text-muted-foreground truncate text-sm">
                        {user?.email}
                      </p>
                      <div className="mt-1 flex items-center gap-1">
                        <div className="bg-primary h-2 w-2 rounded-full"></div>
                        <span className="text-primary text-xs font-medium">
                          Online
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-2">
                  <nav className="space-y-1 px-2">
                    {navLinks.map((item) => {
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all ${
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Profile Menu Items */}
                  <div className="mt-2 border-t px-2 pt-2">
                    <p className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
                      Account
                    </p>
                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-muted-foreground hover:bg-accent hover:text-foreground flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold">
                            {item.badge > 99 ? "99+" : item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>

                  {/* Theme Switcher */}
                  <div className="mt-2 border-t px-2 pt-2">
                    <div className="flex items-center justify-between rounded-lg px-3 py-3">
                      <span className="text-muted-foreground text-sm font-medium">
                        Theme
                      </span>
                      <ThemeSwitcher />
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="border-t p-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="absolute left-1/2 -translate-x-1/2">
            <WJLogo />
          </div>

          <div className="flex items-center">
            <NotificationDropdown />
          </div>
        </motion.nav>
      )}
    </>
  );
};

export default Navbar;
