"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Link,
  Linkedin,
  Plus,
  Trash2,
  Twitter,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AddCompanySocialLink from "../AddCompanySocialLink";

interface SocialLink {
  id?: string;
  platform: string;
  url: string;
  icon?: React.ReactNode;
}

interface SocialLinkSettingTabProps {
  socialLinks?: Array<{ id?: string; platform: string; url: string }>;
  onSocialLinksChange?: (links: SocialLink[]) => void;
}

const SocialLinkSettingTab = ({
  socialLinks: initialSocialLinks = [],
  onSocialLinksChange,
}: SocialLinkSettingTabProps) => {
  const [isAddSocialOpen, setIsAddSocialOpen] = useState(false);

  const getIconForPlatform = (platform: string) => {
    const platformLower = platform.toLowerCase();
    if (platformLower.includes("linkedin"))
      return <Linkedin className="h-4 w-4" />;
    if (platformLower.includes("twitter") || platformLower.includes("x"))
      return <Twitter className="h-4 w-4" />;
    if (platformLower.includes("github")) return <Github className="h-4 w-4" />;
    if (platformLower.includes("facebook"))
      return <Facebook className="h-4 w-4" />;
    if (platformLower.includes("instagram"))
      return <Instagram className="h-4 w-4" />;
    if (platformLower.includes("website") || platformLower.includes("web"))
      return <Globe className="h-4 w-4" />;
    return <Link className="h-4 w-4" />;
  };

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    return initialSocialLinks.map((link) => ({
      ...link,
      icon: getIconForPlatform(link.platform),
    }));
  });

  // =========== create a stable dependency string based on actual data (without React elements) ======>
  const linksKey = useMemo(
    () =>
      initialSocialLinks
        .map((link) => `${link.id || ""}-${link.platform}-${link.url}`)
        .join(","),
    [initialSocialLinks],
  );

  // ======== update local state when props change ========>
  useEffect(() => {
    const mappedLinks = initialSocialLinks.map((link) => ({
      ...link,
      icon: getIconForPlatform(link.platform),
    }));
    setSocialLinks(mappedLinks);
  }, [linksKey, initialSocialLinks]);

  const availablePlatforms = [
    { name: "LinkedIn", icon: <Linkedin className="h-4 w-4" /> },
    { name: "Twitter", icon: <Twitter className="h-4 w-4" /> },
    { name: "GitHub", icon: <Github className="h-4 w-4" /> },
    { name: "Facebook", icon: <Facebook className="h-4 w-4" /> },
    { name: "Instagram", icon: <Instagram className="h-4 w-4" /> },
    { name: "Website", icon: <Globe className="h-4 w-4" /> },
  ];

  const addSocialLink = (platform: string, url: string) => {
    const platformData = availablePlatforms.find((p) => p.name === platform);
    if (platformData && url.trim()) {
      const newLink: SocialLink = {
        id: Date.now().toString(),
        platform,
        url: url.trim(),
        icon: platformData.icon,
      };
      const updatedLinks = [...socialLinks, newLink];
      setSocialLinks(updatedLinks);
      onSocialLinksChange?.(updatedLinks);
      setIsAddSocialOpen(false);
    }
  };

  const removeSocialLink = (id: string) => {
    const updatedLinks = socialLinks.filter((link) => link.id !== id);
    setSocialLinks(updatedLinks);
    onSocialLinksChange?.(updatedLinks);
  };

  const updateSocialLink = (id: string, url: string) => {
    const updatedLinks = socialLinks.map((link) =>
      link.id === id ? { ...link, url } : link,
    );
    setSocialLinks(updatedLinks);
    onSocialLinksChange?.(updatedLinks);
  };

  return (
    <TabsContent value="social" className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Link className="mr-2 h-5 w-5" />
                Social Media Links
              </CardTitle>
              <CardDescription>
                Add your {`company's`} social media profiles
              </CardDescription>
            </div>
            <Dialog open={isAddSocialOpen} onOpenChange={setIsAddSocialOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Link
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Social Media Link</DialogTitle>
                  <DialogDescription>
                    Add a new social media profile for your company
                  </DialogDescription>
                </DialogHeader>
                <AddCompanySocialLink
                  onAdd={addSocialLink}
                  availablePlatforms={availablePlatforms}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {socialLinks.map((link) => (
              <div
                key={link.id}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="flex items-center space-x-3">
                  {link.icon}
                  <span className="font-medium">{link.platform}</span>
                </div>
                <div className="flex-1">
                  <Input
                    value={link.url}
                    onChange={(e) =>
                      updateSocialLink(link.id || "", e.target.value)
                    }
                    placeholder={`Enter ${link.platform} URL`}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSocialLink(link.id || "")}
                  className="text-destructive hover:text-destructive w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {socialLinks.length === 0 && (
              <div className="py-8 text-center">
                <Link className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                <h3 className="text-foreground mb-2 text-lg font-medium">
                  No social links added
                </h3>
                <p className="text-muted-foreground">
                  Add your {`company's`} social media profiles to increase
                  visibility
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SocialLinkSettingTab;
