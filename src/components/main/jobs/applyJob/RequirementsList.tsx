"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const RequirementsList = ({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg">
        <Icon className="h-5 w-5" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex gap-3">
          <CheckCircle2 className="text-success mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-muted-foreground text-sm">{item}</p>
        </div>
      ))}
    </CardContent>
  </Card>
);
export default RequirementsList;
