import SignUpForm from "@/components/main/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | WorklyJob",
  description: "Create a new WorklyJob account",
};

export default function RegisterPage() {
  return <SignUpForm />;
}
