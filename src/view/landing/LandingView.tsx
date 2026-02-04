"use client";
import dynamic from "next/dynamic";
import LandingFeatures from "../../components/landing/LandingFeatures";
import LandingHero from "../../components/landing/LandingHero";
import LandingStatus from "../../components/landing/LandingStatus";
import GlobeSkeleton from "../../skeleton/landing/GlobeSkeleton";

const World = dynamic(
  () =>
    import("../../components/ui/globe").then((mod) => ({ default: mod.World })),
  {
    ssr: false,
    loading: () => <GlobeSkeleton />,
  },
);

const LandingView = () => {
  return (
    <div className="overflow-hidden">
      <LandingHero World={World} />
      <LandingFeatures />
      <LandingStatus />
    </div>
  );
};

export default LandingView;
