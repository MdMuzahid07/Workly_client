"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "../../../../redux/feature/auth/authApi";
import WkForm from "../../../form/WkForm";
import WKInput from "../../../form/WkInput";
import { useAuthDialog } from "../AuthDialogProvider";

interface ForgetPasswordFormData {
  email: string;
}

const ForgetPasswordView = () => {
  const { switchView } = useAuthDialog();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const defaultValues: ForgetPasswordFormData = { email: "" };

  const handleSubmit = async (data: ForgetPasswordFormData) => {
    const result = await forgotPassword({ email: data.email });
    console.log(result.data);

    if (result && result.data) {
      toast.success(result.data.message);
      setIsSubmitted(true);
    } else if (result && "error" in result) {
      toast.error(
        "error" in result.error
          ? result.error.error
          : "An error occurred. Please try again.",
      );
    }
  };

  return (
    <>
      <DialogHeader className="space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <KeyRound className="h-6 w-6 text-green-600" />
        </div>
        <DialogTitle className="text-secondary-foreground text-center text-2xl font-bold">
          Reset Password
        </DialogTitle>
        <DialogDescription className="text-secondary-foreground text-center">
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
              disabled={isLoading}
              type="submit"
              className="bg-primary w-full cursor-pointer rounded-full py-3 font-semibold text-white shadow-sm transition-colors duration-200"
            >
              {isLoading ? "Sending..." : "Send Password Reset Email"}
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
            className="hover:bg-primary/2 text-secondary-foreground w-full cursor-pointer rounded-full border-gray-300 py-3 font-semibold transition-colors duration-200"
          >
            Send Another Email
          </Button>
        </div>
      )}

      <div className="mt-6 border-t border-gray-200 pt-6">
        <p className="text-secondary-foreground text-center text-sm">
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
