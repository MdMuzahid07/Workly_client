"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Construction } from "lucide-react"; // shadcn icons (lucide-react)
import { useEffect, useState } from "react";

const ComingSoonAlert = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Open automatically on mount
    setOpen(true);
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-card sm:max-w-[425px]">
        <DialogHeader className="flex items-center space-y-2">
          <div className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-yellow-500" />
            <DialogTitle>Feature Coming Soon</DialogTitle>
          </div>
          <DialogDescription>
            This section is currently under development and will be available in
            a future update.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-muted-foreground mt-1 h-5 w-5" />
            <p className="text-secondary-foreground leading-relaxed">
              The feature {`you’re`} trying to access {`isn’t`} functional yet,
              but {`it’s`} being worked on. Please check back soon!
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonAlert;
