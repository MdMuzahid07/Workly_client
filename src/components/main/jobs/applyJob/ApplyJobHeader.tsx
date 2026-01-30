import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../ui/button";

const ApplyJobHeader = ({ jobTitle }: { jobTitle: string }) => {
  return (
    <div className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 border-b backdrop-blur">
      <div className="container mx-auto px-4 py-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/jobs">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 bg-transparent"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Apply for Job</h1>
            <p className="text-muted-foreground text-sm">{jobTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobHeader;
