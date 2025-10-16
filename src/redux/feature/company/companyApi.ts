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

    deleteCompany: builder.mutation({
      query: (id: string) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetCompaniesQuery,
  useGetCompanyBySlugQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
export default companyApi;
