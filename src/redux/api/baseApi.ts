import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { logout, setCredentials } from '../feature/auth/authSlice';
import { RootState } from '../store';

const url = process.env.NEXT_PUBLIC_BACKEND_URL
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`
  : 'http://localhost:5000/api/v1';

const baseQuery = fetchBaseQuery({
  baseUrl: url,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const fromStore = (getState() as RootState).auth.accessToken;
    const fromStorage =
      typeof window !== 'undefined' ? window.localStorage.getItem('accessToken') : null;
    const token = fromStore || fromStorage;

    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});

/**
 * Custom base query that transparently refreshes the access token on 401
 * responses using the /auth/refresh endpoint, then retries the original request.
 */
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 && url) {
    const refreshResponse = await fetch(`${url}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshResponse.ok) {
      const data = (await refreshResponse.json()) as {
        data?: { accessToken?: string };
      };

      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;

        api.dispatch(
          setCredentials({
            user,
            accessToken: data.data.accessToken,
          }),
        );

        // Retry the original request with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const tagTypes = {
  jobs: 'jobs',
  profile: 'profile',
  user: 'user',
  applications: 'applications',
  categories: 'categories',
  company: 'company',
  notifications: 'notifications',
  candidates: 'candidates',
  resume: 'resume',
  follow: 'follow',
  profile_views: 'profile_views',
  job_views: 'job_views',
  legal: 'legal',
  admin: 'admin',
  Conversations: 'Conversations',
  Messages: 'Messages',
  payments: 'payments',
  plans: 'plans',
  subscriptions: 'subscriptions',
} as const;

export type TagType = (typeof tagTypes)[keyof typeof tagTypes];

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: Object.values(tagTypes),
  endpoints: () => ({}),
});

export default baseApi;
