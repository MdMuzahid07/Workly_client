"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import WkForm from "../../../form/WkForm";
import WKInput from "../../../form/WkInput";
import { useAuthDialog } from "../AuthDialogProvider";

interface ForgetPasswordFormData {
  email: string;
}

const ForgetPasswordView = () => {
  const { switchView } = useAuthDialog();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultValues: ForgetPasswordFormData = { email: "" };

  const handleSubmit = (data: ForgetPasswordFormData) => {
    console.log(data);
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
        <WkForm defaultValues={defaultValues} onSubmit={handleSubmit}>
          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <WKInput
                name="email"
                label="Email Address"
                type="email"
                required
                className="rounded-full border-gray-300 bg-white pl-10 transition-all duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-400"
              />
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer rounded-full bg-green-400 py-3 font-semibold text-white shadow-sm transition-colors duration-200"
            >
              Send Reset Link
            </Button>
          </div>
        </WkForm>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="rounded-full bg-green-100 p-4 text-center">
            <p className="text-sm text-green-800">
              Password reset instructions have been sent to your email.
            </p>
          </div>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="w-full cursor-pointer rounded-full border-gray-300 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50"
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
};

export default ForgetPasswordView;
