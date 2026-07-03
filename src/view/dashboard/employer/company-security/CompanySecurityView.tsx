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

interface CompanySecurityViewProps {
  onBack: () => void;
}

export default function CompanySecurityView({
  onBack,
}: CompanySecurityViewProps) {
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
    if (formData.newPassword.length < 8 || formData.newPassword.length > 72) {
      toast.error("Password must be between 8 and 72 characters");
      return;
    }
    try {
      await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }).unwrap();
      toast.success("Security settings updated successfully");
      onBack();
    } catch (err) {
      interface ApiErrorData {
        success?: boolean;
        message?: string;
        errorSources?: {
          path?: string | string[];
          message?: string;
        };
      }
      const error = err as {
        data?: ApiErrorData;
      };
      toast.error(
        error.data?.message ||
          error.data?.errorSources?.message ||
          "Failed to update security settings",
      );
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
            Manage your company account security and authentication mode.
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
                Security Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Check className="text-primary h-4 w-4" />
                <span>Strong password (min 8 chars)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-primary h-4 w-4" />
                <span>Regular password updates recommended</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-primary h-4 w-4" />
                <span>Authorized access only</span>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-xl border p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div className="space-y-1">
                <p className="font-medium">Company Security</p>
                <p className="text-muted-foreground text-sm">
                  Ensure your company account uses a unique password not shared
                  with other services.
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
                Update your company account password.
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
                    <Label htmlFor="confirm">Confirm New Password</Label>
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
