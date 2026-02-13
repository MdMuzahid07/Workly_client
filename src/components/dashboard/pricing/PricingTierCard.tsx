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
import { Check, LucideIcon } from "lucide-react";

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
}

export default function PricingTierCard({
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
}: PricingTierCardProps) {
  return (
    <Card
      className={cn(
        "relative flex flex-col overflow-hidden border transition-all duration-300",
        popular
          ? "border-primary ring-primary/50 z-10 scale-105 ring-1"
          : borderColor,
      )}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <Badge className="bg-primary text-primary-foreground rounded-none rounded-bl-xl px-4 py-1.5 font-bold tracking-widest uppercase">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="p-8 pb-4">
        <div className={cn("mb-4 inline-flex rounded-xl p-3", bgColor)}>
          <Icon className={cn("h-6 w-6", color)} />
        </div>
        <h3 className="text-foreground text-xl font-bold">{name}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 p-8 pt-4">
        <div className="mb-8 flex items-baseline gap-1">
          <span className="text-foreground text-4xl font-black tracking-tight">
            {price}
          </span>
          {period && (
            <span className="text-muted-foreground text-sm font-medium">
              {period}
            </span>
          )}
        </div>

        <ul className="space-y-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
                <Check className="h-3 w-3" />
              </div>
              <span className="text-foreground/80 text-sm leading-snug">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-8 pt-0">
        <Button
          className={cn(
            "h-12 w-full rounded-xl font-bold transition-all",
            variant === "primary"
              ? "bg-primary text-primary-foreground shadow-primary/20 hover:shadow-primary/40 shadow-lg"
              : "hover:bg-primary/5 border-primary/20",
          )}
          variant={variant === "primary" ? "default" : "outline"}
        >
          {cta}
        </Button>
      </CardFooter>
    </Card>
  );
}
