"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUploadSingleFileMutation } from "@/redux/feature/upload/uploadApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, Video, X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { VideoResumeFormData, videoResumeSchema } from "./profile.validation";

interface VideoResumeFormProps {
  onSubmit: (data: VideoResumeFormData) => void;
  onCancel: () => void;
  defaultValues?: Partial<VideoResumeFormData>;
}

export const VideoResumeForm = ({
  onSubmit,
  onCancel,
  defaultValues,
}: VideoResumeFormProps) => {
  const [activeTab, setActiveTab] = useState("link");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [uploadFile, { isLoading: isUploading }] =
    useUploadSingleFileMutation();

  const form = useForm<VideoResumeFormData>({
    resolver: zodResolver(videoResumeSchema),
    defaultValues: defaultValues || {},
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["video/mp4", "video/webm", "video/quicktime"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Invalid file type. Please upload MP4 or WebM format.");
      return;
    }

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError("File size exceeds 50MB limit.");
      return;
    }

    setUploadError(null);
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect({
        target: { files: e.dataTransfer.files },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file to upload.");
      return;
    }

    try {
      setUploadProgress(0);
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await uploadFile(formData).unwrap();

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response?.data?.url) {
        form.setValue("videoUrl", response.data.url);
        setSelectedFile(null);
        toast.success("Video uploaded successfully!");
        setActiveTab("link");
      } else {
        throw new Error("Upload failed: No URL returned");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(
        "Failed to upload video. Please try again or use a video URL instead.",
      );
      setUploadProgress(0);
    }
  };

  const handleSubmit = (data: VideoResumeFormData) => {
    if (!data.videoUrl) {
      toast.error("Please provide a video URL or upload a file.");
      return;
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm leading-none font-medium">
          Add Video Resume
        </label>
        <p className="text-muted-foreground mb-4 text-xs">
          Share a link to your video (YouTube, Vimeo, etc.) or upload a file
          directly.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link" disabled={isUploading}>
              Video URL
            </TabsTrigger>
            <TabsTrigger value="file" disabled={isUploading}>
              Upload Video
            </TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Video URL</label>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                {...form.register("videoUrl")}
              />
              {form.formState.errors.videoUrl && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.videoUrl.message}
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="file" className="space-y-4 pt-4">
            {selectedFile ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-blue-700">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setUploadProgress(0);
                    }}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Uploading...</span>
                      <span className="text-muted-foreground text-xs">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={handleUploadFile}
                  disabled={isUploading || uploadProgress > 0}
                  className="w-full"
                >
                  {isUploading || uploadProgress > 0 ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Video"
                  )}
                </Button>
              </div>
            ) : (
              <div>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="flex w-full items-center justify-center"
                >
                  <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Video className="mb-3 h-10 w-10 text-purple-500" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        MP4, WebM (MAX 50MB)
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="video/mp4,video/webm,video/quicktime"
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>
              </div>
            )}

            {uploadError && (
              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <p className="text-sm text-red-700">{uploadError}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isUploading || !form.watch("videoUrl")}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Video Resume"
          )}
        </Button>
      </div>
    </form>
  );
};
