/* eslint-disable @typescript-eslint/no-explicit-any */
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Link as LinkIcon,
  Linkedin,
  Plus,
  Trash2,
  Twitter,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useGetCategoriesQuery } from "../../../redux/feature/category/categoryApi";
import WKDatePicker from "../../form/WKDatePicker";
import WKInput from "../../form/WkInput";
import WKSelect from "../../form/WkSelect";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import AddCompanySocialLink from "../company-settings/AddCompanySocialLink";

const CompanyProfileDetailsTab = ({
  updateField,
  isEditing,
  editedProfile,
  currentProfile,
  socialLinks,
  onSocialLinksChange,
}: {
  updateField: any;
  isEditing: boolean;
  editedProfile: any;
  currentProfile: any;
  socialLinks?: Array<{ id?: string; platform: string; url: string }>;
  onSocialLinksChange?: (
    links: Array<{ id?: string; platform: string; url: string }>,
  ) => void;
}) => {
  // ======= fetch categories/industries from API ====>
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery(undefined);

  //  ====== extract industry ID for form (handles both object and string formats) ====>
  const getIndustryId = (industry: any): string => {
    if (!industry) return "";
    if (typeof industry === "object" && industry.id) return industry.id;
    if (typeof industry === "string") return industry;
    return "";
  };

  // ======== initialize form with proper industry ID ===>
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      ...editedProfile,
      industry: getIndustryId(editedProfile.industry),
    },
  });

  // ======== sync form values when editedProfile changes ====>
  useEffect(() => {
    methods.reset({
      ...editedProfile,
      industry: getIndustryId(editedProfile.industry),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedProfile]);

  // ===== watch form changes and sync with parent =====>
  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name && value[name] !== undefined) {
        updateField(name, value[name]);
      }
    });
    return () => subscription.unsubscribe();
  }, [methods, updateField]);

  // ====== get industry display name for view mode ====>
  const getIndustryDisplayName = (industry: any): string => {
    if (!industry) return "Not specified";
    if (typeof industry === "object" && industry.name) return industry.name;
    if (typeof industry === "string" && categories?.data) {
      const category = categories.data.find((cat: any) => cat.id === industry);
      return category?.name || industry;
    }
    return industry;
  };

  // ====== format date for display ===>
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

  // ===== create options for industry select ====>
  const industryOptions = useMemo(() => {
    if (!categories?.data) return [];
    return categories.data.map((category: any) => ({
      value: category.id,
      label: category.name,
    }));
  }, [categories]);

  // ===== create options for company size select ======>
  const companySizeOptions = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201-500", label: "201-500 employees" },
    { value: "501-1000", label: "501-1000 employees" },
    { value: "1000+", label: "1000+ employees" },
  ];

  return (
    <TabsContent value="details" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Basic details about your company</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormProvider {...methods}>
            {/* company name & industry */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                {isEditing ? (
                  <WKInput
                    name="name"
                    label="Company Name"
                    placeholder="Enter company name"
                    required
                  />
                ) : (
                  <>
                    <Label>Company Name</Label>
                    <p className="text-muted-foreground text-sm">
                      {currentProfile.name || "Not specified"}
                    </p>
                  </>
                )}
              </div>

              <div className="space-y-2">
                {isEditing ? (
                  <WKSelect
                    name="industry"
                    label="Industry"
                    placeholder={
                      categoriesLoading
                        ? "Loading industries..."
                        : "Select industry"
                    }
                    options={industryOptions}
                    disabled={categoriesLoading}
                    required
                  />
                ) : (
                  <>
                    <Label>Industry</Label>
                    <p className="text-muted-foreground text-sm">
                      {getIndustryDisplayName(currentProfile.industry)}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* company size & founded */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                {isEditing ? (
                  <WKSelect
                    name="size"
                    label="Company Size"
                    placeholder="Select company size"
                    options={companySizeOptions}
                    required
                  />
                ) : (
                  <>
                    <Label>Company Size</Label>
                    <p className="text-muted-foreground text-sm">
                      {currentProfile.size
                        ? `${currentProfile.size} employees`
                        : "Not specified"}
                    </p>
                  </>
                )}
              </div>

              <div className="space-y-2">
                {isEditing ? (
                  <WKDatePicker name="founded" label="Founded" required />
                ) : (
                  <>
                    <Label>Founded</Label>
                    <p className="text-muted-foreground text-sm">
                      {formatDateDisplay(currentProfile.founded)}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* location & website */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                {isEditing ? (
                  <WKInput
                    name="location"
                    label="Location"
                    placeholder="e.g., Dhaka, Bangladesh"
                  />
                ) : (
                  <>
                    <Label>Location</Label>
                    <p className="text-muted-foreground text-sm">
                      {currentProfile.location || "Not specified"}
                    </p>
                  </>
                )}
              </div>

              <div className="space-y-2">
                {isEditing ? (
                  <WKInput
                    name="websiteUrl"
                    label="Website"
                    type="text"
                    placeholder="https://example.com"
                  />
                ) : (
                  <>
                    <Label>Website</Label>
                    {currentProfile.websiteUrl ? (
                      <a
                        href={currentProfile.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline"
                      >
                        {currentProfile.websiteUrl}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        Not specified
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* contact email & phone */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                {isEditing ? (
                  <WKInput
                    name="contactEmail"
                    label="Contact Email"
                    type="email"
                    placeholder="contact@company.com"
                    required
                  />
                ) : (
                  <>
                    <Label>Contact Email</Label>
                    <p className="text-muted-foreground text-sm">
                      {currentProfile.contactEmail || "Not specified"}
                    </p>
                  </>
                )}
              </div>

              <div className="space-y-2">
                {isEditing ? (
                  <WKInput
                    name="contactPhone"
                    label="Contact Phone"
                    type="text"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                ) : (
                  <>
                    <Label>Contact Phone</Label>
                    <p className="text-muted-foreground text-sm">
                      {currentProfile.contactPhone || "Not specified"}
                    </p>
                  </>
                )}
              </div>
            </div>
          </FormProvider>
        </CardContent>
      </Card>

      {isEditing && (
        <SocialLinksManager
          socialLinks={socialLinks || []}
          onSocialLinksChange={onSocialLinksChange}
        />
      )}
    </TabsContent>
  );
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

  const getIconForPlatform = (platform: string): React.ReactNode => {
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
    return <LinkIcon className="h-4 w-4" />;
  };

  const [socialLinks, setSocialLinks] = useState<
    Array<{
      id?: string;
      platform: string;
      url: string;
      icon?: React.ReactNode;
    }>
  >(() => {
    return initialSocialLinks.map((link) => ({
      ...link,
      icon: getIconForPlatform(link.platform),
    }));
  });

  // ===== create unique key for dependency tracking =====>
  const linksKey = useMemo(
    () =>
      initialSocialLinks
        .map((link) => `${link.id || ""}-${link.platform}-${link.url}`)
        .join(","),
    [initialSocialLinks],
  );

  // ===== sync with parent when initialSocialLinks changes =====>
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
      const newLink = {
        id: Date.now().toString(),
        platform,
        url: url.trim(),
        icon: platformData.icon,
      };
      const updatedLinks = [...socialLinks, newLink];
      setSocialLinks(updatedLinks);
      // ===== remove icon before sending to parent ======>
      onSocialLinksChange?.(
        updatedLinks.map(({ id, platform, url }) => ({ id, platform, url })),
      );
      setIsAddSocialOpen(false);
    }
  };

  const removeSocialLink = (id: string) => {
    const updatedLinks = socialLinks.filter((link) => link.id !== id);
    setSocialLinks(updatedLinks);
    onSocialLinksChange?.(
      updatedLinks.map(({ id, platform, url }) => ({ id, platform, url })),
    );
  };

  const updateSocialLink = (id: string, url: string) => {
    const updatedLinks = socialLinks.map((link) =>
      link.id === id ? { ...link, url } : link,
    );
    setSocialLinks(updatedLinks);
    onSocialLinksChange?.(
      updatedLinks.map(({ id, platform, url }) => ({ id, platform, url })),
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center">
              <LinkIcon className="mr-2 h-5 w-5" />
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
            <DialogContent className="bg-card mx-4 max-w-md">
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
          {socialLinks?.map((link) => (
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
                  className="h-10"
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
              <LinkIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
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
  );
};

export default CompanyProfileDetailsTab;
