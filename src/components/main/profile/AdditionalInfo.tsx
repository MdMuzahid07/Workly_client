/* eslint-disable @typescript-eslint/no-explicit-any */
import { SectionCard } from "@/components/main/profile/SectionCard";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Edit2, Trash2, UserCheck } from "lucide-react";

export const AdditionalInfo = ({
  awards = [],
  publications = [],
  references = [],
  onAddAward,
  onAddPublication,
  onAddReference,
  onEditAward,
  onDeleteAward,
  onEditPublication,
  onDeletePublication,
  onEditReference,
  onDeleteReference,
}: {
  awards?: any[];
  publications?: any[];
  references?: any[];
  onAddAward?: () => void;
  onAddPublication?: () => void;
  onAddReference?: () => void;
  onEditAward?: (award: any, index: number) => void;
  onDeleteAward?: (index: number) => void;
  onEditPublication?: (pub: any, index: number) => void;
  onDeletePublication?: (index: number) => void;
  onEditReference?: (ref: any, index: number) => void;
  onDeleteReference?: (index: number) => void;
}) => {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Honors & Awards"
        isCompleted={awards.length > 0}
        onAdd={onAddAward}
      >
        {awards.length > 0 ? (
          <div className="space-y-4">
            {awards.map((award, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 rounded-lg border bg-amber-50/50 p-4"
              >
                <div className="flex items-center gap-4">
                  <Award className="h-8 w-8 text-amber-500" />
                  <div>
                    <h4 className="font-medium">{award.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {award.issuer || award.organization}{" "}
                      {award.issueDate || award.date
                        ? `- ${new Date(award.issueDate || award.date).toLocaleDateString()}`
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary h-8 w-8"
                    onClick={() => onEditAward?.(award, index)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-destructive h-8 w-8"
                    onClick={() => onDeleteAward?.(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground py-4 text-center text-sm italic">
            Add honors and awards.
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Publications"
        isCompleted={publications.length > 0}
        onAdd={onAddPublication}
      >
        {publications.length > 0 ? (
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <BookOpen className="h-8 w-8 text-blue-500" />
                  <div>
                    <h4 className="font-medium">{pub.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {pub.publisher}{" "}
                      {pub.publishDate || pub.date
                        ? `· ${new Date(pub.publishDate || pub.date).toLocaleDateString()}`
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary h-8 w-8"
                    onClick={() => onEditPublication?.(pub, index)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-destructive h-8 w-8"
                    onClick={() => onDeletePublication?.(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground py-4 text-center text-sm italic">
            Add publications.
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="References"
        isCompleted={references.length > 0}
        onAdd={onAddReference}
      >
        {references.length > 0 ? (
          <div className="space-y-4">
            {references.map((ref, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-4 rounded-lg border p-4"
              >
                <div className="flex items-start gap-4">
                  <UserCheck className="mt-1 h-5 w-5 text-green-500" />
                  <div>
                    <h4 className="font-medium">{ref.name}</h4>
                    <p className="text-muted-foreground text-sm">
                      {ref.relationship}{" "}
                      {ref.company ? `at ${ref.company}` : ""}
                    </p>
                    {(ref.email || ref.phone) && (
                      <p className="text-muted-foreground mt-1 text-xs">
                        {ref.email} {ref.email && ref.phone ? "|" : ""}{" "}
                        {ref.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary h-8 w-8"
                    onClick={() => onEditReference?.(ref, index)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-destructive h-8 w-8"
                    onClick={() => onDeleteReference?.(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground py-4 text-center text-sm">
            <UserCheck className="mx-auto mb-2 h-5 w-5 opacity-30" />
            Add professional references available upon request.
          </div>
        )}
      </SectionCard>
    </div>
  );
};
