/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from '../../api/baseApi';

export const planApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPlans: builder.query<any, { type?: 'employer' | 'candidate'; isActive?: boolean } | void>({
      query: (arg) => {
        const type = arg && arg.type ? `type=${arg.type}` : '';
        const isActive = arg && arg.isActive !== undefined ? `isActive=${arg.isActive}` : '';
        const queryParams = [type, isActive].filter(Boolean).join('&');
        return {
          url: `/plans?${queryParams}`,
          method: 'GET',
        };
      },
      providesTags: ['plans'],
    }),
    createPlan: builder.mutation({
      query: (planData) => ({
        url: '/plans',
        method: 'POST',
        body: planData,
      }),
      invalidatesTags: ['plans'],
    }),
    updatePlan: builder.mutation({
      query: ({ id, ...planData }) => ({
        url: `/plans/${id}`,
        method: 'PATCH',
        body: planData,
      }),
      invalidatesTags: ['plans'],
    }),
    togglePlanStatus: builder.mutation({
      query: (id: string) => ({
        url: `/plans/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: ['plans'],
    }),
    deletePlan: builder.mutation({
      query: (id: string) => ({
        url: `/plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['plans'],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useTogglePlanStatusMutation,
  useDeletePlanMutation,
} = planApi;
export default planApi;
