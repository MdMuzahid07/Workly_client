import { SectionCard } from "@/components/main/profile/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, ExternalLink, Trash2 } from "lucide-react";
import type { Project } from "@/types/profile";

interface ProjectListProps {
  projects?: Project[];
  onAdd?: () => void;
  onEdit?: (project: Project, index: number) => void;
  onDelete?: (index: number) => void;
}

export const ProjectList = ({
  projects = [],
  onAdd,
  onEdit,
  onDelete,
}: ProjectListProps) => {
  return (
    <SectionCard
      title="Projects & Case Studies"
      isCompleted={projects.length > 0}
      completionPercentage={projects.length > 0 ? 15 : 0}
      onAdd={onAdd}
    >
      {projects.length === 0 ? (
        <div className="text-muted-foreground py-6 text-center text-sm">
          Showcase your best work. Add projects with descriptions and links.
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl border p-3 sm:p-4"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start sm:gap-4">
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="flex cursor-pointer items-center gap-1.5 truncate text-sm font-semibold hover:underline sm:text-base md:text-lg">
                      {project.title}
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-50" />
                    </h4>
                  </div>
                  <p className="text-muted-foreground line-clamp-2 text-xs sm:text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies?.map((tech: string) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="px-2 py-0.5 text-[10px] font-normal sm:text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 justify-end gap-1.5 border-t pt-2.5 sm:border-t-0 sm:pt-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-7 w-7 rounded-full sm:h-8 sm:w-8"
                    onClick={() => onEdit?.(project, index)}
                  >
                    <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10 h-7 w-7 rounded-full sm:h-8 sm:w-8"
                    onClick={() => onDelete?.(index)}
                  >
                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
};
