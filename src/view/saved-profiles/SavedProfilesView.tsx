"use client";

import DashboardEmployerSavedProfilesHeader from "@/components/dashboard/dashboard-nav/header/DashboardEmployerSavedProfilesHeader";
import SavedProfileCard from "@/components/main/saved-profiles/SavedProfileCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockSavedProfiles } from "@/data/mockSavedProfiles";
import { AnimatePresence } from "framer-motion";
import { Bookmark, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const SavedProfilesView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const availabilityOptions = [
    "all",
    "immediate",
    "2_weeks",
    "1_month",
    "not_available",
  ];

  const filteredProfiles = useMemo(() => {
    return mockSavedProfiles.filter((profile) => {
      const matchesSearch =
        profile.candidateName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        profile.currentPosition
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        profile.skills.some((skill) =>
          skill.skillName.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesAvailability =
        availabilityFilter === "all" ||
        profile.availability === availabilityFilter;

      return matchesSearch && matchesAvailability;
    });
  }, [searchTerm, availabilityFilter]);

  return (
    <div className="min-h-screen pt-16">
      <DashboardEmployerSavedProfilesHeader />

      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs font-medium">
                    Total Saved
                  </p>
                  <p className="text-2xl font-bold">
                    {mockSavedProfiles.length}
                  </p>
                </div>
                <div className="bg-primary/10 text-primary rounded-full p-3">
                  <Bookmark className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs font-medium">
                    Immediate Available
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      mockSavedProfiles.filter(
                        (p) => p.availability === "immediate",
                      ).length
                    }
                  </p>
                </div>
                <div className="bg-success/10 text-success rounded-full p-3">
                  <Bookmark className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs font-medium">
                    Filtered Results
                  </p>
                  <p className="text-2xl font-bold">
                    {filteredProfiles.length}
                  </p>
                </div>
                <div className="bg-accent/10 text-accent rounded-full p-3">
                  <Search className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <Card className="bg-card rounded-xl border">
          <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
              {/* Search Input */}
              <div className="group relative max-w-md flex-1">
                <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
                <Input
                  placeholder="Search by name, position, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-muted/20 border-border focus:bg-background h-11 rounded-full pl-9 transition-all"
                />
              </div>

              {/* Availability Filter */}
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground/60 text-[10px] font-black tracking-widest whitespace-nowrap uppercase">
                  Availability:
                </span>
                <Select
                  value={availabilityFilter}
                  onValueChange={setAvailabilityFilter}
                >
                  <SelectTrigger className="bg-muted/20 border-border h-10 w-48 cursor-pointer rounded-full font-bold">
                    <SelectValue placeholder="All Candidates" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {availabilityOptions.map((option) => (
                      <SelectItem
                        key={option}
                        className="cursor-pointer rounded-lg font-medium"
                        value={option}
                      >
                        {option === "all"
                          ? "All Candidates"
                          : option === "immediate"
                            ? "Immediate"
                            : option === "2_weeks"
                              ? "2 Weeks"
                              : option === "1_month"
                                ? "1 Month"
                                : "Not Available"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/employer/talent-management">
                <Button className="h-11 rounded-full px-6 font-bold shadow-sm">
                  Browse Candidates
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile, index) => (
                <SavedProfileCard
                  key={profile.id}
                  profile={profile}
                  index={index}
                />
              ))
            ) : (
              <div className="bg-card col-span-full flex flex-col items-center gap-4 rounded-xl border-2 border-dashed py-24 text-center">
                <div className="bg-muted/20 rounded-full p-6">
                  <Bookmark className="text-muted-foreground/20 h-10 w-10" />
                </div>
                <p className="text-muted-foreground text-sm font-bold italic">
                  {searchTerm || availabilityFilter !== "all"
                    ? "No profiles match your filters."
                    : "You haven't saved any candidate profiles yet."}
                </p>
                <Link href="/employer/talent-management">
                  <Button className="mt-2 rounded-full font-bold">
                    Browse Candidates
                  </Button>
                </Link>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SavedProfilesView;
