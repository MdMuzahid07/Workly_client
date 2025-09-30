"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useLoginUserMutation } from "../../../../redux/feature/auth/authApi";
import { setCredentials } from "../../../../redux/feature/auth/authSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import WkForm from "../../../form/WkForm";
import WKInput from "../../../form/WkInput";
import { useAuthDialog } from "../AuthDialogProvider";

interface SignInFormData {
  email: string;
  password: string;
}

const SignInView = () => {
  const { switchView, closeAuth } = useAuthDialog();
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const defaultValues: SignInFormData = {
    email: "",
    password: "",
  };

  const handleSubmit = async (data: SignInFormData) => {
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resData = (response as any).data;

      console.log(resData, "response==========>");

      if (resData?.accessToken && resData?.email) {
        localStorage.setItem("accessToken", resData.accessToken);

        dispatch(
          setCredentials({
            user: {
              email: resData.email,
              fullName: resData.fullName,
              phone: resData.phone,
            },
            accessToken: resData.accessToken,
            refreshToken: resData.refreshToken,
          }),
        );

        toast.success("Login successful!");
        closeAuth();
        router.push("/jobs");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.errorSources?.message || "Login failed");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <DialogHeader className="space-y-3">
        <DialogTitle className="text-center text-2xl font-bold text-gray-900">
          Welcome Back
        </DialogTitle>
        <DialogDescription className="text-center text-gray-600">
          Sign in to your Workly_job account to continue your career journey.
        </DialogDescription>
      </DialogHeader>

      <WkForm defaultValues={defaultValues} onSubmit={handleSubmit}>
        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <WKInput
              name="email"
              label="Email Address"
              type="email"
              required
              className="rounded-full border-gray-300 bg-white transition-all duration-200 focus:outline-none active:border-green-400"
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
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary w-full cursor-pointer rounded-full py-3 font-semibold text-white shadow-sm transition-colors duration-200"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                className="cursor-pointer text-sm text-gray-500 transition-colors duration-200 hover:text-green-400"
                onClick={() => switchView("forgot")}
              >
                Forgot your password?
              </Button>
            </div>
          </div>
        </div>
      </WkForm>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <p className="text-center text-sm text-gray-600">
          {`Don't`} have an account?{" "}
          <Button
            variant="link"
            className="h-auto cursor-pointer p-0 font-medium text-green-400 transition-colors duration-200 hover:text-[#00C299]"
            onClick={() => switchView("signUp")}
          >
            Sign up here
          </Button>
        </p>
      </div>
    </>
  );
};

export default SignInView;
