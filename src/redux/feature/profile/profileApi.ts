import baseApi from '../../api/baseApi';
import { updateUser } from '../auth/authSlice';

export interface CompanyInfo {
  name: string;
  logo?: string;
  logoUrl?: string;
}

export interface JobSkillInfo {
  id: string;
  skillName: string;
}

export interface SavedJobNestedJob {
  id: string;
  title: string;
  company: CompanyInfo;
  location: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  jobType: string;
  createdAt: string;
  requirements: string;
  JobSkill: JobSkillInfo[];
  isFeatured: boolean;
  isRemote: boolean;
  isSaved?: boolean;
}

export interface SavedJobItem {
  id: string;
  userId: string;
  jobId: string;
  createdAt: string;
  updatedAt: string;
  job: SavedJobNestedJob;
}

export interface SavedJobsResponseMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  companies: string[];
  expiringSoonCount: number;
}

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProfile: builder.mutation({
      query: (data) => ({
        url: '/profile/create-profile',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),

    getProfile: builder.query({
      query: () => ({
        url: '/profile/profile',
        method: 'GET',
      }),
      providesTags: ['profile'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(updateUser(data.data));
          }
        } catch (err) {
          console.error('Failed to fetch profile', err);
        }
      },
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/profile/update-profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),

    toggleSaveUnsaveJob: builder.mutation({
      query: (jobId: string) => ({
        url: '/profile/save-job',
        method: 'POST',
        body: { jobId },
      }),
      // Invalidate both the profile cache AND the specific job's cache entry.
      // This causes `getJobById(jobId)` to re-fetch, updating the `isSaved`
      // flag on the job details page without requiring a manual page refresh.
      invalidatesTags: (result, error, jobId) => ['profile', { type: 'jobs', id: jobId }],
    }),

    getSavedJobs: builder.query<
      { data: SavedJobItem[]; meta: SavedJobsResponseMeta },
      {
        page?: number;
        limit?: number;
        searchTerm?: string;
        company?: string;
        status?: string;
      } | void
    >({
      query: (params) => ({
        url: '/profile/saved-jobs',
        method: 'GET',
        params: params || {},
      }),
      providesTags: ['profile'],
    }),

    updateSavedJob: builder.mutation({
      query: ({ jobId, ...data }) => ({
        url: `/profile/saved-jobs/${jobId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),

    // Education
    addEducation: builder.mutation({
      query: (data) => ({
        url: '/education/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),
    updateEducation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/education/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/education/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['profile'],
    }),

    // Work Experience
    addWorkExperience: builder.mutation({
      query: (data) => ({
        url: '/work-experience/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),
    updateWorkExperience: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/work-experience/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),
    deleteWorkExperience: builder.mutation({
      query: (id) => ({
        url: `/work-experience/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['profile'],
    }),

    // Certification
    addCertification: builder.mutation({
      query: (data) => ({
        url: '/certification/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),
    updateCertification: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/certification/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),
    deleteCertification: builder.mutation({
      query: (id) => ({
        url: `/certification/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['profile'],
    }),

    // Project
    addProject: builder.mutation({
      query: (data) => ({
        url: '/project/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/project/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/project/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['profile'],
    }),
    getUserSettings: builder.query({
      query: () => ({
        url: '/profile/settings',
        method: 'GET',
      }),
      providesTags: ['profile'],
    }),
    updateUserSettings: builder.mutation({
      query: (data) => ({
        url: '/profile/settings',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['profile'],
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
  useGetUserSettingsQuery,
  useUpdateUserSettingsMutation,
} = profileApi;

export default profileApi;
