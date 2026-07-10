'use client';
import DashboardEmployerMessagesHeader from '@/components/dashboard/dashboard-nav/header/DashboardEmployerMessagesHeader';
import DashboardMessagesHeader from '@/components/dashboard/dashboard-nav/header/DashboardMessagesHeader';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { downloadMessageAttachment, normalizeCloudinaryPdfUrl } from '@/lib/pdfSource';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowLeft,
  CheckCircle2,
  Crown,
  DownloadIcon,
  Eye,
  FileIcon,
  Loader2,
  MoreVertical,
  Paperclip,
  Send,
  ShieldAlert,
  Trash2,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import ConversationSidebar from '../../components/main/message/ConversationSidebar';
import MediaGallery from '../../components/main/message/MediaGallery';
import MediaLightbox from '../../components/main/message/MediaLightbox';
import { useCanAccess } from '../../hooks/useEntitlements';
import { useSocket } from '../../provider/SocketProvider';
import messageApi, {
  useBlockUserMutation,
  useDeleteConversationMutation,
  useDeleteMessageMutation,
  useGetConversationsQuery,
  useGetMessageHistoryQuery,
  useMarkAsReadMutation,
  useSendMessageMutation,
} from '../../redux/feature/message/messageApi';
import { useUploadSingleFileMutation } from '../../redux/feature/upload/uploadApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import MessageViewSkeleton from '../../skeleton/message/inbox/MessageViewSkeleton';

interface Message {
  id: string;
  clientKey?: string;
  senderId: string;
  content: string;
  messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'LINK' | 'AUDIO' | 'VIDEO';
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  createdAt: string;
  status: 'SENT' | 'DELIVERED' | 'READ' | 'DELETED';
  conversationId?: string;
  sender?: {
    fullName: string;
    profile?: {
      avatarUrl?: string | null;
    } | null;
  } | null;
}

const EmojiPickerButton = dynamic(() => import('../../components/shared/EmojiPickerButton'), {
  ssr: false,
});

const MessagePdfViewer = dynamic(() => import('../../components/shared/MessagePdfViewer'), {
  ssr: false,
});

