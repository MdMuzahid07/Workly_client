import { SectionCard } from "@/components/main/profile/SectionCard";
import { Button } from "@/components/ui/button";
import { Edit2, HeartHandshake, Trash2 } from "lucide-react";
import type { VolunteerWork } from "@/types/profile";

interface VolunteerSectionProps {
  volunteer?: VolunteerWork[];
  onAdd?: () => void;
  onEdit?: (vol: VolunteerWork, index: number) => void;
  onDelete?: (index: number) => void;
}

export const VolunteerSection = ({
  volunteer = [],
  onAdd,
  onEdit,
  onDelete,
}: VolunteerSectionProps) => {
  return (
    <SectionCard
      title="Volunteer Work"
      isCompleted={volunteer.length > 0}
      completionPercentage={volunteer.length > 0 ? 5 : 0}
      onAdd={onAdd}
    >
      {volunteer.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-6 text-center text-sm">
          <HeartHandshake className="mb-2 h-10 w-10 opacity-20" />
          <p>Volunteering demonstrates leadership and community values.</p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {volunteer.map((vol, index) => (
            <div
              key={index}
              className="bg-muted/10 flex flex-col justify-between gap-3 rounded-lg border p-3 sm:flex-row sm:items-start sm:gap-4 sm:p-4"
            >
              <div className="grid w-full grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                <div>
                  <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                    Role
                  </div>
                  <div className="text-sm font-semibold sm:text-base">
                    {vol.role}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                    Organization
                  </div>
                  <div className="text-sm font-semibold sm:text-base">
                    {vol.organization}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                    Duration
                  </div>
                  <div className="text-sm font-semibold sm:text-base">
                    {vol.startDate
                      ? new Date(vol.startDate).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                        })
                      : "N/A"}{" "}
                    -{" "}
                    {vol.currentlyVolunteering || vol.current
                      ? "Present"
                      : vol.endDate
                        ? new Date(vol.endDate).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                          })
                        : "N/A"}
                  </div>
                </div>

                {vol.description && (
                  <div className="border-border/50 col-span-1 mt-1 border-t pt-2.5 sm:pt-3 md:col-span-2">
                    <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                      Description
                    </div>
                    <p className="text-foreground/90 text-xs leading-relaxed whitespace-pre-line sm:text-sm">
                      {vol.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex w-full shrink-0 justify-end gap-1.5 border-t pt-2.5 sm:w-auto sm:flex-col sm:border-t-0 sm:pt-0">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-7 w-7 rounded-full sm:h-8 sm:w-8"
                  onClick={() => onEdit?.(vol, index)}
                >
                  <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-7 w-7 rounded-full sm:h-8 sm:w-8"
                  onClick={() => onDelete?.(index)}
                >
                  <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
};

export default VolunteerSection;
