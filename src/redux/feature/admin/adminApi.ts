import baseApi from "@/redux/api/baseApi";
import type {
  AdminEmployerRow,
  AdminEmployerStats,
  AdminEmployerStatus,
} from "@/types/adminEmployers";

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
  }),
});

export const {
  useGetEmployerStatsQuery,
  useGetEmployersAdminQuery,
  useVerifyCompanyAdminMutation,
  useSuspendEmployerAdminMutation,
  useReactivateEmployerAdminMutation,
  useDeleteEmployerAdminMutation,
} = adminApi;

export default adminApi;
