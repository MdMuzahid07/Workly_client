import { TriangleAlert } from "lucide-react";
import { Button } from "../../../ui/button";

const ErrorState = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 pt-24">
      <div className="py-12 text-center">
        <TriangleAlert className="text-destructive mx-auto mb-4 h-16 w-16" />
        <h3 className="mb-2 text-lg font-semibold">
          {" "}
          Failed to load Job Applications
        </h3>
        <p className="text-muted-foreground mb-4">
          There was an error loading your Applications. Please try again.
        </p>
        <Button onClick={onRetry}>Retry</Button>
      </div>
    </div>
  );
};

export default ErrorState;
