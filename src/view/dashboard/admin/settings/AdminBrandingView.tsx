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
import { ArrowLeft, Globe, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AdminBrandingViewProps {
  onBack: () => void;
}

export default function AdminBrandingView({ onBack }: AdminBrandingViewProps) {
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Portal branding updated successfully");
      onBack();
    }, 1000);
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
            disabled={loading}
          >
            {loading ? "Publishing..." : "Update Brand"}
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
              <div className="bg-primary shadow-primary/20 flex h-20 w-20 transform items-center justify-center rounded-4xl shadow-xl transition-transform group-hover:rotate-6">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold tracking-tighter">Workly</p>
                <p className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
                  Job Portal
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
                    defaultValue="Workly Job Portal"
                    className="bg-muted/30 focus-visible:ring-primary/20 h-11 rounded-xl border-none pl-11 font-bold"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="slogan"
                  className="text-xs font-bold tracking-widest uppercase opacity-60"
                >
                  Tagline / Mission Statement
                </Label>
                <Input
                  id="slogan"
                  defaultValue="Connecting Talent with Opportunity"
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
                    defaultValue="support@workly.com"
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
                To modify the system logo assets, please access the{" "}
                <span className="text-primary cursor-pointer font-bold underline">
                  Asset Manager
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
