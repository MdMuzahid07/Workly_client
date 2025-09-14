/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Eye, EyeOff, Shield } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const ResetPasswordView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore

  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const [isSubmitted, setIsSubmitted] = useState(false);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const [submitting, setSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const handleSubmit = async (e: React.FormEvent) => {};

  const handleInputChange = (
    field: "password" | "confirmPassword",
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="flex min-h-[calc(100dvh-64px)] items-center justify-center bg-green-50 px-4 py-10">
      <div className="w-full max-w-[425px] rounded-3xl border border-gray-200 bg-gray-50 p-6">
        <div className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            {isSubmitted ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <Shield className="h-6 w-6 text-green-600" />
            )}
          </div>
          <h1 className="text-center text-2xl font-bold text-gray-900">
            {isSubmitted ? "Password Updated!" : "Create New Password"}
          </h1>
          <p className="text-center text-gray-600">
            {isSubmitted
              ? "Your password has been successfully updated. You can now sign in with your new password."
              : "Enter your new password below. Make sure it's strong and secure."}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="rounded-lg border-gray-300 bg-white pr-10 transition-all duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="rounded-lg border-gray-300 bg-white pr-10 transition-all duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-3">
              <p className="text-xs text-blue-800">
                Password should be at least 8 characters long and include
                uppercase, lowercase, numbers, and special characters.
              </p>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full cursor-pointer rounded-lg bg-green-400 py-3 font-semibold text-white shadow-sm transition-colors duration-200 disabled:opacity-70"
            >
              {submitting ? "Updating..." : "Update Password"}
            </Button>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-green-100 p-4 text-center">
              <p className="text-sm text-green-800">
                Your password has been successfully updated!
              </p>
            </div>
            <Button
              onClick={() => router.push("/?auth=signin")}
              className="w-full cursor-pointer rounded-lg bg-green-400 py-3 font-semibold text-white shadow-sm transition-colors duration-200"
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
