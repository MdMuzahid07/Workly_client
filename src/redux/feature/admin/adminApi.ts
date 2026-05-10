/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";
import type {
  AdminEmployerRow,
  AdminEmployerStats,
  AdminEmployerStatus,
} from "@/types/adminEmployers";
import type {
  AdminJobSeekerRow,
  AdminJobSeekerStats,
  AdminJobSeekerStatus,
} from "@/types/adminJobSeekers";
import type { AdminJobRow, AdminJobStats } from "@/types/adminJobs";

type Envelope<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: unknown;
};

export type AdminEmployerListArgs = {
  page?: number;
  limit?: number;
  q?: string;
  status?: AdminEmployerStatus | null;
};

export type AdminJobSeekerListArgs = {
  page?: number;
  limit?: number;
  q?: string;
  status?: AdminJobSeekerStatus | null;
};

export type AdminJobListArgs = {
  page?: number;
  limit?: number;
  q?: string;
  type?: string | null;
};

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployerStats: builder.query<Envelope<AdminEmployerStats>, void>({
      query: () => ({ url: "/admin/employers/stats", method: "GET" }),
      providesTags: ["company"],
    }),

    getEmployersAdmin: builder.query<
      Envelope<AdminEmployerRow[]>,
      AdminEmployerListArgs
    >({
      query: (args) => ({
        url: "/admin/employers",
        method: "GET",
        params: {
          page: args.page ?? 1,
          limit: args.limit ?? 20,
          q: args.q || undefined,
          status: args.status || undefined,
        },
      }),
      providesTags: ["company"],
    }),

    verifyCompanyAdmin: builder.mutation<Envelope<unknown>, string>({
      query: (companyId) => ({
        url: `/admin/companies/${companyId}/verify`,
        method: "PATCH",
      }),
      invalidatesTags: ["company"],
    }),

    suspendEmployerAdmin: builder.mutation<Envelope<unknown>, string>({
      query: (userId) => ({
        url: `/admin/employers/${userId}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: ["company"],
    }),

    reactivateEmployerAdmin: builder.mutation<Envelope<unknown>, string>({
      query: (userId) => ({
        url: `/admin/employers/${userId}/reactivate`,
        method: "PATCH",
      }),
      invalidatesTags: ["company"],
    }),

    deleteEmployerAdmin: builder.mutation<Envelope<unknown>, string>({
      query: (userId) => ({
        url: `/admin/employers/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),

    getJobSeekerStats: builder.query<Envelope<AdminJobSeekerStats>, void>({
      query: () => ({ url: "/admin/job-seekers/stats", method: "GET" }),
      providesTags: ["user"],
    }),

    getJobSeekersAdmin: builder.query<
      Envelope<AdminJobSeekerRow[]>,
      AdminJobSeekerListArgs
    >({
      query: (args) => ({
        url: "/admin/job-seekers",
        method: "GET",
        params: {
          page: args.page ?? 1,
          limit: args.limit ?? 20,
          q: args.q || undefined,
          status: args.status || undefined,
        },
      }),
      providesTags: ["user"],
    }),

    suspendJobSeekerAdmin: builder.mutation<Envelope<unknown>, string>({
      query: (userId) => ({
        url: `/admin/job-seekers/${userId}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),

    reactivateJobSeekerAdmin: builder.mutation<Envelope<unknown>, string>({
      query: (userId) => ({
        url: `/admin/job-seekers/${userId}/reactivate`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),

    deleteJobSeekerAdmin: builder.mutation<Envelope<unknown>, string>({
      query: (userId) => ({
        url: `/admin/job-seekers/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    getActiveJobsStats: builder.query<Envelope<AdminJobStats>, void>({
      query: () => ({ url: "/admin/jobs/stats", method: "GET" }),
      providesTags: ["jobs"],
    }),
    getActiveJobsAdmin: builder.query<
      Envelope<AdminJobRow[]>,
      AdminJobListArgs
    >({
      query: (args) => ({
        url: "/admin/jobs",
        method: "GET",
        params: {
          page: args.page ?? 1,
          limit: args.limit ?? 20,
          q: args.q || undefined,
          type: args.type || undefined,
        },
      }),
      providesTags: ["jobs"],
    }),
    getStaffStats: builder.query<Envelope<any>, void>({
      query: () => ({ url: "/admin/staff/stats", method: "GET" }),
      providesTags: ["user"],
    }),
    getStaffList: builder.query<Envelope<any[]>, any>({
      query: (args) => ({
        url: "/admin/staff",
        method: "GET",
        params: args,
      }),
      providesTags: ["user"],
    }),
    createStaff: builder.mutation<Envelope<any>, any>({
      query: (body) => ({
        url: "/admin/staff",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    setStaffStatus: builder.mutation<
      Envelope<any>,
      { userId: string; isActive: boolean }
    >({
      query: ({ userId, isActive }) => ({
        url: `/admin/staff/${userId}/status`,
        method: "PATCH",
        body: { isActive },
      }),
      invalidatesTags: ["user"],
    }),
    getAuditLogs: builder.query<Envelope<any[]>, any>({
      query: (args) => ({
        url: "/admin/audit-logs",
        method: "GET",
        params: args,
      }),
    }),
  }),
});

export const {
  useGetEmployerStatsQuery,
  useGetEmployersAdminQuery,
  useVerifyCompanyAdminMutation,
  useSuspendEmployerAdminMutation,
  useReactivateEmployerAdminMutation,
  useDeleteEmployerAdminMutation,
  useGetJobSeekerStatsQuery,
  useGetJobSeekersAdminQuery,
  useSuspendJobSeekerAdminMutation,
  useReactivateJobSeekerAdminMutation,
  useDeleteJobSeekerAdminMutation,
  useGetActiveJobsStatsQuery,
  useGetActiveJobsAdminQuery,
  useGetStaffStatsQuery,
  useGetStaffListQuery,
  useCreateStaffMutation,
  useSetStaffStatusMutation,
  useGetAuditLogsQuery,
} = adminApi;

export default adminApi;
