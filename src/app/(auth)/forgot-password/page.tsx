import ForgotPasswordForm from "@/components/main/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | WorklyJob",
  description: "Reset your WorklyJob account password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
