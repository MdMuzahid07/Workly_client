import { SectionCard } from "@/components/main/profile/SectionCard";
import { HeartHandshake } from "lucide-react";

export const VolunteerSection = ({
  volunteer = [],
  onAdd,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  volunteer: any[];
  onAdd?: () => void;
}) => {
  return (
    <SectionCard
      title="Volunteer Work"
      isCompleted={volunteer.length > 0}
      completionPercentage={volunteer.length > 0 ? 5 : 0}
      onAdd={onAdd}
      noData={volunteer.length === 0}
    >
      {volunteer.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-6 text-center">
          <HeartHandshake className="mb-2 h-10 w-10 opacity-20" />
          <p>Volunteering demonstrates leadership and community values.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* List implementation similar to ExperienceList */}
          <div>Volunteer list placeholder</div>
        </div>
      )}
    </SectionCard>
  );
};
