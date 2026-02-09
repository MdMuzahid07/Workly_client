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
import { ArrowLeft, Camera, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface JobSeekerPersonalInformationViewProps {
  onBack: () => void;
}

export default function JobSeekerPersonalInformationView({
  onBack,
}: JobSeekerPersonalInformationViewProps) {
  const { user } = useAppSelector((state) => state.auth) || {};
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile updated successfully");
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
            className="text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Settings
          </button>
          <h1 className="text-3xl font-bold tracking-tight">
            Personal Information
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Manage your personal details and public profile information.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Separator />

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        {/* Sidebar / Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Profile Picture</h3>
            <p className="text-muted-foreground text-sm">
              This will be displayed on your profile.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl border p-6 text-center">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white outline-1">
                <AvatarImage src={user?.profilePicture} alt={user?.fullName} />
                <AvatarFallback className="text-4xl font-bold">
                  {user?.fullName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="bg-primary text-primary-foreground absolute right-0 bottom-0 cursor-pointer rounded-full p-2 transition-transform hover:scale-105"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="text-sm">
              <p className="font-medium">Edit Photo</p>
              <p className="text-muted-foreground text-xs">
                JPG, GIF or PNG. Max size of 800K
              </p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
              <CardDescription>
                Update your name and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    id="fullName"
                    defaultValue={user?.fullName}
                    placeholder="e.g. John Doe"
                    className="border-border rounded-full pl-9"
                  />
                </div>
                <p className="text-muted-foreground text-xs">
                  Your name as it will appear on your public profile.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email}
                      placeholder="john@example.com"
                      className="border-border rounded-full pl-9"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue={user?.phone || ""}
                      placeholder="+1 (555) 000-0000"
                      className="border-border rounded-full pl-9"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Role (Optional)</CardTitle>
              <CardDescription>
                Help recruiters find you by specifying your current role.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="role">Current Role</Label>
                <Input
                  id="role"
                  defaultValue=""
                  className="border-border rounded-full"
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
