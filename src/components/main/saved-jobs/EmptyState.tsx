import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

const EmptyState = ({
  title,
  description,
  icon: Icon,
  showClearButton = false,
  onClearFilters,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  showClearButton?: boolean;
  onClearFilters?: () => void;
}) => (
  <Card>
    <CardContent className="p-12 text-center">
      <Icon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {showClearButton && onClearFilters && (
        <Button variant="outline" onClick={onClearFilters}>
          Clear filters
        </Button>
      )}
    </CardContent>
  </Card>
);
export default EmptyState;
