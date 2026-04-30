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
      invalidatesTags: ["profile"],
    }),

    // Education
    addEducation: builder.mutation({
      query: (data) => ({
        url: "/education/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    updateEducation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/education/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/education/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["profile"],
    }),

    // Work Experience
    addWorkExperience: builder.mutation({
      query: (data) => ({
        url: "/work-experience/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    updateWorkExperience: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/work-experience/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    deleteWorkExperience: builder.mutation({
      query: (id) => ({
        url: `/work-experience/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["profile"],
    }),

    // Certification
    addCertification: builder.mutation({
      query: (data) => ({
        url: "/certification/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    updateCertification: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/certification/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    deleteCertification: builder.mutation({
      query: (id) => ({
        url: `/certification/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["profile"],
    }),

    // Project
    addProject: builder.mutation({
      query: (data) => ({
        url: "/project/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/project/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/project/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["profile"],
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
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useAddWorkExperienceMutation,
  useUpdateWorkExperienceMutation,
  useDeleteWorkExperienceMutation,
  useAddCertificationMutation,
  useUpdateCertificationMutation,
  useDeleteCertificationMutation,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = profileApi;
