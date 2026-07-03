"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useInitiatePaymentMutation } from "@/redux/feature/payment/paymentApi";
import { useAppSelector } from "@/redux/hooks";
import { Check, Loader2, LucideIcon } from "lucide-react";
import { toast } from "sonner";

interface PricingTierCardProps {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  variant: "primary" | "outline";
  popular?: boolean;
  icon: LucideIcon;
  color: string;
  borderColor: string;
  bgColor: string;
  category?: "EMPLOYER_PLAN" | "SEEKER_PREMIUM";
  isActivePlan?: boolean;
}

export default function PricingTierCard({
  id,
  name,
  price,
  period,
  description,
  features,
  cta,
  variant,
  popular,
  icon: Icon,
  color,
  borderColor,
  bgColor,
  category = "EMPLOYER_PLAN",
  isActivePlan = false,
}: PricingTierCardProps) {
  const [initiatePayment, { isLoading }] = useInitiatePaymentMutation();
  const { user } = useAppSelector((state) => state.auth) || {};

  const handleCheckout = async () => {
    // If current plan, do nothing
    if (isActivePlan || id.toLowerCase() === "free") return;

    if (!user) {
      window.location.href = "/auth/login";
      return;
    }

    if (id.toLowerCase() === "enterprise" || price === "Custom") {
      window.location.href = `mailto:sales@workly.com?subject=Enterprise Plan Inquiry from ${user.fullName}`;
      return;
    }

    try {
      const numericAmount = parseFloat(price.replace(/[^0-9.]/g, ""));
      if (isNaN(numericAmount) || numericAmount <= 0) return;

      const res = await initiatePayment({
        planId: id,
        category,
        amount: numericAmount,
        currency: "BDT",
        cusName: user.fullName || "User",
        cusEmail: user.email || "",
        cusPhone: user.phone || "01700000000",
        frontendUrl: window.location.origin,
      }).unwrap();

      if (res?.data?.gatewayUrl) {
        window.location.href = res.data.gatewayUrl;
      }
    } catch (err) {
      console.error("Payment session initiation failed:", err);
      const error = err as { data?: { message?: string } };
      toast.error(
        error?.data?.message ||
          "Failed to contact payment server. Please try again later.",
      );
    }
  };

  const isButtonDisabled =
    isActivePlan || id.toLowerCase() === "free" || isLoading;

  return (
    <Card
      className={cn(
        "bg-card relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl",
        popular
          ? "border-primary ring-primary/30 z-10 shadow-md ring-2"
          : borderColor,
      )}
    >
      {popular && (
        <div className="absolute top-3 right-4">
          <Badge className="to-primary rounded-full border-none bg-linear-to-r from-emerald-500 px-3.5 py-1 text-[10px] font-extrabold tracking-widest text-white uppercase shadow-xs">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="p-6 pb-4 sm:p-8">
        <div
          className={cn(
            "ring-primary/5 mb-4 inline-flex self-start rounded-2xl p-3.5 ring-4",
            bgColor,
          )}
        >
          <Icon className={cn("h-6 w-6 sm:h-7 sm:w-7", color)} />
        </div>
        <h3 className="text-foreground text-xl font-bold sm:text-2xl">
          {name}
        </h3>
        <p className="text-muted-foreground line-clamp-2 pt-1 text-xs sm:text-sm">
          {description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 p-6 pt-2 sm:p-8">
        <div className="mb-6 flex items-baseline gap-1.5 border-b pb-6">
          <span className="text-foreground text-3xl font-black tracking-tight sm:text-4xl">
            {price}
          </span>
          {period && (
            <span className="text-muted-foreground text-xs font-medium sm:text-sm">
              {period}
            </span>
          )}
        </div>

        <ul className="space-y-3.5">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full">
                <Check className="h-3 w-3 stroke-[3]" />
              </div>
              <span className="text-foreground/90 text-xs leading-snug font-medium sm:text-sm">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-6 pt-0 sm:p-8">
        <Button
          onClick={handleCheckout}
          disabled={isButtonDisabled}
          className={cn(
            "flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-bold transition-all sm:h-12",
            isActivePlan
              ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 cursor-default border opacity-100"
              : variant === "primary"
                ? "bg-primary text-primary-foreground shadow-primary/25 hover:bg-primary/90 shadow-md"
                : "hover:bg-primary/5 border-border/80 hover:border-primary/40",
          )}
          variant={
            isActivePlan
              ? "secondary"
              : variant === "primary"
                ? "default"
                : "outline"
          }
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isActivePlan ? "Current Active Plan" : cta}
        </Button>
      </CardFooter>
    </Card>
  );
}
