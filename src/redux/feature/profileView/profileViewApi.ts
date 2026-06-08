import baseApi, { tagTypes } from "@/redux/api/baseApi";

export interface ProfileViewStats {
  totalViews: number;
  periodViews: number;
  viewsLastMonth: number;
  uniqueCompaniesCount: number;
  chartData: { date: string; count: number }[];
  period: string;
}

export interface ProfileViewStatsResponse {
  success: boolean;
  message: string;
  data: ProfileViewStats;
}

export interface VisitorView {
  id: string;
  viewedUserId: string;
  viewerId: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  viewedAt: string;
  createdAt: string;
  viewer: {
    id: string;
    fullName: string | null;
    email: string;
    role: string;
    company?: {
      id: string;
      name: string;
      logoUrl: string | null;
      location: string | null;
    } | null;
    profile?: {
      avatarUrl: string | null;
      location: string | null;
      headline: string | null;
    } | null;
  } | null;
}

export interface RecentVisitorsResponse {
  success: boolean;
  message: string;
  data: VisitorView[];
}

export interface LogProfileViewResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export const profileViewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logProfileView: builder.mutation<LogProfileViewResponse, string>({
      query: (viewedUserId: string) => ({
        url: `/profile-view/log/${viewedUserId}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.profile_views],
    }),

    getProfileViewStats: builder.query<
      ProfileViewStatsResponse,
      { period?: string } | void
    >({
      query: (params) => ({
        url: "/profile-view/stats",
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.profile_views],
    }),

    getRecentVisitors: builder.query<
      RecentVisitorsResponse,
      { period?: string } | void
    >({
      query: (params) => ({
        url: "/profile-view/recent-visitors",
        method: "GET",
        params: params || {},
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
