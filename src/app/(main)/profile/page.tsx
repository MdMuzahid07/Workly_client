import { Metadata } from "next";
import ProfileView from "../../../view/profile/ProfileView";

export const metadata: Metadata = {
  title: "Profile",
};

const page = () => {
  return <ProfileView />;
};

export default page;
