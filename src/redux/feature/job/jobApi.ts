import baseApi from "../../api/baseApi";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (data) => ({
        url: "/jobs",
        method: "POST",
        body: data,
      }),
    }),

    getJobs: builder.query({
      query: () => ({
        url: "/jobs",
        method: "GET",
      }),
    }),

    getJobById: builder.query({
      query: (id: string) => ({
        url: `/jobs/${id}`,
        method: "GET",
      }),
    }),

    updateJob: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteJob: builder.mutation({
      query: (id: string) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useGetJobByIdQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApi;
export default jobApi;
