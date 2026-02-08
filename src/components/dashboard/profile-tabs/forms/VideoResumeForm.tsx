"use client";

import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Video } from "lucide-react";
import { useState } from "react";
import { VideoResumeFormData, videoResumeSchema } from "./profile.validation";

interface VideoResumeFormProps {
  onSubmit: (data: VideoResumeFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const VideoResumeForm = ({
  onSubmit,
  onCancel,
  isLoading,
}: VideoResumeFormProps) => {
  const [activeTab, setActiveTab] = useState("link");

  return (
    <WkForm<VideoResumeFormData>
      onSubmit={onSubmit}
      defaultValues={{}}
      resolver={zodResolver(videoResumeSchema)}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm leading-none font-medium">
            Add Video Resume
          </label>
          <p className="text-muted-foreground mb-4 text-xs">
            Share a link to your video (YouTube, Vimeo, etc.) or upload a file
            directly.
          </p>

          <Tabs
            defaultValue="link"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="link">Video URL</TabsTrigger>
              <TabsTrigger value="file">Upload Video</TabsTrigger>
            </TabsList>
            <TabsContent value="link" className="space-y-4 pt-4">
              <WKInput
                name="videoUrl"
                label="Video URL"
                placeholder="https://youtube.com/watch?v=..."
              />
            </TabsContent>
            <TabsContent value="file" className="pt-4">
              <div className="flex w-full items-center justify-center">
                <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Video className="mb-3 h-10 w-10 text-purple-500" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      MP4, WebM (MAX. 50MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="video/mp4,video/webm"
                  />
                </label>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Video Resume"}
        </Button>
      </div>
    </WkForm>
  );
};
