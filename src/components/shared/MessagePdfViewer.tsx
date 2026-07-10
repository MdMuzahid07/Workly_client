'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Download, Loader2, X, ZoomIn, ZoomOut } from 'lucide-react';
import { normalizeCloudinaryPdfUrl, downloadMessageAttachment } from '@/lib/pdfSource';
import { useAuthenticatedPdf } from '@/hooks/useAuthenticatedPdf';
import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface MessagePdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  messageId?: string;
  title?: string;
}

/**
 * Inline PDF viewer for message attachments.
 * Uses the authenticated backend file streaming proxy to securely
 * view and download attachments.
 */
const MessagePdfViewer = ({
  isOpen,
  onClose,
  pdfUrl,
  messageId,
  title = 'Document',
}: MessagePdfViewerProps) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [containerWidth, setContainerWidth] = useState(760);
  const containerRef = useRef<HTMLDivElement>(null);

  // Authentically fetches the PDF through the server proxy
  const { pdfBlobUrl, isLoading, error } = useAuthenticatedPdf({
    pdfUrl,
    messageId,
    enabled: isOpen && (!!pdfUrl || !!messageId),
  });

  // Reset page/scale when dialog opens or URL/messageId changes
  useEffect(() => {
    if (isOpen) {
      setNumPages(0);
      setPageNumber(1);
      setScale(1.0);
    }
  }, [isOpen, pdfUrl, messageId]);

  // Track responsive container width
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth - 32);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [isOpen]);

  function onDocumentLoadSuccess({ numPages: n }: { numPages: number }) {
    setNumPages(n);
    setPageNumber(1);
  }

  function onDocumentLoadError(err: Error) {
    console.error('PDF render error:', err.message);
  }

  const scrollToPage = (page: number) => {
    setPageNumber(page);
    document
      .getElementById(`msg-pdf-page-${page}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDownload = async () => {
    try {
      if (messageId) {
        await downloadMessageAttachment(messageId, title.endsWith('.pdf') ? title : `${title}.pdf`);
      } else {
        const src = pdfBlobUrl ?? normalizeCloudinaryPdfUrl(pdfUrl);
        const a = document.createElement('a');
        a.href = src;
        a.download = title.endsWith('.pdf') ? title : `${title}.pdf`;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.click();
      }
    } catch (err) {
      console.error('Failed to download attachment:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[90vh] max-w-5xl flex-col overflow-hidden rounded-2xl border-none p-0 shadow-2xl xl:min-w-5xl">
        {/* Header */}
        <DialogHeader className="bg-card flex shrink-0 flex-row items-center justify-between space-y-0 border-b p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-xl p-2">
              <DialogTitle className="xs:max-w-[160px] max-w-[100px] truncate text-xs font-black sm:max-w-xs sm:text-base md:max-w-sm">
                {title}
              </DialogTitle>
            </div>
            {numPages > 0 && (
              <div className="bg-muted/40 hidden items-center gap-1 rounded-full px-3 py-1 text-xs font-bold sm:flex">
                Page {pageNumber} of {numPages}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pr-14">
            {/* Zoom Controls */}
            <div className="bg-muted/30 flex items-center rounded-full border p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full"
                onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                disabled={isLoading || !!error}
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </Button>
              <span className="w-10 text-center text-[10px] font-black">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full"
                onClick={() => setScale((s) => Math.min(2.5, s + 0.1))}
                disabled={isLoading || !!error}
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Download */}
            <Button
              variant="default"
              size="sm"
              onClick={handleDownload}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full p-0 text-xs font-bold sm:h-8 sm:w-auto sm:px-4"
            >
              <Download className="h-3.5 w-3.5 sm:mr-1.5" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
        </DialogHeader>

        {/* PDF canvas area */}
        <div
          ref={containerRef}
          className="bg-muted/10 min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6"
        >
          {/* Loading */}
          {isLoading && !error && (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-4">
              <div className="relative">
                <div className="border-primary/20 absolute h-12 w-12 rounded-full border-2" />
                <Loader2 className="text-primary h-12 w-12 animate-spin" />
              </div>
              <p className="text-muted-foreground text-sm font-medium">Loading document…</p>
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-4 text-center">
              <div className="bg-destructive/10 rounded-full p-4">
                <X className="text-destructive h-8 w-8" />
              </div>
              <div>
                <p className="text-destructive text-sm font-bold">Failed to load PDF</p>
                <p className="text-muted-foreground mt-1 max-w-[260px] text-xs">{error}</p>
              </div>
            </div>
          )}

          {/* Document pages */}
          <div className="mx-auto w-fit max-w-full rounded-sm shadow-2xl">
            {pdfBlobUrl && !isLoading && !error && (
              <Document
                key={pdfBlobUrl}
                file={pdfBlobUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                className="flex flex-col items-center"
                options={{
                  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                  cMapPacked: true,
                }}
              >
                {numPages > 0 &&
                  Array.from({ length: numPages }, (_, i) => {
                    const page = i + 1;
                    return (
                      <div
                        key={`page-${page}`}
                        id={`msg-pdf-page-${page}`}
                        className="[&:not(:last-child)]:mb-4"
                      >
                        <Page
                          pageNumber={page}
                          scale={scale}
                          renderAnnotationLayer
                          renderTextLayer
                          width={containerWidth}
                          className="max-w-full bg-white shadow"
                        />
                      </div>
                    );
                  })}
              </Document>
            )}
          </div>
        </div>

        {/* Page navigation footer */}
        {numPages > 1 && (
          <div className="bg-card flex shrink-0 items-center justify-center gap-4 border-t p-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              disabled={pageNumber <= 1}
              onClick={() => scrollToPage(pageNumber - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[100px] text-center text-xs font-black">
              Page {pageNumber} / {numPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
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

export default MessagePdfViewer;
