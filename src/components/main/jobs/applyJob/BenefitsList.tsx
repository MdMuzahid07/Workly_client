"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const BenefitsList = ({ items }: { items: string[] }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">Benefits</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {items.map((benefit, index) => (
        <div key={index} className="flex gap-3">
          <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-muted-foreground text-sm">{benefit}</p>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default BenefitsList;
