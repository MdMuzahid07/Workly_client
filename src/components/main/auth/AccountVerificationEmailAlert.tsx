"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import { useAuthDialog } from "./AuthDialogProvider";

const AccountVerificationEmailAlert = () => {
  const { closeAuth } = useAuthDialog();

  return (
    <>
      <DialogHeader className="space-y-3">
        <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <Mail className="text-primary h-8 w-8" />
        </div>
        <DialogTitle className="text-secondary-foreground text-center text-2xl font-bold">
          Verify Your Email
        </DialogTitle>
        <DialogDescription className="text-secondary-foreground text-center">
          {`We've`} sent a verification link to your email address.
        </DialogDescription>
        <DialogDescription className="text-secondary-foreground text-center">
          Please check your inbox and click the link to verify your account.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6">
        <Button
          type="button"
          onClick={() => closeAuth()}
          className="bg-primary w-full cursor-pointer rounded-full py-3 font-semibold text-white shadow-sm transition-colors duration-200"
        >
          Got It
        </Button>
      </div>
    </>
  );
};

export default AccountVerificationEmailAlert;
