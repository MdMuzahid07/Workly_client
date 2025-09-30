import { Globe, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CompanyCard = ({ company }: any) => {
  return (
    <Card key={company.id} className="bg-primary/2 sm:bg-card rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Image
            src={company.logo || "/placeholder.svg"}
            alt={`${company.name} logo`}
            className="bg-primary h-12 w-12 rounded-full object-cover object-center"
            width={100}
            height={100}
            priority
          />
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h3 className="text-foreground font-semibold">{company.name}</h3>
              {company.featured && (
                <Badge variant="outline" className="bg-primary text-card">
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-foreground/60 text-sm">{company.industry}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0 pt-0 sm:px-4">
        <div className="space-y-4">
          <p className="text-foreground/70 line-clamp-2 text-sm leading-relaxed">
            {company.description}
          </p>

          <div className="text-foreground/60 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{company.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{company.size}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{company.website}</span>
            </div>
          </div>

          <div className="dark:sm:border-accent/50 flex items-center justify-between border-b pt-4 pb-7 sm:border-t sm:border-b-0 sm:border-gray-100 sm:pb-0">
            <div className="text-sm">
              <span className="text-primary font-medium">
                {company.openJobs}
              </span>
              <span className="text-foreground/60 ml-1">open jobs</span>
            </div>
            <Link href={`/companies/${company.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="dark:hover:bg-primary dark:hover:text-white"
              >
                View Company
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
