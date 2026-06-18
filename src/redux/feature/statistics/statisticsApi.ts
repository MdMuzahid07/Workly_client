import baseApi from "../../api/baseApi";
import { ApiResponse } from "../../../types/api";

export interface LandingStats {
  activeJobs: number;
  companies: number;
  jobSeekers: number;
  activeNow: number;
  trendingKeywords: string[];
}

export const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLandingStats: builder.query<ApiResponse<LandingStats>, void>({
      query: () => ({
        url: "/statistics",
        method: "GET",
      }),
      keepUnusedDataFor: 300, // Keep data cached client-side for 5 minutes
    }),
  }),
});

export const { useGetLandingStatsQuery } = statisticsApi;
export default statisticsApi;
