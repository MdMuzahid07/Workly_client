"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tranId") || "TXN-XXXXXX";
  const amount = searchParams.get("amount") || "0.00";
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/dashboard";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-tr from-slate-50 via-slate-100 to-indigo-50/50 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950/40">
      <Card className="bg-background/60 dark:bg-background/40 relative w-full max-w-lg overflow-hidden border border-emerald-500/20 p-8 text-center shadow-2xl backdrop-blur-xl">
        {/* Glow Effects */}
        <div className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-emerald-500/10 blur-xl"></div>
        <div className="absolute -right-12 -bottom-12 h-24 w-24 rounded-full bg-indigo-500/10 blur-xl"></div>

        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 scale-100 items-center justify-center rounded-full bg-emerald-100/80 transition-transform duration-500 hover:scale-110 dark:bg-emerald-950/40">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        </div>

        <h1 className="bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-3xl font-black tracking-tight text-transparent dark:from-emerald-400 dark:to-teal-400">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground text-md mt-2">
          Thank you for your purchase. Your digital account privileges have been
          successfully provisioned.
        </p>

        {/* Invoice Summary */}
        <div className="border-border my-8 rounded-2xl border bg-slate-50/50 p-6 text-left dark:bg-slate-900/10">
          <h2 className="text-foreground mb-4 text-sm font-bold tracking-wider uppercase opacity-80">
            Transaction Details
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="text-foreground font-mono font-bold">
                {tranId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="text-foreground font-extrabold">
                ৳{Number(amount).toLocaleString()} BDT
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Status</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard" className="w-full">
            <button className="bg-primary text-primary-foreground shadow-primary/20 hover:shadow-primary/30 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-bold transition-all hover:shadow-lg">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
          <button
            onClick={() => window.print()}
            className="border-border bg-background hover:bg-muted flex h-12 w-full items-center justify-center gap-2 rounded-xl border font-semibold transition-all"
          >
            <Download className="h-4 w-4" />
            Print Receipt
          </button>
        </div>

        {/* Redirection timer */}
        <p className="text-muted-foreground mt-8 flex items-center justify-center gap-2 text-xs">
          <Loader2 className="h-3 w-3 animate-spin" />
          Auto-redirecting to dashboard in {countdown}s...
        </p>
      </Card>
    </div>
  );
}
