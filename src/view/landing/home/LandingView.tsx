'use client';
import dynamic from 'next/dynamic';
import LandingHero from '../../../components/landing/LandingHero';
import GlobeSkeleton from '../../../skeleton/landing/home/GlobeSkeleton';

const World = dynamic(
  () => import('@/components/ui/globe').then((mod) => ({ default: mod.World })),
  {
    ssr: false,
    loading: () => <GlobeSkeleton />,
  },
);

// Dynamic loading for below-the-fold sections to optimize TBT and bundle size
const LandingFeaturedCompanies = dynamic(
  () => import('../../../components/landing/LandingFeaturedCompanies'),
  {
    loading: () => (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="bg-muted/20 h-[400px] w-full animate-pulse rounded-3xl" />
      </div>
    ),
  },
);

const LandingJobCategories = dynamic(
  () => import('../../../components/landing/LandingJobCategories'),
  {
    loading: () => (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="bg-muted/10 h-[500px] w-full animate-pulse rounded-3xl" />
      </div>
    ),
  },
);

const LandingFeaturedJobs = dynamic(
  () => import('../../../components/landing/LandingFeaturedJobs'),
  {
    loading: () => (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="bg-muted/20 h-[600px] w-full animate-pulse rounded-3xl" />
      </div>
    ),
  },
);

const LandingFeatures = dynamic(() => import('../../../components/landing/LandingFeatures'), {
  loading: () => (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="bg-muted/10 h-[450px] w-full animate-pulse rounded-3xl" />
    </div>
  ),
});

const LandingHowItWorks = dynamic(() => import('../../../components/landing/LandingHowItWorks'), {
  loading: () => (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="bg-muted/20 h-[400px] w-full animate-pulse rounded-3xl" />
    </div>
  ),
});

const LandingStatus = dynamic(() => import('../../../components/landing/LandingStatus'), {
  loading: () => (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="bg-muted/10 h-[200px] w-full animate-pulse rounded-3xl" />
    </div>
  ),
});

const LandingView = () => {
  return (
    <div className="overflow-hidden">
      <LandingHero World={World} />
      <LandingFeaturedCompanies />
      <LandingJobCategories />
      <LandingFeaturedJobs />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingStatus />
    </div>
  );
};

export default LandingView;
