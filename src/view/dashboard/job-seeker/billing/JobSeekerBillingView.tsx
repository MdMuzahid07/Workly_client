"use client";

import BillingHistoryTable from "@/components/dashboard/billing/BillingHistoryTable";
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
import { cn } from "@/lib/utils";
import { useInitiatePaymentMutation } from "@/redux/feature/payment/paymentApi";
import {
  useCancelSubscriptionMutation,
  useGetMySubscriptionQuery,
} from "@/redux/feature/subscription/subscriptionApi";
import { useAppSelector } from "@/redux/hooks";
import { Calendar, Crown, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function JobSeekerBillingView() {
  const { data: subRes, isLoading: isSubLoading } = useGetMySubscriptionQuery();
  const [cancelSubscription, { isLoading: isCancelling }] =
    useCancelSubscriptionMutation();
  const [initiatePayment, { isLoading: isPaymentInitiating }] =
    useInitiatePaymentMutation();
  const { user } = useAppSelector((state) => state.auth) || {};

  const [selectedMethod, setSelectedMethod] = useState("bkash");

  const subData = subRes?.data;
  const activePlanName = subData?.planName || "Free";
  const isFreePlan = activePlanName.toLowerCase() === "free";
  const price = subData?.price || 0;

  const getDaysRemaining = () => {
    if (!subData?.endDate) return 0;
    const expiryDate = new Date(subData.endDate);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = getDaysRemaining();
  const isExpired = daysRemaining < 0;
  const isNearExpiry = daysRemaining <= 3;
  const isActive = subData?.status === "ACTIVE";
  const needsPayment = isFreePlan
    ? false
    : isExpired || isNearExpiry || !isActive;

  const handleCancel = async () => {
    if (isFreePlan) return;
    try {
      const toastId = toast.loading("Processing subscription cancellation...");
      await cancelSubscription().unwrap();
      toast.success("Subscription cancellation request updated successfully.", {
        id: toastId,
      });
    } catch (err) {
      const error = err as { data?: { message?: string } };
      console.error(error);
      toast.error(error.data?.message || "Failed to cancel subscription.");
    }
  };

  const handleSSLCommerzPayment = async () => {
    if (isFreePlan) return;
    if (!user) {
      toast.error("Please login to proceed.");
      return;
    }

    try {
      const toastId = toast.loading("Initiating secure payment gateway...");
      const res = await initiatePayment({
        planId: activePlanName,
        category: "SEEKER_PREMIUM",
        amount: price,
        currency: "BDT",
        cusName: user.fullName || "User",
        cusEmail: user.email || "",
        cusPhone: user.phone || "01700000000",
        frontendUrl: window.location.origin,
      }).unwrap();

      if (res?.data?.gatewayUrl) {
        toast.success("Redirecting to payment gateway...", { id: toastId });
        window.location.href = res.data.gatewayUrl;
      }
    } catch (err) {
      const error = err as { data?: { message?: string } };
      console.error("Payment initiation error:", error);
      toast.error(error.data?.message || "Failed to load payment gateway.");
    }
  };

  const getRenewalDateString = () => {
    if (!subData?.endDate) return "Never";
    return new Date(subData.endDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  if (isSubLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-15">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/30 pt-15 pb-20 dark:bg-transparent">
      <DashboardCandidateBillingHeader />

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
                      {activePlanName}
                    </h3>
                    <Badge
                      className={cn(
                        "border-none",
                        isFreePlan
                          ? "bg-slate-500/10 text-slate-500"
                          : "bg-emerald-500/10 text-emerald-500",
                      )}
                    >
                      {isFreePlan ? "Free Seeker" : "Active"}
                    </Badge>
                  </div>
                </div>

                <div className="border-border/50 grid grid-cols-2 gap-4 border-y py-4">
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Renewal Date
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="text-muted-foreground h-4 w-4" />
                      <span className="text-foreground text-sm font-semibold">
                        {getRenewalDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Cost
                    </span>
                    <span className="text-foreground block font-mono text-sm font-bold">
                      ৳{price.toLocaleString("en-BD")} BDT
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 pr-2">
                    <span className="text-foreground block text-sm font-semibold">
                      Renewal Notifications
                    </span>
                    <span className="text-muted-foreground block text-[10px] leading-tight">
                      {isFreePlan
                        ? "Not applicable on Free tier"
                        : !subData?.cancelAtPeriodEnd
                          ? "Receive email & SMS alerts 3 days prior"
                          : "No alerts; account will degrade to Free on expiration"}
                    </span>
                  </div>
                  <Switch
                    checked={!isFreePlan && !subData?.cancelAtPeriodEnd}
                    disabled={isFreePlan || subData?.cancelAtPeriodEnd}
                    onCheckedChange={(checked) => {
                      if (!checked) {
                        handleCancel();
                      }
                    }}
                    className="data-[state=checked]:bg-primary shrink-0"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleCancel}
                    disabled={
                      isFreePlan || subData?.cancelAtPeriodEnd || isCancelling
                    }
                    variant="destructive"
                    className="w-full rounded-xl py-5 font-bold shadow-xs"
                  >
                    {isCancelling
                      ? "Processing..."
                      : subData?.cancelAtPeriodEnd
                        ? "Scheduled for Cancellation"
                        : "Cancel Subscription"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* SSLCommerz Local Payments Card or Secure Active Panel */}
            {!needsPayment && !isFreePlan ? (
              <Card className="flex flex-col justify-between overflow-hidden border-emerald-500/20 bg-linear-to-br from-emerald-500/5 to-transparent lg:col-span-2">
                <CardHeader className="border-b border-emerald-500/10 pb-4">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
                    <ShieldCheck className="h-5 w-5" />
                    <CardTitle className="text-base font-bold">
                      Billing Status: Secure & Active
                    </CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    Your subscription is currently active and does not require
                    immediate payment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col items-center justify-center space-y-4 p-8 text-center">
                  <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="h-12 w-12" />
                  </div>
                  <div className="max-w-md space-y-2">
                    <h4 className="text-foreground text-lg font-bold">
                      Your premium access is fully secured
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                      Next renewal payment of{" "}
                      <span className="text-foreground font-bold">
                        ৳{price.toLocaleString("en-BD")} BDT
                      </span>{" "}
                      is due on{" "}
                      <span className="text-foreground font-bold">
                        {getRenewalDateString()}
                      </span>
                      . We will alert you 3 days prior to expiration to complete
                      your renewal.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
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

                    {isFreePlan ? (
                      <Link
                        href="/dashboard/pricing"
                        className="w-full md:w-auto"
                      >
                        <Button className="shadow-primary/25 h-12 rounded-xl px-8 font-black shadow-lg">
                          Upgrade Pricing Tier
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        onClick={handleSSLCommerzPayment}
                        disabled={isPaymentInitiating}
                        className="shadow-primary/25 h-12 rounded-xl px-8 font-black shadow-lg"
                      >
                        {isPaymentInitiating && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Pay ৳{price.toLocaleString("en-BD")} BDT
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Section: Billing History */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 px-1">
              <div className="h-6 w-1 rounded-full bg-emerald-500" />
              <h2 className="text-foreground/70 text-sm font-black tracking-[0.2em] uppercase">
                Invoice History
              </h2>
            </div>
            <BillingHistoryTable />
          </section>
        </div>
      </div>
    </div>
  );
}
