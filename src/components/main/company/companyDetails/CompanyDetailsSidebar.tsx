/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExternalLink,
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import {
  useFollowCompanyMutation,
  useIsFollowingQuery,
  useUnfollowCompanyMutation,
} from "@/redux/feature/follow/followApi";
import { toast } from "sonner";

const CompanyDetailsSidebar = ({ company }: { company: any }) => {
  const { data: followStatus, isLoading: isStatusLoading } =
    useIsFollowingQuery(company.id);
  const [followCompany, { isLoading: isFollowingMutation }] =
    useFollowCompanyMutation();
  const [unfollowCompany, { isLoading: isUnfollowingMutation }] =
    useUnfollowCompanyMutation();

  const isFollowing = followStatus?.data;

  const handleToggleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowCompany(company.id).unwrap();
        toast.success(`Unfollowed ${company.name}`);
      } else {
        await followCompany(company.id).unwrap();
        toast.success(`Following ${company.name}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-primary/5 border">
        <CardContent className="p-6">
          <Button
            disabled={
              isStatusLoading || isFollowingMutation || isUnfollowingMutation
            }
            onClick={handleToggleFollow}
            className="bg-primary hover:bg-primary mb-3 w-full text-white"
          >
            {isFollowingMutation || isUnfollowingMutation ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isFollowing ? "Unfollow Company" : "Follow Company"}
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            View All Jobs
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border">
        <CardHeader>
          <CardTitle>Company Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-secondary-foreground">Employees</span>
            <span className="font-medium">
              {company?._count?.employees || 0}
            </span>
          </div>
          <div className="bg-border/20 h-px w-full" />
          <div className="flex items-center justify-between">
            <span className="text-secondary-foreground">Open Jobs</span>
            <span className="font-medium">{company?._count?.jobs || 0}</span>
          </div>
          <div className="bg-border/20 h-px w-full" />
          <div className="flex items-center justify-between">
            <span className="text-secondary-foreground">Founded</span>
            <span className="font-medium">
              {company?.founded || "Not specified"}
            </span>
          </div>
          <div className="bg-border/20 h-px w-full" />
          <div className="flex items-center justify-between">
            <span className="text-secondary-foreground">Company Size</span>
            <span className="font-medium">
              {company?.size || "Not specified"}
            </span>
          </div>
        </CardContent>
      </Card>

      {(company?.contactEmail || company?.contactPhone) && (
        <Card className="bg-primary/5 border">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {company?.contactEmail && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                  <Mail className="text-primary h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                    Email
                  </span>
                  <a
                    href={`mailto:${company.contactEmail}`}
                    className="text-foreground hover:text-primary text-sm font-medium transition-colors"
                  >
                    {company.contactEmail}
                  </a>
                </div>
              </div>
            )}
            {company?.contactPhone && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                  <Phone className="text-primary h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                    Phone
                  </span>
                  <a
                    href={`tel:${company.contactPhone}`}
                    className="text-foreground hover:text-primary text-sm font-medium transition-colors"
                  >
                    {company.contactPhone}
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="bg-primary/5 border">
        <CardHeader>
          <CardTitle>Connect With Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {company?.socialLinks?.length > 0 ? (
            company.socialLinks.map((link: any) => {
              const platformMetaData: Record<
                string,
                { icon: any; color: string }
              > = {
                linkedin: { icon: Linkedin, color: "bg-[#0A66C2]" },
                twitter: { icon: Twitter, color: "bg-[#1DA1F2]" },
                github: { icon: Github, color: "bg-[#333]" },
                facebook: { icon: Facebook, color: "bg-[#1877F2]" },
                instagram: { icon: Instagram, color: "bg-[#E4405F]" },
                website: { icon: Globe, color: "bg-primary" },
              };

              const meta = platformMetaData[link.platform.toLowerCase()] || {
                icon: ExternalLink,
                color: "bg-gray-600",
              };
              const Icon = meta.icon;

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-primary/2 border-primary/10 flex items-center gap-3 rounded-lg border p-3 transition-colors"
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded ${meta.color}`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-secondary-foreground font-medium capitalize">
                    {link.platform}
                  </span>
                  <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
                </a>
              );
            })
          ) : (
            <p className="text-muted-foreground text-center text-sm italic">
              No social links provided.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Similar Companies */}
      <Card className="bg-primary/5 border">
        <CardHeader>
          <CardTitle>Similar Companies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-primary/10 rounded-xl border p-3">
            <div className="mb-2 flex items-center gap-3">
              <Image
                width={100}
                height={100}
                src="/abstract-tech-logo.png"
                alt="Company logo"
                className="h-8 w-8 rounded"
              />
              <div>
                <h4 className="text-sm font-medium">InnovateCorp</h4>
                <p className="text-secondary-foreground text-xs">
                  SaaS • New York
                </p>
              </div>
            </div>
            <p className="text-xs font-medium text-green-600">15 open jobs</p>
          </div>

          <div className="border-primary/10 rounded-xl border p-3">
            <div className="mb-2 flex items-center gap-3">
              <Image
                width={100}
                height={100}
                src="/cloud-company-logo.png"
                alt="Company logo"
                className="h-8 w-8 rounded"
              />
              <div>
                <h4 className="text-sm font-medium">CloudTech Solutions</h4>
                <p className="text-secondary-foreground text-xs">
                  Cloud • Seattle
                </p>
              </div>
            </div>
            <p className="text-xs font-medium text-green-600">22 open jobs</p>
          </div>

          <div className="border-primary/10 rounded-xl border p-3">
            <div className="mb-2 flex items-center gap-3">
              <Image
                width={100}
                height={100}
                src="/data-company-logo.png"
                alt="Company logo"
                className="h-8 w-8 rounded"
              />
              <div>
                <h4 className="text-sm font-medium">DataVision Labs</h4>
                <p className="text-secondary-foreground text-xs">
                  Analytics • Remote
                </p>
              </div>
            </div>
            <p className="text-xs font-medium text-green-600">8 open jobs</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetailsSidebar;
