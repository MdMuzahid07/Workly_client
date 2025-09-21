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
  role: "employer" | "jobseeker";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IAuthError {
  data: {
    message: string;
    statusCode: number;
  };
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
} = authApi;

export default authApi;
