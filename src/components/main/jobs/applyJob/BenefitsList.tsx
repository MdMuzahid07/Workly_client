'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const BenefitsList = ({ items }: { items: string[] }) => (
  <Card className="border-primary/10 bg-background/60 shadow-primary/5 rounded-2xl border shadow-lg backdrop-blur-xl">
    <CardHeader className="border-border/50 border-b px-6 pb-4">
      <CardTitle className="text-lg font-bold tracking-tight">Benefits & Perks</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 p-6">
      {items.map((benefit, index) => (
        <div key={index} className="flex items-start gap-4">
          <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-muted-foreground text-sm leading-relaxed font-medium">{benefit}</p>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default BenefitsList;
