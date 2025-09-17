import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@react-three/drei";

interface Skill {
  skillName: string;
  experienceYears: number;
}

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsAndExpertise = ({ skills }: SkillsSectionProps) => {
  const getSkillLevel = (years: number) => {
    if (years >= 5)
      return { level: "Expert", color: "bg-primary", progress: 100 };
    if (years >= 3)
      return { level: "Advanced", color: "bg-chart-2", progress: 80 };
    if (years >= 1)
      return { level: "Intermediate", color: "bg-chart-3", progress: 60 };
    return { level: "Beginner", color: "bg-muted-foreground", progress: 30 };
  };

  return (
    <Card className="border-0 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">
          Skills & Expertise
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {skills.map((skill, index) => {
            const skillInfo = getSkillLevel(skill.experienceYears);
            return (
              <div key={index} className="bg-muted/40 space-y-3 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-foreground text-sm font-medium sm:text-base">
                      {skill.skillName}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-primary text-primary-foreground border-primary text-xs"
                    >
                      {skill.experienceYears}y
                    </Badge>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-muted text-muted-foreground text-xs"
                  >
                    {skillInfo.level}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Progress
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    value={skillInfo.progress}
                    className="bg-muted h-2"
                  />
                  <div className="text-muted-foreground flex justify-between text-xs">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsAndExpertise;
