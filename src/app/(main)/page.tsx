"use client";
import { motion } from "framer-motion";
import { World } from "../../components/ui/globe";
import { globeSampleAreas } from "../../constants";

export default function page() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#484A4A",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  return (
    <div className="relative flex h-screen w-full flex-row items-center justify-center bg-green-50 pt-30 md:h-auto dark:bg-black">
      <div className="relative z-50 mx-auto h-full w-full max-w-5xl overflow-hidden px-4 md:h-[65rem]">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h2 className="mx-auto max-w-4xl text-center text-xl font-bold text-green-400 sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl dark:text-white">
            Search Smarter, Apply Faster, Hire Better.
          </h2>
          <p className="sm:text-md mx-auto mt-7 max-w-5xl text-center text-base font-normal text-neutral-700 md:text-xl md:font-semibold lg:text-3xl dark:text-neutral-200">
            Navigate your career path with confidence. Find tailored
            opportunities, insider company info, and the tools you need to land
            your next great role.
          </p>
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full bg-gradient-to-b from-transparent to-green-50 select-none dark:to-black" />
        <div className="absolute -bottom-20 z-10 h-72 w-full md:h-full">
          <World data={globeSampleAreas} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
