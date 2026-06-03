import { ImageIcon, Mail, Phone, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useUploadMultipleFilesMutation } from "../../../../redux/feature/upload/uploadApi";
import { CompanyFormData } from "../../../../view/dashboard/employer/company-creation/CompanyCreationView";
import WKInput from "../../../form/WkInput";
import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

const MediaContactStep = () => {
  const { watch, setValue } = useFormContext<CompanyFormData>();
  const [uploadMultipleFiles, { isLoading }] = useUploadMultipleFilesMutation();
  const formData = watch();

  const [logoPreview, setLogoPreview] = useState<string | null>(
    watch("logoUrl") || null,
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    watch("coverUrl") || null,
  );
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    file: File,
    fieldName: "logoUrl" | "coverUrl",
    setPreview: (preview: string | null) => void,
    setUploading: (uploading: boolean) => void,
    maxSize: number,
  ) => {
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("files", file);
      const response = await uploadMultipleFiles(formData).unwrap();

      if (response.success && response.data.urls?.[0]) {
        setValue(fieldName, response.data.urls[0]);
        toast.success("File uploaded successfully");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, "logoUrl", setLogoPreview, setUploadingLogo, 2);
    }
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, "coverUrl", setCoverPreview, setUploadingCover, 5);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setValue("logoUrl", "");
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  const handleRemoveCover = () => {
    setCoverPreview(null);
    setValue("coverUrl", "");
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Upload className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Media & Contact Information
        </CardTitle>
        <CardDescription className="text-sm">
          Add your logo and contact details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <WKInput
                name="contactEmail"
                labelIcon={<Mail className="text-muted-foreground h-4 w-4" />}
                label="Contact Email"
                type="email"
                placeholder="contact@example.com"
                required
                className="h-10 rounded-full sm:h-11"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <WKInput
                name="contactPhone"
                label="Contact Phone"
                placeholder="+0 000 000 0000"
                labelIcon={<Phone className="text-muted-foreground h-4 w-4" />}
                required
                type="text"
                className="h-10 rounded-full sm:h-11"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Logo</label>
            {logoPreview ? (
              <div className="relative">
                <div className="border-border overflow-hidden rounded-lg border">
                  {isLoading ? (
                    <div className="bg-primary/20 flex h-32 w-full animate-pulse items-center justify-center">
                      <Upload className="text-muted-foreground h-6 w-6 animate-bounce" />
                    </div>
                  ) : (
                    <Image
                      src={logoPreview}
                      alt="Logo Preview"
                      className="h-32 w-full object-cover"
                      width={128}
                      height={128}
                    />
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={handleRemoveLogo}
                  disabled={uploadingLogo}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-border rounded-lg border-2 border-dashed p-4 text-center sm:p-6">
                <ImageIcon className="text-muted-foreground mx-auto mb-2 h-6 w-6 sm:h-8 sm:w-8" />
                <p className="text-muted-foreground mb-2 text-xs sm:text-sm">
                  Upload your company logo (PNG, JPG up to 2MB)
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent sm:w-auto"
                  onClick={() => logoInputRef.current?.click()}
                  disabled={uploadingLogo}
                >
                  {uploadingLogo ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Choose File
                    </>
                  )}
                </Button>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoSelect}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Cover Image (Optional)
            </label>
            {coverPreview ? (
              <div className="relative">
                <div className="border-border overflow-hidden rounded-lg border">
                  {isLoading ? (
                    <div className="bg-primary/20 flex h-32 w-full animate-pulse items-center justify-center">
                      <Upload className="text-muted-foreground h-6 w-6 animate-bounce" />
                    </div>
                  ) : (
                    <Image
                      src={coverPreview}
                      alt="Cover Preview"
                      className="h-32 w-full object-cover"
                      width={128}
                      height={128}
                    />
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={handleRemoveCover}
                  disabled={uploadingCover}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-border rounded-lg border-2 border-dashed p-4 text-center sm:p-6">
                <ImageIcon className="text-muted-foreground mx-auto mb-2 h-6 w-6 sm:h-8 sm:w-8" />
                <p className="text-muted-foreground mb-2 text-xs sm:text-sm">
                  Upload a cover image for your company profile (PNG, JPG up to
                  5MB)
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent sm:w-auto"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={uploadingCover}
                >
                  {uploadingCover ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Choose File
                    </>
                  )}
                </Button>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverSelect}
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-primary/20 rounded-lg p-3 sm:p-4">
          <h4 className="mb-2 text-sm font-medium sm:text-base">
            📋 Review Your Information
          </h4>
          <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2 sm:gap-4 sm:text-sm">
            <div className="space-y-1">
              <p>
                <strong>Company:</strong>{" "}
                <span className="wrap-break-words">
                  {formData.name || "Not set"}
                </span>
              </p>
              <p>
                <strong>Industry:</strong> {formData.industryId || "Not set"}
              </p>
              <p>
                <strong>Size:</strong> {formData.size || "Not set"}
              </p>
            </div>
            <div className="space-y-1">
              <p>
                <strong>Location:</strong>{" "}
                <span className="wrap-break-words">
                  {formData.location || "Not set"}
                </span>
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <span className="break-all">
                  {formData.websiteUrl || "Not set"}
                </span>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <span className="break-all">
                  {formData.contactEmail || "Not set"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaContactStep;
