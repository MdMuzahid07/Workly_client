'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

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
  <Card className="border-primary/10 bg-background/60 shadow-primary/5 rounded-2xl border shadow-lg backdrop-blur-xl">
    <CardHeader className="border-border/50 border-b px-6 pb-4">
      <CardTitle className="flex items-center gap-3 text-lg font-bold tracking-tight">
        <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <Icon className="text-primary h-5 w-5" />
        </div>
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 p-6">
      {items?.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
          <p className="text-muted-foreground text-sm leading-relaxed font-medium">{item}</p>
        </div>
      ))}
    </CardContent>
  </Card>
);
export default RequirementsList;
