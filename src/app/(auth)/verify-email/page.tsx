"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useVerifyEmailMutation } from "../../../redux/feature/auth/authApi";
import {
  setCredentials,
  updateUser,
} from "../../../redux/feature/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";

type VerificationStatus = "loading" | "success" | "error" | "pending";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const token = searchParams.get("token");
  const [verifyEmail] = useVerifyEmailMutation();

  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [targetRedirect, setTargetRedirect] = useState("/login");

  useEffect(() => {
    const handleVerification = async () => {
      if (!token) {
        setStatus("pending");
        return;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await verifyEmail({ token }).unwrap();
        const data = result.data;

        if (data?.accessToken && data?.user) {
          localStorage.setItem("accessToken", data.accessToken);
          dispatch(
            setCredentials({
              user: {
                id: data.user.id,
                email: data.user.email,
                fullName: data.user.fullName,
                isVerified: true,
                role: data.user.role,
                companyId: data.user.companyId,
                isActive: true,
              },
              accessToken: data.accessToken,
              refreshToken: null,
            }),
          );

          const redirectUrl =
            data.user.role === "EMPLOYER"
              ? "/employer/company-profile"
              : "/dashboard/profile";
          setTargetRedirect(redirectUrl);

          setTimeout(() => {
            router.push(redirectUrl);
          }, 3000);
        } else {
          dispatch(
            updateUser({
              isVerified: true,
            }),
          );
        }

        setStatus("success");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setStatus("error");
        setErrorMessage(
          error?.data?.message ||
            error?.message ||
            "Failed to verify email. Please try again.",
        );
      }
    };

    handleVerification();
  }, [token, verifyEmail, dispatch, router]);

  const handleContinue = () => {
    router.push(targetRedirect);
  };

  const handleSignUpAgain = () => {
    router.push("/register");
  };

  return (
    <div className="w-full space-y-6">
      {status === "loading" && (
        <div className="space-y-6 text-center">
          <div className="bg-primary/10 mx-auto flex h-20 w-20 items-center justify-center rounded-full">
            <Loader2 className="text-primary h-10 w-10 animate-spin" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Verifying Your Email
            </h1>
            <p className="text-muted-foreground text-sm">
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      )}

      {status === "pending" && (
        <div className="space-y-6 text-center">
          <div className="bg-primary/10 mx-auto flex h-20 w-20 items-center justify-center rounded-full">
            <CheckCircle className="text-primary h-12 w-12 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Check Your Inbox!
            </h1>
            <p className="text-muted-foreground text-sm">
              {`We've`} sent a verification link to your email address. Please
              click the link in the email to verify and activate your account.
            </p>
          </div>
          <Button
            onClick={() => router.push("/login")}
            className="bg-primary w-full cursor-pointer rounded-full py-3 font-semibold text-white shadow-sm transition-all duration-200"
          >
            Back to Sign In
          </Button>
        </div>
      )}

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-primary/10 mx-auto flex h-20 w-20 items-center justify-center rounded-full"
          >
            <CheckCircle className="text-primary h-12 w-12" />
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Email Verified!
            </h1>
            <p className="text-muted-foreground text-sm">
              Your email has been successfully verified! You are now
              automatically signed in. Redirecting you to update your profile...
            </p>
          </div>
          <Button
            onClick={handleContinue}
            className="bg-primary w-full cursor-pointer rounded-full py-3 font-semibold text-white shadow-sm transition-all duration-200"
          >
            Go to Profile Now
          </Button>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 text-center"
        >
          <div className="bg-destructive/10 mx-auto flex h-20 w-20 items-center justify-center rounded-full">
            <XCircle className="text-destructive h-12 w-12" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Verification Failed
            </h1>
            <p className="text-muted-foreground text-sm">
              {errorMessage ||
                "We couldn't verify your email. The link may have expired or is invalid."}
            </p>
          </div>
          <div className="space-y-3">
            <Button
              onClick={handleContinue}
              className="bg-primary w-full cursor-pointer rounded-full py-3 font-semibold text-white shadow-sm transition-all duration-200"
            >
              Go to Sign In
            </Button>
            <Button
              onClick={handleSignUpAgain}
              variant="outline"
              className="w-full rounded-full border-2 py-3 font-semibold transition-all duration-200"
            >
              Sign Up Again
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
