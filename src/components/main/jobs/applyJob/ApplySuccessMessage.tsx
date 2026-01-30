"use client";
import { Card, CardContent } from "@/components/ui/card";

import { CheckCircle2 } from "lucide-react";

const ApplySuccessMessage = () => {
  return (
    <Card className="border-success/20 bg-success/5">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-success/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <CheckCircle2 className="text-success h-8 w-8" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">Application Submitted!</h3>
        <p className="text-muted-foreground">
          Thank you for applying. {`We'll`} review your application and get back
          to you soon.
        </p>
      </CardContent>
    </Card>
  );
};

export default ApplySuccessMessage;
