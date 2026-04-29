"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

const PDFViewerModal = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
}: PDFViewerModalProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[90vh] max-w-5xl flex-col overflow-hidden rounded-xl border-none p-0 shadow-2xl sm:rounded-xl xl:min-w-5xl">
        <DialogHeader className="bg-card flex flex-row items-center justify-between space-y-0 border-b p-4">
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

            <a href={pdfUrl} download={title} target="_blank" rel="noreferrer">
              <Button
                variant="default"
                size="sm"
                className="bg-primary hover:bg-primary/90 hidden h-9 rounded-full px-4 font-bold sm:flex"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </a>
          </div>
        </DialogHeader>

        <div className="bg-muted/10 flex flex-1 justify-center overflow-auto p-4 sm:p-8">
          <div className="overflow-hidden rounded-sm border bg-white shadow-2xl">
            <Document
              file={{ url: pdfUrl }}
              onLoadSuccess={onDocumentLoadSuccess}
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
                    <p className="text-muted-foreground max-w-[200px] text-xs">
                      The file might be missing or the link has expired.
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
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewerModal;
