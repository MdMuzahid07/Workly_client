"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Eye, EyeOff, Shield } from "lucide-react";
import { useState } from "react";

const ResetPasswordDialog = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log(formData);
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex cursor-pointer items-center gap-2 rounded-lg bg-green-400 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-colors duration-200">
          Reset Password
          <Shield className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl border-gray-200 bg-green-50 shadow-xl sm:max-w-[425px]">
        <DialogHeader className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            {isSubmitted ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <Shield className="h-6 w-6 text-green-600" />
            )}
          </div>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900">
            {isSubmitted ? "Password Updated!" : "Create New Password"}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {isSubmitted
              ? "Your password has been successfully updated. You can now sign in with your new password."
              : "Enter your new password below. Make sure it's strong and secure."}
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
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
                    onClick={() => setShowPassword(!showPassword)}
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              className="w-full cursor-pointer rounded-lg bg-green-400 py-3 font-semibold text-white shadow-sm transition-colors duration-200"
            >
              Update Password
            </Button>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-green-100 p-4 text-center">
              <p className="text-sm text-green-800">
                Your password has been successfully updated!
              </p>
            </div>
            <Button className="w-full cursor-pointer rounded-lg bg-green-400 py-3 font-semibold text-white shadow-sm transition-colors duration-200">
              Continue to Sign In
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordDialog;
