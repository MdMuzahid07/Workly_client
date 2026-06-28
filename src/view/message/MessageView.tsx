"use client";
import DashboardMessagesHeader from "@/components/dashboard/dashboard-nav/header/DashboardMessagesHeader";
import DashboardEmployerMessagesHeader from "@/components/dashboard/dashboard-nav/header/DashboardEmployerMessagesHeader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  CheckCircle2,
  Crown,
  DownloadIcon,
  FileIcon,
  MoreVertical,
  Paperclip,
  Send,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import ConversationSidebar from "../../components/main/message/ConversationSidebar";
import MediaGallery from "../../components/main/message/MediaGallery";
import MediaLightbox from "../../components/main/message/MediaLightbox";
import { useSocket } from "../../provider/SocketProvider";
import {
  useBlockUserMutation,
  useDeleteConversationMutation,
  useDeleteMessageMutation,
  useGetConversationsQuery,
  useGetMessageHistoryQuery,
  useMarkAsReadMutation,
  useSendMessageMutation,
} from "../../redux/feature/message/messageApi";
import { useGetProfileQuery } from "../../redux/feature/profile/profileApi";
import { useAppSelector } from "../../redux/hooks";
import MessageViewSkeleton from "../../skeleton/message/inbox/MessageViewSkeleton";

interface Message {
  id: string;
  senderId: string;
  content: string;
  messageType: "TEXT" | "IMAGE" | "FILE" | "LINK" | "AUDIO" | "VIDEO";
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  createdAt: string;
  status: "SENT" | "DELIVERED" | "READ" | "DELETED";
  conversationId?: string;
  sender?: {
    fullName: string;
    profile?: {
      avatarUrl?: string | null;
    } | null;
  } | null;
}

