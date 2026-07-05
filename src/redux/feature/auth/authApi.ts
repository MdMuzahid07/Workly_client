import baseApi from "../../api/baseApi";
import { IUser } from "./authSlice";

interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  safeUser: IUser;
}

interface IRegisterData {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
  role: "EMPLOYER" | "JOB_SEEKER";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IAuthError {
  data: {
    message: string;
    statusCode: number;
  };
}

interface IChangePasswordData {
  oldPassword?: string;
  newPassword?: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<ILoginResponse, IRegisterData>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation<
      ILoginResponse,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    verifyEmail: builder.mutation<
      { message: string; user: IUser },
      { token: string }
    >({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    resendVerification: builder.mutation<
      { message: string; email: string },
      { email: string }
    >({
      query: (data) => ({
        url: "/auth/resend-verification-email",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<
      { message: string; data: { email: string } | null },
      { email: string }
    >({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      void,
      { token: string; newPassword: string; confirmPassword: string }
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.mutation<
      { accessToken: string },
      { refreshToken: string }
    >({
      query: (data) => ({
        url: "/auth/refresh",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation<{ message: string }, IChangePasswordData>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    // Confirm role for new Google OAuth users — called from the callback page
    confirmGoogleRole: builder.mutation<
      { data: IUser },
      { role: "EMPLOYER" | "JOB_SEEKER" }
    >({
      query: (data) => ({
        url: "/auth/confirm-google-role",
        method: "PATCH",
        body: data,
      }),
    }),
    deleteMe: builder.mutation<void, void>({
      query: () => ({
        url: "/users/me",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useLogoutUserMutation,
  useChangePasswordMutation,
  useConfirmGoogleRoleMutation,
  useDeleteMeMutation,
} = authApi;

export default authApi;
