/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useChangePasswordMutation } from "@/redux/feature/auth/authApi";
import { AlertCircle, ArrowLeft, Check, Lock, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface JobSeekerSecurityViewProps {
  onBack: () => void;
}

export default function JobSeekerSecurityView({
  onBack,
}: JobSeekerSecurityViewProps) {
  const [changePassword, { isLoading: isUpdating }] =
    useChangePasswordMutation();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    try {
      await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }).unwrap();
      toast.success("Password updated successfully");
      onBack();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Settings
          </button>
          <h1 className="text-3xl font-bold tracking-tight">
            Password & Security
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Manage your password to keep your account secure.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button onClick={handleUpdatePassword} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Sidebar / Info */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="text-primary h-4 w-4" />
                Password Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Check className="text-primary h-4 w-4" />
                <span>Minimum 8 characters long</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-primary h-4 w-4" />
                <span>At least one uppercase character</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-primary h-4 w-4" />
                <span>At least one number</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-primary h-4 w-4" />
                <span>At least one special character</span>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-xl border p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div className="space-y-1">
                <p className="font-medium">Security Tips</p>
                <p className="text-muted-foreground text-sm">
                  Enable two-factor authentication to add an extra layer of
                  security to your account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password associated with your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="current">Current Password</Label>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                    <Input
                      id="current"
                      type="password"
                      value={formData.oldPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          oldPassword: e.target.value,
                        })
                      }
                      placeholder="••••••••"
                      className="border-border rounded-full pl-9"
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="new">New Password</Label>
                    <div className="relative">
                      <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                      <Input
                        id="new"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            newPassword: e.target.value,
                          })
                        }
                        placeholder="••••••••"
                        className="border-border rounded-full pl-9"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirm">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                      <Input
                        id="confirm"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="••••••••"
                        className="border-border rounded-full pl-9"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
