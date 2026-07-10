'use client';

import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  HelpCircle,
  Home,
  RotateCw,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.error('Application Error Details:', error);
  }, [error]);

  const copyErrorDetails = () => {
    const details = `Error: ${error?.message || 'Unknown Error'}
Digest: ${error?.digest || 'N/A'}
Stack: ${error?.stack || 'N/A'}`;
    navigator.clipboard.writeText(details);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-background relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4 sm:p-6">
      {/* Background Subtle Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="bg-destructive/5 absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="bg-primary/5 absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="border-border bg-card relative z-10 w-full max-w-xl rounded-xl border p-6 sm:p-8"
      >
        {/* Error Header Icon */}
        <div className="flex items-center gap-4">
          <div className="border-destructive/10 bg-destructive/5 text-destructive flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <span className="text-destructive/80 text-[10px] font-extrabold tracking-widest uppercase">
              System Exception
            </span>
            <h1 className="text-foreground mt-0.5 text-xl font-bold tracking-tight sm:text-2xl">
              An unexpected error occurred
            </h1>
          </div>
        </div>

        {/* Message */}
        <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
          We apologize for the interruption. The system encountered an issue processing your
          request. Our engineering team has been automatically notified and is looking into the
          cause.
        </p>

        {/* Action Buttons */}
        <div className="border-border mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row">
          <Button
            onClick={reset}
            className="bg-primary hover:bg-primary/90 flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border-none font-semibold text-white transition-all active:scale-[0.98]"
          >
            <RotateCw className="h-4 w-4" />
            Try Again
          </Button>
          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="border-border bg-background hover:bg-muted/50 text-foreground flex h-11 w-full items-center justify-center gap-2 rounded-lg font-semibold transition-all active:scale-[0.98]"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>

        {/* Technical details toggle */}
        <div className="border-border mt-8 border-t pt-6">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs font-semibold transition-colors"
          >
            {showDetails ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            Diagnostics & Support Details
          </button>

          <AnimatePresence initial={false}>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="bg-muted/30 border-border text-foreground/80 relative mt-4 max-h-60 overflow-y-auto rounded-lg border p-4 font-mono text-[11px] leading-relaxed">
                  <button
                    onClick={copyErrorDetails}
                    className="border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted absolute top-3 right-3 rounded-md border p-1.5 transition-all"
                    title="Copy diagnostics info"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <div className="space-y-2 pr-10">
                    <div>
                      <span className="text-muted-foreground font-semibold">Message:</span>{' '}
                      {error?.message || 'Unknown error occurred'}
                    </div>
                    {error?.digest && (
                      <div>
                        <span className="text-muted-foreground font-semibold">Digest:</span>{' '}
                        {error.digest}
                      </div>
                    )}
                    {error?.stack && (
                      <div>
                        <span className="text-muted-foreground mb-1 block text-xs font-semibold">
                          Stack Trace:
                        </span>
                        <pre className="border-border bg-card max-h-36 overflow-y-auto rounded-md border p-3 text-[10px] leading-relaxed whitespace-pre-wrap opacity-75">
                          {error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="text-muted-foreground/60 mt-6 flex flex-col gap-2 text-[11px] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Need immediate help?</span>
            <a
              href="mailto:support@worklyjob.com"
              className="hover:text-foreground font-bold underline"
            >
              Contact Support
            </a>
          </div>
          <span>&copy; {new Date().getFullYear()} WorklyJob</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Error;
