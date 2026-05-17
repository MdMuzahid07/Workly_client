"use client";

import { fetchPdfData } from "@/lib/pdfSource";
import { useEffect, useState } from "react";

/**
 * Fetches a PDF through the authenticated API proxy and exposes a blob URL
 * for react-pdf. Blob URLs avoid the "detached ArrayBuffer" error that occurs
 * when pdf.js transfers an ArrayBuffer to its worker on re-render.
 */
export const useAuthenticatedPdf = (options: {
  pdfUrl: string;
  applicationId?: string;
  resumeId?: string;
  enabled: boolean;
}) => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = [
    options.pdfUrl,
    options.applicationId ?? "",
    options.resumeId ?? "",
    options.enabled ? "1" : "0",
  ].join("|");

  useEffect(() => {
    if (!options.enabled) {
      setPdfBlobUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      setError(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const revokeBlobUrl = (url: string | null) => {
      if (url) URL.revokeObjectURL(url);
    };

    const load = async () => {
      setIsLoading(true);
      setError(null);
      setPdfBlobUrl((prev) => {
        revokeBlobUrl(prev);
        return null;
      });

      try {
        const data = await fetchPdfData({
          pdfUrl: options.pdfUrl,
          applicationId: options.applicationId,
          resumeId: options.resumeId,
        });

        if (cancelled) return;

        const blob = new Blob([data], { type: "application/pdf" });
        const objectUrl = URL.createObjectURL(blob);

        if (cancelled) {
          revokeBlobUrl(objectUrl);
          return;
        }

        setPdfBlobUrl(objectUrl);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load PDF");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
      setPdfBlobUrl((prev) => {
        revokeBlobUrl(prev);
        return null;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey]);

  return { pdfBlobUrl, isLoading, error };
};
