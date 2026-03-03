"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useAppSelector } from "@/redux/hooks";
import { ArrowLeft, Camera, Mail, Phone, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AdminPersonalInformationViewProps {
  onBack: () => void;
}

export default function AdminPersonalInformationView({
  onBack,
}: AdminPersonalInformationViewProps) {
  const { user } = useAppSelector((state) => state.auth) || {};
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Administrative profile updated successfully");
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
          <h1 className="text-3xl font-bold tracking-tight">
            Personal Information
          </h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium opacity-80">
            Manage your administrative identity and profile details.
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
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Separator className="opacity-50" />

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        {/* Sidebar / Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold tracking-tight">
              Profile Picture
            </h3>
            <p className="text-muted-foreground text-sm font-medium opacity-70">
              This will be displayed in the system audit logs.
            </p>
          </div>
          <div className="bg-muted/20 flex flex-col items-center gap-4 rounded-xl border-2 border-dashed p-8 text-center">
            <div className="relative">
              <div className="from-primary/50 rounded-full bg-linear-to-tr to-transparent p-1">
                <Avatar className="border-background h-36 w-36 border-4 shadow-xl">
                  <AvatarImage
                    src={user?.profilePicture}
                    alt={user?.fullName}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary text-4xl font-bold">
                    {user?.fullName?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <button
                type="button"
                className="bg-primary text-primary-foreground border-background absolute right-2 bottom-2 cursor-pointer rounded-xl border-4 p-3 shadow-lg transition-transform hover:scale-110 active:scale-95"
              >
                <Camera className="h-5 w-5" />
              </button>
            </div>
            <div className="text-sm">
              <p className="text-primary mb-1 text-[10px] font-bold tracking-widest uppercase">
                Update Avatar
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                JPG, GIF or PNG. Max size 1MB
              </p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="overflow-hidden rounded-xl border shadow-sm">
            <CardHeader className="bg-muted/10 border-b pb-6">
              <CardTitle className="font-bold">Identity Details</CardTitle>
              <CardDescription className="font-medium">
                Your name and system contact email.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-2">
                <Label
                  htmlFor="fullName"
                  className="text-xs font-bold tracking-widest uppercase opacity-60"
                >
                  Full Name
                </Label>
                <div className="relative">
                  <UserIcon className="text-muted-foreground absolute top-3 left-4 h-4 w-4" />
                  <Input
                    id="fullName"
                    defaultValue={user?.fullName || "Administrative User"}
                    placeholder="e.g. System Admin"
                    className="bg-muted/30 focus-visible:ring-primary/20 h-11 rounded-xl border-none pl-11 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-bold tracking-widest uppercase opacity-60"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-3 left-4 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email || "admin@workly.com"}
                      className="bg-muted/30 focus-visible:ring-primary/20 h-11 rounded-xl border-none pl-11 font-bold"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="phone"
                    className="text-xs font-bold tracking-widest uppercase opacity-60"
                  >
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="text-muted-foreground absolute top-3 left-4 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue={user?.phone || ""}
                      placeholder="+1 (555) 000-0000"
                      className="bg-muted/30 focus-visible:ring-primary/20 h-11 rounded-xl border-none pl-11 font-bold"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 rounded-xl border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">System Role</CardTitle>
              <CardDescription className="font-medium">
                Your current administrative access level.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/5 border-primary/10 flex items-center justify-between rounded-xl border p-4">
                <div>
                  <p className="text-primary mb-1 text-xs font-bold tracking-widest uppercase">
                    Permission Tier
                  </p>
                  <p className="text-xl font-bold">Super Administrator</p>
                </div>
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <ShieldIcon className="text-primary h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);
