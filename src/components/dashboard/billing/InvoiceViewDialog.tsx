"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Invoice } from "@/types/billing";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import InvoicePDF from "./InvoicePDF";

interface InvoiceViewDialogProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceViewDialog({
  invoice,
  isOpen,
  onClose,
}: InvoiceViewDialogProps) {
  if (!invoice) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[90vh] max-w-7xl flex-col overflow-hidden border-none p-0 lg:min-w-7xl">
        <DialogHeader className="bg-muted/20 border-b p-6">
          <div className="flex items-center justify-between pr-8">
            <div className="space-y-1">
              <DialogTitle className="text-xl font-black">
                Invoice Preview
              </DialogTitle>
              <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase opacity-70">
                {invoice.number} — {invoice.planName}
              </p>
            </div>

            <PDFDownloadLink
              document={<InvoicePDF invoice={invoice} />}
              fileName={`Invoice-${invoice.number}.pdf`}
            >
              {({ loading }) => (
                <Button
                  disabled={loading}
                  className="shadow-primary/20 gap-2 rounded-xl font-bold shadow-lg transition-all"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {loading ? "Preparing..." : "Download PDF"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </DialogHeader>

        <div className="flex-1 bg-slate-900/5 p-4 sm:p-8">
          <div className="h-full w-full overflow-hidden rounded-2xl border bg-white shadow-2xl">
            <PDFViewer
              style={{ width: "100%", height: "100%", border: "none" }}
              showToolbar={false}
            >
              <InvoicePDF invoice={invoice} />
            </PDFViewer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
