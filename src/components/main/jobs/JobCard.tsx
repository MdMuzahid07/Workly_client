"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Clock, DollarSign, ExternalLink, Heart, MapPin } from "lucide-react";
import { Badge } from "../../ui/badge";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  budget: string;
  budgetType: "fixed" | "hourly";
  timePosted: string;
  description: string;
  skills: string[];
  isUrgent?: boolean;
  isFeatured?: boolean;
}

const JobCard = ({
  title,
  company,
  location,
  budget,
  budgetType,
  timePosted,
  description,
  skills,
  isUrgent = false,
  isFeatured = false,
}: JobCardProps) => {
  return (
    <Card
      className={`bg-primary/2 sm:bg-card w-full rounded-2xl border-0 shadow-none drop-shadow-none transition-all duration-200`}
    >
      <CardHeader className="px-0 pb-3 md:px-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              {isFeatured && (
                <Badge
                  variant="secondary"
                  className="rounded-full text-xs font-medium"
                >
                  Featured
                </Badge>
              )}
              {isUrgent && (
                <Badge
                  variant="destructive"
                  className="rounded-full text-xs font-medium"
                >
                  Urgent
                </Badge>
              )}
            </div>
            <h3 className="text-foreground mb-2 text-lg leading-tight font-semibold text-balance">
              {title}
            </h3>
            <div className="text-muted-foreground flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
              <span className="font-medium">{company}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{timePosted}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0 md:px-4 md:pb-4">
        <div className="mb-4 flex items-center gap-2">
          <DollarSign className="text-primary h-4 w-4" />
          <span className="text-foreground text-lg font-semibold">
            {budget}
          </span>
          <span className="text-muted-foreground text-sm">
            {budgetType === "hourly" ? "/hour" : "fixed price"}
          </span>
        </div>

        <p className="text-foreground mb-4 text-sm leading-relaxed text-pretty">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-muted/50 hover:bg-muted rounded-full text-xs font-normal"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-border border-b px-0 pb-7 md:border-t md:border-b-0 md:px-4 md:pt-4 md:pb-0">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex gap-2">
            <Button
              size="sm"
              className="cursor-pointer rounded-full font-medium"
            >
              Apply Now
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer rounded-full"
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              View Details
            </Button>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="cursor-pointer rounded-full p-2"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Save job</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
