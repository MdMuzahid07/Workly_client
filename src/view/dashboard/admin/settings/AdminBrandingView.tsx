/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
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
import {
  useGetSystemSettingsQuery,
  useUpdateSystemSettingsMutation,
} from "@/redux/feature/admin/adminApi";
import { useUploadSingleFileMutation } from "@/redux/feature/upload/uploadApi";
import { ArrowLeft, Camera, Globe, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface AdminBrandingViewProps {
  onBack: () => void;
}

export default function AdminBrandingView({ onBack }: AdminBrandingViewProps) {
  const { data: settingsData } = useGetSystemSettingsQuery();
  const [updateSettings, { isLoading: isSaving }] =
    useUpdateSystemSettingsMutation();
  const [uploadFile, { isLoading: isUploadingLogo }] =
    useUploadSingleFileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    siteName: "",
    siteSlogan: "",
    supportEmail: "",
    siteLogo: "",
  });

  useEffect(() => {
    if (settingsData?.data) {
      const data = settingsData.data;
      setFormData({
        siteName: data.siteName || "",
        siteSlogan: data.siteSlogan || "",
        supportEmail: data.supportEmail || "",
        siteLogo: data.siteLogo || "",
      });
    }
  }, [settingsData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings(formData).unwrap();
      toast.success("Portal branding updated successfully");
      onBack();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update branding");
    }
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const logoFormData = new FormData();
    logoFormData.append("file", file);

    try {
      const res = await uploadFile(logoFormData).unwrap();
      if (res.success && res.data?.url) {
        setFormData((prev) => ({ ...prev, siteLogo: res.data.url }));
        toast.success("Logo uploaded. Click 'Update Brand' to save changes.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to upload logo");
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
          <h1 className="text-3xl font-bold tracking-tight">Portal Branding</h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium opacity-80">
            Configure how your portal is presented to employers and candidates.
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
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Publishing..." : "Update Brand"}
          </Button>
        </div>
      </div>

      <Separator className="opacity-50" />

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        {/* Sidebar / Preview */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold tracking-tight">
              Identity Preview
            </h3>
            <p className="text-muted-foreground text-sm font-medium opacity-70">
              How your platform looks in navigation and footers.
            </p>
          </div>
          <Card className="from-primary/5 via-background to-primary/5 group relative overflow-hidden rounded-xl border bg-linear-to-br p-8 shadow-sm">
            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary shadow-primary/20 flex h-20 w-20 transform cursor-pointer items-center justify-center overflow-hidden rounded-4xl shadow-xl transition-transform group-hover:rotate-6 hover:scale-105 active:scale-95"
              >
                {formData.siteLogo ? (
                  <Image
                    width={80}
                    height={80}
                    src={formData.siteLogo}
                    alt="Logo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Sparkles className="h-10 w-10 text-white" />
                )}
                <div className="bg-primary/40 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoChange}
                className="hidden"
                accept="image/*"
              />
              <div className="space-y-1">
                <p className="text-2xl font-bold tracking-tighter">
                  {formData.siteName || "Workly"}
                </p>
                <p className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
                  {isUploadingLogo ? "Uploading Logo..." : "Job Portal"}
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-primary/20 text-primary rounded-full px-4 py-1.5 font-bold"
              >
                Live Platform
              </Badge>
            </div>
            <div className="bg-primary/5 group-hover:bg-primary/10 absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full blur-3xl transition-colors" />
            <div className="bg-primary/5 group-hover:bg-primary/10 absolute bottom-0 left-0 -mb-10 -ml-10 h-32 w-32 rounded-full blur-3xl transition-colors" />
          </Card>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="overflow-hidden rounded-xl border shadow-sm">
            <CardHeader className="bg-muted/10 border-b pb-6">
              <CardTitle className="font-bold">Global Identification</CardTitle>
              <CardDescription className="font-medium">
                Core naming and marketing parameters for the portal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-2">
                <Label
                  htmlFor="siteName"
                  className="text-xs font-bold tracking-widest uppercase opacity-60"
                >
                  Platform Name
                </Label>
                <div className="relative">
                  <Globe className="text-muted-foreground absolute top-3 left-4 h-4 w-4" />
                  <Input
                    id="siteName"
                    value={formData.siteName}
                    onChange={(e) =>
                      setFormData({ ...formData, siteName: e.target.value })
                    }
                    placeholder="Workly Job Portal"
                    className="bg-muted/30 focus-visible:ring-primary/20 h-11 rounded-xl border-none pl-11 font-bold"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="siteSlogan"
                  className="text-xs font-bold tracking-widest uppercase opacity-60"
                >
                  Tagline / Mission Statement
                </Label>
                <Input
                  id="siteSlogan"
                  value={formData.siteSlogan}
                  onChange={(e) =>
                    setFormData({ ...formData, siteSlogan: e.target.value })
                  }
                  placeholder="Connecting Talent with Opportunity"
                  className="bg-muted/30 focus-visible:ring-primary/20 h-11 rounded-xl border-none px-4 font-bold"
                />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="supportEmail"
                  className="text-xs font-bold tracking-widest uppercase opacity-60"
                >
                  Support Alias
                </Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-3 left-4 h-4 w-4" />
                  <Input
                    id="supportEmail"
                    type="email"
                    value={formData.supportEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, supportEmail: e.target.value })
                    }
                    placeholder="support@workly.com"
                    className="bg-muted/30 focus-visible:ring-primary/20 h-11 rounded-xl border-none pl-11 font-bold"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/5 rounded-xl border border-dashed shadow-sm">
            <CardContent className="space-y-2 p-6 text-center">
              <p className="text-sm font-bold tracking-widest uppercase opacity-60">
                Logo Configuration
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                To modify the system logo assets, please click{" "}
                <span
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary cursor-pointer font-bold underline"
                >
                  Upload Logo
                </span>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
