"use client";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLoginUserMutation } from "../../../redux/feature/auth/authApi";
import {
  setCredentials,
  UserRole,
} from "../../../redux/feature/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";

const DevLoginShortcuts = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleQuickLogin = async (
    email: string,
    pass: string,
    role: string,
  ) => {
    try {
      const loadingToast = toast.loading(`Logging in as ${role}...`);
      const response = await loginUser({
        email,
        password: pass,
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

        toast.dismiss(loadingToast);
        toast.success(`Logged in as ${role} successfully!`);

        // Redirect based on role
        if (
          decodedToken.role === "ADMIN" ||
          decodedToken.role === "SUPER_ADMIN"
        ) {
          router.push("/admin");
        } else if (decodedToken.role === "EMPLOYER") {
          router.push("/employer");
        } else {
          router.push("/dashboard");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.dismiss();
      toast.error(
        error?.data?.errorSources?.message || `Login as ${role} failed`,
      );
      console.error("Quick login error:", error);
    }
  };

  return (
    <div className="border-primary/20 bg-primary/5 mb-8 rounded-xl border-2 border-dashed p-4">
      <p className="text-primary mb-3 text-center text-xs font-bold tracking-wider uppercase">
        Dev Quick Login
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={() =>
            handleQuickLogin("mydevcafe@gmail.com", "Admin#$12345@", "Admin")
          }
          className="border-primary/20 hover:bg-primary/10 hover:text-primary rounded-full"
        >
          Admin
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={() =>
            handleQuickLogin(
              "mdmuzahid7396@gmail.com",
              "HDiotuIDG85678%7%$#KjgDJG",
              "Employer",
            )
          }
          className="border-primary/20 hover:bg-primary/10 hover:text-primary rounded-full"
        >
          Employer
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={() =>
            handleQuickLogin(
              "mdmuzahid.dev@gmail.com",
              "FKJhOFIt985^&54#$%#",
              "Seeker",
            )
          }
          className="border-primary/20 hover:bg-primary/10 hover:text-primary rounded-full"
        >
          Seeker
        </Button>
      </div>
    </div>
  );
};

export default DevLoginShortcuts;
