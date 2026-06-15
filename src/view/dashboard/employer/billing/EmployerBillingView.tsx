"use client";

import BillingHistoryTable from "@/components/dashboard/billing/BillingHistoryTable";
import DashboardEmployerBillingHeader from "@/components/dashboard/dashboard-nav/header/DashboardEmployerBillingHeader";
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

export default function EmployerBillingView() {
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
        category: "EMPLOYER_PLAN",
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
      <DashboardEmployerBillingHeader />

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
                    Employer Subscription
                  </CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Manage employer recruiting packages
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
                      {isFreePlan ? "Free Tier" : "Active"}
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
                    {paymentChannels.map((channel) => (
                      <div
                        key={channel.id}
                        onClick={() => setSelectedMethod(channel.id)}
                        className={cn(
                          "group relative cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all duration-300 select-none hover:shadow-md",
                          selectedMethod === channel.id
                            ? "border-primary ring-primary/20 bg-primary/2 scale-[1.01] ring-2"
                            : "border-border/60 hover:border-primary/30",
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h4 className="text-foreground text-sm font-bold tracking-tight">
                              {channel.name}
                            </h4>
                            <span className="text-muted-foreground block text-[10px] font-medium tracking-wider uppercase">
                              {channel.type}
                            </span>
                          </div>
                          <div
                            className={cn(
                              "rounded-xl px-3.5 py-2.5 text-sm font-black tracking-wide shadow-sm",
                              channel.colorClass,
                              channel.textColor,
                            )}
                          >
                            {channel.logoText}
                          </div>
                        </div>

                        <p className="text-muted-foreground mt-4 text-xs leading-relaxed font-medium">
                          {channel.description}
                        </p>

                        {selectedMethod === channel.id && (
                          <div className="text-primary bg-primary/10 absolute right-3 bottom-3 rounded-full p-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-3.5 w-3.5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.748-5.25Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="border-border/50 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
                    <div className="bg-muted/20 border-border/40 flex flex-1 items-center gap-3 rounded-xl border p-4">
                      <ShieldCheck className="text-primary h-6 w-6 shrink-0" />
                      <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                        WorklyJob routes payments through{" "}
                        <span className="text-foreground font-black">
                          SSLCommerz
                        </span>
                        , {`Bangladesh's`} leading licensed gateway. Your
                        transaction is 100% secure.
                      </p>
                    </div>
                    {isFreePlan ? (
                      <Link
                        href="/employer/pricing"
                        className="w-full md:w-auto"
                      >
                        <Button className="bg-primary text-primary-foreground shadow-primary/20 hover:shadow-primary/40 h-12 w-full rounded-xl px-8 font-bold shadow-lg transition-all">
                          Upgrade Pricing Tier
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        onClick={handleSSLCommerzPayment}
                        disabled={isPaymentInitiating}
                        className="bg-primary text-primary-foreground shadow-primary/20 hover:shadow-primary/40 h-12 w-full rounded-xl px-8 font-bold shadow-lg transition-all md:w-auto"
                      >
                        {isPaymentInitiating ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Pay ৳{price.toLocaleString("en-BD")} via SSLCommerz
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
                Billing History
              </h2>
            </div>
            <BillingHistoryTable />
          </section>
        </div>
      </div>
    </div>
  );
}
