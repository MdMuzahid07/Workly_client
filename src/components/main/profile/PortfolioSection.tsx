import { SectionCard } from "@/components/main/profile/SectionCard";
import { Button } from "@/components/ui/button";
import { Github, Globe, Linkedin, Upload, Video } from "lucide-react";

export const PortfolioSection = ({
  videoResumeUrl,
  socialLinks = {},
  onAddVideoResume,
  onEditSocials,
}: {
  videoResumeUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socialLinks?: any;
  onAddVideoResume?: () => void;
  onEditSocials?: () => void;
}) => {
  return (
    <div className="space-y-6">
      {/* Video Resume */}
      <SectionCard
        title="Video Resume"
        isCompleted={!!videoResumeUrl}
        completionPercentage={!!videoResumeUrl ? 5 : 0}
        onAdd={onAddVideoResume}
      >
        <div className="flex flex-col items-center gap-6 p-2 sm:flex-row">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <Video className="h-10 w-10" />
          </div>
          <div className="flex-1 space-y-1 text-center sm:text-left">
            <h4 className="font-medium">Add a Video Introduction</h4>
            <p className="text-muted-foreground text-sm">
              Record a 60-second video about yourself. (Emerging trend in 2026)
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Add Video
          </Button>
        </div>
      </SectionCard>

      {/* Social Profiles */}
      <SectionCard
        title="Online Presence"
        isCompleted={Object.keys(socialLinks).length > 0}
        completionPercentage={10}
        onEdit={onEditSocials}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-md border p-3">
            <Linkedin className="h-5 w-5 text-blue-600" />
            <div className="flex-1 overflow-hidden">
              <div className="text-muted-foreground text-xs font-medium">
                LinkedIn
              </div>
              <div className="truncate text-sm font-medium">
                {socialLinks?.linkedin || "Not connected"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md border p-3">
            <Github className="text-foreground h-5 w-5" />
            <div className="flex-1 overflow-hidden">
              <div className="text-muted-foreground text-xs font-medium">
                GitHub
              </div>
              <div className="truncate text-sm font-medium">
                {socialLinks?.github || "Not connected"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md border p-3">
            <Globe className="h-5 w-5 text-emerald-600" />
            <div className="flex-1 overflow-hidden">
              <div className="text-muted-foreground text-xs font-medium">
                Portfolio Website
              </div>
              <div className="truncate text-sm font-medium">
                {socialLinks?.website || "Not connected"}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};
