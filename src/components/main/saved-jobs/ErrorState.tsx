import { Bookmark } from "lucide-react";
import { Button } from "../../ui/button";

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="container mx-auto max-w-7xl px-4 py-6 pt-24">
    <div className="py-12 text-center">
      <Bookmark className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
      <h3 className="mb-2 text-lg font-semibold">Failed to load saved jobs</h3>
      <p className="text-muted-foreground mb-4">
        There was an error loading your saved jobs. Please try again.
      </p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  </div>
);

export default ErrorState;
