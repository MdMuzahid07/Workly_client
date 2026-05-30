"use client";

import CandidateBillingHistoryTable from "@/components/dashboard/billing/CandidateBillingHistoryTable";
import DashboardCandidateBillingHeader from "@/components/dashboard/dashboard-nav/header/DashboardCandidateBillingHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  CANDIDATE_MOCK_BILLING_SUMMARY,
  CANDIDATE_MOCK_INVOICES,
} from "@/constants/billing";
import { cn } from "@/lib/utils";
import { Calendar, Crown, Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { JobSeekerBillingSkeleton } from "@/skeleton/dashboard/overview/JobSeekerDashboardSkeleton";

export default function JobSeekerBillingView() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [autoRenew, setAutoRenew] = useState(
    CANDIDATE_MOCK_BILLING_SUMMARY.autoRenew,
  );
  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSSLCommerzPayment = () => {
    setIsProcessing(true);
    const toastId = toast.loading("Initiating secure payment gateway...");
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(
        `Redirecting securely to SSLCommerz ${selectedMethod.toUpperCase()} gateway...`,
        { id: toastId },
      );
    }, 1200);
  };

  const paymentChannels = [
    {
      id: "bkash",
      name: "bKash MFS",
      type: "Mobile Banking",
      logoText: "bKash",
      colorClass: "bg-[#E2125D]",
      textColor: "text-white",
      shadowColor: "shadow-pink-500/10",
      description: "Pay instantly via your bKash wallet account",
    },
    {
      id: "nagad",
      name: "Nagad MFS",
      type: "Mobile Banking",
      logoText: "Nagad",
      colorClass: "bg-[#F57F20]",
      textColor: "text-white",
      shadowColor: "shadow-orange-500/10",
      description: "Fastest checkout via Nagad mobile wallet",
    },
    {
      id: "rocket",
      name: "Rocket MFS",
      type: "Mobile Banking",
      logoText: "Rocket",
      colorClass: "bg-[#8C3494]",
      textColor: "text-white",
      shadowColor: "shadow-purple-500/10",
      description: "Pay securely using Rocket mobile account",
    },
    {
      id: "cards",
      name: "Debit/Credit Cards",
      type: "Visa, Mastercard, Amex, Nexus",
      logoText: "Cards",
      colorClass: "bg-[#0F172A] dark:bg-[#1E293B]",
      textColor: "text-white",
      shadowColor: "shadow-slate-500/10",
      description: "Supports local & international debit/credit cards",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/30 pt-15 pb-20 dark:bg-transparent">
      <DashboardCandidateBillingHeader />

      {isPageLoading ? (
        <JobSeekerBillingSkeleton />
      ) : (
        <div className="animate-in fade-in px-4 py-8 duration-500 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {/* Top grid: Summary and Payment Methods */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Subscription Summary Card */}
              <Card className="border-primary/10 from-card to-background overflow-hidden bg-linear-to-br lg:col-span-1">
                <CardHeader className="border-border/50 border-b pb-4">
                  <div className="text-primary flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    <CardTitle className="text-base font-bold">
                      Premium Subscription
                    </CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    Manage seeker subscription renewal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                      Current Plan
                    </span>
                    <div className="flex items-center gap-2">
                      <h3 className="text-foreground text-2xl font-black">
                        {CANDIDATE_MOCK_BILLING_SUMMARY.currentPlan}
                      </h3>
                      <Badge className="bg-primary/10 text-primary border-none">
                        Active
                      </Badge>
                    </div>
                  </div>

                  <div className="border-border/50 grid grid-cols-2 gap-4 border-y py-4">
                    <div className="space-y-1">
                      <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                        Next Payment
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="text-muted-foreground h-4 w-4" />
                        <span className="text-foreground text-sm font-semibold">
                          {CANDIDATE_MOCK_BILLING_SUMMARY.nextBillingDate}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                        Amount Due
                      </span>
                      <span className="text-foreground block font-mono text-sm font-bold">
                        ৳{CANDIDATE_MOCK_BILLING_SUMMARY.amountDue} BDT
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-foreground block text-sm font-semibold">
                        Auto Renewal
                      </span>
                      <span className="text-muted-foreground text-[10px]">
                        Automatically renew plan monthly
                      </span>
                    </div>
                    <Switch
                      checked={autoRenew}
                      onCheckedChange={setAutoRenew}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="destructive"
                      className="w-full rounded-xl py-5 font-bold shadow-xs"
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* SSLCommerz Local Payments Card */}
              <Card className="border-primary/10 from-card to-background overflow-hidden bg-linear-to-br lg:col-span-2">
                <CardHeader className="border-border/50 border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-base font-bold">
                        Secure Checkout with SSLCommerz
                        <Badge className="border-none bg-emerald-500/10 text-[9px] font-bold tracking-wider text-emerald-600 uppercase">
                          Local Payments
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Choose from popular Bangladeshi mobile wallets or
                        debit/credit cards
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {paymentChannels.map((method) => {
                      const isSelected = selectedMethod === method.id;
                      return (
                        <div
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={cn(
                            "group border-border/80 relative cursor-pointer overflow-hidden rounded-2xl border bg-slate-50/50 p-5 transition-all duration-300 hover:-translate-y-0.5 dark:bg-slate-900/10",
                            isSelected
                              ? "border-primary from-primary/5 ring-primary/20 bg-linear-to-br to-transparent ring-4"
                              : "hover:border-primary/30",
                          )}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <h4 className="text-foreground text-sm font-bold sm:text-base">
                                {method.name}
                              </h4>
                              <p className="text-muted-foreground text-[10px] font-semibold tracking-wide uppercase">
                                {method.type}
                              </p>
                            </div>
                            <div
                              className={cn(
                                "flex h-10 w-16 items-center justify-center rounded-xl text-xs font-black tracking-tight shadow-md sm:text-sm",
                                method.colorClass,
                                method.textColor,
                                method.shadowColor,
                              )}
                            >
                              {method.logoText}
                            </div>
                          </div>
                          <p className="text-muted-foreground mt-4 text-xs leading-relaxed font-medium opacity-80">
                            {method.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-border/50 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex max-w-xl items-start gap-3 rounded-2xl border border-amber-500/10 bg-amber-500/5 p-4">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                      <p className="text-muted-foreground text-xs leading-relaxed font-semibold">
                        SSLCommerz is PCI-DSS compliant. Your credentials are
                        fully encrypted and never stored on our servers.
                      </p>
                    </div>

                    <Button
                      onClick={handleSSLCommerzPayment}
                      disabled={isProcessing}
                      className="shadow-primary/25 h-12 rounded-xl px-8 font-black shadow-lg"
                    >
                      {isProcessing && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Pay ৳{CANDIDATE_MOCK_BILLING_SUMMARY.amountDue} BDT
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section: Billing History */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 px-1">
                <div className="h-6 w-1 rounded-full bg-emerald-500" />
                <h2 className="text-foreground/70 text-sm font-black tracking-[0.2em] uppercase">
                  Invoice History
                </h2>
              </div>
              <CandidateBillingHistoryTable
                invoices={CANDIDATE_MOCK_INVOICES}
              />
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
