import baseApi from '../../api/baseApi';

const categoryApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (params?: { search?: string; type?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.search) searchParams.append('search', params.search);
        if (params?.type) searchParams.append('type', params.type);
        const queryString = searchParams.toString();
        return {
          url: `/category/categories${queryString ? `?${queryString}` : ''}`,
          method: 'GET',
        };
      },
      providesTags: ['categories'],
    }),

    getCategoryBySlug: builder.query({
      query: (slug: string) => ({
        url: `/category/categories/${slug}`,
        method: 'GET',
      }),
      providesTags: (result, error, slug) => [{ type: 'categories', id: slug }],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: '/category/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['categories'],
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, ...data }) => ({
        url: `/category/categories/${categoryId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        'categories',
        { type: 'categories', id: categoryId },
      ],
    }),

    toggleCategoryStatus: builder.mutation({
      query: (categoryId: string) => ({
        url: `/category/categories/${categoryId}/toggle-status`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, categoryId) => [
        'categories',
        { type: 'categories', id: categoryId },
      ],
    }),

    deleteCategory: builder.mutation({
      query: (categoryId: string) => ({
        url: `/category/categories/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['categories'],
    }),

    getCategoryStatistics: builder.query({
      query: (params?: { search?: string; active?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.search) searchParams.append('search', params.search);
        if (params?.active) searchParams.append('active', params.active);

        const queryString = searchParams.toString();
        return {
          url: `/category/category-statistics${queryString ? `?${queryString}` : ''}`,
          method: 'GET',
        };
      },
      providesTags: ['categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryBySlugQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useToggleCategoryStatusMutation,
  useDeleteCategoryMutation,
  useGetCategoryStatisticsQuery,
} = categoryApi;

export default categoryApi;
