import { Metadata } from "next";
import NotificationView from "../../../view/notification/NotificationView";

export const metadata: Metadata = {
  title: "Notifications",
};

const page = () => {
  return (
    <>
      <NotificationView />
    </>
  );
};

export default page;
