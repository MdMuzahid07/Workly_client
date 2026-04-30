import baseApi, { tagTypes } from "@/redux/api/baseApi";

export const jobViewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logJobView: builder.mutation({
      query: (jobId: string) => ({
        url: `/job-view/log/${jobId}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.job_views],
    }),
    getJobViewHistory: builder.query({
      query: () => ({
        url: "/job-view/history",
        method: "GET",
      }),
      providesTags: [tagTypes.job_views],
    }),
  }),
});

export const { useLogJobViewMutation, useGetJobViewHistoryQuery } = jobViewApi;
