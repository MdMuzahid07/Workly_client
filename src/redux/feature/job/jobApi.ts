import baseApi from "../../api/baseApi";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (data) => ({
        url: "/job/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),

    getJobs: builder.query({
      query: (params) => ({
        url: "/job/jobs",
        method: "GET",
        params,
      }),
      providesTags: ["jobs"],
    }),

    getSearchSuggestions: builder.query({
      query: (params: { keyword?: string; location?: string }) => ({
        url: "/job/suggestions",
        method: "GET",
        params,
      }),
    }),

    getMyJobs: builder.query({
      query: (params) => ({
        url: "/job/my-jobs",
        method: "GET",
        params,
      }),
      providesTags: ["jobs"],
    }),

    getJobById: builder.query({
      query: (id: string) => ({
        url: `/job/job/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "jobs", id }],
    }),

    updateJob: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/job/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),

    getRecommendedJobs: builder.query({
      query: (params) => ({
        url: "/job/recommended",
        method: "GET",
        params,
      }),
      providesTags: ["jobs"],
    }),

    deleteJob: builder.mutation({
      query: (id: string) => ({
        url: `/job/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobs"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useGetMyJobsQuery,
  useGetRecommendedJobsQuery,
  useGetJobByIdQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetSearchSuggestionsQuery,
} = jobApi;
export default jobApi;
