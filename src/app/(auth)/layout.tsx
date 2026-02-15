"use client";

import WJLogo from "@/components/shared/WJLogo";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Fingerprint,
  LockKeyhole,
  LogIn,
  Mail,
  MoveLeft,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getPageContent = () => {
    if (pathname.includes("/login")) {
      return {
        icon: (
          <LogIn className="text-primary h-12 w-12 drop-shadow-[0_0_15px_rgba(51,178,103,0.3)] md:h-44 md:w-44" />
        ),
        title: "Welcome Back",
        description:
          "Login to your account to continue your professional journey.",
      };
    }
    if (pathname.includes("/register")) {
      return {
        icon: (
          <UserPlus className="text-primary h-12 w-12 drop-shadow-[0_0_15px_rgba(51,178,103,0.3)] md:h-44 md:w-44" />
        ),
        title: "Join WorklyJob",
        description:
          "Create your account and start discovering amazing opportunities today.",
      };
    }
    if (pathname.includes("/forgot-password")) {
      return {
        icon: (
          <Fingerprint className="text-primary h-12 w-12 drop-shadow-[0_0_15px_rgba(51,178,103,0.3)] md:h-44 md:w-44" />
        ),
        title: "Account Recovery",
        description:
          "Don't worry, we'll help you get back into your account securely.",
      };
    }
    if (pathname.includes("/verify-email")) {
      return {
        icon: (
          <ShieldCheck className="text-primary h-12 w-12 drop-shadow-[0_0_15px_rgba(51,178,103,0.3)] md:h-44 md:w-44" />
        ),
        title: "Secure Verification",
        description:
          "Verifying your email address ensures your account stays safe and protected.",
      };
    }
    if (pathname.includes("/reset-password")) {
      return {
        icon: (
          <LockKeyhole className="text-primary h-12 w-12 drop-shadow-[0_0_15px_rgba(51,178,103,0.3)] md:h-44 md:w-44" />
        ),
        title: "Update Password",
        description:
          "Set a strong, unique password to keep your account information secure.",
      };
    }
    if (pathname.includes("/verification-sent")) {
      return {
        icon: (
          <Mail className="text-primary h-12 w-12 drop-shadow-[0_0_15px_rgba(51,178,103,0.3)] md:h-44 md:w-44" />
        ),
        title: "Check Your Inbox",
        description:
          "We've sent a verification link to your email. See you on the other side!",
      };
    }
    return {
      icon: (
        <Briefcase className="text-primary h-12 w-12 drop-shadow-[0_0_15px_rgba(51,178,103,0.3)] md:h-44 md:w-44" />
      ),
      title: "Elevate Your Career",
      description:
        "Join thousands of professionals and companies building the future together.",
    };
  };

  const { icon, title, description } = getPageContent();

  return (
    <div className="flex min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Panel - Branding & Art */}
      <aside className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <WJLogo />
          <span className="ml-2 text-xl font-bold tracking-tight text-white">
            WorklyJob
          </span>
        </div>
        <div className="relative z-20 flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="bg-primary/10 ring-primary/20 flex h-24 w-24 items-center justify-center rounded-3xl ring-1 backdrop-blur-sm md:h-56 md:w-56">
              {icon}
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
              <p className="text-muted-foreground max-w-[300px] text-sm">
                {description}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Panel - Form Content */}
      <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-6 lg:p-12">
        <nav className="absolute top-4 left-4 md:top-8 md:left-8">
          <Button
            variant="ghost"
            asChild
            className="text-muted-foreground hover:text-primary"
          >
            <Link href="/" className="flex items-center gap-2">
              <MoveLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </nav>
        <div className="mx-auto w-full max-w-md space-y-6">{children}</div>
      </main>
    </div>
  );
}
