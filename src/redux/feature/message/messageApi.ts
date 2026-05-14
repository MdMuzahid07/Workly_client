import baseApi from "../../api/baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: "/message/conversations",
        method: "GET",
      }),
      providesTags: ["Conversations"],
    }),
    getMessageHistory: builder.query({
      query: (conversationId: string) => ({
        url: `/message/history/${conversationId}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Messages", id: arg }],
    }),
    sendMessage: builder.mutation({
      query: ({ conversationId, content, recipientId }) => ({
        url: `/message/send/${conversationId}`,
        method: "POST",
        body: { content, recipientId },
      }),
      invalidatesTags: (result, error, arg) => [
        "Conversations",
        { type: "Messages", id: arg.conversationId },
      ],
    }),
    createConversation: builder.mutation({
      query: (data) => ({
        url: "/message/create-conversation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Conversations"],
    }),
    markAsRead: builder.mutation({
      query: (conversationId) => ({
        url: `/message/read/${conversationId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Conversations"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessageHistoryQuery,
  useSendMessageMutation,
  useCreateConversationMutation,
  useMarkAsReadMutation,
} = messageApi;

export default messageApi;
