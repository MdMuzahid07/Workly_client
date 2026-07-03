import { SectionCard } from "@/components/main/profile/SectionCard";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import type { WorkExperience } from "@/types/profile";

interface ExperienceListProps {
  experience?: WorkExperience[];
  onAdd?: () => void;
  onEdit?: (exp: WorkExperience, index: number) => void;
  onDelete?: (index: number) => void;
}

const ExperienceList = ({
  experience = [],
  onAdd,
  onEdit,
  onDelete,
}: ExperienceListProps) => {
  return (
    <SectionCard
      title="Work Experience"
      isCompleted={experience.length > 0}
      completionPercentage={experience.length > 0 ? 20 : 0}
      onAdd={onAdd}
    >
      {experience.length === 0 ? (
        <div className="text-muted-foreground py-6 text-center text-sm">
          No work experience added yet. Freshers can skip this or add
          internships.
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="bg-muted/10 flex flex-col justify-between gap-3 rounded-lg border p-3 sm:flex-row sm:items-start sm:gap-4 sm:p-4"
            >
              <div className="grid w-full grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                <div>
                  <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                    Designation
                  </div>
                  <div className="text-sm font-semibold sm:text-base">
                    {exp.jobTitle ?? exp.designation}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                    Company Name
                  </div>
                  <div className="text-sm font-semibold sm:text-base">
                    {exp.company}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                    Duration
                  </div>
                  <div className="text-sm font-semibold sm:text-base">
                    {exp.startDate
                      ? new Date(exp.startDate).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                        })
                      : "N/A"}{" "}
                    -{" "}
                    {exp.currentlyWorking || exp.current
                      ? "Present"
                      : exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                          })
                        : "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                    Employment Type
                  </div>
                  <div className="text-sm font-semibold sm:text-base">
                    {exp.employmentType || "Full-time"}
                  </div>
                </div>

                {exp.description && (
                  <div className="border-border/50 col-span-1 mt-1 border-t pt-2.5 sm:pt-3 md:col-span-2">
                    <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                      Key Achievements
                    </div>
                    <p className="text-foreground/90 text-xs leading-relaxed whitespace-pre-line sm:text-sm">
                      {exp.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex w-full shrink-0 justify-end gap-1.5 border-t pt-2.5 sm:w-auto sm:flex-col sm:border-t-0 sm:pt-0">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-7 w-7 rounded-full sm:h-8 sm:w-8"
                  onClick={() => onEdit?.(exp, index)}
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

export default ExperienceList;
