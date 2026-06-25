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
        <div className="text-muted-foreground py-6 text-center">
          Showcase your best work. Add projects with descriptions and links.
        </div>
      ) : (
        <div className="grid gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-card relative rounded-xl border p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="flex cursor-pointer items-center gap-2 text-lg font-semibold hover:underline">
                      {project.title}
                      <ExternalLink className="h-3.5 w-3.5 opacity-50" />
                    </h4>
                  </div>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies?.map((tech: string) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => onEdit?.(project, index)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive h-8 w-8"
                    onClick={() => onDelete?.(index)}
                  >
                    <Trash2 className="h-4 w-4" />
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
