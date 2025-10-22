"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Briefcase, Download, Edit3, Mail, MapPin, Star } from "lucide-react";
import { useState } from "react";
import EditProfileDialog from "../../components/main/profile/EditProfileDialog";
import JobPreference from "../../components/main/profile/JobPreference";
import ProfileSidebar from "../../components/main/profile/ProfileSidebar";
import SkillsAndExpertise from "../../components/main/profile/SkillsAndExpertise";
import { useGetProfileQuery } from "../../redux/feature/profile/profileApi";

// fake user data based on your schema

const fakeUser = {
  id: "1",
  email: "john.doe@example.com",
  fullName: "John Doe",
  phone: "+1 (555) 123-4567",
  role: "JOB_SEEKER",
  isVerified: true,
  profile: {
    bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. I love working with modern technologies and solving complex problems.",
    location: "San Francisco, CA",
    avatarUrl: "/cat-profile.png", // Changed to cat image
    coverUrl: "/tech-workspace-background.jpg",
    resumeUrl: "/resume.pdf",
    linkedInUrl: "https://linkedin.com/in/johndoe",
    websiteUrl: "https://johndoe.dev",
    skills: [
      { skillName: "React", experienceYears: 4 },
      { skillName: "Node.js", experienceYears: 5 },
      { skillName: "TypeScript", experienceYears: 3 },
      { skillName: "PostgreSQL", experienceYears: 4 },
      { skillName: "AWS", experienceYears: 2 },
      { skillName: "Docker", experienceYears: 3 },
    ],
    preference: {
      jobType: "FULL_TIME",
      expectedSalary: 120000,
      preferredLocation: "San Francisco, CA",
      remoteWork: true,
      industry: "Technology",
      workExperience: "Senior Level",
    },
  },
};

const ProfileView = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, error } = useGetProfileQuery(undefined);
  const [user, setUser] = useState(data?.data || fakeUser);

  console.log(
    data,
    "data from my profile ++++++++++++++++++++++++++++++++++++++++++++++++",
  );

  return (
    <div className="bg-primary/2 min-h-screen">
      <div className="mx-auto max-w-6xl py-6 md:pt-24">
        <div className="mb-8 lg:hidden">
          <Card className="from-card to-muted/30 border-0">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Avatar className="ring-primary/20 h-24 w-24 ring-4">
                  <AvatarImage
                    src={user?.profile?.avatarUrl || "/placeholder.svg"}
                    alt={user?.fullName}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary rounded-full text-xl font-semibold">
                    🐱
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <h1 className="text-foreground text-2xl font-bold">
                    {user?.fullName}
                  </h1>
                  {user?.isVerified && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      <Star className="mr-1 h-3 w-3 fill-current" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="text-muted-foreground space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <MapPin className="text-primary mr-2 h-4 w-4" />
                    {user?.profile?.location}
                  </div>
                  <div className="flex items-center justify-center">
                    <Mail className="text-primary mr-2 h-4 w-4" />
                    {user?.email}
                  </div>
                </div>

                <div className="flex w-full max-w-sm space-x-3">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <ProfileSidebar user={user} setIsEditModalOpen={setIsEditModalOpen} />

          <div className="space-y-6 lg:col-span-8">
            <SkillsAndExpertise skills={user?.profile?.skills} />
            <JobPreference preferences={user?.profile?.preference} />

            <Card className="bg-card border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Briefcase className="text-primary mr-3 h-6 w-6" />
                  Career Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <div className="from-primary/10 to-primary/5 border-primary/20 rounded-xl border p-6 text-center">
                    <div className="text-primary mb-2 text-3xl font-bold">
                      12
                    </div>
                    <div className="text-muted-foreground text-sm font-medium">
                      Applications
                    </div>
                  </div>
                  <div className="from-chart-2/10 to-chart-2/5 border-chart-2/20 rounded-xl border p-6 text-center">
                    <div className="text-chart-2 mb-2 text-3xl font-bold">
                      5
                    </div>
                    <div className="text-muted-foreground text-sm font-medium">
                      Interviews
                    </div>
                  </div>
                  <div className="from-chart-3/10 to-chart-3/5 border-chart-3/20 rounded-xl border p-6 text-center">
                    <div className="text-chart-3 mb-2 text-3xl font-bold">
                      23
                    </div>
                    <div className="text-muted-foreground text-sm font-medium">
                      Saved Jobs
                    </div>
                  </div>
                  <div className="from-chart-4/10 to-chart-4/5 border-chart-4/20 rounded-xl border p-6 text-center">
                    <div className="text-chart-4 mb-2 text-3xl font-bold">
                      156
                    </div>
                    <div className="text-muted-foreground text-sm font-medium">
                      Profile Views
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <EditProfileDialog
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        onSave={setUser}
      />
    </div>
  );
};

export default ProfileView;
