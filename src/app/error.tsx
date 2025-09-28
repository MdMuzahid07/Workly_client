"use client";
import { Unplug } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../components/ui/button";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-primary/5 flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col items-center rounded-xl">
        <Unplug className="text-destructive mb-6 h-16 w-16 animate-bounce" />
        <h2 className="text-destructive mb-2 text-center text-2xl font-bold sm:text-left">
          Oops! Something went wrong
        </h2>
        <p className="mb-4 text-center text-black/70 sm:text-left">
          An unexpected error has occurred. Please try again.
        </p>
        {error.digest && (
          <p className="mb-6 text-sm text-black/70">
            Error code: <span className="font-mono">{error.digest}</span>
          </p>
        )}
        <Button
          onClick={reset}
          className="bg-primary text-card rounded-full px-6 py-2 transition-all"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default Error;
