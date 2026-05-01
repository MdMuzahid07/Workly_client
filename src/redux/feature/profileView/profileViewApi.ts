import baseApi, { tagTypes } from "@/redux/api/baseApi";

export const profileViewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logProfileView: builder.mutation({
      query: (viewedUserId: string) => ({
        url: `/profile-view/log/${viewedUserId}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.profile_views],
    }),
    getProfileViewStats: builder.query({
      query: (params) => ({
        url: "/profile-view/stats",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.profile_views],
    }),
    getRecentVisitors: builder.query({
      query: () => ({
        url: "/profile-view/recent-visitors",
        method: "GET",
      }),
      providesTags: [tagTypes.profile_views],
    }),
  }),
});

export const {
  useLogProfileViewMutation,
  useGetProfileViewStatsQuery,
  useGetRecentVisitorsQuery,
} = profileViewApi;
