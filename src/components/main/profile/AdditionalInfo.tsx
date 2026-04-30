/* eslint-disable @typescript-eslint/no-explicit-any */
import { SectionCard } from "@/components/main/profile/SectionCard";
import { Award, BookOpen, UserCheck } from "lucide-react";

export const AdditionalInfo = ({
  awards = [],
  publications = [],
  references = [],
  onAddAward,
  onAddPublication,
  onAddReference,
}: {
  awards?: any[];
  publications?: any[];
  references?: any[];
  onAddAward?: () => void;
  onAddPublication?: () => void;
  onAddReference?: () => void;
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
                className="flex items-center gap-4 rounded-lg border bg-amber-50/50 p-4"
              >
                <Award className="h-8 w-8 text-amber-500" />
                <div>
                  <h4 className="font-medium">{award.title}</h4>
                  <p className="text-muted-foreground text-sm">
                    {award.issuer}{" "}
                    {award.issueDate
                      ? `- ${new Date(award.issueDate).toLocaleDateString()}`
                      : ""}
                  </p>
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
                className="flex items-center gap-4 rounded-lg border p-4"
              >
                <BookOpen className="h-8 w-8 text-blue-500" />
                <div>
                  <h4 className="font-medium">{pub.title}</h4>
                  <p className="text-muted-foreground text-sm">
                    {pub.publisher}{" "}
                    {pub.publishDate
                      ? `· ${new Date(pub.publishDate).toLocaleDateString()}`
                      : ""}
                  </p>
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
                className="flex items-start gap-4 rounded-lg border p-4"
              >
                <UserCheck className="mt-1 h-5 w-5 text-green-500" />
                <div>
                  <h4 className="font-medium">{ref.name}</h4>
                  <p className="text-muted-foreground text-sm">
                    {ref.relationship} {ref.company ? `at ${ref.company}` : ""}
                  </p>
                  {(ref.email || ref.phone) && (
                    <p className="text-muted-foreground mt-1 text-xs">
                      {ref.email} {ref.email && ref.phone ? "|" : ""}{" "}
                      {ref.phone}
                    </p>
                  )}
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
