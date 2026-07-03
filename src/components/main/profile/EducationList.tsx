import { SectionCard } from "@/components/main/profile/SectionCard";
import { Button } from "@/components/ui/button";
import { Edit2, GraduationCap, Trash2 } from "lucide-react";
import type { Certification, Education } from "@/types/profile";

interface EducationListProps {
  education?: Education[];
  certifications?: Certification[];
  onAdd?: () => void;
  onAddCertificate?: () => void;
  onEditEdu?: (edu: Education, index: number) => void;
  onDeleteEdu?: (index: number) => void;
  onEditCert?: (cert: Certification, index: number) => void;
  onDeleteCert?: (index: number) => void;
}

const EducationList = ({
  education = [],
  certifications = [],
  onAdd,
  onAddCertificate,
  onEditEdu,
  onDeleteEdu,
  onEditCert,
  onDeleteCert,
}: EducationListProps) => {
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
          <div className="space-y-3 sm:space-y-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-muted/10 flex flex-col justify-between gap-3 rounded-lg border p-3 sm:flex-row sm:items-start sm:gap-4 sm:p-4"
              >
                <div className="grid w-full grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                      Level of Education
                    </div>
                    <div className="text-sm font-semibold sm:text-base">
                      {edu.level}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                      Exam/Degree Title
                    </div>
                    <div className="text-sm font-semibold sm:text-base">
                      {edu.degree}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                      Univeristy/Institute
                    </div>
                    <div className="text-sm font-semibold sm:text-base">
                      {edu.institute ?? edu.institution}
                    </div>
                  </div>
                  <div className="flex gap-6 sm:gap-8">
                    <div>
                      <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                        Passing Year
                      </div>
                      <div className="text-sm font-semibold sm:text-base">
                        {edu.year}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1 text-[10px] tracking-wider uppercase sm:text-xs">
                        Result
                      </div>
                      <div className="text-sm font-semibold sm:text-base">
                        {edu.result}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full shrink-0 justify-end gap-1.5 border-t pt-2.5 sm:w-auto sm:flex-col sm:border-t-0 sm:pt-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-7 w-7 rounded-full sm:h-8 sm:w-8"
                    onClick={() => onEditEdu?.(edu, index)}
                  >
                    <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-7 w-7 rounded-full sm:h-8 sm:w-8"
                    onClick={() => onDeleteEdu?.(index)}
                  >
                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Certifications & Licenses"
        isCompleted={certifications.length > 0}
        completionPercentage={certifications.length > 0 ? 10 : 0}
        onAdd={onAddCertificate}
      >
        {certifications.length === 0 ? (
          <div className="text-muted-foreground py-6 text-center text-sm">
            No certifications added yet. Highlight your skills with
            certifications.
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-card flex flex-col justify-between gap-3 rounded-lg border p-3 sm:flex-row sm:items-start sm:gap-4 sm:p-4"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 sm:h-10 sm:w-10">
                    <GraduationCap className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold sm:text-base">
                      {cert.name}
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {cert.issuingOrg ?? cert.organization}
                    </p>
                    <p className="text-muted-foreground mt-1 text-[10px] sm:text-xs">
                      {cert.issueDate
                        ? `Issued ${new Date(cert.issueDate).toLocaleDateString(undefined, { year: "numeric", month: "short" })}`
                        : ""}
                      {(cert.expiryDate ?? cert.expirationDate)
                        ? ` · Expires ${new Date((cert.expiryDate ?? cert.expirationDate)!).toLocaleDateString(undefined, { year: "numeric", month: "short" })}`
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="flex w-full shrink-0 justify-end gap-1.5 border-t pt-2.5 sm:w-auto sm:flex-col sm:border-t-0 sm:pt-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-7 w-7 rounded-full sm:h-8 sm:w-8"
                    onClick={() => onEditCert?.(cert, index)}
                  >
                    <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-7 w-7 rounded-full sm:h-8 sm:w-8"
                    onClick={() => onDeleteCert?.(index)}
                  >
                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default EducationList;
