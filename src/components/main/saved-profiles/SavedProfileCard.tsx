/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import {
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  FileText,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Trash2,
  User,
  Github,
  Twitter,
  Facebook,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const availabilityLabels: any = {
  immediate: "Immediate",
  "2_weeks": "2 Weeks",
  "1_month": "1 Month",
  not_available: "Not Available",
};

const availabilityColors: any = {
  immediate: "bg-success/10 text-success border-success/20",
  "2_weeks": "bg-primary/10 text-primary border-primary/20",
  "1_month": "bg-warning/10 text-warning border-warning/20",
  not_available: "bg-muted text-muted-foreground border-border",
};

const SavedProfileCard = ({
  profile: rawProfile,
  index,
  onRemove,
  onShortlist,
}: {
  profile: any;
  index: number;
  onRemove?: () => void;
  onShortlist?: () => void;
}) => {
  // Map real user data to the expected profile structure
  const profile = {
    id: rawProfile.id,
    candidateName: rawProfile.fullName,
    candidateAvatar: rawProfile.profile?.avatarUrl,
    currentPosition: rawProfile.profile?.headline || "Professional Candidate",
    location: rawProfile.profile?.location || "Not Specified",
    experience: `${rawProfile.profile?.totalExperienceYears || 0} Years`,
    savedDate: rawProfile.savedAt || new Date().toISOString(),
    email: rawProfile.email,
    phone: rawProfile.profile?.phone,
    skills: rawProfile.profile?.skills || [],
    education: rawProfile.profile?.education?.[0]
      ? `${rawProfile.profile.education[0].degree} - ${rawProfile.profile.education[0].institution}`
      : "Not Specified",
    summary: rawProfile.profile?.bio || "No biography provided.",
    resumeUrl: rawProfile.profile?.resumeUrl,
    videoResumeUrl: rawProfile.profile?.videoResumeUrl,
    linkedinUrl: rawProfile.profile?.linkedInUrl,
    portfolioUrl: rawProfile.profile?.websiteUrl,
    githubUrl: rawProfile.profile?.githubUrl,
    twitterUrl: rawProfile.profile?.twitterUrl,
    facebookUrl: rawProfile.profile?.facebookUrl,
    availability:
      (rawProfile.profile?.preference?.availability?.toLowerCase() as any) ||
      "immediate",
    salaryExpectation: rawProfile.profile?.preference?.expectedSalary
      ? {
          min: rawProfile.profile.preference.expectedSalary,
          max: rawProfile.profile.preference.expectedSalary, // Single value for now
          currency: "$",
        }
      : undefined,
    tags: rawProfile.profile?.preference?.tags || [],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="group relative overflow-hidden border transition-all duration-300">
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="bg-muted/30 relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border">
                {profile.candidateAvatar ? (
                  <Image
                    src={profile.candidateAvatar}
                    alt={profile.candidateName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <User className="text-muted-foreground h-8 w-8" />
                  </div>
                )}
              </div>

              {/* Name and Position */}
              <div className="flex-1">
                <h3 className="line-clamp-1 text-lg font-bold tracking-tight">
                  {profile.candidateName}
                </h3>
                <p className="text-muted-foreground mt-1 text-sm font-medium">
                  {profile.currentPosition}
                </p>
                <div className="text-muted-foreground/70 mt-2 flex flex-wrap items-center gap-3 text-xs font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {profile.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    {profile.experience}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-muted h-8 w-8 rounded-full"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                <DropdownMenuItem
                  onClick={onShortlist}
                  className="h-10 cursor-pointer rounded-lg font-medium"
                >
                  <BookmarkCheck className="mr-2 h-4 w-4" />
                  Move to Shortlist
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onRemove}
                  className="text-destructive focus:text-destructive h-10 cursor-pointer rounded-lg font-medium"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Summary */}
          <div className="mt-4">
            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed font-medium opacity-80">
              {profile.summary}
            </p>
          </div>

          {/* Skills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.skills.slice(0, 5).map((skill: any) => (
              <Badge
                key={skill.id}
                variant="secondary"
                className="bg-primary/10 text-primary rounded-lg border-none px-2.5 py-1 text-xs font-bold"
              >
                {skill.skillName}
              </Badge>
            ))}
            {profile.skills.length > 5 && (
              <Badge
                variant="outline"
                className="rounded-lg px-2.5 py-1 text-xs font-bold"
              >
                +{profile.skills.length - 5} more
              </Badge>
            )}
          </div>

          {/* Tags */}
          {profile.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.tags.map((tag: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-muted/50 text-muted-foreground rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="border-border/40 my-6 border-t" />

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                Education
              </span>
              <p className="line-clamp-1 text-xs font-bold">
                {profile.education}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                Availability
              </span>
              <Badge
                className={`w-fit rounded-lg border px-2 py-0.5 text-[10px] font-black tracking-widest uppercase ${availabilityColors[profile.availability]}`}
              >
                {availabilityLabels[profile.availability]}
              </Badge>
            </div>
          </div>

          {/* Salary Expectation */}
          {profile.salaryExpectation && (
            <div className="mt-4">
              <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                Salary Expectation
              </span>
              <p className="text-primary mt-1 text-sm font-bold">
                {profile.salaryExpectation.currency}
                {profile.salaryExpectation.min.toLocaleString()} -{" "}
                {profile.salaryExpectation.currency}
                {profile.salaryExpectation.max.toLocaleString()}
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="border-border/40 my-6 border-t" />

          {/* Contact & Links */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Email */}
              <a
                href={`mailto:${profile.email}`}
                className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-xs font-medium transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Email</span>
              </a>

              {/* Phone */}
              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-xs font-medium transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Call</span>
                </a>
              )}

              {/* LinkedIn */}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-xs font-medium transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
              )}

              {/* GitHub */}
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-xs font-medium transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              )}

              {/* Portfolio */}
              {profile.portfolioUrl && (
                <a
                  href={profile.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-xs font-medium transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Portfolio</span>
                </a>
              )}

              {/* Twitter */}
              {profile.twitterUrl && (
                <a
                  href={profile.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-xs font-medium transition-colors"
                >
                  <Twitter className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Twitter</span>
                </a>
              )}

              {/* Facebook */}
              {profile.facebookUrl && (
                <a
                  href={profile.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-xs font-medium transition-colors"
                >
                  <Facebook className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Facebook</span>
                </a>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {profile.resumeUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 rounded-full px-4 text-xs font-bold"
                  onClick={() => window.open(profile.resumeUrl, "_blank")}
                >
                  <FileText className="mr-1.5 h-3.5 w-3.5" />
                  View Resume
                </Button>
              )}
              <Link href={`/browse-candidates/${profile.id}`}>
                <Button
                  size="sm"
                  className="h-9 rounded-full px-4 text-xs font-bold shadow-sm"
                >
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                  View Full Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Saved Date Footer */}
          <div className="border-border/40 mt-6 border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground/70 flex items-center gap-1.5 text-[11px] font-medium">
                <Bookmark className="h-3.5 w-3.5" />
                Saved on {new Date(profile.savedDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SavedProfileCard;
