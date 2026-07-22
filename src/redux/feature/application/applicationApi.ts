import baseApi from '../../api/baseApi';

const applicationApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createApplication: builder.mutation({
      query: (data) => ({
        url: '/application/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['applications'],
    }),
    getMyApplications: builder.query({
      query: (params) => ({
        url: '/application/me',
        method: 'GET',
        params,
      }),
      providesTags: ['applications'],
    }),
    getMyApplicationSummary: builder.query({
      query: () => ({
        url: '/application/me/summary',
        method: 'GET',
      }),
      providesTags: ['applications'],
    }),
    getApplicationStats: builder.query({
      query: (params) => ({
        url: '/application/stats',
        method: 'GET',
        params,
      }),
      providesTags: ['applications'],
    }),
    getMyCompanyApplications: builder.query({
      query: (params) => ({
        url: '/application/my-company-applications',
        method: 'GET',
        params,
      }),
      providesTags: ['applications'],
    }),
    getMyCompanyApplicationSummary: builder.query({
      query: (jobId?: string) => ({
        url: '/application/my-company-summary',
        method: 'GET',
        params: jobId && jobId !== 'all' ? { jobId } : undefined,
      }),
      providesTags: ['applications'],
    }),
    getApplicationById: builder.query({
      query: (id: string) => ({
        url: `/application/${id}`,
        method: 'GET',
      }),
      providesTags: ['applications'],
    }),
    updateApplicationStatus: builder.mutation({
      query: ({ id, status, rejectionReason }) => ({
        url: `/application/${id}/status`,
        method: 'PATCH',
        body: { status, rejectionReason },
      }),
      invalidatesTags: ['applications'],
    }),
    withdrawApplication: builder.mutation({
      query: (id: string) => ({
        url: `/application/${id}/withdraw`,
        method: 'PATCH',
        body: {},
      }),
      invalidatesTags: ['applications'],
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useGetMyApplicationsQuery,
  useGetMyApplicationSummaryQuery,
  useGetApplicationStatsQuery,
  useGetMyCompanyApplicationsQuery,
  useGetMyCompanyApplicationSummaryQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
  useWithdrawApplicationMutation,
} = applicationApi;
export default applicationApi;
