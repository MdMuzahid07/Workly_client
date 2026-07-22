import { Metadata } from 'next';
import { Suspense } from 'react';
import JobView from '../../../view/job/browse/JobView';

export const metadata: Metadata = {
  title: 'Jobs',
};

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="text-muted-foreground container mx-auto py-20 text-center">
          Loading jobs page...
        </div>
      }
    >
      <JobView />
    </Suspense>
  );
};

export default page;
