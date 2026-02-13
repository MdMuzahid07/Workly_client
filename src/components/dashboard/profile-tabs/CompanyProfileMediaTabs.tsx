/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { SectionCard } from "@/components/main/profile/SectionCard";
import { useUploadSingleFileMutation } from "@/redux/feature/upload/uploadApi";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Camera,
  Image as ImageIcon,
  Layout,
  Loader2,
  Palette,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { CardDescription } from "../../ui/card";

const CompanyProfileMediaTabs = ({
  isEditing,
  currentProfile,
  updateField,
  editedProfile,
}: {
  isEditing: boolean;
  currentProfile: any;
  updateField: (field: string, value: any) => void;
  editedProfile: any;
}) => {
  const [uploadFile, { isLoading: isUploading }] =
    useUploadSingleFileMutation();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logoUrl" | "coverUrl",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadFile(formData).unwrap();
      if (res.success && res.data?.url) {
        updateField(field, res.data.url);
        toast.success(
          `${field === "logoUrl" ? "Logo" : "Cover image"} updated`,
          {
            description: "Changes will be permanent once you save the profile.",
          },
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    }
  };

  const logoUrl = editedProfile.logoUrl || currentProfile.logoUrl;
  const coverUrl = editedProfile.coverUrl || currentProfile.coverUrl;

  return (
    <TabsContent value="media" className="space-y-10 focus:outline-none">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Logo Section */}
        <SectionCard
          title="Brand Logo"
          isCompleted={!!logoUrl}
          className="lg:col-span-1"
        >
          <div className="space-y-6">
            <CardDescription>
              Your logo appears on job listings and your public profile.
            </CardDescription>

            <div className="flex flex-col items-center gap-6 py-4">
              <div className="group relative">
                <div className="border-primary/20 bg-primary/5 group-hover:border-primary/50 group-hover:bg-primary/10 flex h-40 w-40 items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed transition-all">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt="Logo"
                      width={160}
                      height={160}
                      className="object-contain p-4"
                    />
                  ) : (
                    <ImageIcon className="text-primary/20 h-16 w-16" />
                  )}

                  {isEditing && (
                    <div
                      onClick={() => logoInputRef.current?.click()}
                      className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Camera className="mb-1 h-8 w-8" />
                      <span className="text-[10px] font-bold uppercase">
                        Update
                      </span>
                    </div>
                  )}

                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm dark:bg-black/60">
                      <Loader2 className="text-primary h-8 w-8 animate-spin" />
                    </div>
                  )}
                </div>
                {isEditing && logoUrl && (
                  <button
                    onClick={() => updateField("logoUrl", "")}
                    className="bg-destructive absolute -top-2 -right-2 rounded-full p-1.5 text-white shadow-lg transition-transform hover:scale-110"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => logoInputRef.current?.click()}
                  className="w-full gap-2 rounded-xl"
                >
                  <Upload className="h-4 w-4" />{" "}
                  {logoUrl ? "Change Logo" : "Upload Logo"}
                </Button>
              )}
              <p className="text-muted-foreground text-center text-[10px] font-bold tracking-widest uppercase">
                PNG, JPG or SVG (Max. 5MB)
              </p>
            </div>
            <input
              type="file"
              ref={logoInputRef}
              onChange={(e) => handleFileChange(e, "logoUrl")}
              accept="image/*"
              className="hidden"
            />
          </div>
        </SectionCard>

        {/* Cover Section */}
        <SectionCard
          title="Profile Header"
          isCompleted={!!coverUrl}
          className="lg:col-span-2"
        >
          <div className="space-y-6">
            <CardDescription>
              Set a background image to convey your company culture and
              atmosphere.
            </CardDescription>

            <div className="group relative">
              <div className="border-primary/20 bg-primary/5 group-hover:border-primary/50 group-hover:bg-primary/10 flex aspect-3/1 items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed transition-all">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt="Cover"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-primary/20 flex flex-col items-center gap-3">
                    <ImageIcon className="h-16 w-16" />
                    <span className="text-sm font-bold tracking-widest uppercase">
                      No Cover Image
                    </span>
                  </div>
                )}

                {isEditing && (
                  <div
                    onClick={() => coverInputRef.current?.click()}
                    className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Camera className="mb-2 h-12 w-12" />
                    <span className="text-xs font-bold tracking-widest uppercase">
                      Click to change cover
                    </span>
                  </div>
                )}

                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm dark:bg-black/60">
                    <Loader2 className="text-primary h-12 w-12 animate-spin" />
                  </div>
                )}
              </div>
              {isEditing && coverUrl && (
                <button
                  onClick={() => updateField("coverUrl", "")}
                  className="bg-destructive absolute top-4 right-4 rounded-full p-2 text-white shadow-lg transition-transform hover:scale-110"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="text-muted-foreground flex items-center justify-between text-[10px] font-bold tracking-widest uppercase">
              <span>Recommended: 1200x400px</span>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => coverInputRef.current?.click()}
                  className="hover:text-primary decoration-primary/30 h-auto p-0 underline hover:bg-transparent"
                >
                  Upload New
                </Button>
              )}
            </div>
            <input
              type="file"
              ref={coverInputRef}
              onChange={(e) => handleFileChange(e, "coverUrl")}
              accept="image/*"
              className="hidden"
            />
          </div>
        </SectionCard>
      </div>

      {/* Brand Identity Guidelines (Visual enhancement) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-primary/5 border-primary/10 space-y-3 rounded-3xl border p-6">
          <ShieldCheck className="text-primary h-6 w-6" />
          <h4 className="text-sm font-bold">Verified Assets</h4>
          <p className="text-muted-foreground text-xs">
            Uploaded media is scanned for security and optimized for
            performance.
          </p>
        </div>
        <div className="space-y-3 rounded-3xl border border-blue-500/10 bg-blue-500/5 p-6">
          <Palette className="h-6 w-6 text-blue-500" />
          <h4 className="text-sm font-bold">Color Consistency</h4>
          <p className="text-muted-foreground text-xs">
            Our platform automatically adapts UI colors to complement your
            branding.
          </p>
        </div>
        <div className="space-y-3 rounded-3xl border border-emerald-500/10 bg-emerald-500/5 p-6">
          <Layout className="h-6 w-6 text-emerald-500" />
          <h4 className="text-sm font-bold">Adaptive Layouts</h4>
          <p className="text-muted-foreground text-xs">
            Your media assets are responsive and look great on OLED displays.
          </p>
        </div>
      </div>
    </TabsContent>
  );
};

export default CompanyProfileMediaTabs;
