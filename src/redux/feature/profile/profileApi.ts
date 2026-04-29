import baseApi from "../../api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProfile: builder.mutation({
      query: (data) => ({
        url: "/profile/create-profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/profile/profile",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),

    toggleSaveUnsaveJob: builder.mutation({
      query: (jobId: string) => ({
        url: "/profile/save-job",
        method: "POST",
        body: { jobId },
      }),
      invalidatesTags: ["profile"],
    }),

    getSavedJobs: builder.query({
      query: (params) => ({
        url: "/profile/saved-jobs",
        method: "GET",
        params,
      }),
      providesTags: ["profile"],
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
  useToggleSaveUnsaveJobMutation,
} = profileApi;
