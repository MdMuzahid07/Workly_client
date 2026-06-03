"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CANDIDATE_PRICING_FAQ } from "@/constants/pricing";

export default function CandidatePricingFAQ() {
  return (
    <div className="mt-20 space-y-12">
      <div className="text-center">
        <h2 className="text-foreground text-3xl font-bold tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground mt-4">
          Everything you need to know about our job seeker subscription
          packages.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {CANDIDATE_PRICING_FAQ.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger className="text-foreground font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
