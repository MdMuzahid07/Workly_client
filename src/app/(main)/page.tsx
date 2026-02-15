import { Metadata } from "next";
import LandingView from "../../view/landing/LandingView";

export const metadata: Metadata = {
  title: "Workly_job",
  description: "Find the perfect job for you",
};

const page = () => {
  return <LandingView />;
};

export default page;
