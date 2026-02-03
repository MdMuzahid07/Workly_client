"use client";
import { useScroll } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
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
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  return (
    <div className="overflow-hidden">
      <LandingHero
        heroRef={heroRef}
        scrollYProgress={scrollYProgress}
        World={World}
      />
      <LandingFeatures />
      <LandingStatus />
    </div>
  );
};

export default LandingView;
