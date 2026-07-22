import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../../ui/button';

const ApplyJobHeader = ({ jobTitle }: { jobTitle: string }) => {
  return (
    <div className="bg-card rounded-xl border p-4 sm:p-6">
      <div className="flex items-center gap-4 sm:gap-5">
        <Link href="/jobs">
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full transition-all sm:h-12 sm:w-12"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
            Apply for Job
          </h1>
          <p className="text-muted-foreground mt-1 text-xs font-medium sm:text-sm">{jobTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobHeader;
