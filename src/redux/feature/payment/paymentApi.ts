/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payments/initiate",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["payments"],
    }),
    getTransactions: builder.query<
      any,
      { page?: number; limit?: number; search?: string; status?: string } | void
    >({
      query: (arg) => {
        const params = new URLSearchParams();
        const page = arg && arg.page ? arg.page : 1;
        const limit = arg && arg.limit ? arg.limit : 10;
        params.append("page", String(page));
        params.append("limit", String(limit));
        if (arg && arg.search) {
          params.append("search", arg.search);
        }
        if (arg && arg.status) {
          params.append("status", arg.status);
        }
        return {
          url: `/payments/transactions?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["payments"],
    }),
    // Lazy query used for CSV export — fetches all matching rows (no pagination)
    getTransactionsExport: builder.query<
      any,
      { search?: string; status?: string } | void
    >({
      query: (arg) => {
        const params = new URLSearchParams();
        params.append("page", "1");
        params.append("limit", "5000"); // hard upper cap for CSV
        if (arg && arg.search) {
          params.append("search", arg.search);
        }
        if (arg && arg.status) {
          params.append("status", arg.status);
        }
        return {
          url: `/payments/transactions?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getPaymentStats: builder.query({
      query: () => ({
        url: "/payments/stats",
        method: "GET",
      }),
      providesTags: ["payments"],
    }),
  }),
});

export const {
  useInitiatePaymentMutation,
  useGetTransactionsQuery,
  useLazyGetTransactionsExportQuery,
  useGetPaymentStatsQuery,
} = paymentApi;
