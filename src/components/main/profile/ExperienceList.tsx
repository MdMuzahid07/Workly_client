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
        <div className="text-muted-foreground py-6 text-center">
          No work experience added yet. Freshers can skip this or add
          internships.
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="bg-muted/10 relative rounded-lg border p-4"
            >
              <div className="grid w-full grid-cols-1 gap-4 pr-10 md:grid-cols-2">
                <div>
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Designation
                  </div>
                  <div className="font-medium">
                    {exp.jobTitle ?? exp.designation}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Company Name
                  </div>
                  <div className="font-medium">{exp.company}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Duration
                  </div>
                  <div className="font-medium">
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
                  <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Employment Type
                  </div>
                  <div className="font-medium">
                    {exp.employmentType || "Full-time"}
                  </div>
                </div>
              </div>

              {exp.description && (
                <div className="border-border/50 mt-4 border-t pt-4">
                  <div className="text-muted-foreground mb-2 text-xs tracking-wider uppercase">
                    Key Achievements
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              )}

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:text-primary h-8 w-8"
                  onClick={() => onEdit?.(exp, index)}
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

export default ExperienceList;
