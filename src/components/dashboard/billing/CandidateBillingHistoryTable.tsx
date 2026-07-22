'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Invoice } from '@/types/billing';
import { Download, Eye, FileText } from 'lucide-react';
import { useState } from 'react';
import InvoiceViewDialog from './InvoiceViewDialog';

interface CandidateBillingHistoryTableProps {
  invoices: Invoice[];
}

export default function CandidateBillingHistoryTable({
  invoices,
}: CandidateBillingHistoryTableProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  return (
    <div className="bg-card/50 overflow-hidden rounded-xl border">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-muted/30 border-border/50 border-b">
              <th className="text-muted-foreground/70 px-6 py-5 text-[10px] font-black tracking-widest uppercase">
                Invoice
              </th>
              <th className="text-muted-foreground/70 px-6 py-5 text-[10px] font-black tracking-widest uppercase">
                Plan
              </th>
              <th className="text-muted-foreground/70 px-6 py-5 text-[10px] font-black tracking-widest uppercase">
                Amount
              </th>
              <th className="text-muted-foreground/70 px-6 py-5 text-[10px] font-black tracking-widest uppercase">
                Date
              </th>
              <th className="text-muted-foreground/70 px-6 py-5 text-[10px] font-black tracking-widest uppercase">
                Status
              </th>
              <th className="px-6 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-border/40 divide-y">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="group hover:bg-primary/2 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-foreground text-sm font-black">{invoice.number}</span>
                      <span className="text-muted-foreground text-[10px] font-medium tracking-tighter uppercase">
                        Receipt
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-foreground/80 text-sm font-semibold">
                    {invoice.planName}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-foreground font-mono text-base font-black">
                    ৳
                    {invoice.amount.toLocaleString('en-BD', {
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-muted-foreground text-sm font-medium">{invoice.date}</span>
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setIsViewOpen(true);
                      }}
                      className="text-muted-foreground hover:text-primary hover:bg-primary/5 h-9 gap-2 rounded-xl px-3 font-bold transition-all"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        alert('Invoice download initiated.');
                      }}
                      className="text-primary hover:text-primary-foreground hover:bg-primary shadow-primary/10 h-9 gap-2 rounded-xl px-3 font-bold transition-all hover:shadow-lg"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InvoiceViewDialog
        invoice={selectedInvoice}
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: Invoice['status'] }) {
  const config = {
    paid: 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20',
    pending: 'bg-amber-500/10 text-amber-600 ring-amber-500/20',
    failed: 'bg-destructive/10 text-destructive ring-destructive/20',
    void: 'bg-muted text-muted-foreground ring-muted-foreground/20',
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        'rounded-lg border-none px-3 py-1 text-[10px] font-black tracking-wider uppercase ring-1',
        config[status],
      )}
    >
      {status}
    </Badge>
  );
}
