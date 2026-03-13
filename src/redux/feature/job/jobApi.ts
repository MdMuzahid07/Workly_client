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
    }),

    updateJob: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/job/update/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteJob: builder.mutation({
      query: (id: string) => ({
        url: `/job/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useGetMyJobsQuery,
  useGetJobByIdQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApi;
export default jobApi;
