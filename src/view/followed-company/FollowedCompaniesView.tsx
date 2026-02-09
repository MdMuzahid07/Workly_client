"use client";

import DashboardFollowedCompaniesHeader from "@/components/dashboard/dashboard-nav/header/DashboardFollowedCompaniesHeader";
import FollowedCompanyCard from "@/components/main/followed-company/FollowedCompanyCard";
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
import { mockFollowedCompanies } from "@/data/mockFollowedCompanies";
import { AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const FollowedCompaniesView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Extract industries for the dropdown UI
  const industries = useMemo(() => {
    const allIndustries = mockFollowedCompanies.map((c) => c.industry);
    return ["all", ...Array.from(new Set(allIndustries))];
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <DashboardFollowedCompaniesHeader />

      <div className="space-y-6 px-4 sm:px-6 sm:py-8">
        {/* Filter Bar */}
        <Card className="bg-card rounded-xl border">
          <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
              {/* Search Placeholder */}
              <div className="group relative max-w-md flex-1">
                <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transition-colors" />
                <Input
                  placeholder="Search followed companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-muted/10 border-border/50 focus:bg-background focus:ring-primary/20 h-11 rounded-full pl-10 transition-all focus:ring-1"
                />
              </div>

              {/* Category Filter UI */}
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground/60 text-[10px] font-black tracking-widest whitespace-nowrap uppercase">
                  Filter By:
                </span>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="bg-muted/10 border-border/50 hover:bg-muted/20 h-10 w-48 cursor-pointer rounded-full font-bold shadow-xs transition-all">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border shadow-xl">
                    {industries.map((industry) => (
                      <SelectItem
                        key={industry}
                        className="focus:bg-primary cursor-pointer rounded-lg font-medium transition-colors focus:text-white"
                        value={industry}
                      >
                        {industry === "all" ? "All Industries" : industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/companies">
                <Button
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground h-11 rounded-full px-6 font-bold shadow-xs transition-all hover:shadow-md active:scale-95"
                >
                  Browse More
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {mockFollowedCompanies.map((company, index) => (
              <FollowedCompanyCard
                key={company.id}
                company={company}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FollowedCompaniesView;
