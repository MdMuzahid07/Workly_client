import { SectionCard } from "@/components/main/profile/SectionCard";
import { Button } from "@/components/ui/button";
import { Edit2, GraduationCap, Trash2 } from "lucide-react";

const EducationList = ({
  education = [],
  onAdd,
  onAddCertificate,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  education: any[];
  onAdd?: () => void;
  onAddCertificate?: () => void;
}) => {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Education"
        isCompleted={education.length > 0}
        completionPercentage={education.length > 0 ? 20 : 0}
        onAdd={onAdd}
      >
        {education.length === 0 ? (
          <div className="text-muted-foreground py-6 text-center">
            No education records added yet. Add your degrees to stand out.
          </div>
        ) : (
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-muted/10 flex items-start justify-between rounded-lg border p-4"
              >
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                      Level of Education
                    </div>
                    <div className="font-medium">{edu.level}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                      Exam/Degree Title
                    </div>
                    <div className="font-medium">{edu.degree}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                      Univeristy/Institute
                    </div>
                    <div className="font-medium">{edu.institute}</div>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                        Passing Year
                      </div>
                      <div className="font-medium">{edu.year}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                        Result
                      </div>
                      <div className="font-medium">{edu.result}</div>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary h-8 w-8"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-destructive h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Certifications & Licenses"
        isCompleted={false}
        onAdd={onAddCertificate}
      >
        <div className="space-y-4">
          {/* Mock Certificate */}
          <div className="bg-card flex items-start justify-between rounded-lg border p-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold">
                  AWS Certified Solutions Architect
                </h4>
                <p className="text-muted-foreground text-sm">
                  Amazon Web Services (AWS)
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Issued Jan 2025 · Expires Jan 2028
                </p>
              </div>
            </div>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default EducationList;
