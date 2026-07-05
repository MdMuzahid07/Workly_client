"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthenticatedPdf } from "@/hooks/useAuthenticatedPdf";
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

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  applicationId?: string;
  resumeId?: string;
}

const PDFViewerModal = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  applicationId,
  resumeId,
}: PDFViewerModalProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [containerWidth, setContainerWidth] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);

  const { pdfBlobUrl, isLoading, error } = useAuthenticatedPdf({
    pdfUrl,
    applicationId,
    resumeId,
    enabled: isOpen && !!pdfUrl,
  });

  useEffect(() => {
    if (!isOpen) return;
    setNumPages(0);
    setPageNumber(1);
    setScale(1.0);
  }, [isOpen, pdfUrl, applicationId, resumeId]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth - 32);
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

  const scrollToPage = (page: number) => {
    setPageNumber(page);
    document.getElementById(`resume-modal-page-${page}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDownload = () => {
    if (!pdfBlobUrl) return;
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = pdfBlobUrl;
    link.download = title.endsWith(".pdf") ? title : `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[90vh] max-w-5xl flex-col overflow-hidden rounded-xl border-none p-0 shadow-2xl sm:rounded-xl xl:min-w-5xl">
        <DialogHeader className="bg-card flex shrink-0 flex-row items-center justify-between space-y-0 border-b p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-lg p-2">
              <DialogTitle className="max-w-[200px] truncate text-base font-bold sm:max-w-md">
                {title}
              </DialogTitle>
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
              disabled={isDownloading || !pdfBlobUrl}
              className="bg-primary hover:bg-primary/90 hidden h-9 rounded-full px-4 font-bold sm:flex"
            >
              {isDownloading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Download
            </Button>
          </div>
        </DialogHeader>

        <div
          ref={containerRef}
          className="bg-muted/10 min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-8"
        >
          <div className="mx-auto w-fit max-w-full rounded-sm border bg-white shadow-2xl">
            {isLoading && (
              <div className="relative flex aspect-[1/1.414] w-[800px] max-w-full flex-col gap-8 overflow-hidden bg-white p-8 sm:p-12">
                {/* Header Skeleton */}
                <div className="flex animate-pulse flex-col gap-3">
                  <div className="bg-muted h-8 w-1/3 rounded-md" />
                  <div className="bg-muted h-4 w-1/4 rounded-md" />
                  <div className="bg-muted mt-1 h-3 w-1/2 rounded-md" />
                </div>

                {/* Divider */}
                <div className="bg-muted h-px animate-pulse" />

                {/* Body Content Skeletons */}
                <div className="flex flex-1 animate-pulse flex-col gap-6">
                  {/* Summary Section */}
                  <div className="space-y-2">
                    <div className="bg-muted mb-3 h-5 w-24 rounded-md" />
                    <div className="bg-muted h-3.5 w-full rounded-md" />
                    <div className="bg-muted h-3.5 w-[92%] rounded-md" />
                    <div className="bg-muted h-3.5 w-[85%] rounded-md" />
                  </div>

                  {/* Experience Section */}
                  <div className="space-y-4">
                    <div className="bg-muted mb-3 h-5 w-32 rounded-md" />
                    {[1, 2].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="bg-muted h-4 w-40 rounded-md" />
                          <div className="bg-muted h-3 w-20 rounded-md" />
                        </div>
                        <div className="bg-muted h-3.5 w-full rounded-md" />
                        <div className="bg-muted h-3.5 w-[96%] rounded-md" />
                        <div className="bg-muted h-3.5 w-[90%] rounded-md" />
                      </div>
                    ))}
                  </div>

                  {/* Skills Section */}
                  <div className="space-y-2">
                    <div className="bg-muted mb-3 h-5 w-20 rounded-md" />
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="bg-muted h-7 w-16 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Centered Premium Overlay Loader */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/70 backdrop-blur-xs">
                  <div className="flex min-w-[240px] flex-col items-center gap-3.5 rounded-2xl border bg-white/90 p-6 shadow-md">
                    <div className="relative flex items-center justify-center">
                      <div className="border-primary/20 absolute h-8 w-8 rounded-full border-2" />
                      <Loader2 className="text-primary h-8 w-8 animate-spin" />
                    </div>
                    <span className="text-foreground text-sm font-bold tracking-tight">
                      Preparing your resume...
                    </span>
                  </div>
                </div>
              </div>
            )}

            {error && !isLoading && (
              <div className="flex flex-col items-center justify-center gap-4 p-20 text-center">
                <div className="bg-destructive/10 rounded-full p-4">
                  <X className="text-destructive h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-destructive text-sm font-bold">
                    Failed to load PDF
                  </p>
                  <p className="text-muted-foreground max-w-[200px] text-xs">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {pdfBlobUrl && !isLoading && !error && (
              <Document
                key={pdfBlobUrl}
                file={pdfBlobUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                className="flex flex-col items-center"
                options={{
                  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                  cMapPacked: true,
                }}
              >
                {Array.from({ length: numPages }, (_, index) => {
                  const page = index + 1;
                  return (
                    <div
                      key={`page-${page}`}
                      id={`resume-modal-page-${page}`}
                      className="[&:not(:last-child)]:mb-4"
                    >
                      <Page
                        pageNumber={page}
                        scale={scale}
                        renderAnnotationLayer={true}
                        renderTextLayer={true}
                        className="max-w-full"
                        width={containerWidth}
                      />
                    </div>
                  );
                })}
              </Document>
            )}
          </div>
        </div>

        {numPages > 1 && (
          <div className="bg-card flex shrink-0 items-center justify-center gap-4 border-t p-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={pageNumber <= 1}
              onClick={() => scrollToPage(pageNumber - 1)}
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
              onClick={() => scrollToPage(pageNumber + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewerModal;
