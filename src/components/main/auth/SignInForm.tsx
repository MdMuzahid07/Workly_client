"use client";

import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useLoginUserMutation } from "../../../redux/feature/auth/authApi";
import {
  setCredentials,
  UserRole,
} from "../../../redux/feature/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import WkForm from "../../form/WkForm";
import WKInput from "../../form/WkInput";
import DevLoginShortcuts from "./DevLoginShortcuts";
import { GoogleLoginButton } from "./GoogleLoginButton";

interface SignInFormData {
  email: string;
  password: string;
}

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/jobs";

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

      if (resData?.accessToken && resData?.email) {
        localStorage.setItem("accessToken", resData.accessToken);

        const decodedToken = jwtDecode(resData.accessToken) as {
          isVerified: boolean;
          userId: string;
          role: string;
          companyId?: string;
        };

        if (decodedToken) {
          dispatch(
            setCredentials({
              user: {
                id: decodedToken.userId,
                email: resData.email,
                fullName: resData.fullName,
                isVerified: decodedToken.isVerified,
                phone: resData.phone,
                companyId: decodedToken.companyId || resData.companyId,
                role: decodedToken.role as UserRole,
                isActive: true,
              },
              accessToken: resData.accessToken,
              refreshToken: null,
            }),
          );
        }

        toast.success("Login successful!");
        router.push(callbackUrl);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.errorSources?.message || "Login failed");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground text-sm">
          Sign in to your Workly_job account to continue your career journey.
        </p>
      </div>

      <DevLoginShortcuts />

      <WkForm defaultValues={defaultValues} onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-4">
            <WKInput
              name="email"
              label="Email Address"
              type="email"
              required
              className="form-input rounded-full transition-all duration-200"
            />

            <div className="relative">
              <WKInput
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                className="form-input rounded-full pr-10 transition-all duration-200"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-6.5 right-0 cursor-pointer hover:bg-transparent"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  <EyeOff className="text-muted-foreground h-4 w-4" />
                ) : (
                  <Eye className="text-muted-foreground h-4 w-4" />
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
              <Link
                href="/forgot-password"
                className="text-muted-foreground hover:text-primary cursor-pointer text-sm transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </WkForm>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <GoogleLoginButton />
        <p className="text-muted-foreground text-center text-sm">
          {`Don't`} have an account?{" "}
          <Link
            href="/register"
            className="text-primary hover:text-primary/80 cursor-pointer font-medium transition-colors duration-200"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
