import baseApi from '../../api/baseApi';

export const legalApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getLegalDocument: builder.query({
      query: (slug: string) => `/legal/${slug}`,
      providesTags: ['legal'],
    }),
    upsertLegalDocument: builder.mutation({
      query: ({ slug, ...data }) => ({
        url: `/legal/${slug}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['legal'],
    }),
  }),
});

export const { useGetLegalDocumentQuery, useUpsertLegalDocumentMutation } = legalApi;
