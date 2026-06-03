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
      { page?: number; limit?: number } | void
    >({
      query: (arg) => {
        const page = arg && arg.page ? arg.page : 1;
        const limit = arg && arg.limit ? arg.limit : 10;
        return {
          url: `/payments/transactions?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["payments"],
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
  useGetPaymentStatsQuery,
} = paymentApi;
