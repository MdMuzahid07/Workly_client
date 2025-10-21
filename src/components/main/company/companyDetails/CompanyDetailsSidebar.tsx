import { Separator } from "@radix-ui/react-select";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CompanyDetailsSidebar = ({ company }: { company: any }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Button className="bg-primary hover:bg-primary mb-3 w-full text-white">
            Follow Company
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            View All Jobs
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-secondary-foreground">Employees</span>
            <span className="font-medium">{company?.stats?.employees}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-secondary-foreground">Offices</span>
            <span className="font-medium">{company?.stats?.offices}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-secondary-foreground">Countries</span>
            <span className="font-medium">{company?.stats?.countries}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-secondary-foreground">Founded</span>
            <span className="font-medium">{company?.stats?.founded}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connect With Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {company?.socialLinks?.linkedin && (
            <a
              href={`https://${company?.socialLinks?.linkedin}`}
              className="hover:bg-primary/2 flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
                <span className="text-xs font-bold text-white">in</span>
              </div>
              <span className="text-secondary-foreground">LinkedIn</span>
              <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
            </a>
          )}
          {company?.socialLinks?.twitter && (
            <a
              href={`https://${company?.socialLinks?.twitter}`}
              className="hover:bg-primary/2 flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-400">
                <span className="text-xs font-bold text-white">𝕏</span>
              </div>
              <span className="text-secondary-foreground">Twitter</span>
              <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
            </a>
          )}
          {company?.socialLinks?.github && (
            <a
              href={`https://${company?.socialLinks?.github}`}
              className="hover:bg-primary/2 flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-900">
                <span className="text-xs font-bold text-white">GH</span>
              </div>
              <span className="text-secondary-foreground">GitHub</span>
              <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
            </a>
          )}
        </CardContent>
      </Card>

      {/* Similar Companies */}
      <Card>
        <CardHeader>
          <CardTitle>Similar Companies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border border-gray-200 p-3">
            <div className="mb-2 flex items-center gap-3">
              <Image
                width={100}
                height={100}
                src="/abstract-tech-logo.png"
                alt="Company logo"
                className="h-8 w-8 rounded"
              />
              <div>
                <h4 className="text-sm font-medium">InnovateCorp</h4>
                <p className="text-secondary-foreground text-xs">
                  SaaS • New York
                </p>
              </div>
            </div>
            <p className="text-xs font-medium text-green-600">15 open jobs</p>
          </div>

          <div className="rounded-xl border border-gray-200 p-3">
            <div className="mb-2 flex items-center gap-3">
              <Image
                width={100}
                height={100}
                src="/cloud-company-logo.png"
                alt="Company logo"
                className="h-8 w-8 rounded"
              />
              <div>
                <h4 className="text-sm font-medium">CloudTech Solutions</h4>
                <p className="text-secondary-foreground text-xs">
                  Cloud • Seattle
                </p>
              </div>
            </div>
            <p className="text-xs font-medium text-green-600">22 open jobs</p>
          </div>

          <div className="rounded-xl border border-gray-200 p-3">
            <div className="mb-2 flex items-center gap-3">
              <Image
                width={100}
                height={100}
                src="/data-company-logo.png"
                alt="Company logo"
                className="h-8 w-8 rounded"
              />
              <div>
                <h4 className="text-sm font-medium">DataVision Labs</h4>
                <p className="text-secondary-foreground text-xs">
                  Analytics • Remote
                </p>
              </div>
            </div>
            <p className="text-xs font-medium text-green-600">8 open jobs</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetailsSidebar;
