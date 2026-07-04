"use client";

import { useConfirmGoogleRoleMutation } from "@/redux/feature/auth/authApi";
import { setCredentials, UserRole } from "@/redux/feature/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { Briefcase, CheckCircle2, Loader2, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Role = "EMPLOYER" | "JOB_SEEKER";

/**
 * Google OAuth Callback Page
 *
 * Handles two scenarios:
 *  1. Existing user → dispatch credentials and redirect immediately.
 *  2. New user (isNewUser=true) → show an in-page role selection modal
 *     before finalising the account. Role is confirmed via an authenticated
 *     PATCH request to /auth/confirm-google-role, which enforces server-side
 *     guards (account age < 10 min, no activity yet).
 */
export default function GoogleAuthCallbackPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [confirmGoogleRole, { isLoading: isConfirming }] =
    useConfirmGoogleRoleMutation();

  const [pendingData, setPendingData] = useState<{
    accessToken: string;
    userData: Record<string, unknown>;
    isVerified: boolean;
  } | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>("JOB_SEEKER");

  // Keep a ref so the effect only runs once even in React Strict Mode
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const accessToken = searchParams.get("accessToken");
    const userParam = searchParams.get("user");
    const isNewUser = searchParams.get("isNewUser") === "true";

    if (!accessToken || !userParam) {
      toast.error("Google login failed. Missing callback data.");
      router.replace("/login");
      return;
    }

    try {
      const userData = JSON.parse(userParam);

      // Set token in localStorage + cookie immediately so subsequent
      // authenticated API calls (confirmGoogleRole) work.
      localStorage.setItem("accessToken", accessToken);
      document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

      const decodedToken = jwtDecode(accessToken) as {
        isVerified: boolean;
        userId: string;
        email: string;
        role: string;
      };

      const isVerified = decodedToken.isVerified ?? userData.isVerified ?? true;

      if (isNewUser) {
        // Pause here — let the user pick a role before finishing registration
        setPendingData({ accessToken, userData, isVerified });
      } else {
        // Existing user — complete login immediately
        finaliseLogin({ accessToken, userData, isVerified, decodedToken });
      }
    } catch (error) {
      console.error("Google auth callback error:", error);
      toast.error("Google login failed. Invalid callback data.");
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finaliseLogin = ({
    accessToken,
    userData,
    isVerified,
    decodedToken,
  }: {
    accessToken: string;
    userData: Record<string, unknown>;
    isVerified: boolean;
    decodedToken: { userId: string; role: string; email: string };
  }) => {
    dispatch(
      setCredentials({
        user: {
          id: (userData.id as string) || decodedToken.userId,
          email: userData.email as string,
          fullName: userData.fullName as string,
          phone: userData.phone as string,
          role: ((userData.role as string) || decodedToken.role) as UserRole,
          isVerified,
          isActive: (userData.isActive as boolean) ?? true,
          profileId: userData.profileId as string,
          companyId: userData.companyId as string,
          lastLogin: userData.lastLogin as string,
        },
        accessToken,
        refreshToken: null,
      }),
    );

    if (!isVerified) {
      toast.success("Please verify your email using the link we sent you!");
      router.replace("/verify-email");
    } else {
      toast.success("Logged in with Google!");

      const role = (userData.role as string) || decodedToken.role;
      const companyId = (userData.companyId as string) || "";

      let redirectUrl = "/jobs";
      if (role === "EMPLOYER") {
        redirectUrl = companyId ? "/employer" : "/create-company";
      } else if (role === "ADMIN" || role === "SUPER_ADMIN") {
        redirectUrl = "/admin";
      }

      router.replace(redirectUrl);
    }
  };

  const handleRoleConfirm = async () => {
    if (!pendingData) return;

    try {
      // Server-side validation: only works within 10 min of account creation
      await confirmGoogleRole({ role: selectedRole }).unwrap();

      const decodedToken = jwtDecode(pendingData.accessToken) as {
        isVerified: boolean;
        userId: string;
        email: string;
        role: string;
      };

      // Override role in userData with the user's chosen role
      finaliseLogin({
        accessToken: pendingData.accessToken,
        userData: { ...pendingData.userData, role: selectedRole },
        isVerified: pendingData.isVerified,
        decodedToken: { ...decodedToken, role: selectedRole },
      });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(
        error?.data?.message || "Failed to confirm role. Please try again.",
      );
    }
  };

  // ── Role selection screen (new users only) ──────────────────────────────
  if (pendingData) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
              <CheckCircle2 className="text-primary h-8 w-8" />
            </div>
            <h1 className="text-foreground text-2xl font-black tracking-tight">
              Almost there!
            </h1>
            <p className="text-muted-foreground mt-1 text-sm font-medium">
              One last step — how will you be using WorklyJob?
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Job Seeker */}
            <button
              type="button"
              onClick={() => setSelectedRole("JOB_SEEKER")}
              className={`group flex flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                selectedRole === "JOB_SEEKER"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/40 hover:bg-muted/40"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                  selectedRole === "JOB_SEEKER"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                }`}
              >
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p
                  className={`text-sm font-bold ${
                    selectedRole === "JOB_SEEKER"
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  Job Seeker
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  Find & apply to jobs
                </p>
              </div>
              {selectedRole === "JOB_SEEKER" && (
                <CheckCircle2 className="text-primary h-4 w-4" />
              )}
            </button>

            {/* Employer */}
            <button
              type="button"
              onClick={() => setSelectedRole("EMPLOYER")}
              className={`group flex flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                selectedRole === "EMPLOYER"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/40 hover:bg-muted/40"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                  selectedRole === "EMPLOYER"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                }`}
              >
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <p
                  className={`text-sm font-bold ${
                    selectedRole === "EMPLOYER"
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  Employer
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  Post jobs & hire talent
                </p>
              </div>
              {selectedRole === "EMPLOYER" && (
                <CheckCircle2 className="text-primary h-4 w-4" />
              )}
            </button>
          </div>

          {/* Confirm Button */}
          <button
            type="button"
            disabled={isConfirming}
            onClick={handleRoleConfirm}
            className="bg-primary hover:bg-primary/90 text-primary-foreground mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl font-bold shadow-lg transition-all hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-60"
          >
            {isConfirming ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Setting up your account…
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Continue as{" "}
                {selectedRole === "JOB_SEEKER" ? "Job Seeker" : "Employer"}
              </>
            )}
          </button>

          <p className="text-muted-foreground mt-4 text-center text-xs">
            You can only set this once — choose carefully.
          </p>
        </div>
      </div>
    );
  }

  // ── Loading spinner (existing users / processing) ───────────────────────
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="text-muted-foreground text-sm font-medium">
          Signing you in with Google…
        </p>
      </div>
    </div>
  );
}
