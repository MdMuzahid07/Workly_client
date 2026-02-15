import VerificationEmailSent from "@/components/main/auth/VerificationEmailSent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | WorklyJob",
  description: "Verify your email address",
};

export default function VerifyEmailPage() {
  return <VerificationEmailSent />;
}
