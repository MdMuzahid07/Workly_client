import { Metadata } from "next";
import MessageView from "../../../view/message/MessageView";

export const metadata: Metadata = {
  title: "Inbox",
};

const page = () => {
  return (
    <>
      <MessageView />
    </>
  );
};

export default page;
