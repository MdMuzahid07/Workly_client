import baseApi from "@/redux/api/baseApi";
import type { NotificationItem } from "@/types/notification";

type Envelope<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: unknown;
};

export type GetMyNotificationsArgs = {
  page?: number;
  limit?: number;
  type?: string;
  isRead?: boolean;
};

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query<
      Envelope<NotificationItem[]>,
      GetMyNotificationsArgs | void
    >({
      query: (args) => ({
        url: "/notification/my",
        method: "GET",
        params: args ?? {},
      }),
      providesTags: ["notifications"],
    }),

    getUnreadCount: builder.query<Envelope<{ unreadCount: number }>, void>({
      query: () => ({
        url: "/notification/unread-count",
        method: "GET",
      }),
      providesTags: ["notifications"],
    }),

    markNotificationRead: builder.mutation<Envelope<NotificationItem>, string>({
      query: (id) => ({
        url: `/notification/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["notifications"],
    }),

    markAllNotificationsRead: builder.mutation<
      Envelope<{ updated: number }>,
      void
    >({
      query: () => ({
        url: "/notification/mark-all-read",
        method: "PATCH",
      }),
      invalidatesTags: ["notifications"],
    }),

    deleteNotification: builder.mutation<Envelope<{ deleted: true }>, string>({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const {
  useGetMyNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useDeleteNotificationMutation,
} = notificationApi;

export default notificationApi;
