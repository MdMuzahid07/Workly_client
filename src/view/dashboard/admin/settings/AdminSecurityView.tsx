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
import { Switch } from "@/components/ui/switch";
import { useChangePasswordMutation } from "@/redux/feature/auth/authApi";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Lock,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AdminSecurityViewProps {
  onBack: () => void;
}

export default function AdminSecurityView({ onBack }: AdminSecurityViewProps) {
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
            className="text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2 text-sm font-bold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Settings
          </button>
          <h1 className="text-3xl font-bold tracking-tight">
            Security & Access
          </h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium opacity-80">
            Secure your administrative portal and manage credentials.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-full font-bold"
            onClick={onBack}
          >
            Cancel
          </Button>
          <Button
            className="shadow-primary/20 rounded-full px-8 font-bold shadow-lg"
            onClick={handleUpdatePassword}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Save Controls"}
          </Button>
        </div>
      </div>

      <Separator className="opacity-50" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Sidebar / Info */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5 overflow-hidden rounded-xl border-2 shadow-none">
            <CardHeader className="bg-primary/10 pb-4">
              <CardTitle className="text-primary flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
                <Shield className="h-4 w-4" />
                Password Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-6 text-sm font-bold">
              {[
                "Minimum 12 characters recommended",
                "Uppercase character required",
                "Numeric character required",
                "Special character (!@#) required",
              ].map((req, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-primary/20 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <Check
                      className="text-primary bold h-3 w-3"
                      strokeWidth={4}
                    />
                  </div>
                  <span className="opacity-80">{req}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="bg-muted/10 rounded-xl border-2 border-dashed p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-primary mt-0.5 h-6 w-6 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-bold tracking-widest uppercase">
                  Brute Force Guard
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                  System automatically locks administrative accounts after 5
                  failed login attempts for 30 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="overflow-hidden rounded-xl border shadow-sm">
            <CardHeader className="bg-muted/10 border-b pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-bold">Credential Update</CardTitle>
                  <CardDescription className="font-medium">
                    Rotate your administrative password regularly.
                  </CardDescription>
                </div>
                <div className="bg-background flex h-10 w-10 items-center justify-center rounded-full border shadow-inner">
                  <Lock className="text-muted-foreground h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div className="grid gap-2">
                  <Label
                    htmlFor="oldPassword"
                    className="text-xs font-bold tracking-widest uppercase opacity-60"
                  >
                    Current Password
                  </Label>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute top-3 left-4 h-4 w-4" />
                    <Input
                      id="oldPassword"
                      type="password"
                      value={formData.oldPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          oldPassword: e.target.value,
                        })
                      }
                      placeholder="••••••••••••"
                      className="bg-muted/30 focus-visible:ring-primary/20 h-11 rounded-xl border-none pl-11 font-bold"
                    />
                  </div>
                </div>

                <div className="py-2">
                  <Separator className="opacity-50" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="newPassword"
                      className="text-xs font-bold tracking-widest uppercase opacity-60"
                    >
                      New Password
                    </Label>
                    <div className="relative">
                      <Lock className="text-muted-foreground absolute top-3 left-4 h-4 w-4" />
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            newPassword: e.target.value,
                          })
                        }
                        placeholder="••••••••••••"
                        className="bg-muted/30 focus-visible:ring-primary/20 h-11 rounded-xl border-none pl-11 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-xs font-bold tracking-widest uppercase opacity-60"
                    >
                      Verify Password
                    </Label>
                    <div className="relative">
                      <Lock className="text-muted-foreground absolute top-3 left-4 h-4 w-4" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="••••••••••••"
                        className="bg-muted/30 focus-visible:ring-primary/20 h-11 rounded-xl border-none pl-11 font-bold"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5 rounded-xl border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="bg-primary shadow-primary/20 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">MFA Enforcement</h3>
                    <p className="text-muted-foreground max-w-[280px] text-xs font-medium">
                      Require a secondary security code via authenticated app
                      for all login attempts.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary text-[10px] font-bold tracking-widest uppercase">
                    SECURE
                  </span>
                  <Switch
                    defaultChecked
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
