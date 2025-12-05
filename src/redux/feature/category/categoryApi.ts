import baseApi from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (search?: string) => {
        const params = search ? `?search=${encodeURIComponent(search)}` : "";
        return {
          url: `/category/categories${params}`,
          method: "GET",
        };
      },
      providesTags: ["categories"],
    }),

    getCategoryBySlug: builder.query({
      query: (slug: string) => ({
        url: `/category/categories/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "categories", id: slug }],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, ...data }) => ({
        url: `/category/categories/${categoryId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        "categories",
        { type: "categories", id: categoryId },
      ],
    }),

    toggleCategoryStatus: builder.mutation({
      query: (categoryId: string) => ({
        url: `/category/categories/${categoryId}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, categoryId) => [
        "categories",
        { type: "categories", id: categoryId },
      ],
    }),

    deleteCategory: builder.mutation({
      query: (categoryId: string) => ({
        url: `/category/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
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
} = categoryApi;

export default categoryApi;
