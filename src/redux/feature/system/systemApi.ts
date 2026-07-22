import baseApi from '@/redux/api/baseApi';

interface PublicStatus {
  maintenanceMode: boolean;
  message: string | null;
  setAt: string | null;
  estimatedEnd: string | null;
}

interface SystemSettings {
  id: string;
  aiMatchmaking: boolean;
  publicRegistration: boolean;
  globalNotifications: boolean;
  extendedAuditLogging: boolean;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  maintenanceSetAt: string | null;
  maintenanceSetBy: string | null;
  maintenanceEstimatedEnd: string | null;
  siteName: string;
  siteSlogan: string | null;
  siteLogo: string | null;
  supportEmail: string | null;
  qrCodeUrl: string;
  footerSocials: { platform: string; url: string }[] | null;
  updatedAt: string;
}

interface ToggleMaintenancePayload {
  enabled: boolean;
  message?: string;
  maintenanceEstimatedEnd?: string | null;
}

const systemApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Public — no auth required. Polled as Socket.io fallback.
    getPublicStatus: builder.query<PublicStatus, void>({
      query: () => '/public/status',
      transformResponse: (res: { success: boolean; data: PublicStatus }) => res.data,
      providesTags: ['admin'],
      keepUnusedDataFor: 30,
    }),

    // Admin only
    getAdminSettings: builder.query<SystemSettings, void>({
      query: () => '/admin/settings',
      transformResponse: (res: { success: boolean; data: SystemSettings }) => res.data,
      providesTags: ['admin'],
    }),

    // Admin only — the toggle
    toggleMaintenanceMode: builder.mutation<SystemSettings, ToggleMaintenancePayload>({
      query: (body) => ({
        url: '/admin/settings/maintenance',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['admin'],
    }),
  }),
});

export const {
  useGetPublicStatusQuery,
  useGetAdminSettingsQuery,
  useToggleMaintenanceModeMutation,
} = systemApi;

export default systemApi;
