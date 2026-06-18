import baseApi from "../../api/baseApi";
import { ApiResponse } from "../../../types/api";
import { MySubscriptionResponse } from "../../../types/subscription";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMySubscription: builder.query<ApiResponse<MySubscriptionResponse>, void>(
      {
        query: () => ({
          url: "/subscriptions/me",
          method: "GET",
        }),
        providesTags: ["subscriptions"],
      },
    ),
    cancelSubscription: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/subscriptions/cancel",
        method: "POST",
      }),
      invalidatesTags: ["subscriptions"],
    }),
    adminAssignPlan: builder.mutation<
      ApiResponse<null>,
      { userId: string; planId: string }
    >({
      query: (body) => ({
        url: "/subscriptions/admin/assign",
        method: "POST",
        body,
      }),
      invalidatesTags: ["subscriptions"],
    }),
  }),
});

export const {
  useGetMySubscriptionQuery,
  useCancelSubscriptionMutation,
  useAdminAssignPlanMutation,
} = subscriptionApi;
export default subscriptionApi;
