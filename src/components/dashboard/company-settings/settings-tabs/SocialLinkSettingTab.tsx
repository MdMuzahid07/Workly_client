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
import { useState } from "react";
import AddCompanySocialLink from "../AddCompanySocialLink";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: React.ReactNode;
}

const SocialLinkSettingTab = () => {
  const [isAddSocialOpen, setIsAddSocialOpen] = useState(false);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      id: "1",
      platform: "LinkedIn",
      url: "https://linkedin.com/company/techflow",
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      id: "2",
      platform: "Twitter",
      url: "https://twitter.com/techflow",
      icon: <Twitter className="h-4 w-4" />,
    },
    {
      id: "3",
      platform: "GitHub",
      url: "https://github.com/techflow",
      icon: <Github className="h-4 w-4" />,
    },
  ]);

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
      setSocialLinks((prev) => [...prev, newLink]);
      setIsAddSocialOpen(false);
    }
  };

  const removeSocialLink = (id: string) => {
    setSocialLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const updateSocialLink = (id: string, url: string) => {
    setSocialLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, url } : link)),
    );
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
              <DialogContent className="mx-4 max-w-md">
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
                    onChange={(e) => updateSocialLink(link.id, e.target.value)}
                    placeholder={`Enter ${link.platform} URL`}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSocialLink(link.id)}
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
