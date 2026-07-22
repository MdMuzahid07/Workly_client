/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { updateUser } from '@/redux/feature/auth/authSlice';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/feature/profile/profileApi';
import { useUploadAvatarMutation } from '@/redux/feature/upload/uploadApi';
import { useCompressedUpload } from '@/hooks/useCompressedUpload';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ArrowLeft, Camera, Mail, Phone, User as UserIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface JobSeekerPersonalInformationViewProps {
  onBack: () => void;
}

export default function JobSeekerPersonalInformationView({
  onBack,
}: JobSeekerPersonalInformationViewProps) {
  const { user } = useAppSelector((state) => state.auth) || {};
  const dispatch = useAppDispatch();
  const { data: profileData } = useGetProfileQuery(undefined);
  const userFullInfo = profileData?.data;
  const profile = userFullInfo?.profile;
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadFile] = useUploadAvatarMutation();
  const { upload: uploadCompressedImage, isProcessing: isUploadingImage } =
    useCompressedUpload('avatar');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
  });

  useEffect(() => {
    if (userFullInfo) {
      setFormData({
        fullName: userFullInfo.fullName || user?.fullName || '',
        email: userFullInfo.email || user?.email || '',
        phone: userFullInfo.phone || user?.phone || '',
        role: profile?.headline || '',
      });
    }
  }, [userFullInfo, profile, user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateProfile({
        fullName: formData.fullName,
        phone: formData.phone,
        headline: formData.role,
      }).unwrap();

      if (result?.data) {
        const updatedUser = result.data.user || result.data;
        dispatch(
          updateUser({
            fullName: updatedUser.fullName,
            phone: updatedUser.phone,
          }),
        );
      }

      toast.success('Profile updated successfully');
      onBack();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update profile');
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await uploadCompressedImage(
        file,
        (formData) => uploadFile(formData).unwrap(),
        'Profile picture updated',
      );
      if (res.success && res.data?.url) {
        const result = await updateProfile({
          profilePicture: res.data.url,
        }).unwrap();

        if (result?.data) {
          dispatch(
            updateUser({
              profilePicture: res.data.url,
            }),
          );
        }
      }
    } catch (err: any) {
      console.error('Failed to upload image:', err);
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
          <h1 className="text-3xl font-bold tracking-tight">Personal Information</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Manage your personal details and public profile information.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Separator />

      <form onSubmit={handleSave} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Sidebar / Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Profile Picture</h3>
            <p className="text-muted-foreground text-sm">This will be displayed on your profile.</p>
          </div>
          <div className="bg-card flex flex-col items-center gap-4 rounded-xl border p-6 text-center">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white outline-1">
                <AvatarImage
                  src={profile?.avatarUrl || user?.profilePicture}
                  alt={userFullInfo?.fullName || user?.fullName}
                />
                <AvatarFallback className="text-4xl font-bold">
                  {(userFullInfo?.fullName || user?.fullName)?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <button
                type="button"
                disabled={isUploadingImage}
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary text-primary-foreground absolute right-0 bottom-0 cursor-pointer rounded-full p-2 transition-transform hover:scale-105 disabled:opacity-50"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="text-sm">
              <p
                className="cursor-pointer font-medium hover:underline"
                onClick={() => fileInputRef.current?.click()}
              >
                {isUploadingImage ? 'Uploading...' : 'Edit Photo'}
              </p>
              <p className="text-muted-foreground text-xs">JPG, GIF or PNG. Max size of 1MB</p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
              <CardDescription>Update your name and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <UserIcon className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                      value={formData.email}
                      disabled
                      placeholder="john@example.com"
                      className="border-border bg-muted/50 rounded-full pl-9"
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
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
