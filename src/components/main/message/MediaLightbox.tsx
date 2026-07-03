import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import type { Message } from "@/types/message";

interface MediaLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItems: Message[];
  initialIndex: number;
}

const MediaLightbox: React.FC<MediaLightboxProps> = ({
  isOpen,
  onClose,
  mediaItems,
  initialIndex,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoom(1);
  }, [initialIndex, isOpen]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
    setZoom(1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
    setZoom(1);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1));

  const currentItem = mediaItems[currentIndex];

  if (!currentItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-0 !top-0 !left-0 z-10000! m-0 flex h-screen! w-screen! max-w-none! !translate-x-0 !translate-y-0 flex-col items-center justify-center rounded-none border-none bg-black p-0 shadow-none outline-none"
      >
        {/* Header Actions */}
        <div className="absolute top-0 right-0 left-0 z-50 flex items-center justify-between bg-linear-to-b from-black/60 to-transparent p-6">
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white">
              {currentItem.fileName || "Image"}
            </span>
            <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">
              {currentIndex + 1} of {mediaItems.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-xl bg-white/10 p-1 backdrop-blur-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                className="rounded-lg text-white hover:bg-white/20"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="rounded-lg text-white hover:bg-white/20"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <a
              href={currentItem.fileUrl ?? undefined}
              download
              className="rounded-xl bg-white/10 p-2.5 text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <Download className="h-5 w-5" />
            </a>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-danger rounded-xl bg-white/10 text-white backdrop-blur-md transition-all"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Media Container */}
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <div
            className="relative h-full w-full transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          >
            <Image
              src={currentItem.fileUrl || "/placeholder.svg"}
              alt={currentItem.fileName || "Media"}
              fill
              className="object-contain shadow-2xl"
              unoptimized={
                currentItem.fileUrl?.startsWith("data:") ||
                currentItem.fileUrl?.startsWith("blob:")
              }
            />
          </div>

          {/* Navigation Controls */}
          {mediaItems.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                className="group absolute top-1/2 left-6 h-14 w-14 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <ChevronLeft className="h-8 w-8 transition-transform group-hover:-translate-x-1" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="group absolute top-1/2 right-6 h-14 w-14 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <ChevronRight className="h-8 w-8 transition-transform group-hover:translate-x-1" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        <div className="no-scrollbar absolute right-0 bottom-6 left-0 z-50 flex justify-center gap-2 overflow-x-auto p-4">
          {mediaItems.map((item: Message, idx: number) => (
            <div
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-16 w-16 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${idx === currentIndex ? "border-primary scale-110 shadow-xl" : "border-transparent opacity-40 hover:opacity-80"}`}
            >
              <Image
                src={item.fileUrl || "/placeholder.svg"}
                alt="Thumbnail"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaLightbox;