const MessageView = () => {
  const { socket } = useSocket();
  const { data: profileData } = useGetProfileQuery(undefined);
  const currentUser = useAppSelector((state) => state.auth.user);
  const isPremium =
    profileData?.data?.isPremium || currentUser?.isPremium || false;

  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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

  // API Queries
  const { data: conversationsData, isLoading: isConversationsLoading } =
    useGetConversationsQuery(undefined);
  const { data: messagesData, isLoading: isMessagesLoading } =
    useGetMessageHistoryQuery(selectedConversation as string, {
      skip: !selectedConversation,
    });

  const [sendMessage] = useSendMessageMutation();
  const [markAsRead] = useMarkAsReadMutation();
  const [blockUser] = useBlockUserMutation();
  const [deleteConversation] = useDeleteConversationMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  // Sync messages from query and clear on switch
  useEffect(() => {
    if (messagesData?.data) {
      setAllMessages(messagesData.data);
    } else if (isMessagesLoading) {
      setAllMessages([]);
    }
  }, [messagesData, isMessagesLoading, selectedConversation]);

  // Socket event listeners
  useEffect(() => {
    if (!socket || !selectedConversation) return;

    const handleNewMessage = (message: Message) => {
      if (message.conversationId === selectedConversation) {
        setAllMessages((prev) => {
          const exists = prev.some((m) => m.id === message.id);
          if (exists) return prev;
          return [...prev, message];
        });
        markAsRead(selectedConversation);
      }
    };

    const handleTyping = (data: {
      conversationId: string;
      userId: string;
      isTyping: boolean;
    }) => {
      if (
        data.conversationId === selectedConversation &&
        data.userId !== currentUser?.id
      ) {
        setTypingUsers((prev) => ({ ...prev, [data.userId]: data.isTyping }));
      }
    };

    const handleMessageDeleted = (data: {
      messageId: string;
      conversationId: string;
    }) => {
      if (data.conversationId === selectedConversation) {
        setAllMessages((prev) =>
          prev.map((m) =>
            m.id === data.messageId
              ? {
                  ...m,
                  status: "DELETED",
                  content: "This message was deleted",
                  fileUrl: undefined,
                }
              : m,
          ),
        );
      }
    };

    socket.on("new_message", handleNewMessage);
    socket.on("user_typing", handleTyping);
    socket.on("message_deleted", handleMessageDeleted);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("user_typing", handleTyping);
      socket.off("message_deleted", handleMessageDeleted);
    };
  }, [socket, selectedConversation, currentUser?.id, markAsRead]);

  // Join/Leave conversation room
  useEffect(() => {
    if (socket && selectedConversation) {
      socket.emit("join_conversation", selectedConversation);
      markAsRead(selectedConversation);
      return () => {
        socket.emit("leave_conversation", selectedConversation);
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
      const participant = conv.conversationParticipants.find(
        (p) => p.userId !== currentUser?.id,
      );
      const myParticipant = conv.conversationParticipants.find(
        (p) => p.userId === currentUser?.id,
      );

      return {
        id: conv.id,
        participantName: participant?.user?.fullName || "Unknown User",
        participantAvatar:
          participant?.user?.profile?.avatarUrl || "/placeholder.svg",
        participantRole: participant?.user?.profile?.headline || "",
        lastMessage: conv.lastMessage?.content || "No messages yet",
        lastMessageTime: conv.lastMessage?.createdAt
          ? formatDistanceToNow(new Date(conv.lastMessage.createdAt), {
              addSuffix: true,
            })
          : "",
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

  const handleSendMessage = async (payloadOverride?: {
    content?: string;
    messageType?: "TEXT" | "IMAGE" | "FILE" | "LINK";
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
  }) => {
    if ((newMessage.trim() || payloadOverride) && selectedConversation) {
      const messageContent = payloadOverride?.content || newMessage;
      const recipientId = currentConversation?.recipientId;

      try {
        setNewMessage("");
        const tempId = Date.now().toString();
        const optimisticMessage: Message = {
          id: tempId,
          senderId: currentUser?.id || "",
          content: messageContent,
          messageType: payloadOverride?.messageType || "TEXT",
          fileUrl: payloadOverride?.fileUrl,
          fileName: payloadOverride?.fileName,
          fileSize: payloadOverride?.fileSize,
          createdAt: new Date().toISOString(),
          status: "SENT",
          sender: {
            fullName: currentUser?.fullName || "You",
            profile: { avatarUrl: currentUser?.profile?.avatarUrl },
          },
        };
        setAllMessages((prev) => [...prev, optimisticMessage]);

        await sendMessage({
          conversationId: selectedConversation,
          content: messageContent,
          recipientId,
          ...payloadOverride,
        }).unwrap();

        socket?.emit("typing", {
          conversationId: selectedConversation,
          userId: currentUser?.id,
          isTyping: false,
        });
      } catch (err: unknown) {
        console.error("Error sending message:", err);
        const e = err as { data?: { message?: string }; message?: string };
        toast.error(e?.data?.message || "Failed to send message");
        setAllMessages((prev) => prev.filter((m) => m.id.length > 15));
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const isImage = file.type.startsWith("image/");

      let fileUrl = "";
      if (isImage) {
        fileUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      } else {
        fileUrl = URL.createObjectURL(file);
      }

      await handleSendMessage({
        content: isImage ? "Shared an image" : `Shared a file: ${file.name}`,
        messageType: isImage ? "IMAGE" : "FILE",
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
      });

      toast.success("File uploaded successfully");
    } catch {
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleBlockUser = async () => {
    if (!selectedConversation) return;
    try {
      await blockUser(selectedConversation).unwrap();
      toast.success("User block status updated");
    } catch {
      toast.error("Failed to update block status");
    }
  };

  const allImages = useMemo(
    () =>
      allMessages.filter(
        (m) => m.messageType === "IMAGE" && m.status !== "DELETED",
      ),
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
      toast.success("Conversation deleted");
    } catch {
      toast.error("Failed to delete conversation");
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
                status: "DELETED",
                content: "This message was deleted",
                fileUrl: undefined,
              }
            : m,
        ),
      );
      toast.success("Message deleted");
      setMessageToDelete(null);
    } catch {
      toast.error("Failed to delete message");
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (socket && selectedConversation) {
      socket.emit("typing", {
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
              Connect directly with top employers and candidates. Messaging is a
              premium feature designed for serious professionals.
            </p>

            <div className="mb-8 grid grid-cols-1 gap-3 text-left md:grid-cols-2">
              {[
                "Direct 1-on-1 conversations",
                "Share documents and portfolios",
                "Real-time typing indicators",
                "Priority message delivery",
              ].map((feature, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="bg-primary/20 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <CheckCircle2 className="text-primary h-3.5 w-3.5" />
                  </div>
                  <span className="text-foreground text-xs font-bold sm:text-sm">
                    {feature}
                  </span>
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
      {currentUser?.role === "EMPLOYER" ? (
        <DashboardEmployerMessagesHeader />
      ) : (
        <DashboardMessagesHeader />
      )}
      <div className="grid h-[calc(100vh-170px)] grid-cols-1 gap-4 sm:h-[calc(100vh-160px)] lg:grid-cols-12">
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
          className={`xl:col-span-8.5 h-full lg:col-span-8 ${
            !showMobileChat && selectedConversation
              ? "hidden lg:block"
              : showMobileChat || !selectedConversation
                ? "block"
                : "hidden lg:block"
          }`}
        >
          {selectedConversation && currentConversation ? (
            <Card className="bg-card flex h-full flex-col overflow-hidden rounded-2xl border shadow-xs">
              {/* Chat Header */}
              <CardHeader className="border-border/40 bg-card/80 sticky top-0 z-10 border-b p-3.5 backdrop-blur-md sm:p-4">
                <div className="flex items-center justify-between gap-3">
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
                          src={
                            currentConversation.participantAvatar ||
                            "/placeholder.svg"
                          }
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary rounded-xl text-xs font-bold">
                          {currentConversation.participantName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`border-background absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 shadow-2xs ${
                          currentConversation.isOnline
                            ? "bg-emerald-500"
                            : "bg-muted-foreground/40"
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-foreground truncate text-xs font-bold tracking-tight sm:text-sm">
                        {currentConversation.participantName}
                      </h2>
                      <p className="text-muted-foreground truncate text-[11px] font-medium">
                        {Object.values(typingUsers).some(Boolean)
                          ? "Typing..."
                          : currentConversation.participantRole || "Active Now"}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowMediaGallery(true)}
                      className="border-border/60 h-8 w-8 rounded-full sm:h-9 sm:w-9"
                      title="Shared Files"
                    >
                      <Paperclip className="text-muted-foreground h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-border/60 h-8 w-8 rounded-full sm:h-9 sm:w-9"
                        >
                          <MoreVertical className="text-muted-foreground h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 rounded-xl p-2"
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
                          onClick={handleBlockUser}
                        >
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          {currentConversation.isBlocked
                            ? "Unblock User"
                            : "Block User"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-lg text-xs font-medium"
                          onClick={handleDeleteConversation}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Conversation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Body */}
              <CardContent className="bg-muted/5 flex-1 overflow-hidden p-0">
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
                      const isCurrentUser =
                        message.senderId === currentUser?.id;
                      const nextMessage = allMessages[index + 1];
                      const prevMessage = allMessages[index - 1];

                      const isNewGroup =
                        !prevMessage ||
                        prevMessage.senderId !== message.senderId;
                      const isLastInGroup =
                        !nextMessage ||
                        nextMessage.senderId !== message.senderId;

                      return (
                        <div
                          key={message.id}
                          className={`flex w-full ${
                            isCurrentUser ? "justify-end" : "justify-start"
                          } ${isNewGroup ? "pt-2" : "pt-0.5"}`}
                        >
                          <div
                            className={`flex max-w-[85%] items-end gap-2 sm:max-w-[75%] ${
                              isCurrentUser ? "flex-row-reverse" : ""
                            }`}
                          >
                            {!isCurrentUser && (
                              <div className="w-7 shrink-0">
                                {isLastInGroup && (
                                  <Avatar className="h-7 w-7 rounded-lg border shadow-2xs">
                                    <AvatarImage
                                      src={
                                        currentConversation.participantAvatar ||
                                        "/placeholder.svg"
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
                                isCurrentUser ? "items-end" : "items-start"
                              }`}
                            >
                              <div
                                className={`group relative px-4 py-2.5 shadow-2xs transition-all ${
                                  message.status === "DELETED"
                                    ? "bg-muted/50 text-muted-foreground italic"
                                    : isCurrentUser
                                      ? "bg-primary text-primary-foreground rounded-2xl rounded-br-xs"
                                      : "bg-card border-border/60 text-foreground rounded-2xl rounded-bl-xs border"
                                }`}
                              >
                                {isCurrentUser &&
                                  message.status !== "DELETED" && (
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
                                            onClick={() =>
                                              setMessageToDelete(message.id)
                                            }
                                          >
                                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  )}

                                {message.status === "DELETED" ? (
                                  <p className="text-xs leading-relaxed italic opacity-80">
                                    {message.content}
                                  </p>
                                ) : message.messageType === "IMAGE" ? (
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
                                        src={
                                          message.fileUrl || "/placeholder.svg"
                                        }
                                        alt={message.fileName || "Shared image"}
                                        fill
                                        className="object-cover"
                                        unoptimized={
                                          message.fileUrl?.startsWith(
                                            "data:",
                                          ) ||
                                          message.fileUrl?.startsWith("blob:")
                                        }
                                      />
                                    </div>
                                    <p className="text-xs font-medium">
                                      {message.content}
                                    </p>
                                  </div>
                                ) : message.messageType === "FILE" ? (
                                  <div className="bg-background/10 flex items-center gap-2.5 rounded-xl border border-white/10 p-2">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                                      <FileIcon className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="max-w-[150px] truncate text-xs font-bold sm:max-w-[200px]">
                                        {message.fileName}
                                      </p>
                                      <p className="text-[10px] opacity-70">
                                        {message.fileSize
                                          ? (message.fileSize / 1024).toFixed(1)
                                          : 0}{" "}
                                        KB
                                      </p>
                                    </div>
                                    <a
                                      href={message.fileUrl || "#"}
                                      download
                                      className="shrink-0 rounded-full p-1.5 transition-colors hover:bg-white/20"
                                    >
                                      <DownloadIcon className="h-3.5 w-3.5" />
                                    </a>
                                  </div>
                                ) : (
                                  <p className="text-xs leading-relaxed font-medium break-words whitespace-pre-wrap sm:text-sm">
                                    {message.content}
                                  </p>
                                )}
                              </div>

                              {isLastInGroup && (
                                <span className="text-muted-foreground/70 mt-1 px-1 text-[9px] font-semibold uppercase">
                                  {new Date(
                                    message.createdAt,
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}{" "}
                                  • {message.status}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Input Bar */}
              <div className="border-border/40 bg-card/90 sticky bottom-0 z-10 border-t p-2.5 backdrop-blur-md sm:p-3">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="hover:bg-muted text-muted-foreground h-9 w-9 shrink-0 rounded-full"
                  >
                    <Paperclip
                      className={`h-4 w-4 ${isUploading ? "animate-spin" : ""}`}
                    />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={handleTyping}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="bg-muted/30 focus-visible:ring-primary/20 border-border/60 h-10 flex-1 rounded-full border px-4 text-xs font-medium focus-visible:ring-2 sm:text-sm"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!newMessage.trim()}
                    className="h-9 w-9 shrink-0 rounded-full p-0 shadow-xs"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="bg-card flex h-full flex-col items-center justify-center rounded-2xl border p-6 text-center shadow-xs">
              <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Send className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold tracking-tight sm:text-xl">
                Your Messages
              </h3>
              <p className="text-muted-foreground mt-1 max-w-xs text-xs leading-relaxed sm:text-sm">
                Select a conversation from the sidebar to view your message
                history and start chatting.
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
              Are you sure you want to delete this message? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMessage}
              className="bg-destructive hover:bg-destructive/90 rounded-xl"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MessageView;
