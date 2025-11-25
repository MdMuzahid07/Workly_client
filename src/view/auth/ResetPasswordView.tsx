"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Eye, EyeOff, Shield } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import WkForm from "../../components/form/WkForm";
import WKInput from "../../components/form/WkInput";
import { useAuthDialog } from "../../components/main/auth/AuthDialogProvider";
import { useResetPasswordMutation } from "../../redux/feature/auth/authApi";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const ResetPasswordView = () => {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { switchView } = useAuthDialog();
  const [resetPassword] = useResetPasswordMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: PasswordFormData) => {
    setSubmitting(true);
    setError(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await resetPassword({
      token,
      newPassword: data.password,
      confirmPassword: data.confirmPassword,
    });

    if (result && result.data && result.data.success) {
      setIsSubmitted(true);
      setSubmitting(false);
      toast.success(result.data.message);
    } else {
      setError("Failed to reset password. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-primary/10 flex min-h-[calc(100dvh-64px)] items-center justify-center px-4 py-10">
      <div className="bg-card w-full max-w-[425px] rounded-2xl border-2 border-gray-300/40 p-6">
        <div className="mb-6 space-y-3">
          <div className="bg-primary/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            {isSubmitted ? (
              <CheckCircle className="text-primary h-6 w-6" />
            ) : (
              <Shield className="text-primary h-6 w-6" />
            )}
          </div>
          <h1 className="text-secondary-foreground text-center text-2xl font-bold">
            {isSubmitted ? "Password Updated!" : "Create New Password"}
          </h1>
          <p className="text-secondary-foreground text-center">
            {isSubmitted
              ? "Your password has been successfully updated. You can now sign in with your new password."
              : "Enter your new password below. Make sure it's strong and secure."}
          </p>
        </div>

        {!isSubmitted ? (
          <WkForm
            resolver={zodResolver(passwordSchema)}
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="rounded-full bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <WKInput
                  name="password"
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="rounded-full border-gray-300 bg-white transition-all duration-200 focus:outline-none active:border-green-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-6.5 right-0 cursor-pointer hover:bg-transparent"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <EyeOff className="text-secondary-foreground h-4 w-4" />
                  ) : (
                    <Eye className="text-secondary-foreground h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="relative">
                <WKInput
                  name="confirmPassword"
                  label="Confirm New Password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="rounded-full border-gray-300 bg-white transition-all duration-200 focus:outline-none active:border-green-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-6.5 right-0 cursor-pointer hover:bg-transparent"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="text-secondary-foreground h-4 w-4" />
                  ) : (
                    <Eye className="text-secondary-foreground h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-background my-4 rounded-xl p-3">
              <p className="text-primary text-xs">
                Password should be at least 8 characters long and include
                uppercase, lowercase, numbers, and special characters.
              </p>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="bg-primary w-full cursor-pointer rounded-full py-3 font-semibold text-white shadow-sm transition-colors duration-200 disabled:opacity-70"
            >
              {submitting ? "Updating..." : "Update Password"}
            </Button>
          </WkForm>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="rounded-full bg-green-100 p-4 text-center">
              <p className="text-sm text-green-800">
                Your password has been successfully updated!
              </p>
            </div>
            <Button
              onClick={() => switchView("signIn")}
              className="bg-primary w-full cursor-pointer rounded-full py-3 font-semibold text-white shadow-sm transition-colors duration-200"
            >
              Continue to Sign In
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ResetPasswordView;
