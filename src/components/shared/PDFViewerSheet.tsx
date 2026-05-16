"use client";

if (typeof Promise.withResolvers === "undefined") {
  // @ts-expect-error - Polyfill for Promise.withResolvers
  Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

const PDFViewerSheet = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
}: PDFViewerSheetProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const [isDownloading, setIsDownloading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth - 32); // 32px for padding
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [isOpen]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed, opening in new tab instead", error);
      window.open(pdfUrl, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="flex h-full w-full max-w-5xl flex-col p-0 sm:max-w-[100%] xl:w-[60vw]"
      >
        <SheetHeader className="bg-card flex flex-row items-center justify-between space-y-0 border-b p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-lg p-2">
              <SheetTitle className="max-w-[200px] truncate text-base font-bold sm:max-w-md">
                {title}
              </SheetTitle>
            </div>
            <div className="bg-muted/30 hidden items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold sm:flex">
              Page {pageNumber} of {numPages}
            </div>
          </div>

          <div className="flex items-center gap-2 pr-8">
            <div className="bg-muted/30 flex items-center rounded-full border p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-[10px] font-black">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setScale((s) => Math.min(2, s + 0.1))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-primary hover:bg-primary/90 hidden h-9 rounded-full px-4 font-bold sm:flex"
            >
              {isDownloading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          </div>
        </SheetHeader>

        <div
          ref={containerRef}
          className="bg-muted/10 flex flex-1 justify-center overflow-auto p-4 sm:p-8"
        >
          <div className="overflow-hidden rounded-sm border bg-white shadow-2xl">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex w-full justify-center"
              options={{
                cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                cMapPacked: true,
              }}
              loading={
                <div className="flex flex-col items-center justify-center gap-4 p-20">
                  <Loader2 className="text-primary h-10 w-10 animate-spin" />
                  <p className="text-muted-foreground text-sm font-bold">
                    Preparing your resume...
                  </p>
                </div>
              }
              error={
                <div className="flex flex-col items-center justify-center gap-4 p-20 text-center">
                  <div className="bg-destructive/10 rounded-full p-4">
                    <X className="text-destructive h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-destructive text-sm font-bold">
                      Failed to load PDF
                    </p>
                    <p className="text-muted-foreground max-w-[300px] text-xs">
                      The file might be missing, or Cloudinary is blocking
                      access (401).
                    </p>
                  </div>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                className="max-w-full"
                width={containerWidth}
              />
            </Document>
          </div>
        </div>

        {numPages > 1 && (
          <div className="bg-card flex items-center justify-center gap-4 border-t p-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[100px] text-center text-sm font-bold">
              Page {pageNumber} / {numPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default PDFViewerSheet;
