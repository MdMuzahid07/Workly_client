"use client";

import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Github, Globe, Linkedin, Twitter } from "lucide-react";
import { SocialLinksFormData, socialLinksSchema } from "./profile.validation";

interface SocialLinksFormProps {
  onSubmit: (data: SocialLinksFormData) => void;
  onCancel: () => void;
  defaultValues?: Partial<SocialLinksFormData>;
  isLoading?: boolean;
}

export const SocialLinksForm = ({
  onSubmit,
  onCancel,
  defaultValues,
  isLoading,
}: SocialLinksFormProps) => {
  return (
    <WkForm<SocialLinksFormData>
      onSubmit={onSubmit}
      defaultValues={defaultValues as unknown as SocialLinksFormData}
      resolver={zodResolver(socialLinksSchema)}
    >
      <div className="space-y-4">
        <WKInput
          name="linkedin"
          label="LinkedIn Profile"
          placeholder="https://linkedin.com/in/username"
          labelIcon={<Linkedin className="h-4 w-4 text-blue-600" />}
        />
        <WKInput
          name="github"
          label="GitHub Profile"
          placeholder="https://github.com/username"
          labelIcon={<Github className="h-4 w-4" />}
        />
        <WKInput
          name="website"
          label="Portfolio Website"
          placeholder="https://yourwebsite.com"
          labelIcon={<Globe className="h-4 w-4 text-emerald-600" />}
        />
        <WKInput
          name="twitter"
          label="Twitter / X Profile"
          placeholder="https://twitter.com/username"
          labelIcon={<Twitter className="h-4 w-4 text-sky-500" />}
        />
        <WKInput
          name="facebook"
          label="Facebook Profile"
          placeholder="https://facebook.com/username"
          labelIcon={<Facebook className="h-4 w-4 text-blue-700" />}
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Links"}
        </Button>
      </div>
    </WkForm>
  );
};
