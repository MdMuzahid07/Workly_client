"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import { useAuthDialog } from "../AuthDialogProvider";

export function ForgetPasswordView() {
  const { switchView } = useAuthDialog();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email });
    setIsSubmitted(true);
  };

  return (
    <>
      <DialogHeader className="space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <KeyRound className="h-6 w-6 text-green-600" />
        </div>
        <DialogTitle className="text-center text-2xl font-bold text-gray-900">
          Reset Password
        </DialogTitle>
        <DialogDescription className="text-center text-gray-600">
          {isSubmitted
            ? "Check your email for password reset instructions."
            : "Enter your email address and we'll send you a link to reset your password."}
        </DialogDescription>
      </DialogHeader>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border-gray-300 bg-white pl-10 transition-all duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-green-400 py-3 font-semibold text-white shadow-sm transition-colors duration-200"
          >
            Send Reset Link
          </Button>
        </form>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="rounded-lg bg-green-100 p-4 text-center">
            <p className="text-sm text-green-800">
              Password reset instructions have been sent to{" "}
              <span className="font-medium">{email}</span>
            </p>
          </div>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="w-full cursor-pointer rounded-lg border-gray-300 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50"
          >
            Send Another Email
          </Button>
        </div>
      )}

      <div className="mt-6 border-t border-gray-200 pt-6">
        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Button
            variant="link"
            className="h-auto cursor-pointer p-0 font-medium text-green-400 transition-colors duration-200 hover:text-[#00C299]"
            onClick={() => switchView("signIn")}
          >
            Sign in here
          </Button>
        </p>
      </div>
    </>
  );
}
