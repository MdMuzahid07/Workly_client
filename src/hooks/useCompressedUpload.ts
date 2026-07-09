import { useState } from "react";
import { toast } from "sonner";
import { compressImage } from "@/utils/imageCompressor";

type ImageKind = "avatar" | "logo" | "cover";

export function useCompressedUpload(kind: ImageKind) {
  const [isProcessing, setIsProcessing] = useState(false);

  async function upload<T>(
    file: File,
    uploadFn: (formData: FormData) => Promise<T>,
    successMessage = "Image uploaded",
    toastOptions?: Record<string, unknown>,
  ): Promise<T> {
    setIsProcessing(true);
    const toastId = toast.loading("Optimizing image...");
    try {
      const compressed = await compressImage(file, kind);
      const formData = new FormData();
      formData.append("file", compressed, file.name);
      const result = await uploadFn(formData);
      toast.success(successMessage, { id: toastId, ...toastOptions });
      return result;
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } } | null;
      toast.error(error?.data?.message || "Upload failed — please try again", {
        id: toastId,
      });
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }

  return { upload, isProcessing };
}
