"use client";

import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tranId") || "TXN-XXXXXX";
  const reason =
    searchParams.get("reason") ||
    "The transaction was declined by the bank or gateway partner.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-tr from-slate-50 via-slate-100 to-red-50/30 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950/20">
      <Card className="bg-background/60 dark:bg-background/40 relative w-full max-w-lg overflow-hidden border border-red-500/20 p-8 text-center shadow-2xl backdrop-blur-xl">
        {/* Glow Effects */}
        <div className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-red-500/10 blur-xl"></div>

        {/* Fail Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 scale-100 items-center justify-center rounded-full bg-red-100/80 transition-transform duration-500 hover:scale-110 dark:bg-red-950/40">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>

        <h1 className="bg-linear-to-r from-red-500 to-rose-500 bg-clip-text text-3xl font-black tracking-tight text-transparent dark:from-red-400 dark:to-rose-400">
          Payment Failed
        </h1>
        <p className="text-muted-foreground text-md mt-2">
          We encountered an issue while processing your transaction. No funds
          were debited from your card.
        </p>

        {/* Issue Details */}
        <div className="border-border my-8 rounded-2xl border bg-slate-50/50 p-6 text-left dark:bg-slate-900/10">
          <h2 className="text-foreground mb-4 text-sm font-bold tracking-wider uppercase opacity-80">
            Error Details
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="text-foreground font-mono font-bold">
                {tranId}
              </span>
            </div>
            <div className="mt-2 flex flex-col gap-1 text-left">
              <span className="text-muted-foreground">Failure Reason</span>
              <span className="leading-snug font-medium text-red-500/90">
                {reason}
              </span>
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
            Retry Checkout
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
