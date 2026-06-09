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
import type {
  AdminAuditLogRow,
  AdminStaffRole,
  AdminStaffRow,
  AdminStaffStats,
} from "@/types/adminStaff";

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
  status?: "ACTIVE" | "DRAFT" | "CLOSED" | "EXPIRED" | null;
};

export type AdminStaffListArgs = {
  page?: number;
  limit?: number;
  q?: string;
  role?: AdminStaffRole | null;
};

export type AdminAuditLogListArgs = {
  page?: number;
  limit?: number;
  staffId?: string;
  entityType?: string;
  action?: string;
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
          status: args.status || undefined,
        },
      }),
      providesTags: ["jobs"],
    }),
    getStaffStats: builder.query<Envelope<AdminStaffStats>, void>({
      query: () => ({ url: "/admin/staff/stats", method: "GET" }),
      providesTags: ["admin"],
    }),
    getStaffList: builder.query<Envelope<AdminStaffRow[]>, AdminStaffListArgs>({
      query: (args) => ({
        url: "/admin/staff",
        method: "GET",
        params: {
          page: args.page ?? 1,
          limit: args.limit ?? 10,
          q: args.q || undefined,
          role: args.role || undefined,
        },
      }),
      providesTags: ["admin"],
    }),
    getDashboardOverviewStats: builder.query<any, void>({
      query: () => ({ url: "/admin/overview/stats", method: "GET" }),
      providesTags: ["admin"],
    }),
    getRecentUsers: builder.query<any, { limit?: number }>({
      query: (params) => ({
        url: "/admin/overview/recent-users",
        method: "GET",
        params,
      }),
      providesTags: ["admin"],
    }),
    getModerationQueue: builder.query<any, { limit?: number }>({
      query: (params) => ({
        url: "/admin/overview/moderation-queue",
        method: "GET",
        params,
      }),
      providesTags: ["admin"],
    }),
    getAuditLogs: builder.query<
      Envelope<AdminAuditLogRow[]>,
      AdminAuditLogListArgs
    >({
      query: (args) => ({
        url: "/admin/audit-logs",
        method: "GET",
        params: {
          page: args.page ?? 1,
          limit: args.limit ?? 10,
          staffId: args.staffId || undefined,
          entityType: args.entityType || undefined,
          action: args.action || undefined,
        },
      }),
      providesTags: ["admin"],
    }),
    createStaff: builder.mutation<Envelope<any>, any>({
      query: (body) => ({
        url: "/admin/staff",
        method: "POST",
        body,
      }),
      invalidatesTags: ["admin"],
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
      invalidatesTags: ["admin"],
    }),
    updateStaffRole: builder.mutation<
      Envelope<unknown>,
      { userId: string; role: AdminStaffRole }
    >({
      query: ({ userId, role }) => ({
        url: `/admin/staff/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["admin"],
    }),
    getJobReports: builder.query<any, any>({
      query: (params) => ({
        url: "/admin/job-reports",
        method: "GET",
        params,
      }),
      providesTags: ["admin"],
    }),
    getJobReportStats: builder.query<any, void>({
      query: () => ({ url: "/admin/job-reports/stats", method: "GET" }),
      providesTags: ["admin"],
    }),
    updateJobReportStatus: builder.mutation<
      any,
      { reportId: string; status: string }
    >({
      query: ({ reportId, ...body }) => ({
        url: `/admin/job-reports/${reportId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["admin"],
    }),
    deactivateJob: builder.mutation<any, string>({
      query: (jobId) => ({
        url: `/admin/jobs/${jobId}/deactivate`,
        method: "PATCH",
      }),
      invalidatesTags: ["admin"],
    }),
    deleteJobListing: builder.mutation<any, string>({
      query: (jobId) => ({
        url: `/admin/jobs/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin", "jobs"],
    }),
    approveJobAdmin: builder.mutation<Envelope<unknown>, string>({
      query: (jobId) => ({
        url: `/admin/jobs/${jobId}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["admin", "jobs"],
    }),
    getSystemSettings: builder.query<Envelope<any>, void>({
      query: () => ({ url: "/admin/settings", method: "GET" }),
      providesTags: ["admin"],
    }),
    updateSystemSettings: builder.mutation<Envelope<any>, any>({
      query: (body) => ({
        url: "/admin/settings",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["admin"],
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
  useGetStaffListQuery,
  useGetJobSeekerStatsQuery,
  useGetJobSeekersAdminQuery,
  useSuspendJobSeekerAdminMutation,
  useReactivateJobSeekerAdminMutation,
  useDeleteJobSeekerAdminMutation,
  useGetActiveJobsStatsQuery,
  useGetActiveJobsAdminQuery,
  useGetStaffStatsQuery,
  useCreateStaffMutation,
  useSetStaffStatusMutation,
  useUpdateStaffRoleMutation,
  useGetAuditLogsQuery,
  useLazyGetAuditLogsQuery,
  useGetDashboardOverviewStatsQuery,
  useGetRecentUsersQuery,
  useGetModerationQueueQuery,
  useGetJobReportsQuery,
  useGetJobReportStatsQuery,
  useUpdateJobReportStatusMutation,
  useDeactivateJobMutation,
  useDeleteJobListingMutation,
  useApproveJobAdminMutation,
  useGetSystemSettingsQuery,
  useUpdateSystemSettingsMutation,
} = adminApi;

export default adminApi;
