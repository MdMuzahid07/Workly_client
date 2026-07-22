import baseApi from '../../api/baseApi';

const resumeApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    listResumes: builder.query({
      query: () => ({
        url: '/resume/resumes',
        method: 'GET',
      }),
      providesTags: ['resume'],
    }),

    uploadResume: builder.mutation({
      query: (data) => ({
        url: '/resume/resumes',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['resume', 'profile'],
    }),

    setDefaultResume: builder.mutation({
      query: (resumeId) => ({
        url: `/resume/resumes/${resumeId}/default`,
        method: 'PATCH',
      }),
      invalidatesTags: ['resume', 'profile'],
    }),

    deleteResume: builder.mutation({
      query: (resumeId) => ({
        url: `/resume/resumes/${resumeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['resume', 'profile'],
    }),
  }),
});

export const {
  useListResumesQuery,
  useUploadResumeMutation,
  useSetDefaultResumeMutation,
  useDeleteResumeMutation,
} = resumeApi;

export default resumeApi;
