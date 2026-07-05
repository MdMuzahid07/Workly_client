"use client";
import { SectionCard } from "@/components/main/profile/SectionCard";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Briefcase,
  Calendar,
  Facebook,
  Github,
  Globe,
  Info as InfoIcon,
  Instagram,
  Link as LinkIcon,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash2,
  Twitter,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useGetCategoriesQuery } from "../../../redux/feature/category/categoryApi";
import WKDatePicker from "../../form/WKDatePicker";
import WKInput from "../../form/WkInput";
import WKSelect from "../../form/WkSelect";
import { Button } from "../../ui/button";
import { CardDescription } from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import AddCompanySocialLink from "../company-settings/AddCompanySocialLink";

import type { CompanyProfile } from "@/types/company-profile";

const CompanyProfileDetailsTab = ({
  updateField,
  isEditing,
  editedProfile,
  currentProfile,
  socialLinks,
  onSocialLinksChange,
}: {
  updateField: (field: string, value: unknown) => void;
  isEditing: boolean;
  editedProfile: Partial<CompanyProfile>;
  currentProfile: CompanyProfile;
  socialLinks?: Array<{ id?: string; platform: string; url: string }>;
  onSocialLinksChange?: (
    links: Array<{ id?: string; platform: string; url: string }>,
  ) => void;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery(undefined);

  const getIndustryId = (industry: unknown): string => {
    if (!industry) return "";
    if (typeof industry === "object" && industry && "id" in industry)
      return (industry as { id: string }).id;
    if (typeof industry === "string") return industry;
    return "";
  };

  const methods = useForm({
    mode: "onChange",
    values: {
      ...editedProfile,
      industry: getIndustryId(editedProfile?.industry),
    },
  });

  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name && value[name as keyof typeof value] !== undefined) {
        updateField(name, value[name as keyof typeof value]);
      }
    });
    return () => subscription.unsubscribe();
  }, [methods, updateField]);

  const getIndustryDisplayName = (industry: unknown): string => {
    if (!industry) return "Not specified";
    if (typeof industry === "object" && industry && "name" in industry)
      return (industry as { name: string }).name;
    if (typeof industry === "string" && categories?.data) {
      const category = categories.data.find(
        (cat: { id: string; name: string }) => cat.id === industry,
      );
      return category?.name || industry;
    }
    return industry as string;
  };

  const formatDateDisplay = (date: string): string => {
    if (!date) return "Not specified";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return date;
    }
  };

  const industryOptions = useMemo(() => {
    if (!categories?.data) return [];
    return categories.data.map((category: { id: string; name: string }) => ({
      value: category.id,
      label: category.name,
    }));
  }, [categories]);

  const companySizeOptions = [
    { value: "1-10", label: "1-10 staff" },
    { value: "11-50", label: "11-50 staff" },
    { value: "51-200", label: "51-200 staff" },
    { value: "201-500", label: "201-500 staff" },
    { value: "501-1000", label: "501-1000 staff" },
    { value: "1000+", label: "1000+ staff" },
  ];

  return (
    <TabsContent value="details" className="space-y-10 focus:outline-none">
      <FormProvider {...methods}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Identity & Presence */}
          <SectionCard
            title="Identity & Presence"
            isCompleted={
              !!currentProfile.logoUrl && !!currentProfile.websiteUrl
            }
          >
            <div className="space-y-6">
              {isEditing ? (
                <WKInput
                  name="name"
                  label="Company Legal Name"
                  placeholder="Enter legal entity name"
                  required
                />
              ) : (
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs tracking-wider uppercase">
                    Company Name
                  </Label>
                  <p className="text-foreground text-lg font-semibold">
                    {currentProfile.name || "Not specified"}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {isEditing ? (
                  <WKInput
                    name="location"
                    label="Headquarters"
                    placeholder="City, Country"
                  />
                ) : (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs tracking-wider uppercase">
                      Location
                    </Label>
                    <div className="text-foreground flex items-center gap-2 font-medium">
                      <MapPin className="text-primary h-4 w-4" />
                      {currentProfile.location || "Not specified"}
                    </div>
                  </div>
                )}

                {isEditing ? (
                  <WKInput
                    name="websiteUrl"
                    label="Official Website"
                    placeholder="https://..."
                  />
                ) : (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs tracking-wider uppercase">
                      Website
                    </Label>
                    <div className="flex items-center gap-2">
                      <Globe className="text-primary h-4 w-4" />
                      {currentProfile.websiteUrl ? (
                        <a
                          href={currentProfile.websiteUrl}
                          target="_blank"
                          className="text-primary font-medium hover:underline"
                        >
                          {currentProfile.websiteUrl.replace(
                            /^https?:\/\//,
                            "",
                          )}
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-sm font-medium">
                          Not specified
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SectionCard>

          {/* Operational Details */}
          <SectionCard
            title="Operational Details"
            isCompleted={!!currentProfile.industry && !!currentProfile.size}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {isEditing ? (
                  <WKSelect
                    name="industry"
                    label="Industry Sector"
                    options={industryOptions}
                    required
                  />
                ) : (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs tracking-wider uppercase">
                      Industry
                    </Label>
                    <div className="text-foreground flex items-center gap-2 font-medium">
                      <Briefcase className="text-primary h-4 w-4" />
                      {getIndustryDisplayName(currentProfile.industry)}
                    </div>
                  </div>
                )}

                {isEditing ? (
                  <WKSelect
                    name="size"
                    label="Company Scale"
                    options={companySizeOptions}
                    required
                  />
                ) : (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs tracking-wider uppercase">
                      Scale
                    </Label>
                    <div className="text-foreground flex items-center gap-2 font-medium">
                      <Users className="text-primary h-4 w-4" />
                      {currentProfile.size || "Not specified"}
                    </div>
                  </div>
                )}
              </div>

              {isEditing ? (
                <WKDatePicker name="founded" label="Founding Date" required />
              ) : (
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs tracking-wider uppercase">
                    Founded
                  </Label>
                  <div className="text-foreground flex items-center gap-2 font-medium">
                    <Calendar className="text-primary h-4 w-4" />
                    {formatDateDisplay(currentProfile.founded)}
                  </div>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Public Contact Details */}
          <SectionCard
            title="Public Contact Details"
            isCompleted={!!currentProfile.contactEmail}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {isEditing ? (
                  <WKInput
                    name="contactEmail"
                    label="Business Email"
                    type="email"
                    required
                  />
                ) : (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs tracking-wider uppercase">
                      Email
                    </Label>
                    <div className="text-foreground flex items-center gap-2 font-medium">
                      <Mail className="text-primary h-4 w-4" />
                      {currentProfile.contactEmail || "Not specified"}
                    </div>
                  </div>
                )}

                {isEditing ? (
                  <WKInput name="contactPhone" label="Main Phone" />
                ) : (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs tracking-wider uppercase">
                      Phone
                    </Label>
                    <div className="text-foreground flex items-center gap-2 font-medium">
                      <Phone className="text-primary h-4 w-4" />
                      {currentProfile.contactPhone || "Not specified"}
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-primary/5 text-muted-foreground flex gap-3 rounded-xl p-4 text-sm">
                <InfoIcon className="text-primary h-5 w-5 shrink-0" />
                <p>
                  These contact details are **public** and will be visible on
                  your company profile for candidate inquiries.
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Social Presence */}
          <SectionCard
            title="Social Presence"
            isCompleted={socialLinks && socialLinks.length > 0}
          >
            {isEditing ? (
              <SocialLinksManager
                socialLinks={socialLinks || []}
                onSocialLinksChange={onSocialLinksChange}
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {socialLinks && socialLinks.length > 0 ? (
                  socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      className="bg-card hover:bg-muted/50 group flex items-center gap-3 rounded-xl border p-3 transition-colors"
                    >
                      <div className="bg-primary/10 group-hover:bg-primary/20 rounded-lg p-2 transition-colors">
                        {getSocialIcon(link.platform)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold capitalize">
                          {link.platform}
                        </span>
                        <span className="text-muted-foreground max-w-[150px] truncate text-xs">
                          {link.url.replace(/^https?:\/\//, "")}
                        </span>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-muted-foreground col-span-2 py-6 text-center text-sm font-medium italic">
                    No social profiles linked.
                  </div>
                )}
              </div>
            )}
          </SectionCard>
        </div>
      </FormProvider>
    </TabsContent>
  );
};

const getSocialIcon = (platform: string): React.ReactNode => {
  const p = platform.toLowerCase();
  if (p.includes("linkedin")) return <Linkedin className="h-4 w-4" />;
  if (p.includes("twitter") || p.includes("x"))
    return <Twitter className="h-4 w-4" />;
  if (p.includes("github")) return <Github className="h-4 w-4" />;
  if (p.includes("facebook")) return <Facebook className="h-4 w-4" />;
  if (p.includes("instagram")) return <Instagram className="h-4 w-4" />;
  return <LinkIcon className="h-4 w-4" />;
};

const SocialLinksManager = ({
  socialLinks: initialSocialLinks = [],
  onSocialLinksChange,
}: {
  socialLinks: Array<{ id?: string; platform: string; url: string }>;
  onSocialLinksChange?: (
    links: Array<{ id?: string; platform: string; url: string }>,
  ) => void;
}) => {
  const [isAddSocialOpen, setIsAddSocialOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);

  useEffect(() => {
    setSocialLinks(initialSocialLinks);
  }, [initialSocialLinks]);

  const removeSocialLink = (id: string) => {
    const updated = socialLinks.filter((l) => l.id !== id);
    setSocialLinks(updated);
    onSocialLinksChange?.(updated);
  };

  const updateSocialLink = (id: string, url: string) => {
    const updated = socialLinks.map((l) => (l.id === id ? { ...l, url } : l));
    setSocialLinks(updated);
    onSocialLinksChange?.(updated);
  };

  const addSocialLink = (platform: string, url: string) => {
    const newLink = { id: Date.now().toString(), platform, url };
    const updated = [...socialLinks, newLink];
    setSocialLinks(updated);
    onSocialLinksChange?.(updated);
    setIsAddSocialOpen(false);
  };

  const availablePlatforms = [
    { name: "LinkedIn", icon: <Linkedin className="h-4 w-4" /> },
    { name: "Twitter", icon: <Twitter className="h-4 w-4" /> },
    { name: "GitHub", icon: <Github className="h-4 w-4" /> },
    { name: "Facebook", icon: <Facebook className="h-4 w-4" /> },
    { name: "Instagram", icon: <Instagram className="h-4 w-4" /> },
    { name: "Website", icon: <Globe className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6 pt-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardDescription>
          Add social media profiles to increase brand visibility.
        </CardDescription>
        <Dialog open={isAddSocialOpen} onOpenChange={setIsAddSocialOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="gap-2">
              <Plus className="h-4 w-4" /> Add Link
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Social Link</DialogTitle>
            </DialogHeader>
            <AddCompanySocialLink
              onAdd={addSocialLink}
              availablePlatforms={availablePlatforms}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {socialLinks.map((link) => (
          <div
            key={link.id}
            className="bg-muted/30 flex items-center gap-4 rounded-xl border border-dashed p-3"
          >
            <div className="bg-primary/10 rounded-lg p-2">
              {getSocialIcon(link.platform)}
            </div>
            <div className="flex-1">
              <Input
                value={link.url}
                onChange={(e) => updateSocialLink(link.id!, e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeSocialLink(link.id!)}
              className="text-destructive h-9 w-9 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyProfileDetailsTab;
