'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGetTransactionsQuery } from '@/redux/feature/payment/paymentApi';
import { CreditCard, FileText, Loader2, Printer } from 'lucide-react';
import { useState } from 'react';

export interface Transaction {
  id: string;
  tranId: string;
  createdAt: string;
  planId: string;
  amount: number;
  cardType?: string;
  status: string;
  user?: {
    fullName: string;
    email: string;
  };
}

export default function BillingHistoryTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetTransactionsQuery({ page, limit: 10 });
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const transactions = data?.data || [];
  const meta = data?.meta || { totalPages: 1, total: 0 };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'VALIDATED':
        return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
      case 'PENDING':
      case 'PENDING_REVIEW':
        return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
      default:
        return 'bg-rose-500/10 text-rose-500 border border-rose-500/20';
    }
  };

  const getFormattedDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handlePrintModal = () => {
    const printContent = document.getElementById('receipt-print-area')?.innerHTML;
    const originalContent = document.body.innerHTML;
    if (printContent) {
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // Quick restore React states
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-foreground flex items-center gap-2 text-xl font-bold tracking-tight">
            <CreditCard className="text-primary h-5 w-5" />
            Billing & Invoices
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Review and download all your past premium plan transactions and invoices.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      ) : transactions.length === 0 ? (
        <Card className="flex flex-col items-center justify-center border-dashed p-12 text-center">
          <FileText className="text-muted-foreground mb-4 h-12 w-12 opacity-40" />
          <h3 className="text-foreground text-lg font-bold">No invoices found</h3>
          <p className="text-muted-foreground mt-1 max-w-sm text-sm">
            You {`haven't`} made any paid premium transactions yet. Upgrades will list here
            immediately.
          </p>
        </Card>
      ) : (
        <Card className="border-border overflow-hidden border">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-muted/40 text-muted-foreground border-b font-bold">
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Package/Plan</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {transactions.map((tx: Transaction) => (
                  <tr
                    key={tx.id}
                    className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/10"
                  >
                    <td className="text-foreground p-4 font-mono text-xs font-bold">{tx.tranId}</td>
                    <td className="text-muted-foreground p-4">{getFormattedDate(tx.createdAt)}</td>
                    <td className="text-foreground p-4 text-xs font-semibold tracking-wider uppercase">
                      {tx.planId}
                    </td>
                    <td className="text-foreground p-4 font-bold">৳{tx.amount.toLocaleString()}</td>
                    <td className="text-muted-foreground p-4 text-xs font-semibold uppercase">
                      {tx.cardType || 'N/A'}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${getStatusStyle(tx.status)}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedTx(tx)}
                        className="text-primary hover:bg-primary/10 ml-auto flex h-8 items-center gap-1 rounded-lg px-2 font-bold"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        View Receipt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {meta.totalPages > 1 && (
            <div className="flex items-center justify-between border-t p-4">
              <span className="text-muted-foreground text-xs">
                Page {page} of {meta.totalPages}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-lg font-bold"
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg font-bold"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Premium Invoice Modal */}
      {selectedTx && (
        <div className="bg-background/80 animate-in fade-in fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm duration-300">
          <Card className="border-border bg-background relative w-full max-w-xl overflow-hidden border p-8 shadow-2xl">
            {/* Modal Header */}
            <div className="mb-6 flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="text-foreground flex items-center gap-2 text-lg font-bold tracking-tight">
                  <CreditCard className="text-primary h-5 w-5" />
                  Premium Invoice Receipt
                </h3>
                <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                  {selectedTx.tranId}
                </p>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-muted-foreground hover:text-foreground bg-muted/60 hover:bg-muted rounded-lg p-1.5 text-sm font-bold transition-all"
              >
                Close
              </button>
            </div>

            {/* Receipt Body (Rendered in print area also) */}
            <div id="receipt-print-area" className="text-foreground space-y-6 text-sm">
              <div className="bg-muted/20 flex items-center justify-between rounded-xl border-b p-4 pb-4">
                <div>
                  <div className="text-primary text-lg font-extrabold tracking-tight">
                    Workly Job
                  </div>
                  <div className="text-muted-foreground mt-1 text-xs">
                    Leading talent matching ecosystem
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-foreground font-mono text-xs font-bold">RECEIPT NO</div>
                  <div className="text-muted-foreground font-mono text-xs font-bold uppercase">
                    {selectedTx.tranId}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
                    Customer Info
                  </div>
                  <div className="text-foreground font-bold">{selectedTx.user?.fullName}</div>
                  <div className="text-muted-foreground mt-0.5 text-xs">
                    {selectedTx.user?.email}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
                    Billing Date
                  </div>
                  <div className="text-foreground font-bold">
                    {getFormattedDate(selectedTx.createdAt)}
                  </div>
                </div>
              </div>

              <div className="my-4 space-y-3 border-t border-b py-4">
                <div className="flex justify-between font-bold">
                  <span>Product/Plan Slug</span>
                  <span className="font-mono text-xs tracking-wider uppercase">
                    {selectedTx.planId}
                  </span>
                </div>
                <div className="text-muted-foreground flex justify-between">
                  <span>Billing Cycle</span>
                  <span>30 Days (Recurring)</span>
                </div>
                <div className="text-muted-foreground flex justify-between">
                  <span>Gateway Method</span>
                  <span className="text-xs uppercase">
                    {selectedTx.cardType || 'SSLCommerz Merchant'}
                  </span>
                </div>
              </div>

              <div className="bg-primary/5 border-primary/10 flex items-center justify-between rounded-xl border p-4">
                <span className="text-foreground text-md font-extrabold">Total Paid Amount</span>
                <span className="text-primary text-xl font-black">
                  ৳{selectedTx.amount.toLocaleString()} BDT
                </span>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="mt-8 flex justify-end gap-3 border-t pt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedTx(null)}
                className="rounded-xl font-bold"
              >
                Close Window
              </Button>
              <Button
                onClick={handlePrintModal}
                className="bg-primary text-primary-foreground shadow-primary/20 flex items-center gap-2 rounded-xl font-bold hover:shadow-lg"
              >
                <Printer className="h-4 w-4" />
                Print Receipt Invoice
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
