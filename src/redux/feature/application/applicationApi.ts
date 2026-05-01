import baseApi from "../../api/baseApi";

const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createApplication: builder.mutation({
      query: (data) => ({
        url: "/application/create",
        method: "POST",
        body: data,
      }),
    }),
    getMyApplications: builder.query({
      query: (params) => ({
        url: "/application/me",
        method: "GET",
        params,
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
  }),
});

export const {
  useCreateApplicationMutation,
  useGetMyApplicationsQuery,
  useGetApplicationStatsQuery,
} = applicationApi;
export default applicationApi;
