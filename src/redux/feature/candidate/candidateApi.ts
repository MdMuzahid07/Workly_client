import baseApi from '../../api/baseApi';

const candidateApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCandidates: builder.query({
      query: (params) => ({
        url: '/candidate',
        method: 'GET',
        params,
      }),
      providesTags: ['candidates'],
    }),

    getCandidateById: builder.query({
      query: (id: string) => ({
        url: `/candidate/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'candidates', id }],
    }),

    toggleSaveCandidate: builder.mutation({
      query: (candidateId: string) => ({
        url: '/candidate/save',
        method: 'POST',
        body: { candidateId },
      }),
      invalidatesTags: ['candidates'],
    }),

    getSavedCandidates: builder.query({
      query: (params) => ({
        url: '/candidate/saved',
        method: 'GET',
        params,
      }),
      providesTags: ['candidates'],
    }),
  }),
});

export const {
  useGetCandidatesQuery,
  useGetCandidateByIdQuery,
  useToggleSaveCandidateMutation,
  useGetSavedCandidatesQuery,
} = candidateApi;
