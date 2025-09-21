"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRegisterUserMutation } from "../../../../redux/feature/auth/authApi";
import { setCredentials } from "../../../../redux/feature/auth/authSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import WkForm from "../../../form/WkForm";
import WKInput from "../../../form/WkInput";
import { useAuthDialog } from "../AuthDialogProvider";

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "employer" | "jobseeker";
}

const SignUpView = () => {
  const { switchView } = useAuthDialog();
  const dispatch = useAppDispatch();
  const [registerUser] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"employer" | "jobseeker">(
    "jobseeker",
  );

  const defaultValues: SignUpFormData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "jobseeker",
  };

  const handleSubmit = async (data: SignUpFormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords don't match!");
        return;
      }

      const response = await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: selectedRole,
      }).unwrap();

      console.log(response, "response==========>");

      if (
        response?.accessToken &&
        response?.safeUser &&
        response?.refreshToken
      ) {
        localStorage.setItem("accessToken", response.accessToken);

        dispatch(
          setCredentials({
            user: response.safeUser,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          }),
        );

        toast.success("Registration successful!");
        switchView("signIn");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed");
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      <DialogHeader className="space-y-3">
        <DialogTitle className="text-center text-2xl font-bold text-gray-900">
          Join Workly_job
        </DialogTitle>
        <DialogDescription className="text-center text-gray-600">
          Create your account and start your career journey today.
        </DialogDescription>
      </DialogHeader>

      <WkForm defaultValues={defaultValues} onSubmit={handleSubmit}>
        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <WKInput
              name="fullName"
              label="Full Name"
              type="text"
              required
              className="rounded-full border-gray-300 bg-white transition-all duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-400"
            />

            <WKInput
              name="email"
              label="Email Address"
              type="email"
              required
              className="rounded-full border-gray-300 bg-white transition-all duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-400"
            />

            <div className="relative">
              <WKInput
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                className="rounded-full border-gray-300 bg-white pr-10 transition-all duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-400"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-6.5 right-0 cursor-pointer hover:bg-transparent"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>

            <div className="relative">
              <WKInput
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="rounded-full border-gray-300 bg-white pr-10 transition-all duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-400"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-6.5 right-0 cursor-pointer hover:bg-transparent"
                onClick={() => setShowConfirmPassword((v) => !v)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant={selectedRole === "employer" ? "default" : "outline"}
                className={`flex-1 rounded-full border-2 py-3 font-semibold transition-colors duration-200 hover:bg-green-500 ${
                  selectedRole === "employer"
                    ? "border-green-400 bg-green-400 text-white"
                    : "border-slate-300 text-green-400"
                }`}
                onClick={() => setSelectedRole("employer")}
              >
                Employer
              </Button>

              <Button
                type="button"
                variant={selectedRole === "jobseeker" ? "default" : "outline"}
                className={`flex-1 rounded-full border-2 py-3 font-semibold transition-colors duration-200 hover:bg-green-500 ${
                  selectedRole === "jobseeker"
                    ? "border-green-400 bg-green-400 text-white"
                    : "border-slate-300 text-green-400"
                }`}
                onClick={() => setSelectedRole("jobseeker")}
              >
                Job Seeker
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full cursor-pointer rounded-full bg-green-400 py-3 font-semibold text-white shadow-sm transition-colors duration-200"
            >
              Create Account
            </Button>
          </div>
        </div>
      </WkForm>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Button
            variant="link"
            className="h-auto cursor-pointer p-0 font-medium text-green-400 transition-colors delay-150 duration-300 hover:text-[#00C299]"
            onClick={() => switchView("signIn")}
          >
            Sign in here
          </Button>
        </p>
      </div>
    </>
  );
};

export default SignUpView;
