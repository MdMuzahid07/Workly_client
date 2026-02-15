import SignInForm from "@/components/main/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | WorklyJob",
  description: "Sign in to your WorklyJob account",
};

export default function LoginPage() {
  return <SignInForm />;
}
