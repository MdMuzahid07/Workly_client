"use client";

import { PRICING_FAQ } from "@/constants/pricing";
import { HelpCircle } from "lucide-react";

export default function PricingFAQ() {
  return (
    <div className="mt-24 space-y-12 pb-20">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="bg-primary/10 text-primary rounded-full p-2">
          <HelpCircle className="h-5 w-5" />
        </div>
        <h2 className="text-foreground text-2xl font-bold tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Everything you need to know about our plans and billing.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
        {PRICING_FAQ.map((item, idx) => (
          <div key={idx} className="bg-card space-y-3 rounded-xl border p-6">
            <h4 className="text-foreground text-sm font-bold">
              {item.question}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed italic">
              &quot;{item.answer}&quot;
            </p>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border-primary/20 mt-12 rounded-3xl border border-dashed p-8 text-center">
        <h3 className="text-foreground text-lg font-bold">
          Still have questions?
        </h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Our support team is always here to help. Contact us for a custom
          walkthrough.
        </p>
        <button className="text-primary mt-6 cursor-pointer font-bold hover:underline">
          Chat with Support →
        </button>
      </div>
    </div>
  );
}
