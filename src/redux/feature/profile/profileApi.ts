import baseApi from "../../api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProfile: builder.mutation({
      query: (data) => ({
        url: "/profile/create-profile",
        method: "POST",
        body: data,
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/profile/profile",
        method: "GET",
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile/update-profile",
        method: "PATCH",
        body: data,
      }),
    }),

    toggleSaveUnsaveJob: builder.query({
      query: () => ({
        url: "/profile/save-job",
        method: "GET",
      }),
    }),

    getSavedJobs: builder.query({
      query: () => ({
        url: "/profile/saved-jobs",
        method: "GET",
      }),
    }),

    updateSavedJob: builder.mutation({
      query: ({ jobId, ...data }) => ({
        url: `/profile/saved-jobs/${jobId}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useCreateProfileMutation,
  useGetSavedJobsQuery,
  useUpdateSavedJobMutation,
  useToggleSaveUnsaveJobQuery,
} = profileApi;
