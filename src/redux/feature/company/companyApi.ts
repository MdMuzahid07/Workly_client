import baseApi from '../../api/baseApi';

const companyApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createCompany: builder.mutation({
      query: (data) => ({
        url: '/company/new-company',
        method: 'POST',
        body: data,
      }),
    }),

    getCompanies: builder.query({
      query: (params) => ({
        url: '/company/companies',
        method: 'GET',
        params,
      }),
    }),

    getCompanyBySlug: builder.query({
      query: (slug: string) => ({
        url: `/company/company/${slug}`,
        method: 'GET',
      }),
    }),

    updateCompany: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/companies/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    updateCompanyById: builder.mutation({
      query: ({ companyId, ...data }) => ({
        url: `/company/update/${companyId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['company'],
    }),

    deleteCompany: builder.mutation({
      query: (id: string) => ({
        url: `/companies/${id}`,
        method: 'DELETE',
      }),
    }),

    getMyCompany: builder.query({
      query: () => ({
        url: '/company/my-company',
        method: 'GET',
      }),
      providesTags: ['company'],
    }),

    getCompanyOverviewStatistics: builder.query({
      query: () => ({
        url: '/company/overview-statistics',
        method: 'GET',
      }),
      providesTags: ['company'],
    }),

    getEmployerAnalytics: builder.query({
      query: (params: {
        period: string;
        jobSortBy?: string;
        jobSortOrder?: string;
        jobSearch?: string;
        jobPage?: number;
        jobLimit?: number;
      }) => ({
        url: '/company/employer-analytics',
        method: 'GET',
        params,
      }),
      providesTags: ['company'],
    }),

    updateCompanySettings: builder.mutation({
      query: ({ companyId, ...data }) => ({
        url: `/company/${companyId}/settings`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['company'],
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetCompaniesQuery,
  useGetCompanyBySlugQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useGetMyCompanyQuery,
  useGetCompanyOverviewStatisticsQuery,
  useGetEmployerAnalyticsQuery,
  useLazyGetEmployerAnalyticsQuery,
  useUpdateCompanySettingsMutation,
  useUpdateCompanyByIdMutation,
} = companyApi;
export default companyApi;
