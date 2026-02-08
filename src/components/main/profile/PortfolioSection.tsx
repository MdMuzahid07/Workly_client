import { SectionCard } from "@/components/main/profile/SectionCard";
import { Button } from "@/components/ui/button";
import { FileText, Github, Globe, Linkedin, Upload, Video } from "lucide-react";

export const PortfolioSection = ({
  resumeUrl,
  videoResumeUrl,
  socialLinks = {},
  onAddResume,
  onAddVideoResume,
  onEditSocials,
}: {
  resumeUrl?: string;
  videoResumeUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socialLinks?: any;
  onAddResume?: () => void;
  onAddVideoResume?: () => void;
  onEditSocials?: () => void;
}) => {
  return (
    <div className="space-y-6">
      {/* Resume & CV */}
      <SectionCard
        title="Resume / CV"
        isCompleted={!!resumeUrl}
        completionPercentage={!!resumeUrl ? 10 : 0}
        onAdd={onAddResume}
        className="overflow-hidden"
      >
        <div className="flex flex-col items-center gap-6 p-2 sm:flex-row">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
            <FileText className="h-10 w-10" />
          </div>
          <div className="flex-1 space-y-1 text-center sm:text-left">
            <h4 className="font-medium">Upload your Resume</h4>
            <p className="text-muted-foreground text-sm">
              Supported formats: PDF, DOCX (Max 5MB)
            </p>
            {resumeUrl && (
              <p className="text-sm font-medium text-emerald-600">
                Current: resume.pdf
              </p>
            )}
          </div>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            {resumeUrl ? "Update Resume" : "Upload Resume"}
          </Button>
        </div>
      </SectionCard>

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
