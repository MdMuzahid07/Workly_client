/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  Share2,
  Shield,
  User,
  Globe,
  Award,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  useGetCandidateByIdQuery,
  useToggleSaveCandidateMutation,
} from "../../redux/feature/candidate/candidateApi";
import JobDetailsSkeleton from "../../skeleton/job/JobDetailsSkeleton";

const CandidateDetailsView = () => {
  const params = useParams();
  const candidateId = params.id as string;

  const {
    data: response,
    isLoading,
    error,
  } = useGetCandidateByIdQuery(candidateId, {
    skip: !candidateId,
  });

  const [toggleSaveCandidate, { isLoading: isSaving }] =
    useToggleSaveCandidateMutation();

  const handleSave = async () => {
    try {
      toast.loading("Updating candidate status...", { id: "save_candidate" });
      const res = await toggleSaveCandidate(candidateId).unwrap();
      if (res.success) {
        toast.success(res.message, { id: "save_candidate" });
      }
    } catch (err) {
      toast.error("Failed to update status", { id: "save_candidate" });
      console.error(err);
    }
  };

  if (isLoading) return <JobDetailsSkeleton />;

  if (error || !response?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-destructive text-lg font-bold">
          Candidate not found or error loading profile.
        </div>
      </div>
    );
  }

  const candidate = response.data;
  const profile = candidate.profile || {};

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Dynamic Banner Section */}
      <div className="relative h-64 w-full overflow-hidden lg:h-80">
        <Image
          src={
            profile.coverUrl ||
            "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1440&q=40"
          }
          alt="Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="from-background via-background/20 absolute inset-0 bg-linear-to-t to-transparent" />
      </div>

      <div className="relative mx-auto -mt-32 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Premium Header Card */}
            <Card className="border-primary/10 bg-background/60 overflow-hidden border backdrop-blur-xl">
              <CardHeader className="p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="bg-card border-primary/10 relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white shadow-2xl md:h-32 md:w-32 dark:border-slate-800">
                      {profile.avatarUrl ? (
                        <Image
                          src={profile.avatarUrl}
                          alt={candidate.fullName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <User className="text-primary/40 h-12 w-12" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-primary/10 text-primary border-none">
                          {profile.preference?.jobType?.replace(/_/g, " ") ||
                            "Full Time"}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-secondary/50 border-none"
                        >
                          {profile.totalExperienceYears || 0} Years Exp
                        </Badge>
                      </div>
                      <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
                        {candidate.fullName}
                      </h1>
                      <p className="text-muted-foreground text-lg font-medium">
                        {profile.headline || "Professional Candidate"}
                      </p>
                      <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{profile.location || "Location not set"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Member since{" "}
                            {new Date(candidate.createdAt).getFullYear()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl border-gray-200"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      <Heart
                        className={`h-5 w-5 ${candidate.isSaved ? "fill-rose-500 text-rose-500" : "text-gray-400"}`}
                      />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl border-gray-200"
                    >
                      <Share2 className="h-5 w-5 text-gray-400" />
                    </Button>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button className="btn-green-primary rounded-full px-8 font-bold shadow-lg">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    className="btn-green-outline rounded-full px-8 font-bold"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    View Resume
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* About / Bio */}
            <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="text-primary h-5 w-5" />
                  Professional Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                  {profile.bio || "No biography provided."}
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="text-primary h-5 w-5" />
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {profile.skills.map((skill: any) => (
                      <div
                        key={skill.id}
                        className="bg-primary/5 border-primary/10 flex items-center gap-2 rounded-xl border px-4 py-2"
                      >
                        <span className="text-foreground font-semibold">
                          {skill.skillName}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {skill.experienceYears}y
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Work Experience */}
            {profile.workExperiences && profile.workExperiences.length > 0 && (
              <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="text-primary h-5 w-5" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profile.workExperiences.map((exp: any, index: number) => (
                    <div key={exp.id} className="relative pl-8">
                      {index !== profile.workExperiences.length - 1 && (
                        <div className="bg-primary/10 absolute top-8 left-[11px] h-full w-[2px]" />
                      )}
                      <div className="bg-primary/5 border-primary/20 absolute top-1 left-0 h-6 w-6 rounded-full border-2" />
                      <div className="space-y-1">
                        <h4 className="text-foreground text-lg font-bold">
                          {exp.jobTitle}
                        </h4>
                        <p className="text-primary font-medium">
                          {exp.company}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {new Date(exp.startDate).toLocaleDateString()} -{" "}
                          {exp.current
                            ? "Present"
                            : new Date(exp.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-foreground/70 mt-2 text-sm">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {profile.education && profile.education.length > 0 && (
              <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="text-primary h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profile.education.map((edu: any) => (
                    <div key={edu.id} className="flex gap-4">
                      <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                        <GraduationCap className="text-primary h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-foreground text-lg font-bold">
                          {edu.degree}
                        </h4>
                        <p className="text-foreground/80 font-medium">
                          {edu.institution}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {edu.startDate
                            ? new Date(edu.startDate).getFullYear()
                            : ""}{" "}
                          -{" "}
                          {edu.endDate
                            ? new Date(edu.endDate).getFullYear()
                            : "Present"}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base tracking-wider uppercase">
                  Candidate Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expected Salary</span>
                  <span className="text-foreground font-bold">
                    ${profile.preference?.expectedSalary || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-foreground font-bold">
                    {profile.location || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="text-foreground font-bold">
                    {profile.totalExperienceYears || 0} Years
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Industry</span>
                  <span className="text-foreground font-bold">
                    {profile.preference?.industry || "General"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-background/50 border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base tracking-wider uppercase">
                  Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.linkedInUrl && (
                  <a
                    href={profile.linkedInUrl}
                    target="_blank"
                    className="bg-primary/5 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-all"
                  >
                    <Globe className="text-primary h-5 w-5" />
                    <span className="text-sm font-medium">
                      LinkedIn Profile
                    </span>
                  </a>
                )}
                {profile.websiteUrl && (
                  <a
                    href={profile.websiteUrl}
                    target="_blank"
                    className="bg-primary/5 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-all"
                  >
                    <Globe className="text-primary h-5 w-5" />
                    <span className="text-sm font-medium">
                      Personal Website
                    </span>
                  </a>
                )}
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card overflow-hidden shadow-lg">
              <div className="space-y-4 p-6 text-center">
                <Award className="text-primary mx-auto h-12 w-12 opacity-20" />
                <h3 className="text-lg font-bold">Workly Verified</h3>
                <p className="text-muted-foreground text-xs">
                  This candidate has a verified profile and is actively looking
                  for new opportunities.
                </p>
                <Button className="btn-green-primary w-full rounded-full font-bold">
                  Contact Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsView;
