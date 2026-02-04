import { Briefcase, ExternalLink, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

interface CompanyCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  company: any;
  viewType?: "grid" | "list";
}

const CompanyCard = ({ company, viewType = "list" }: CompanyCardProps) => {
  const slug = company.slug || "";

  if (viewType === "grid") {
    return (
      <Card className="group hover:border-primary/20 relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50">
        <CardContent className="flex flex-1 flex-col items-center p-0 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gray-50 p-3 shadow-inner transition-transform duration-500 group-hover:scale-105 dark:bg-slate-800">
            <Image
              src={company.logo || "/placeholder.svg"}
              alt={`${company.name} logo`}
              className="h-full w-full object-contain"
              width={80}
              height={80}
            />
          </div>

          <div className="mb-2">
            <Link
              href={`/companies/${slug}`}
              className="hover:text-primary transition-colors"
            >
              <h3 className="text-foreground line-clamp-1 text-lg font-bold">
                {company.name}
              </h3>
            </Link>
            {company.featured && (
              <Badge
                variant="default"
                className="bg-primary/10 text-primary hover:bg-primary/20 mx-auto mt-1 w-fit rounded-md border-0 py-0 text-[10px] font-bold tracking-wider uppercase"
              >
                Featured
              </Badge>
            )}
          </div>

          <div className="text-primary mb-4 flex items-center justify-center gap-1.5 text-xs font-bold tracking-tight uppercase opacity-80">
            <Briefcase className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {company.industry?.name || "Industry"}
            </span>
          </div>

          <div className="text-muted-foreground mb-6 w-full space-y-2 text-xs">
            <div className="flex items-center justify-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 opacity-70" />
              <span>{company.location}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Users className="h-3.5 w-3.5 opacity-70" />
              <span>{company.size} employees</span>
            </div>
          </div>

          <div className="mt-auto w-full border-t border-gray-50 pt-4 dark:border-slate-800">
            <div className="text-primary bg-primary/5 mx-auto mb-4 w-fit rounded-full px-3 py-1 text-xs font-bold">
              {company.openJobs} Jobs Available
            </div>
            <Link href={`/companies/${slug}`} className="block">
              <Button
                variant="outline"
                size="sm"
                className="hover:border-primary hover:bg-primary/5 hover:text-primary w-full rounded-full border-gray-100 font-bold transition-all"
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
    <Card className="group hover:border-primary/20 relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50">
      <CardContent className="p-0">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Left: Company Logo */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-1 shadow-inner dark:bg-slate-800">
            <Image
              src={company.logo || "/placeholder.svg"}
              alt={`${company.name} logo`}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
              width={64}
              height={64}
            />
          </div>

          {/* Middle: Company Info */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <Link
                href={`/companies/${slug}`}
                className="hover:text-primary transition-colors"
              >
                <h3 className="text-foreground truncate text-lg font-bold">
                  {company.name}
                </h3>
              </Link>
              {company.featured && (
                <Badge
                  variant="default"
                  className="bg-primary/10 text-primary hover:bg-primary/20 rounded-md border-0 py-0 text-[10px] font-bold tracking-wider uppercase"
                >
                  Featured
                </Badge>
              )}
            </div>

            <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <div className="flex items-center gap-1.5 font-medium capitalize">
                <Briefcase className="text-primary h-3.5 w-3.5 opacity-70" />
                <span>{company.industry?.name || "Industry"}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="text-primary h-3.5 w-3.5 opacity-70" />
                <span>{company.location}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Users className="text-primary h-3.5 w-3.5 opacity-70" />
                <span>{company.size} employees</span>
              </div>
            </div>

            <p className="text-muted-foreground mt-2 line-clamp-1 text-xs">
              {company.description}
            </p>
          </div>

          {/* Right: Open Jobs & Action */}
          <div className="flex shrink-0 flex-col items-end gap-3 sm:text-right">
            <div className="flex items-center gap-2">
              <span className="text-primary bg-primary/5 border-primary/10 rounded-full border px-3 py-1 text-xs font-bold tracking-tighter uppercase shadow-sm">
                {company.openJobs} Jobs Available
              </span>
            </div>

            <Link href={`/companies/${slug}`}>
              <Button
                variant="outline"
                size="sm"
                className="hover:border-primary hover:bg-primary/5 hover:text-primary rounded-full border-gray-100 px-6 font-bold shadow-sm transition-all"
              >
                View Profile
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
