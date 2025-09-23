import { Globe, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CompanyCard = ({ company }: any) => {
  return (
    <Card
      key={company.id}
      className="cursor-pointer rounded-2xl bg-gray-50 sm:bg-white"
    >
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Image
            src={company.logo || "/placeholder.svg"}
            alt={`${company.name} logo`}
            className="h-12 w-12 rounded-full bg-slate-300 object-cover"
            width={100}
            height={100}
            priority
          />
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{company.name}</h3>
              {company.featured && (
                <Badge variant="outline" className="bg-primary text-black">
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600">{company.industry}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0 pt-0 sm:px-4">
        <div className="space-y-4">
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-700">
            {company.description}
          </p>

          <div className="space-y-2 text-sm text-gray-600">
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

          <div className="flex items-center justify-between border-b pt-4 pb-7 sm:border-t sm:border-b-0 sm:border-gray-100 sm:pb-0">
            <div className="text-sm">
              <span className="font-medium text-green-600">
                {company.openJobs}
              </span>
              <span className="ml-1 text-gray-600">open jobs</span>
            </div>
            <Button variant="outline" size="sm">
              View Company
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
