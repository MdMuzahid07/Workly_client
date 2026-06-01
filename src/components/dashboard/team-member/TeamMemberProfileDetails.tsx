"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  Edit,
  FileText,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  MoreVertical,
  Phone,
  Target,
  UserX,
  X,
} from "lucide-react";
import { useMemo } from "react";

interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  companyId?: string;
  profile?: {
    bio?: string;
    location?: string;
    avatarUrl?: string;
    linkedInUrl?: string;
    websiteUrl?: string;
    skills: Array<{
      skillName: string;
      experienceYears: number;
    }>;
  };
  joinDate: string;
  lastLogin?: string;
  department?: string;
  employmentType?: string;
  salary?: string;
}

interface TeamMemberProfileSheetProps {
  teamMember: TeamMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ============= Helpers =============
function getStatusColor(isActive: boolean, isVerified: boolean) {
  if (!isActive) return "bg-gray-100 text-gray-800";
  if (!isVerified) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
}

function getInitials(name: string) {
  return name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function getStatusText(isActive: boolean, isVerified: boolean) {
  if (!isActive) return "INACTIVE";
  if (!isVerified) return "PENDING VERIFICATION";
  return "ACTIVE";
}

// ============= UI SubComponents =============
function IconInfoCard({
  label,
  value,
  Icon,
  truncate = false,
}: {
  label: string;
  value: string | number | undefined | null;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  truncate?: boolean;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
          <Icon className="text-muted-foreground h-4 w-4" />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-muted-foreground text-xs">{label}</p>
          <p
            className={
              truncate ? "truncate text-sm font-medium" : "text-sm font-medium"
            }
          >
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

const TeamMemberProfileDetails = ({
  teamMember,
  open,
  onOpenChange,
}: TeamMemberProfileSheetProps) => {
  const statusColor = useMemo(
    () => getStatusColor(teamMember.isActive, teamMember.isVerified),
    [teamMember.isActive, teamMember.isVerified],
  );
  const statusText = useMemo(
    () => getStatusText(teamMember.isActive, teamMember.isVerified),
    [teamMember.isActive, teamMember.isVerified],
  );
  const initials = useMemo(
    () => getInitials(teamMember.fullName),
    [teamMember.fullName],
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-0 sm:max-w-[600px] lg:max-w-[700px] [&>button]:hidden"
      >
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col">
            <SheetHeader className="bg-muted/30 border-b px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <Avatar className="border-primary/20 h-16 w-16 border-2">
                    <AvatarImage
                      src={teamMember.profile?.avatarUrl || "/placeholder.svg"}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <SheetTitle className="text-xl">
                        {teamMember.fullName}
                      </SheetTitle>
                      <Badge className={statusColor}>{statusText}</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-foreground flex items-center gap-2 text-sm font-medium">
                        <Briefcase className="h-4 w-4" />
                        {teamMember.role.replace("_", " ")}
                      </p>
                      <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                        {teamMember.profile?.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            {teamMember.profile.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5" />
                          {teamMember.department || "No department"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        View Documents
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <UserX className="mr-2 h-4 w-4" />
                        {teamMember.isActive ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetHeader>

            {/* Content */}
            <div className="flex-1 space-y-6 px-6 py-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <IconInfoCard
                  label="Email"
                  value={teamMember.email}
                  Icon={Mail}
                  truncate
                />

                {teamMember.phone && (
                  <IconInfoCard
                    label="Phone"
                    value={teamMember.phone}
                    Icon={Phone}
                  />
                )}

                <IconInfoCard
                  label="Role"
                  value={teamMember.role.replace("_", " ")}
                  Icon={Briefcase}
                />

                <IconInfoCard
                  label="Join Date"
                  value={teamMember.joinDate}
                  Icon={Calendar}
                />

                {teamMember.profile?.linkedInUrl && (
                  <IconInfoCard
                    label="LinkedIn"
                    value={teamMember.profile.linkedInUrl}
                    Icon={Linkedin}
                    truncate
                  />
                )}

                {teamMember.profile?.websiteUrl && (
                  <IconInfoCard
                    label="Website"
                    value={teamMember.profile.websiteUrl}
                    Icon={Globe}
                    truncate
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  className="bg-primary hover:bg-primary/90 flex-1"
                  size="lg"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button variant="outline" size="lg">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>

              <Separator />

              {/* Bio */}
              {teamMember.profile?.bio && (
                <>
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 font-semibold">
                      <FileText className="h-4 w-4" />
                      About
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                      {teamMember.profile.bio}
                    </p>
                  </div>
                  <Separator />
                </>
              )}

              {/* Skills */}
              {teamMember.profile?.skills &&
                teamMember.profile.skills.length > 0 && (
                  <>
                    <div className="space-y-3">
                      <h3 className="flex items-center gap-2 font-semibold">
                        <Target className="h-4 w-4" />
                        Skills & Expertise
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {teamMember.profile.skills.map((skill) => (
                          <Badge
                            key={skill.skillName}
                            variant="secondary"
                            className="px-3 py-1"
                          >
                            {skill.skillName} ({skill.experienceYears} yrs)
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

              {/* Activity Status */}
              <Card className="border-success/20 bg-success/5">
                <CardContent className="flex items-center gap-2 p-4">
                  <Clock className="text-success h-4 w-4" />
                  <span className="text-sm font-medium">
                    {teamMember.isActive ? "Active" : "Inactive"} since{" "}
                    {teamMember.joinDate}
                    {teamMember.lastLogin &&
                      ` • Last login: ${teamMember.lastLogin}`}
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default TeamMemberProfileDetails;
