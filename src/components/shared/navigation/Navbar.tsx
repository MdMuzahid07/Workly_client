"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../../../constants";
import { useAuthDialog } from "../../main/auth/AuthDialogProvider";
import ProfileDrop from "./ProfileDrop";

const Navbar = () => {
  const pathname = usePathname();
  const { openAuth } = useAuthDialog();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* desktop nav */}
      <motion.nav
        className="border-border fixed top-0 right-0 left-0 z-[999999] hidden h-18 border-b bg-white/90 backdrop-blur md:flex"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
      >
        <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-6">
          {/* brand name */}
          <Link href="/" className="text-foreground text-xl font-bold">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              Workly_job
            </motion.span>
          </Link>

          {/* nav links  */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center gap-2 text-lg font-semibold transition-colors ${
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <motion.span
                  className="flex items-center gap-2"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </motion.span>

                {isActive(item.href) && (
                  <motion.span
                    layoutId="underline"
                    className="bg-primary absolute right-0 -bottom-1 left-0 mx-auto h-0.5 min-w-fit rounded-full"
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* desktop actions */}
          <div className="hidden gap-2 md:flex">
            {/* <ProfileDrop /> */}
            <Button
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-green-400 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-colors duration-200"
              onClick={() => openAuth("signIn")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* mobile nav */}
      <motion.nav
        className="border-border bg-background/50 fixed right-2 bottom-2 left-2 z-[9999999] rounded-2xl border backdrop-blur-xs md:hidden"
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="flex items-center justify-around px-3 sm:py-1">
          {[...navLinks].map((item, i) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center rounded-lg p-1 text-xs font-medium transition-colors ${
                isActive(item.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center sm:gap-1 sm:p-2"
              >
                <item.icon
                  className={`sm-3.5 w-3.5 sm:h-5 sm:w-5 ${
                    isActive(item.href) ? "fill-primary/20" : ""
                  }`}
                />
                <span className="text-[10px] sm:text-xs">{item.name}</span>
              </motion.div>
            </Link>
          ))}
          <ProfileDrop isMobile={true} />
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
