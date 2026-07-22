import baseApi from '../../api/baseApi';

const messageApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: '/message/conversations',
        method: 'GET',
      }),
      providesTags: ['Conversations'],
    }),
    getMessageHistory: builder.query({
      query: (conversationId: string) => ({
        url: `/message/history/${conversationId}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Messages', id: arg }],
    }),
    sendMessage: builder.mutation({
      query: ({
        conversationId,
        content,
        recipientId,
        messageType,
        fileUrl,
        fileName,
        fileSize,
      }) => ({
        url: `/message/send/${conversationId}`,
        method: 'POST',
        body: {
          content,
          recipientId,
          messageType,
          fileUrl,
          fileName,
          fileSize,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        'Conversations',
        { type: 'Messages', id: arg.conversationId },
      ],
    }),
    createConversation: builder.mutation({
      query: (data) => ({
        url: '/message/create-conversation',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Conversations'],
    }),
    markAsRead: builder.mutation({
      query: (conversationId) => ({
        url: `/message/read/${conversationId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Conversations'],
    }),
    blockUser: builder.mutation({
      query: (conversationId) => ({
        url: `/message/block/${conversationId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Conversations'],
    }),
    deleteConversation: builder.mutation({
      query: (conversationId) => ({
        url: `/message/delete/${conversationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Conversations'],
    }),
    deleteMessage: builder.mutation({
      query: (messageId: string) => ({
        url: `/message/message/${messageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Conversations'],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessageHistoryQuery,
  useSendMessageMutation,
  useCreateConversationMutation,
  useMarkAsReadMutation,
  useBlockUserMutation,
  useDeleteConversationMutation,
  useDeleteMessageMutation,
} = messageApi;

export default messageApi;
