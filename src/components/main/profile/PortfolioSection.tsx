import { SectionCard } from "@/components/main/profile/SectionCard";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Github,
  Globe,
  Linkedin,
  Twitter,
  Upload,
  Video,
} from "lucide-react";
import type { ProfileSocialLinks } from "@/types/profile";

interface PortfolioSectionProps {
  videoResumeUrl?: string;
  socialLinks?: ProfileSocialLinks;
  onAddVideoResume?: () => void;
  onEditSocials?: () => void;
}

export const PortfolioSection = ({
  videoResumeUrl,
  socialLinks = {},
  onAddVideoResume,
  onEditSocials,
}: PortfolioSectionProps) => {
  const hasSocialLinks = Object.values(socialLinks).some((val) => !!val);

  return (
    <div className="space-y-6">
      {/* Video Resume */}
      <SectionCard
        title="Video Resume"
        isCompleted={!!videoResumeUrl}
        completionPercentage={!!videoResumeUrl ? 5 : 0}
        onAdd={!videoResumeUrl ? onAddVideoResume : undefined}
      >
        {videoResumeUrl ? (
          <div className="flex flex-col gap-4 p-2">
            <div className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-xl border bg-black">
              <video
                src={videoResumeUrl}
                controls
                className="h-full w-full object-contain"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={onAddVideoResume}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Change Video
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 p-2 sm:flex-row">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Video className="h-10 w-10" />
            </div>
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <h4 className="font-medium">Add a Video Introduction</h4>
              <p className="text-muted-foreground text-sm">
                Record up to a 120-second video about yourself. (Premium
                feature)
              </p>
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={onAddVideoResume}
            >
              <Upload className="h-4 w-4" />
              Add Video
            </Button>
          </div>
        )}
      </SectionCard>

      {/* Social Profiles */}
      <SectionCard
        title="Online Presence"
        isCompleted={hasSocialLinks}
        completionPercentage={10}
        onEdit={onEditSocials}
      >
        {!hasSocialLinks ? (
          <div className="text-muted-foreground p-2 text-sm">
            No professional links added yet. Click edit to add your social
            profiles.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {socialLinks?.linkedin && (
              <div className="flex items-center gap-3 rounded-md border p-3">
                <Linkedin className="h-5 w-5 text-blue-600" />
                <div className="flex-1 overflow-hidden">
                  <div className="text-muted-foreground text-xs font-medium">
                    LinkedIn
                  </div>
                  <div className="truncate text-sm font-medium">
                    {socialLinks.linkedin}
                  </div>
                </div>
              </div>
            )}
            {socialLinks?.github && (
              <div className="flex items-center gap-3 rounded-md border p-3">
                <Github className="text-foreground h-5 w-5" />
                <div className="flex-1 overflow-hidden">
                  <div className="text-muted-foreground text-xs font-medium">
                    GitHub
                  </div>
                  <div className="truncate text-sm font-medium">
                    {socialLinks.github}
                  </div>
                </div>
              </div>
            )}
            {socialLinks?.website && (
              <div className="flex items-center gap-3 rounded-md border p-3">
                <Globe className="h-5 w-5 text-emerald-600" />
                <div className="flex-1 overflow-hidden">
                  <div className="text-muted-foreground text-xs font-medium">
                    Portfolio Website
                  </div>
                  <div className="truncate text-sm font-medium">
                    {socialLinks.website}
                  </div>
                </div>
              </div>
            )}
            {socialLinks?.twitter && (
              <div className="flex items-center gap-3 rounded-md border p-3">
                <Twitter className="h-5 w-5 text-sky-500" />
                <div className="flex-1 overflow-hidden">
                  <div className="text-muted-foreground text-xs font-medium">
                    Twitter / X
                  </div>
                  <div className="truncate text-sm font-medium">
                    {socialLinks.twitter}
                  </div>
                </div>
              </div>
            )}
            {socialLinks?.facebook && (
              <div className="flex items-center gap-3 rounded-md border p-3">
                <Facebook className="h-5 w-5 text-blue-700" />
                <div className="flex-1 overflow-hidden">
                  <div className="text-muted-foreground text-xs font-medium">
                    Facebook
                  </div>
                  <div className="truncate text-sm font-medium">
                    {socialLinks.facebook}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </SectionCard>
    </div>
  );
};
