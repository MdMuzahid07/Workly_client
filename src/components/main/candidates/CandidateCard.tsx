import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Heart, MapPin, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useToggleSaveCandidateMutation } from "../../../redux/feature/candidate/candidateApi";
import HoverHint from "../../shared/HoverHint";
import { useAppSelector } from "../../../redux/hooks";
import { Badge } from "../../ui/badge";

interface CandidateProps {
  candidate: {
    id: string;
    fullName: string;
    profile: {
      headline?: string;
      location?: string;
      avatarUrl?: string;
      totalExperienceYears?: number;
      skills: Array<{ id: string; skillName: string }>;
      preference?: {
        jobType?: string;
      };
    };
    isSaved?: boolean;
  };
  viewType?: "grid" | "list";
}

const CandidateCard = ({ candidate, viewType = "list" }: CandidateProps) => {
  const [toggleSaveCandidate, { isLoading: isSaving }] =
    useToggleSaveCandidateMutation();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const isEmployer =
    currentUser?.role === "EMPLOYER" ||
    currentUser?.role === "ADMIN" ||
    currentUser?.role === "SUPER_ADMIN";

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      toast.loading("Updating candidate status...", { id: "save_candidate" });
      const response = await toggleSaveCandidate(candidate.id).unwrap();
      if (response.success) {
        toast.success(response.message, { id: "save_candidate" });
      }
    } catch (err) {
      toast.error("Failed to update candidate status", {
        id: "save_candidate",
      });
      console.error("Failed to save/unsave candidate:", err);
    }
  };

  if (viewType === "grid") {
    return (
      <Card className="group hover:border-primary/50 relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50">
        <CardContent className="flex flex-1 flex-col p-0">
          <div className="mb-4 flex items-start justify-between">
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-gray-50 p-0 dark:bg-slate-800">
              {candidate.profile?.avatarUrl ? (
                <Image
                  src={candidate.profile.avatarUrl}
                  alt={candidate.fullName}
                  className="h-full w-full object-cover"
                  width={64}
                  height={64}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="text-primary/40 h-8 w-8" />
                </div>
              )}
            </div>
            {isEmployer && (
              <HoverHint
                hint={candidate.isSaved ? "Unsave Profile" : "Save Profile"}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-full transition-colors ${
                    candidate.isSaved
                      ? "bg-red-50 text-red-500 hover:bg-red-100"
                      : "hover:bg-primary/10 hover:text-primary text-slate-400"
                  }`}
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Heart
                    className={`h-4.5 w-4.5 ${candidate.isSaved ? "fill-current" : ""}`}
                  />
                </Button>
              </HoverHint>
            )}
          </div>

          <div className="mb-1">
            <Link
              href={`/browse-candidates/${candidate.id}`}
              className="hover:text-primary transition-colors"
            >
              <h3 className="text-foreground line-clamp-1 text-base font-bold">
                {candidate.fullName}
              </h3>
            </Link>
          </div>

          <p className="text-muted-foreground mb-3 line-clamp-1 text-xs font-medium">
            {candidate.profile?.headline || "No headline provided"}
          </p>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {candidate.profile?.totalExperienceYears !== undefined && (
              <Badge
                variant="default"
                className="bg-primary/10 text-primary rounded-md border-0 py-0 text-[9px] font-bold tracking-wider uppercase"
              >
                {candidate.profile.totalExperienceYears} Yrs Exp
              </Badge>
            )}
            {candidate.profile?.preference?.jobType && (
              <Badge
                variant="secondary"
                className="rounded-md border-0 bg-slate-100 py-0 text-[9px] font-bold tracking-wider text-slate-600 uppercase dark:bg-slate-800 dark:text-slate-300"
              >
                {candidate.profile.preference.jobType.replace("_", " ")}
              </Badge>
            )}
          </div>

          <div className="mb-4 flex flex-col gap-2 border-b border-gray-100 pb-4 dark:border-slate-800">
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <MapPin className="text-primary h-3.5 w-3.5 opacity-70" />
              <span className="truncate">
                {candidate.profile?.location || "Not specified"}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {candidate.profile?.skills?.slice(0, 3).map((skill) => (
                <span
                  key={skill.id}
                  className="bg-secondary/50 text-secondary-foreground rounded px-1.5 py-0.5 text-[10px]"
                >
                  {skill.skillName}
                </span>
              ))}
              {candidate.profile?.skills?.length > 3 && (
                <span className="text-muted-foreground text-[10px]">
                  +{candidate.profile.skills.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <Link href={`/browse-candidates/${candidate.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="btn-green-outline w-full rounded-full text-xs font-bold"
              >
                View Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:border-primary/50 relative overflow-hidden rounded-3xl border border-gray-100 bg-white px-3 py-5 transition-all duration-300 hover:shadow-lg md:px-8 md:py-8 dark:border-slate-800 dark:bg-slate-900/50">
      <CardContent className="p-0">
        <div className="flex flex-row gap-2 sm:items-center sm:gap-6">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-gray-50 p-0 sm:h-20 sm:w-20 dark:bg-slate-800">
            {candidate.profile?.avatarUrl ? (
              <Image
                src={candidate.profile.avatarUrl}
                alt={candidate.fullName}
                className="h-full w-full object-cover"
                width={80}
                height={80}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User className="text-primary/40 h-10 w-10" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-1 sm:gap-2">
              <Link
                href={`/browse-candidates/${candidate.id}`}
                className="hover:text-primary transition-colors"
              >
                <h3 className="text-foreground truncate text-sm font-bold sm:text-xl">
                  {candidate.fullName}
                </h3>
              </Link>
              {candidate.profile?.totalExperienceYears &&
                candidate.profile.totalExperienceYears > 5 && (
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                )}
            </div>

            <p className="text-muted-foreground mb-2 line-clamp-1 text-xs sm:text-sm">
              {candidate.profile?.headline || "No headline provided"}
            </p>

            <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <MapPin className="text-primary h-3.5 w-3.5 opacity-70" />
                <span>{candidate.profile?.location || "Not specified"}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Briefcase className="text-primary h-3.5 w-3.5 opacity-70" />
                <span>
                  {candidate.profile?.totalExperienceYears || 0} Years
                  Experience
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1 sm:gap-2">
              {candidate.profile?.skills?.slice(0, 5).map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="rounded-md border-0 bg-slate-100 py-0 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {skill.skillName}
                </Badge>
              ))}
              {candidate.profile?.skills?.length > 5 && (
                <span className="text-muted-foreground text-[10px]">
                  +{candidate.profile.skills.length - 5} more
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 sm:gap-4 sm:text-right">
            {isEmployer && (
              <HoverHint
                hint={candidate.isSaved ? "Unsave Profile" : "Save Profile"}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-10 w-10 rounded-full transition-colors ${
                    candidate.isSaved
                      ? "bg-red-50 text-red-500 hover:bg-red-100"
                      : "hover:bg-primary/10 hover:text-primary text-slate-400"
                  }`}
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Heart
                    className={`h-6 w-6 ${candidate.isSaved ? "fill-current" : ""}`}
                  />
                </Button>
              </HoverHint>
            )}

            <Link href={`/browse-candidates/${candidate.id}`}>
              <Button className="btn-green-primary rounded-full px-6 text-sm font-bold shadow-md">
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
