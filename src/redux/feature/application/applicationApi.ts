import baseApi from "../../api/baseApi";

const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createApplication: builder.mutation({
      query: (data) => ({
        url: "/application/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["applications"],
    }),
    getMyApplications: builder.query({
      query: (params) => ({
        url: "/application/me",
        method: "GET",
        params,
      }),
      providesTags: ["applications"],
    }),
    getMyApplicationSummary: builder.query({
      query: () => ({
        url: "/application/me/summary",
        method: "GET",
      }),
      providesTags: ["applications"],
    }),
    getApplicationStats: builder.query({
      query: (params) => ({
        url: "/application/stats",
        method: "GET",
        params,
      }),
      providesTags: ["applications"],
    }),
    withdrawApplication: builder.mutation({
      query: (id: string) => ({
        url: `/application/${id}/withdraw`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: ["applications"],
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useGetMyApplicationsQuery,
  useGetMyApplicationSummaryQuery,
  useGetApplicationStatsQuery,
  useWithdrawApplicationMutation,
} = applicationApi;
export default applicationApi;
