"use client";
import dynamic from "next/dynamic";
import LandingFeaturedCompanies from "../../../components/landing/LandingFeaturedCompanies";
import LandingFeaturedJobs from "../../../components/landing/LandingFeaturedJobs";
import LandingFeatures from "../../../components/landing/LandingFeatures";
import LandingHero from "../../../components/landing/LandingHero";
import LandingHowItWorks from "../../../components/landing/LandingHowItWorks";
import LandingJobCategories from "../../../components/landing/LandingJobCategories";
import LandingStatus from "../../../components/landing/LandingStatus";
import GlobeSkeleton from "../../../skeleton/landing/home/GlobeSkeleton";

const World = dynamic(
  () => import("@/components/ui/globe").then((mod) => ({ default: mod.World })),
  {
    ssr: false,
    loading: () => <GlobeSkeleton />,
  },
);

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
