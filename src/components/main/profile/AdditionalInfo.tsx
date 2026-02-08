import { SectionCard } from "@/components/main/profile/SectionCard";
import { Award, BookOpen, UserCheck } from "lucide-react";

export const AdditionalInfo = ({
  onAddAward,
  onAddPublication,
  onAddReference,
}: {
  onAddAward?: () => void;
  onAddPublication?: () => void;
  onAddReference?: () => void;
}) => {
  return (
    <div className="space-y-6">
      <SectionCard title="Honors & Awards" noData onAdd={onAddAward}>
        <div className="flex items-center gap-4 rounded-lg border bg-amber-50/50 p-4">
          <Award className="h-8 w-8 text-amber-500" />
          <div>
            <h4 className="font-medium">Hackathon Winner 2024</h4>
            <p className="text-muted-foreground text-sm">
              Global Tech Summit - First Prize in AI Innovation
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Publications" noData onAdd={onAddPublication}>
        <div className="flex items-center gap-4 rounded-lg border p-4">
          <BookOpen className="h-8 w-8 text-blue-500" />
          <div>
            <h4 className="font-medium">Modern React Patterns</h4>
            <p className="text-muted-foreground text-sm">
              Published on Medium · Dec 2024
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="References" noData onAdd={onAddReference}>
        <div className="text-muted-foreground py-4 text-center text-sm">
          <UserCheck className="mx-auto mb-2 h-5 w-5 opacity-30" />
          Add professional references available upon request.
        </div>
      </SectionCard>
    </div>
  );
};
