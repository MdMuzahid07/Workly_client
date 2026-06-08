import baseApi, { tagTypes } from "@/redux/api/baseApi";

export interface JobViewItem {
  id: string;
  userId?: string | null;
  jobId: string;
  viewedAt: string;
  createdAt: string;
  job: {
    id: string;
    title: string;
    company: {
      id: string;
      name: string;
      logoUrl: string | null;
      location: string | null;
    } | null;
    JobSkill: Array<{ id: string; skillName: string }>;
    location: string;
    salaryMin: number;
    salaryMax: number;
    currency: string;
    jobType: string;
    createdAt: string;
    requirements: string;
    isFeatured: boolean;
    isRemote: boolean;
    isSaved?: boolean;
  };
}

export interface JobViewHistoryResponse {
  success: boolean;
  message: string;
  data: JobViewItem[];
}

export const jobViewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logJobView: builder.mutation<unknown, string>({
      query: (jobId: string) => ({
        url: `/job-view/log/${jobId}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.job_views],
    }),
    getJobViewHistory: builder.query<
      JobViewHistoryResponse,
      { searchTerm?: string; jobType?: string } | void
    >({
      query: (params) => ({
        url: "/job-view/history",
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.job_views],
    }),
  }),
});

export const { useLogJobViewMutation, useGetJobViewHistoryQuery } = jobViewApi;
