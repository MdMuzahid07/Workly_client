import { BookmarkCheck, Clock } from "lucide-react";
import { Card, CardContent } from "../../ui/card";

const StatsCards = ({
  totalSaved,
  expiringSoon,
}: {
  totalSaved: number;
  expiringSoon: number;
}) => (
  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">
              Total Saved
            </p>
            <p className="text-2xl font-bold">{totalSaved}</p>
          </div>
          <BookmarkCheck className="text-primary h-8 w-8" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">
              Expiring Soon
            </p>
            <p className="text-2xl font-bold">{expiringSoon}</p>
          </div>
          <Clock className="h-8 w-8 text-amber-600" />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default StatsCards;
