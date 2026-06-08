/* eslint-disable @typescript-eslint/no-explicit-any */
import { SectionCard } from "@/components/main/profile/SectionCard";
import { Button } from "@/components/ui/button";
import { Edit2, HeartHandshake, Trash2 } from "lucide-react";

export const VolunteerSection = ({
  volunteer = [],
  onAdd,
  onEdit,
  onDelete,
}: {
  volunteer: any[];
  onAdd?: () => void;
  onEdit?: (vol: any, index: number) => void;
  onDelete?: (index: number) => void;
}) => {
  return (
    <SectionCard
      title="Volunteer Work"
      isCompleted={volunteer.length > 0}
      completionPercentage={volunteer.length > 0 ? 5 : 0}
      onAdd={onAdd}
    >
      {volunteer.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-6 text-center">
          <HeartHandshake className="mb-2 h-10 w-10 opacity-20" />
          <p>Volunteering demonstrates leadership and community values.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {volunteer.map((vol, index) => (
            <div
              key={index}
              className="bg-muted/10 relative rounded-lg border p-4"
            >
              <div className="grid w-full grid-cols-1 gap-4 pr-10 md:grid-cols-2">
                <div>
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Role
                  </div>
                  <div className="font-medium">{vol.role}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Organization
                  </div>
                  <div className="font-medium">{vol.organization}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Duration
                  </div>
                  <div className="font-medium">
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
              </div>

              {vol.description && (
                <div className="border-border/50 mt-4 border-t pt-4">
                  <div className="text-muted-foreground mb-2 text-xs tracking-wider uppercase">
                    Description
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-line">
                    {vol.description}
                  </p>
                </div>
              )}

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:text-primary h-8 w-8"
                  onClick={() => onEdit?.(vol, index)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:text-destructive h-8 w-8"
                  onClick={() => onDelete?.(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
};
