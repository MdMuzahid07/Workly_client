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
  }),
});

export const { useCreateJobMutation } = jobApi;
export default jobApi;
