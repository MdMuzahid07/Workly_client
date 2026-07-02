"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Eye, EyeOff, Shield } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import WkForm from "../../components/form/WkForm";
import WKInput from "../../components/form/WkInput";
import { useResetPasswordMutation } from "../../redux/feature/auth/authApi";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password cannot exceed 72 characters")
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword] = useResetPasswordMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: PasswordFormData) => {
    setSubmitting(true);
    setError(null);

    interface ApiErrorData {
      success?: boolean;
      message?: string;
      errorSources?: {
        path?: string | string[];
        message?: string;
      };
    }

    const result = await resetPassword({
      token,
      newPassword: data.password,
      confirmPassword: data.confirmPassword,
    });

    const successResult = result as {
      data?: { success?: boolean; message?: string };
    };
    const errorResult = result as { error?: { data?: ApiErrorData } };

    if (successResult.data && successResult.data.success) {
      setIsSubmitted(true);
      setSubmitting(false);
      toast.success(
        successResult.data.message || "Password updated successfully",
      );
    } else if (errorResult.error) {
      const errorData = errorResult.error.data;
      const errMsg =
        errorData?.message ||
        errorData?.errorSources?.message ||
        "Failed to reset password. Please try again.";
      setError(errMsg);
      toast.error(errMsg);
      setSubmitting(false);
    } else {
      const errMsg = "Failed to reset password. Please try again.";
      setError(errMsg);
      toast.error(errMsg);
      setSubmitting(false);
    }
  };

  const handleContinue = () => {
    router.push("/login");
  };

  return (
    <div className="w-full space-y-6">
      <div className="mb-8 space-y-3 text-center">
        <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          {isSubmitted ? (
            <CheckCircle className="text-primary h-8 w-8" />
          ) : (
            <Shield className="text-primary h-8 w-8" />
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          {isSubmitted ? "Password Updated!" : "New Password"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {isSubmitted
            ? "Your password has been successfully updated. You can now sign in with your new password."
            : "Enter your new password below. Make sure it's strong and secure."}
        </p>
      </div>

      {!isSubmitted ? (
        <WkForm resolver={zodResolver(passwordSchema)} onSubmit={handleSubmit}>
          {error && (
            <div className="bg-destructive/10 text-destructive mb-4 rounded-lg p-3 text-sm font-medium">
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
                className="form-input rounded-full transition-all duration-200"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-6.5 right-0 cursor-pointer hover:bg-transparent"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  <EyeOff className="text-muted-foreground h-4 w-4" />
                ) : (
                  <Eye className="text-muted-foreground h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="relative">
              <WKInput
                name="confirmPassword"
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="form-input rounded-full transition-all duration-200"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-6.5 right-0 cursor-pointer hover:bg-transparent"
                onClick={() => setShowConfirmPassword((v) => !v)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="text-muted-foreground h-4 w-4" />
                ) : (
                  <Eye className="text-muted-foreground h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="bg-muted my-6 rounded-xl p-4">
            <p className="text-muted-foreground text-xs leading-relaxed">
              <span className="text-primary mb-1 block font-semibold">
                Security Tip:
              </span>
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
        <div className="space-y-6">
          <div className="bg-success/10 text-success rounded-lg p-4 text-center text-sm font-medium">
            Your password has been successfully updated!
          </div>
          <Button
            onClick={handleContinue}
            className="bg-primary w-full cursor-pointer rounded-full py-3 font-semibold text-white shadow-sm transition-colors duration-200"
          >
            Continue to Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordView;
