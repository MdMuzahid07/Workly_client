'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useInitiatePaymentMutation } from '@/redux/feature/payment/paymentApi';
import { useAppSelector } from '@/redux/hooks';
import { Check, Loader2, LucideIcon, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface PricingTierCardProps {
  id: string;
  name: string;
  price: string;
  period?: string;
  /** The crossed-out original price before discount. E.g. "৳90" */
  originalPrice?: string;
  /** Discount badge text. E.g. "65% OFF · 1ST MONTH" */
  discountBadge?: string;
  /** The percentage discount to render next to the price. E.g. 45 */
  discountPercent?: number;
  /** Small note below the price. E.g. "Effective ৳80/month" */
  periodNote?: string;
  description: string;
  features: string[];
  cta: string;
  variant: 'primary' | 'outline';
  popular?: boolean;
  icon: LucideIcon;
  color: string;
  borderColor: string;
  bgColor: string;
  category?: 'EMPLOYER_PLAN' | 'SEEKER_PREMIUM';
  isActivePlan?: boolean;
}

export default function PricingTierCard({
  id,
  name,
  price,
  period,
  originalPrice,
  discountBadge,
  discountPercent,
  periodNote,
  description,
  features,
  cta,
  variant,
  popular,
  icon: Icon,
  color,
  borderColor,
  bgColor,
  category = 'EMPLOYER_PLAN',
  isActivePlan = false,
}: PricingTierCardProps) {
  const [initiatePayment, { isLoading }] = useInitiatePaymentMutation();
  const { user } = useAppSelector((state) => state.auth) || {};

  const handleCheckout = async () => {
    // If current plan, do nothing
    if (isActivePlan || id.toLowerCase() === 'free') return;

    if (!user) {
      window.location.href = '/auth/login';
      return;
    }

    if (id.toLowerCase() === 'enterprise' || price === 'Custom') {
      window.location.href = `mailto:sales@workly.com?subject=Enterprise Plan Inquiry from ${user.fullName}`;
      return;
    }

    try {
      // Send the full plan price; backend will apply first-time discount if eligible
      const numericAmount = parseFloat(price.replace(/[^0-9.]/g, ''));
      if (isNaN(numericAmount) || numericAmount <= 0) return;

      const res = await initiatePayment({
        planId: id,
        category,
        amount: numericAmount,
        currency: 'BDT',
        cusName: user.fullName || 'User',
        cusEmail: user.email || '',
        cusPhone: user.phone || '01700000000',
        frontendUrl: window.location.origin,
      }).unwrap();

      if (res?.data?.gatewayUrl) {
        window.location.href = res.data.gatewayUrl;
      }
    } catch (err) {
      console.error('Payment session initiation failed:', err);
      const error = err as { data?: { message?: string } };
      toast.error(
        error?.data?.message || 'Failed to contact payment server. Please try again later.',
      );
    }
  };

  const isButtonDisabled = isActivePlan || id.toLowerCase() === 'free' || isLoading;

  const hasDiscount = !!discountBadge && !!originalPrice;

  return (
    <Card
      className={cn(
        'bg-card relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl lg:rounded-3xl',
        popular ? 'border-primary ring-primary/30 z-10 shadow-md ring-2' : borderColor,
      )}
    >
      {/* Popular badge (shown only when there is no discount banner) */}
      {popular && !hasDiscount && (
        <div className="absolute top-2.5 right-3.5 sm:top-3 sm:right-4">
          <Badge className="to-primary rounded-full border-none bg-linear-to-r from-emerald-500 px-2 py-0.5 text-[8px] font-extrabold tracking-widest text-white uppercase shadow-xs sm:px-3.5 sm:py-1 sm:text-[10px]">
            Most Popular
          </Badge>
        </div>
      )}

      {/* First-time discount banner — replaces the popular badge */}
      {hasDiscount && (
        <div className="absolute top-0 right-0 left-0 flex items-center justify-center gap-1 rounded-t-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-2 py-1 sm:gap-1.5 sm:rounded-t-2xl sm:py-1.5">
          <Zap className="h-2.5 w-2.5 fill-white text-white sm:h-3 sm:w-3" />
          <span className="text-[8px] font-extrabold tracking-widest text-white uppercase sm:text-[10px]">
            {discountBadge}
          </span>
        </div>
      )}

      <CardHeader
        className={cn(
          'p-3.5 pb-2.5 sm:p-6 sm:pb-3.5 lg:p-8 lg:pb-4',
          hasDiscount && 'pt-7.5 sm:pt-10 lg:pt-11',
        )}
      >
        <div
          className={cn(
            'ring-primary/5 mb-2.5 inline-flex self-start rounded-xl p-2.5 ring-4 sm:mb-4 sm:rounded-2xl sm:p-3.5',
            bgColor,
          )}
        >
          <Icon className={cn('h-4.5 w-4.5 sm:h-6 sm:w-6 lg:h-7 lg:w-7', color)} />
        </div>
        <h3 className="text-foreground text-sm font-extrabold tracking-tight sm:text-lg lg:text-2xl">
          {name}
        </h3>
        <p className="text-muted-foreground line-clamp-2 pt-0.5 text-[10px] leading-snug sm:text-xs lg:text-sm">
          {description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 p-3.5 pt-1 sm:p-6 sm:pt-2 lg:p-8 lg:pt-3">
        {/* Price block */}
        <div className="mb-4 border-b pb-4 sm:mb-6 sm:pb-6">
          <div className="flex flex-wrap items-baseline gap-1">
            {/* Crossed-out original price */}
            {hasDiscount && (
              <span className="text-muted-foreground/60 text-xs font-semibold line-through sm:text-base lg:text-lg">
                {originalPrice}
              </span>
            )}
            <span className="text-foreground text-lg font-black tracking-tight sm:text-2xl lg:text-4xl">
              {price}
            </span>
            {period && (
              <span className="text-muted-foreground text-[9px] font-semibold sm:text-xs lg:text-sm">
                {period}
              </span>
            )}
            {hasDiscount && discountPercent && (
              <Badge className="rounded-md border-none bg-emerald-500/10 px-1 py-0.5 text-[8px] font-black tracking-wider text-emerald-600 uppercase hover:bg-emerald-500/10 dark:bg-emerald-500/20 dark:text-emerald-400">
                {discountPercent}% OFF
              </Badge>
            )}
          </div>

          {/* Effective monthly rate note */}
          {periodNote && !hasDiscount && (
            <p className="text-muted-foreground mt-0.5 text-[9px] font-medium sm:text-[11px]">
              {periodNote}
            </p>
          )}

          {/* First-time offer clarifier */}
          {hasDiscount && (
            <p className="mt-0.5 text-[8.5px] font-semibold text-emerald-600 sm:text-[10px] dark:text-emerald-400">
              First purchase only · Regular price {originalPrice}
            </p>
          )}
        </div>

        <ul className="space-y-2.5 sm:space-y-3.5">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 sm:gap-3">
              <div className="bg-primary/10 text-primary mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full sm:h-4.5 sm:w-4.5">
                <Check className="h-2.5 w-2.5 stroke-[3] sm:h-3 sm:w-3" />
              </div>
              <span className="text-foreground/90 text-[10px] leading-snug font-medium sm:text-xs lg:text-sm">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-3.5 pt-0 sm:p-6 sm:pt-0 lg:p-8 lg:pt-0">
        <Button
          onClick={handleCheckout}
          disabled={isButtonDisabled}
          className={cn(
            'flex h-9 w-full items-center justify-center gap-1.5 rounded-full text-xs font-bold transition-all sm:h-11 sm:text-sm lg:h-12',
            isActivePlan
              ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 cursor-default border opacity-100'
              : variant === 'primary'
                ? 'bg-primary text-primary-foreground shadow-primary/25 hover:bg-primary/90 shadow-md'
                : 'hover:bg-primary/5 border-border/80 hover:border-primary/40',
          )}
          variant={isActivePlan ? 'secondary' : variant === 'primary' ? 'default' : 'outline'}
        >
          {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {isActivePlan ? 'Current Plan' : cta}
        </Button>
      </CardFooter>
    </Card>
  );
}
