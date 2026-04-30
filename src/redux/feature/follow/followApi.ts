import baseApi, { tagTypes } from "@/redux/api/baseApi";

export const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followCompany: builder.mutation({
      query: (companyId: string) => ({
        url: `/follow/${companyId}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.follow, tagTypes.company],
    }),
    unfollowCompany: builder.mutation({
      query: (companyId: string) => ({
        url: `/follow/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.follow, tagTypes.company],
    }),
    getFollowedCompanies: builder.query({
      query: () => ({
        url: "/follow/my-follows",
        method: "GET",
      }),
      providesTags: [tagTypes.follow],
    }),
    isFollowing: builder.query({
      query: (companyId: string) => ({
        url: `/follow/status/${companyId}`,
        method: "GET",
      }),
      providesTags: (result, error, companyId) => [
        { type: tagTypes.follow, id: companyId },
      ],
    }),
  }),
});

export const {
  useFollowCompanyMutation,
  useUnfollowCompanyMutation,
  useGetFollowedCompaniesQuery,
  useIsFollowingQuery,
} = followApi;