const MessageViewContent = () => {
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const currentUser = useAppSelector((state) => state.auth.user);
  const { hasAccess: canMessageEmployer } = useCanAccess('canMessageEmployer');
  const { hasAccess: canMessage } = useCanAccess('canMessage');
  const isPremium = currentUser?.role === 'EMPLOYER' ? canMessage : canMessageEmployer;

  const searchParams = useSearchParams();
  const queryConversationId = searchParams.get('conversationId') || searchParams.get('active');

  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  useEffect(() => {
    if (queryConversationId) {
      setSelectedConversation(queryConversationId);
      setShowMobileChat(true);
    }
  }, [queryConversationId]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    index: number;
  }>({
    isOpen: false,
    index: 0,
  });

  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteConvModal, setShowDeleteConvModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{
    url: string;
    name: string;
    messageId?: string;
  } | null>(null);

  // API Queries
  const { data: conversationsData, isLoading: isConversationsLoading } =
    useGetConversationsQuery(undefined);
  const { data: messagesData, isLoading: isMessagesLoading } = useGetMessageHistoryQuery(
    selectedConversation as string,
    {
      skip: !selectedConversation,
    },
  );

  const [sendMessage] = useSendMessageMutation();
  const [markAsRead] = useMarkAsReadMutation();
  const [blockUser] = useBlockUserMutation();
  const [deleteConversation] = useDeleteConversationMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [uploadSingleFile] = useUploadSingleFileMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);
  const [isUploading, setIsUploading] = useState(false);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [attachedFile, setAttachedFile] = useState<{
    url: string;
    name: string;
    size: number;
    type: 'IMAGE' | 'FILE';
  } | null>(null);

  // Reset initial load state when active conversation changes
  useEffect(() => {
    isInitialLoad.current = true;
  }, [selectedConversation]);

  // Sync messages from query and clear on switch
  useEffect(() => {
    if (messagesData?.data) {
      setAllMessages(messagesData.data);
    } else if (isMessagesLoading) {
      setAllMessages([]);
    }
  }, [messagesData, isMessagesLoading, selectedConversation]);

  // Global Socket event listeners (for sidebar/notifications)
  useEffect(() => {
    if (!socket) return;

    const handleNewConversationMessage = () => {
      // Invalidate RTK query cache to pull fresh conversation previews
      dispatch(messageApi.util.invalidateTags(['Conversations']));
    };

    socket.on('new_conversation_message', handleNewConversationMessage);

    return () => {
      socket.off('new_conversation_message', handleNewConversationMessage);
    };
  }, [socket, dispatch]);

  // Conversation-specific Socket event listeners
  useEffect(() => {
    if (!socket || !selectedConversation) return;

    const handleNewMessage = (message: Message) => {
      if (message.conversationId === selectedConversation) {
        setAllMessages((prev) => {
          const exists = prev.some((m) => m.id === message.id);
          if (exists) return prev;

          // If the message is from the current user, replace the optimistic one!
          if (message.senderId === currentUser?.id) {
            const optIndex = prev.findIndex(
              (m) =>
                m.senderId === currentUser?.id &&
                m.id.length < 15 &&
                (m.content === message.content || (m.fileName && m.fileName === message.fileName)),
            );
            if (optIndex !== -1) {
              const next = [...prev];
              next[optIndex] = {
                ...message,
                clientKey: prev[optIndex].id, // Keep the tempId as the stable React key
              };
              return next;
            }
          }

          return [...prev, message];
        });
        markAsRead(selectedConversation);
        dispatch(messageApi.util.invalidateTags(['Conversations']));
      }
    };

    const handleTyping = (data: { conversationId: string; userId: string; isTyping: boolean }) => {
      if (data.conversationId === selectedConversation && data.userId !== currentUser?.id) {
        setTypingUsers((prev) => ({ ...prev, [data.userId]: data.isTyping }));
      }
    };

    const handleMessageDeleted = (data: { messageId: string; conversationId: string }) => {
      if (data.conversationId === selectedConversation) {
        setAllMessages((prev) =>
          prev.map((m) =>
            m.id === data.messageId
              ? {
                  ...m,
                  status: 'DELETED',
                  content: 'This message was deleted',
                  fileUrl: undefined,
                }
              : m,
          ),
        );
      }
    };

    const handleMessagesRead = (data: { conversationId: string; userId: string }) => {
      if (data.conversationId === selectedConversation && data.userId !== currentUser?.id) {
        setAllMessages((prev) =>
          prev.map((m) =>
            m.senderId === currentUser?.id && m.status !== 'READ'
              ? {
                  ...m,
                  status: 'READ' as const,
                  readAt: new Date().toISOString(),
                }
              : m,
          ),
        );
      }
    };

    socket.on('new_message', handleNewMessage);
    socket.on('user_typing', handleTyping);
    socket.on('message_deleted', handleMessageDeleted);
    socket.on('messages_read', handleMessagesRead);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('user_typing', handleTyping);
      socket.off('message_deleted', handleMessageDeleted);
      socket.off('messages_read', handleMessagesRead);
    };
  }, [socket, selectedConversation, currentUser?.id, markAsRead, dispatch]);

  // Join/Leave conversation room
  useEffect(() => {
    if (socket && selectedConversation) {
      socket.emit('join_conversation', selectedConversation);
      markAsRead(selectedConversation);
      return () => {
        socket.emit('leave_conversation', selectedConversation);
      };
    }
    return undefined;
  }, [socket, selectedConversation, markAsRead]);

  const conversations = (conversationsData?.data || []).map(
    (conv: {
      id: string;
      conversationParticipants: {
        userId: string;
        isBlocked?: boolean;
        user?: {
          fullName?: string;
          profile?: {
            avatarUrl?: string | null;
            headline?: string | null;
          } | null;
        } | null;
      }[];
      lastMessage?: { content?: string; createdAt?: string } | null;
    }) => {
      const participant = conv.conversationParticipants.find((p) => p.userId !== currentUser?.id);
      const myParticipant = conv.conversationParticipants.find((p) => p.userId === currentUser?.id);

      return {
        id: conv.id,
        participantName: participant?.user?.fullName || 'Unknown User',
        participantAvatar: participant?.user?.profile?.avatarUrl || '/placeholder.svg',
        participantRole: participant?.user?.profile?.headline || '',
        lastMessage: conv.lastMessage?.content || 'No messages yet',
        lastMessageTime: conv.lastMessage?.createdAt
          ? formatDistanceToNow(new Date(conv.lastMessage.createdAt), {
              addSuffix: true,
            })
          : '',
        unreadCount: 0,
        isOnline: false,
        recipientId: participant?.userId,
        isBlocked: myParticipant?.isBlocked || false,
      };
    },
  );

  type ConversationItem = (typeof conversations)[number];

  const filteredConversations: ConversationItem[] = conversations.filter(
    (conv: ConversationItem) =>
      conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const currentConversation: ConversationItem | undefined = conversations.find(
    (conv: ConversationItem) => conv.id === selectedConversation,
  );

  const isRecipientTyping = currentConversation?.recipientId
    ? !!typingUsers[currentConversation.recipientId]
    : false;
  // Scroll to bottom when messages are updated or when the recipient starts typing
  useEffect(() => {
    if (allMessages.length === 0 && !isRecipientTyping) return;

    const lastMessage = allMessages[allMessages.length - 1];
    const isMyMessage = lastMessage?.senderId === currentUser?.id;
    const shouldScrollInstantly = isInitialLoad.current || isMyMessage;

    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: shouldScrollInstantly ? 'auto' : 'smooth',
      });
      isInitialLoad.current = false;
    }, 10); // Reduced delay to 10ms for extreme responsiveness

    return () => clearTimeout(timer);
  }, [allMessages, isRecipientTyping, currentUser?.id]);

  const handleSendMessage = async (payloadOverride?: {
    content?: string;
    messageType?: 'TEXT' | 'IMAGE' | 'FILE' | 'LINK';
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
  }) => {
    if ((newMessage.trim() || attachedFile || payloadOverride) && selectedConversation) {
      const messageContent =
        payloadOverride?.content ||
        newMessage.trim() ||
        (attachedFile
          ? attachedFile.type === 'IMAGE'
            ? 'Shared an image'
            : `Shared a file: ${attachedFile.name}`
          : '');
      const recipientId = currentConversation?.recipientId;

      const messageType = payloadOverride?.messageType || attachedFile?.type || 'TEXT';
      const fileUrl = payloadOverride?.fileUrl || attachedFile?.url || null;
      const fileName = payloadOverride?.fileName || attachedFile?.name || null;
      const fileSize = payloadOverride?.fileSize || attachedFile?.size || null;

      try {
        setNewMessage('');
        setAttachedFile(null); // Clear attachment on send
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
        const tempId = Date.now().toString();
        const optimisticMessage: Message = {
          id: tempId,
          senderId: currentUser?.id || '',
          content: messageContent,
          messageType,
          fileUrl,
          fileName,
          fileSize,
          createdAt: new Date().toISOString(),
          status: 'SENT',
          sender: {
            fullName: currentUser?.fullName || 'You',
            profile: { avatarUrl: currentUser?.profile?.avatarUrl },
          },
        };
        setAllMessages((prev) => [...prev, optimisticMessage]);

        // Stop typing indicator on message submission
        socket?.emit('typing', {
          conversationId: selectedConversation,
          userId: currentUser?.id,
          isTyping: false,
        });

        // Use high-performance Socket.io sending when connected
        if (socket && socket.connected) {
          await new Promise<{
            success: boolean;
            data?: Message;
            error?: string;
          }>((resolve, reject) => {
            socket.emit(
              'send_message',
              {
                conversationId: selectedConversation,
                content: messageContent,
                recipientId,
                messageType,
                fileUrl,
                fileName,
                fileSize,
              },
              (response: { success: boolean; data?: Message; error?: string }) => {
                if (response && response.success) {
                  resolve(response);
                } else {
                  reject(new Error(response?.error || 'Failed to send message'));
                }
              },
            );
          });
        } else {
          // Fallback to HTTP POST mutation when socket is not available
          await sendMessage({
            conversationId: selectedConversation,
            content: messageContent,
            recipientId,
            messageType,
            fileUrl: fileUrl || undefined,
            fileName: fileName || undefined,
            fileSize: fileSize || undefined,
          }).unwrap();
        }
      } catch (err: unknown) {
        console.error('Error sending message:', err);
        const e = err as { data?: { message?: string }; message?: string };
        toast.error(e?.data?.message || e?.message || 'Failed to send message');
        // Remove optimistic message on error
        setAllMessages((prev) => prev.filter((m) => m.id.length > 15));
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const isImage = file.type.startsWith('image/');

      const formData = new FormData();
      formData.append('file', file);

      // Secure upload directly to Cloudinary via server API
      const response = await uploadSingleFile(formData).unwrap();
      const fileUrl = response?.data?.url;

      if (!fileUrl) {
        throw new Error('Failed to get file URL from server response');
      }

      setAttachedFile({
        url: fileUrl,
        name: file.name,
        size: file.size,
        type: isImage ? 'IMAGE' : 'FILE',
      });

      toast.success('File attached successfully');
    } catch (err: unknown) {
      console.error('File upload error:', err);
      const e = err as { data?: { message?: string }; message?: string };
      toast.error(e?.data?.message || e?.message || 'Failed to upload file');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleBlockUser = async () => {
    if (!selectedConversation) return;
    try {
      const wasBlocked = currentConversation?.isBlocked;
      await blockUser(selectedConversation).unwrap();
      toast.success(
        wasBlocked
          ? `Unblocked ${currentConversation?.participantName || 'user'}`
          : `Blocked ${currentConversation?.participantName || 'user'}`,
      );
    } catch {
      toast.error('Failed to update block status');
    } finally {
      setShowBlockModal(false);
    }
  };

  const allImages = useMemo(
    () => allMessages.filter((m) => m.messageType === 'IMAGE' && m.status !== 'DELETED'),
    [allMessages],
  );

  const openLightbox = (imageIndex: number) => {
    setLightboxState({ isOpen: true, index: imageIndex });
  };

  const handleDeleteConversation = async () => {
    if (!selectedConversation) return;
    try {
      await deleteConversation(selectedConversation).unwrap();
      setSelectedConversation(null);
      setShowMobileChat(false);
      toast.success('Conversation deleted');
    } catch {
      toast.error('Failed to delete conversation');
    } finally {
      setShowDeleteConvModal(false);
    }
  };

  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;
    try {
      await deleteMessage(messageToDelete).unwrap();
      setAllMessages((prev) =>
        prev.map((m) =>
          m.id === messageToDelete
            ? {
                ...m,
                status: 'DELETED',
                content: 'This message was deleted',
                fileUrl: undefined,
              }
            : m,
        ),
      );
      toast.success('Message deleted');
      setMessageToDelete(null);
    } catch {
      toast.error('Failed to delete message');
    }
  };

  // Autogrow textarea height dynamically based on its content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to allow scrollHeight to shrink/re-calculate correctly
    textarea.style.height = 'auto';
    // Set new height based on scrollHeight, capped at 128px (max-h-32 equivalent)
    textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
  }, [newMessage, selectedConversation]);

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    if (socket && selectedConversation) {
      socket.emit('typing', {
        conversationId: selectedConversation,
        userId: currentUser?.id,
        isTyping: e.target.value.length > 0,
      });
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    setShowMobileChat(true);
  };

  const handleBackToConversations = () => {
    setShowMobileChat(false);
  };

  if (!isPremium) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <Card className="max-w-2xl overflow-hidden rounded-2xl border shadow-sm">
          <CardContent className="p-8 text-center sm:p-12">
            <div className="bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24">
              <Crown className="text-primary h-10 w-10 sm:h-12 sm:w-12" />
            </div>
            <h1 className="text-foreground mb-3 text-2xl font-black tracking-tight sm:text-4xl">
              Unlock Professional Messaging
            </h1>
            <p className="text-muted-foreground mx-auto mb-8 max-w-md text-sm leading-relaxed font-medium sm:text-lg">
              Connect directly with top employers and candidates. Messaging is a premium feature
              designed for serious professionals.
            </p>

            <div className="mb-8 grid grid-cols-1 gap-3 text-left md:grid-cols-2">
              {[
                'Direct 1-on-1 conversations',
                'Share documents and portfolios',
                'Real-time typing indicators',
                'Priority message delivery',
              ].map((feature, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="bg-primary/20 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <CheckCircle2 className="text-primary h-3.5 w-3.5" />
                  </div>
                  <span className="text-foreground text-xs font-bold sm:text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground h-12 w-full rounded-2xl px-8 text-sm font-black shadow-lg sm:h-14 sm:w-auto sm:text-lg"
              >
                Upgrade to Premium
                <Crown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isConversationsLoading) {
    return <MessageViewSkeleton />;
  }

  return (
    <div className="min-h-screen px-3.5 sm:px-6">
      {showMobileChat && (
        <style>{`
          @media (max-width: 1023px) {
            button[aria-label="Open sidebar"] {
              display: none !important;
            }
            header.dashboard-header {
              display: none !important;
            }
          }
        `}</style>
      )}
      {currentUser?.role === 'EMPLOYER' ? (
        <DashboardEmployerMessagesHeader />
      ) : (
        <DashboardMessagesHeader />
      )}
      <div className="grid h-[calc(100vh-130px)] grid-cols-1 gap-4 sm:h-[calc(100vh-120px)] lg:grid-cols-12">
        {/* Conversations Sidebar */}
        <ConversationSidebar
          showMobileChat={showMobileChat}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          filteredConversations={filteredConversations}
          selectedConversation={selectedConversation}
          handleConversationSelect={handleConversationSelect}
        />

        {/* Active Chat Panel */}
        <div
          className={`xl:col-span-8.5 h-full min-h-0 rounded-2xl lg:col-span-8 ${
            showMobileChat
              ? 'bg-background fixed inset-0 z-40 h-screen w-screen lg:relative lg:inset-auto lg:z-0 lg:block lg:h-full lg:w-auto'
              : 'hidden lg:block'
          }`}
        >
          {selectedConversation && currentConversation ? (
            <Card className="bg-card flex h-full flex-col gap-0 overflow-hidden rounded-none border-0 p-0 shadow-none lg:rounded-2xl lg:border lg:shadow-xs">
              {/* Chat Header */}
              <div className="border-border/40 bg-card/80 sticky top-0 z-10 flex h-11 min-h-11 items-center border-b px-3.5 py-0 backdrop-blur-md sm:h-14 sm:min-h-14 sm:px-4 lg:h-16 lg:min-h-16 lg:rounded-t-2xl lg:px-4 lg:py-0">
                <div className="flex w-full items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBackToConversations}
                      className="hover:bg-muted h-9 w-9 shrink-0 rounded-full lg:hidden"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="relative shrink-0">
                      <Avatar className="border-background h-10 w-10 rounded-xl border shadow-2xs sm:h-11 sm:w-11">
                        <AvatarImage
                          src={currentConversation.participantAvatar || '/placeholder.svg'}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary rounded-xl text-xs font-black sm:text-sm">
                          {currentConversation.participantName
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`border-background absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 shadow-2xs ${
                          currentConversation.isOnline ? 'bg-emerald-500' : 'bg-muted-foreground/40'
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-foreground truncate text-xs font-bold sm:text-sm">
                        {currentConversation.participantName}
                      </h2>
                      {isRecipientTyping ? (
                        <p className="animate-pulse truncate text-[10px] font-bold text-emerald-500 sm:text-xs">
                          typing...
                        </p>
                      ) : (
                        currentConversation.participantRole && (
                          <p className="text-muted-foreground truncate text-[10px] font-semibold sm:text-xs">
                            {currentConversation.participantRole}
                          </p>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowMediaGallery(true)}
                      className="hover:bg-muted text-muted-foreground h-9 w-9 shrink-0 rounded-full"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-muted text-muted-foreground h-9 w-9 shrink-0 rounded-full"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="border-border/60 min-w-40 rounded-xl p-1"
                      >
                        <DropdownMenuItem
                          className="cursor-pointer rounded-lg text-xs font-medium"
                          onClick={() => setShowMediaGallery(true)}
                        >
                          <Paperclip className="mr-2 h-4 w-4" />
                          Shared Files
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer rounded-lg text-xs font-medium"
                          onClick={() => setShowBlockModal(true)}
                        >
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          {currentConversation.isBlocked ? 'Unblock User' : 'Block User'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-lg text-xs font-medium"
                          onClick={() => setShowDeleteConvModal(true)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Conversation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Messages Body */}
              <CardContent className="bg-muted/5 min-h-0 flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-4 sm:p-6">
                  <div className="flex flex-col space-y-4 pb-4">
                    <div className="relative my-4 flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="border-border/40 w-full border-t" />
                      </div>
                      <span className="bg-background border-border/60 text-muted-foreground relative z-10 rounded-full border px-4 py-1 text-[10px] font-bold tracking-wider uppercase shadow-2xs">
                        Chat Started
                      </span>
                    </div>

                    {allMessages.map((message, index) => {
                      const isCurrentUser = message.senderId === currentUser?.id;
                      const nextMessage = allMessages[index + 1];
                      const prevMessage = allMessages[index - 1];

                      const isNewGroup = !prevMessage || prevMessage.senderId !== message.senderId;
                      const isLastInGroup =
                        !nextMessage || nextMessage.senderId !== message.senderId;

                      return (
                        <motion.div
                          key={message.clientKey || message.id}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          className={`flex w-full ${
                            isCurrentUser ? 'justify-end' : 'justify-start'
                          } ${isNewGroup ? 'pt-2' : 'pt-0.5'}`}
                        >
                          <div
                            className={`flex max-w-[85%] items-end gap-2 sm:max-w-[75%] ${
                              isCurrentUser ? 'flex-row-reverse' : ''
                            }`}
                          >
                            {!isCurrentUser && (
                              <div className="w-7 shrink-0">
                                {isLastInGroup && (
                                  <Avatar className="h-7 w-7 rounded-lg border shadow-2xs">
                                    <AvatarImage
                                      src={
                                        currentConversation.participantAvatar || '/placeholder.svg'
                                      }
                                    />
                                    <AvatarFallback className="text-[9px] font-bold">
                                      {currentConversation.participantName[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                              </div>
                            )}

                            <div
                              className={`flex flex-col ${
                                isCurrentUser ? 'items-end' : 'items-start'
                              }`}
                            >
                              <div
                                className={`group relative px-4 py-2.5 shadow-2xs transition-all ${
                                  message.status === 'DELETED'
                                    ? 'bg-muted/50 text-muted-foreground italic'
                                    : isCurrentUser
                                      ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-xs'
                                      : 'bg-card border-border/60 text-foreground rounded-2xl rounded-bl-xs border'
                                }`}
                              >
                                {isCurrentUser && message.status !== 'DELETED' && (
                                  <div className="absolute top-1/2 -left-8 flex -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="hover:bg-muted h-7 w-7 rounded-full"
                                        >
                                          <MoreVertical className="text-muted-foreground h-3.5 w-3.5" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          className="text-destructive cursor-pointer text-xs font-medium"
                                          onClick={() => setMessageToDelete(message.id)}
                                        >
                                          <Trash2 className="mr-2 h-3.5 w-3.5" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                )}

                                {message.status === 'DELETED' ? (
                                  <p className="text-xs leading-relaxed italic opacity-80">
                                    {message.content}
                                  </p>
                                ) : message.messageType === 'IMAGE' ? (
                                  <div
                                    className="cursor-pointer space-y-1.5"
                                    onClick={() => {
                                      const idx = allImages.findIndex(
                                        (img: Message) => img.id === message.id,
                                      );
                                      openLightbox(idx);
                                    }}
                                  >
                                    <div className="border-border/20 relative aspect-video w-full min-w-[180px] overflow-hidden rounded-xl border shadow-2xs sm:min-w-[220px]">
                                      <Image
                                        src={message.fileUrl || '/placeholder.svg'}
                                        alt={message.fileName || 'Shared image'}
                                        fill
                                        className="object-cover"
                                        unoptimized={
                                          message.fileUrl?.startsWith('data:') ||
                                          message.fileUrl?.startsWith('blob:')
                                        }
                                      />
                                    </div>
                                    <p className="text-xs font-medium">{message.content}</p>
                                  </div>
                                ) : message.messageType === 'FILE' ? (
                                  <div className="bg-background/10 flex items-center gap-2.5 rounded-xl border border-white/10 p-2">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                                      <FileIcon className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      {message.fileName?.toLowerCase().endsWith('.pdf') ? (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setSelectedPdf({
                                              url: message.fileUrl
                                                ? normalizeCloudinaryPdfUrl(message.fileUrl)
                                                : '',
                                              name: message.fileName ?? 'Document',
                                              messageId: message.id,
                                            })
                                          }
                                          className="block max-w-[150px] cursor-pointer truncate text-left text-xs font-bold hover:underline sm:max-w-[200px]"
                                        >
                                          {message.fileName}
                                        </button>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            downloadMessageAttachment(
                                              message.id,
                                              message.fileName || 'Document',
                                            )
                                          }
                                          className="block max-w-[150px] cursor-pointer truncate text-left text-xs font-bold hover:underline sm:max-w-[200px]"
                                        >
                                          {message.fileName}
                                        </button>
                                      )}
                                      <p className="text-[10px] opacity-70">
                                        {message.fileSize
                                          ? (message.fileSize / 1024).toFixed(1)
                                          : 0}{' '}
                                        KB
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      {message.fileName?.toLowerCase().endsWith('.pdf') && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setSelectedPdf({
                                              url: message.fileUrl
                                                ? normalizeCloudinaryPdfUrl(message.fileUrl)
                                                : '',
                                              name: message.fileName ?? 'Document',
                                              messageId: message.id,
                                            })
                                          }
                                          className="shrink-0 cursor-pointer rounded-full p-1.5 transition-colors hover:bg-white/20"
                                          title="View PDF"
                                        >
                                          <Eye className="h-3.5 w-3.5" />
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        onClick={() =>
                                          downloadMessageAttachment(
                                            message.id,
                                            message.fileName || 'Document',
                                          )
                                        }
                                        className="shrink-0 cursor-pointer rounded-full p-1.5 transition-colors hover:bg-white/20"
                                        title="Download File"
                                      >
                                        <DownloadIcon className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-xs leading-relaxed font-medium wrap-break-word whitespace-pre-wrap sm:text-sm">
                                    {message.content}
                                  </p>
                                )}
                              </div>

                              {isLastInGroup && (
                                <span className="text-muted-foreground/70 mt-1 px-1 text-[9px] font-semibold uppercase">
                                  {new Date(message.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}{' '}
                                  • {message.status}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                    {isRecipientTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="flex w-full justify-start pt-2"
                      >
                        <div className="flex max-w-[85%] items-end gap-2 sm:max-w-[75%]">
                          <div className="w-7 shrink-0">
                            <Avatar className="h-7 w-7 rounded-lg border shadow-2xs">
                              <AvatarImage
                                src={currentConversation.participantAvatar || '/placeholder.svg'}
                              />
                              <AvatarFallback className="text-[9px] font-bold">
                                {currentConversation.participantName[0]}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="bg-card border-border/60 text-foreground flex items-center gap-1 rounded-2xl rounded-bl-xs border px-4 py-3 shadow-2xs">
                            <span className="bg-muted-foreground/60 h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]" />
                            <span className="bg-muted-foreground/60 h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]" />
                            <span className="bg-muted-foreground/60 h-2 w-2 animate-bounce rounded-full" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Input Bar */}
              <div className="border-border/40 bg-card/90 sticky bottom-0 z-10 border-t p-2.5 backdrop-blur-md sm:p-3 lg:rounded-b-2xl">
                <div className="flex items-end gap-2">
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                  />

                  {/* Unified Input Card Container */}
                  <div className="bg-muted/40 hover:bg-muted/60 focus-within:bg-background border-border/80 focus-within:border-primary/60 focus-within:ring-primary/10 flex min-h-[44px] flex-1 flex-col gap-1.5 rounded-2xl border p-[3px] shadow-2xs transition-all duration-300 focus-within:ring-3">
                    {/* Pending Attachment Preview */}
                    {attachedFile && (
                      <div className="px-2 pt-1.5 pb-0.5">
                        <div className="bg-background border-border/60 group relative flex max-w-[280px] items-center gap-2 rounded-xl border p-2 shadow-2xs">
                          {attachedFile.type === 'IMAGE' ? (
                            <div className="border-border/40 bg-muted relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border">
                              <Image
                                src={attachedFile.url}
                                alt="Attachment preview"
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                              <FileIcon className="h-5 w-5" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1 pr-4">
                            <p className="text-foreground truncate text-xs font-bold">
                              {attachedFile.name}
                            </p>
                            <p className="text-muted-foreground text-[10px]">
                              {(attachedFile.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setAttachedFile(null)}
                            className="bg-destructive hover:bg-destructive/95 text-destructive-foreground absolute -top-1.5 -right-1.5 cursor-pointer rounded-full p-0.5 opacity-90 shadow-xs transition-all hover:opacity-100"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex w-full items-end gap-1.5">
                      <div className="flex items-center gap-0.5 self-center pl-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={isUploading}
                          onClick={() => fileInputRef.current?.click()}
                          className="hover:bg-muted text-muted-foreground hover:text-foreground h-8 w-8 shrink-0 rounded-xl transition-all"
                        >
                          {isUploading ? (
                            <Loader2 className="text-primary h-4 w-4 animate-spin" />
                          ) : (
                            <Paperclip className="h-4 w-4" />
                          )}
                        </Button>
                        <EmojiPickerButton
                          className="hover:bg-muted text-muted-foreground hover:text-foreground h-8 w-8 shrink-0 rounded-xl transition-all"
                          onEmojiSelect={(emoji) => setNewMessage((prev) => prev + emoji)}
                        />
                      </div>

                      <textarea
                        ref={textareaRef}
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={handleTyping}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        rows={1}
                        className="placeholder:text-muted-foreground/80 max-h-32 flex-1 resize-none [scrollbar-width:none] overflow-y-auto bg-transparent px-3 py-1.5 text-xs leading-relaxed font-medium outline-hidden md:text-sm [&::-webkit-scrollbar]:hidden"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!newMessage.trim() && !attachedFile}
                    className="h-11 w-11 shrink-0 rounded-2xl p-0 shadow-xs transition-all duration-300 hover:shadow-md active:scale-95 disabled:scale-100"
                  >
                    <Send className="h-4.5 w-4.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="bg-card flex h-full flex-col items-center justify-center rounded-2xl border p-6 text-center shadow-xs">
              <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Send className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold tracking-tight sm:text-xl">Your Messages</h3>
              <p className="text-muted-foreground mt-1 max-w-xs text-xs leading-relaxed sm:text-sm">
                Select a conversation from the sidebar to view your message history and start
                chatting.
              </p>
            </Card>
          )}
        </div>
      </div>

      {currentConversation && (
        <MediaGallery
          isOpen={showMediaGallery}
          onClose={() => setShowMediaGallery(false)}
          messages={allMessages}
          participantName={currentConversation.participantName}
          onImageClick={(idx) => {
            setShowMediaGallery(false);
            openLightbox(idx);
          }}
        />
      )}

      <MediaLightbox
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState({ ...lightboxState, isOpen: false })}
        mediaItems={allImages}
        initialIndex={lightboxState.index}
      />

      <AlertDialog
        open={!!messageToDelete}
        onOpenChange={(open) => !open && setMessageToDelete(null)}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMessage}
              className="bg-destructive hover:bg-destructive/90 rounded-full"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Block/Unblock Confirmation Modal */}
      <AlertDialog open={showBlockModal} onOpenChange={setShowBlockModal}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {currentConversation?.isBlocked ? 'Unblock User' : 'Block User'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {currentConversation?.isBlocked
                ? `Are you sure you want to unblock ${currentConversation?.participantName || 'this user'}? They will be able to send you messages again.`
                : `Are you sure you want to block ${currentConversation?.participantName || 'this user'}? They will no longer be able to send you messages or contact you.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBlockUser}
              className={
                currentConversation?.isBlocked
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground rounded-full'
                  : 'bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full'
              }
            >
              {currentConversation?.isBlocked ? 'Unblock User' : 'Block User'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Conversation Confirmation Modal */}
      <AlertDialog open={showDeleteConvModal} onOpenChange={setShowDeleteConvModal}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this entire conversation with{' '}
              {currentConversation?.participantName || 'this user'}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConversation}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full"
            >
              Delete Conversation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Inline PDF viewer — triggered by Eye button on PDF attachment bubbles */}
      {selectedPdf && (
        <MessagePdfViewer
          isOpen={!!selectedPdf}
          onClose={() => setSelectedPdf(null)}
          pdfUrl={selectedPdf.url}
          messageId={selectedPdf.messageId}
          title={selectedPdf.name}
        />
      )}
    </div>
  );
};

const MessageView = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="text-muted-foreground text-sm font-semibold">
            Loading conversations...
          </div>
        </div>
      }
    >
      <MessageViewContent />
    </Suspense>
  );
};

export default MessageView;
