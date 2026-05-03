import baseApi from "../../api/baseApi";

const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation({
      query: (data) => ({
        url: "/company/new-company",
        method: "POST",
        body: data,
      }),
    }),

    getCompanies: builder.query({
      query: () => ({
        url: "/company/companies",
        method: "GET",
      }),
    }),

    getCompanyBySlug: builder.query({
      query: (slug: string) => ({
        url: `/company/companies/${slug}`,
        method: "GET",
      }),
    }),

    updateCompany: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/companies/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    updateCompanyById: builder.mutation({
      query: ({ companyId, ...data }) => ({
        url: `/company/update/${companyId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["company"],
    }),

    deleteCompany: builder.mutation({
      query: (id: string) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
    }),

    getMyCompany: builder.query({
      query: () => ({
        url: "/company/my-company",
        method: "GET",
      }),
      providesTags: ["company"],
    }),

    getCompanyOverviewStatistics: builder.query({
      query: () => ({
        url: "/company/overview-statistics",
        method: "GET",
      }),
      providesTags: ["company"],
    }),

    getEmployerAnalytics: builder.query({
      query: (period: string) => ({
        url: "/company/employer-analytics",
        method: "GET",
        params: { period },
      }),
      providesTags: ["company"],
    }),

    updateCompanySettings: builder.mutation({
      query: ({ companyId, ...data }) => ({
        url: `/company/settings/${companyId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["company"],
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
  useUpdateCompanySettingsMutation,
  useUpdateCompanyByIdMutation,
} = companyApi;
export default companyApi;
