import { Metadata } from "next";
import ResetPasswordView from "../../../view/auth/ResetPasswordView";

export const metadata: Metadata = {
  title: "Reset Password",
};

const page = () => {
  return (
    <>
      <ResetPasswordView />
    </>
  );
};

export default page;
