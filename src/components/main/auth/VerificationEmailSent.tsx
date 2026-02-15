"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

const VerificationEmailSent = () => {
  return (
    <>
      <div className="mb-8 flex flex-col items-center space-y-2 text-center">
        <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <Mail className="text-primary h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Verify Your Email</h1>
        <p className="text-muted-foreground text-sm">
          {`We've`} sent a verification link to your email address. Please check
          your inbox.
        </p>
      </div>

      <div className="space-y-4">
        <Button
          asChild
          className="bg-primary w-full rounded-full py-3 font-semibold text-white shadow-sm transition-colors duration-200"
        >
          <Link href="/login">Return to Login</Link>
        </Button>

        <p className="text-muted-foreground text-center text-sm">
          {`Didn't`} receive the email?{" "}
          <button
            type="button"
            className="text-primary hover:text-primary/80 cursor-pointer font-medium transition-colors duration-200"
            onClick={() => {
              // Add resend logic here if needed
              console.log("Resend verification email");
            }}
          >
            Click to resend
          </button>
        </p>
      </div>
    </>
  );
};

export default VerificationEmailSent;
