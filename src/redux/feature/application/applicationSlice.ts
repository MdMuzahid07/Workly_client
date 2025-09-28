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

    getApplications: builder.query({
      query: () => ({
        url: "/application/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateApplicationMutation, useGetApplicationsQuery } =
  applicationApi;
export default applicationApi;
