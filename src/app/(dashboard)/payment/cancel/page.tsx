'use client';

import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { XCircle, ArrowLeft, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get('tranId') || 'TXN-XXXXXX';

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-tr from-slate-50 via-slate-100 to-amber-50/20 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950/20">
      <Card className="bg-background/60 dark:bg-background/40 relative w-full max-w-lg overflow-hidden border border-amber-500/20 p-8 text-center shadow-2xl backdrop-blur-xl">
        {/* Glow Effects */}
        <div className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-amber-500/10 blur-xl"></div>

        {/* Cancel Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 scale-100 items-center justify-center rounded-full bg-amber-100/80 transition-transform duration-500 hover:scale-110 dark:bg-amber-950/40">
          <XCircle className="h-10 w-10 text-amber-500" />
        </div>

        <h1 className="bg-linear-to-r from-amber-500 to-yellow-500 bg-clip-text text-3xl font-black tracking-tight text-transparent dark:from-amber-400 dark:to-yellow-400">
          Checkout Cancelled
        </h1>
        <p className="text-muted-foreground text-md mt-2">
          You have cancelled the payment session. No charges were made to your account.
        </p>

        {/* Summary Info */}
        <div className="border-border my-8 rounded-2xl border bg-slate-50/50 p-6 text-left dark:bg-slate-900/10">
          <h2 className="text-foreground mb-4 text-sm font-bold tracking-wider uppercase opacity-80">
            Session Details
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="text-foreground font-mono font-bold">{tranId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-semibold text-amber-500">Session Closed</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => window.history.back()}
            className="bg-primary text-primary-foreground shadow-primary/20 hover:shadow-primary/30 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-bold transition-all hover:shadow-lg"
          >
            <RefreshCcw className="h-4 w-4" />
            Resume Checkout
          </button>
          <Link href="/dashboard" className="w-full">
            <button className="border-border bg-background hover:bg-muted flex h-12 w-full items-center justify-center gap-2 rounded-xl border font-semibold transition-all">
              <ArrowLeft className="h-4 w-4" />
              Return Dashboard
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
