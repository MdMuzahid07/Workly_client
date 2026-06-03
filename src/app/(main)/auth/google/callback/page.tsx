"use client";

import { setCredentials, UserRole } from "@/redux/feature/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function GoogleAuthCallbackPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const userParam = searchParams.get("user");

    if (!accessToken || !userParam) {
      toast.error("Google login failed. Missing callback data.");
      router.replace("/jobs");
      return;
    }

    try {
      const userData = JSON.parse(userParam);
      localStorage.setItem("accessToken", accessToken);

      // Decode token to get isVerified (same pattern as SignInView)
      const decodedToken = jwtDecode(accessToken) as {
        isVerified: boolean;
        userId: string;
        email: string;
        role: string;
      };

      const isVerified = decodedToken.isVerified ?? userData.isVerified ?? true;

      // Map user data to match the structure expected by setCredentials
      // (consistent with SignInView and SignUpView patterns)
      dispatch(
        setCredentials({
          user: {
            id: userData.id || decodedToken.userId,
            email: userData.email,
            fullName: userData.fullName,
            phone: userData.phone,
            role: (userData.role || decodedToken.role) as UserRole, // Map to UserRole enum
            isVerified,
            isActive: userData.isActive ?? true,
            profileId: userData.profileId,
            companyId: userData.companyId,
            lastLogin: userData.lastLogin,
          },
          accessToken,
          refreshToken: null,
        }),
      );

      if (!isVerified) {
        toast.success(
          "Please verify your email using the link sent to your inbox!",
        );
        router.replace("/verify-email");
      } else {
        toast.success("Logged in with Google!");
        router.replace("/jobs");
      }
    } catch (error) {
      console.error("Google auth callback error:", error);
      toast.error("Google login failed. Invalid callback data.");
      router.replace("/jobs");
    }
  }, [dispatch, router, searchParams]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="text-muted-foreground text-sm">
        Signing you in with Google…
      </p>
    </div>
  );
}
