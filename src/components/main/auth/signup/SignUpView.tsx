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
  role: "EMPLOYER" | "JOB_SEEKER";
}

const SignUpView = () => {
  const { switchView, closeAuth } = useAuthDialog();
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"EMPLOYER" | "JOB_SEEKER">(
    "JOB_SEEKER",
  );
  // const router = useRouter();

  const defaultValues: SignUpFormData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "JOB_SEEKER",
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resData = (response as any).data;

      if (resData?.accessToken && resData?.email) {
        localStorage.setItem("accessToken", resData.accessToken);

        dispatch(
          setCredentials({
            user: {
              email: resData.email,
              fullName: resData.fullName,
              isVerified: resData.isVerified,
              phone: resData.phone,
            },
            accessToken: resData.accessToken,
            refreshToken: null,
          }),
        );

        toast.success("Registration successful!");
        closeAuth();
        // router.push("/jobs");
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
                variant={selectedRole === "EMPLOYER" ? "default" : "outline"}
                className={`hover:bg-primary/100 flex-1 rounded-full border-2 py-3 font-semibold transition-colors duration-200 ${
                  selectedRole === "EMPLOYER"
                    ? "bg-primary border-green-400 text-white"
                    : "border-slate-300 text-green-400"
                }`}
                onClick={() => setSelectedRole("EMPLOYER")}
              >
                Employer
              </Button>

              <Button
                type="button"
                variant={selectedRole === "JOB_SEEKER" ? "default" : "outline"}
                className={`hover:bg-primary/100 flex-1 rounded-full border-2 py-3 font-semibold transition-colors duration-200 ${
                  selectedRole === "JOB_SEEKER"
                    ? "bg-primary border-green-400 text-white"
                    : "border-slate-300 text-green-400"
                }`}
                onClick={() => setSelectedRole("JOB_SEEKER")}
              >
                Job Seeker
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-primary w-full cursor-pointer rounded-full py-3 font-semibold text-white shadow-sm transition-colors duration-200"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
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
