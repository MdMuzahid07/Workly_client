/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
  DownloadIcon,
  FileIcon,
  Info,
  MoreVertical,
  Paperclip,
  Send,
  ShieldAlert,
  Smile,
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
  useGetConversationsQuery,
  useGetMessageHistoryQuery,
  useMarkAsReadMutation,
  useSendMessageMutation,
} from "../../redux/feature/message/messageApi";
import { useAppSelector } from "../../redux/hooks";
import MessageViewSkeleton from "../../skeleton/message/MessageViewSkeleton";

interface Message {
  id: string;
  senderId: string;
  content: string;
  messageType: "TEXT" | "IMAGE" | "FILE" | "LINK";
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  createdAt: string;
  status: string;
  sender?: {
    fullName: string;
    profile?: {
      avatarUrl?: string | null;
    } | null;
  } | null;
}

const MessageView = () => {
  const { socket } = useSocket();
  const currentUser = useAppSelector((state) => state.auth.user);

  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showMediaGallery, setShowMediaGallery] = useState(false);
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

    const handleNewMessage = (message: any) => {
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

    socket.on("new_message", handleNewMessage);
    socket.on("user_typing", handleTyping);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("user_typing", handleTyping);
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

  const conversations = (conversationsData?.data || []).map((conv: any) => {
    const participant = conv.conversationParticipants.find(
      (p: any) => p.userId !== currentUser?.id,
    );
    const myParticipant = conv.conversationParticipants.find(
      (p: any) => p.userId === currentUser?.id,
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
  });

  const filteredConversations = conversations.filter(
    (conv: any) =>
      conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const currentConversation = conversations.find(
    (conv: any) => conv.id === selectedConversation,
  );

  const handleSendMessage = async (payloadOverride?: any) => {
    if ((newMessage.trim() || payloadOverride) && selectedConversation) {
      const messageContent = payloadOverride?.content || newMessage;
      const recipientId = currentConversation?.recipientId;

      try {
        setNewMessage("");
        // Optimistic update for UI feedback
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

        // Notify socket about typing stop
        socket?.emit("typing", {
          conversationId: selectedConversation,
          userId: currentUser?.id,
          isTyping: false,
        });
      } catch (err: any) {
        console.error("Error sending message:", err);
        toast.error(err?.data?.message || "Failed to send message");
        // Remove optimistic message on failure
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
        // Convert to Base64 for persistence in this demo/mock environment
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
    } catch (err) {
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
    } catch (err) {
      toast.error("Failed to update block status");
    }
  };

  const allImages = useMemo(
    () => allMessages.filter((m) => m.messageType === "IMAGE"),
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
      toast.success("Conversation deleted");
    } catch (err) {
      toast.error("Failed to delete conversation");
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
    setSelectedConversation(null);
  };

  if (isConversationsLoading) {
    return <MessageViewSkeleton />;
  }

  return (
    <div className="bg-background min-h-screen md:pt-4">
      {/* message header  */}
      {showMobileChat && selectedConversation && currentConversation && (
        <div className="border-border/40 bg-background/60 sticky top-0 z-50 border-b backdrop-blur-xl md:hidden">
          <div className="flex h-15 items-center px-4">
            <div className="relative flex w-full items-center">
              <div className="absolute left-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBackToConversations}
                  className="bg-muted/20 hover:bg-muted/40 h-10 w-10 rounded-full transition-all active:scale-95"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>

              <div className="mx-auto flex flex-col items-center justify-center text-center">
                <h1 className="text-foreground/90 mb-1 text-sm leading-none font-black">
                  {currentConversation.participantName}
                </h1>
                <div className="flex items-center space-x-1.5">
                  <span className="bg-success h-1.5 w-1.5 animate-pulse rounded-full" />
                  <p className="text-muted-foreground/80 text-[10px] font-black tracking-[0.15em] uppercase">
                    {Object.values(typingUsers).some(Boolean)
                      ? "Typing..."
                      : "Active Now"}
                  </p>
                </div>
              </div>

              <div className="absolute right-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-muted/20 h-10 w-10 rounded-full transition-all active:scale-95"
                >
                  <Info className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-16 px-4 sm:px-6">
        <div className="grid h-[calc(100vh-140px)] grid-cols-1 gap-6 lg:h-[calc(100vh-100px)] lg:grid-cols-12">
          {/* Conversations Sidebar */}
          <ConversationSidebar
            showMobileChat={showMobileChat}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            filteredConversations={filteredConversations}
            selectedConversation={selectedConversation}
            handleConversationSelect={handleConversationSelect}
          />

          {/* Chat Area */}
          <div
            className={`h-full lg:col-span-8 xl:col-span-9 ${!showMobileChat && selectedConversation ? "hidden lg:block" : showMobileChat || !selectedConversation ? "block" : "hidden lg:block"}`}
          >
            {selectedConversation && currentConversation ? (
              <Card className="lg:bg-card flex h-full flex-col overflow-hidden border-none bg-transparent shadow-none lg:border lg:shadow-sm">
                {/* Chat Header */}
                <CardHeader className="border-border bg-card/50 sticky top-0 z-10 hidden border-b px-6 py-4 backdrop-blur-md lg:block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="border-background h-12 w-12 border-2 shadow-md">
                          <AvatarImage
                            src={
                              currentConversation.participantAvatar ||
                              "/placeholder.svg"
                            }
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                            {currentConversation.participantName
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {currentConversation.isOnline && (
                          <div className="bg-success border-background absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full border-2 shadow-sm"></div>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <h2 className="text-foreground text-lg leading-tight font-bold">
                          {currentConversation.participantName}
                        </h2>
                        <div className="flex items-center space-x-2">
                          <span className="bg-success flex h-2 w-2 animate-pulse rounded-full" />
                          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                            {Object.values(typingUsers).some(Boolean)
                              ? "Typing..."
                              : currentConversation.participantRole}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-muted-foreground/20 hover:border-primary/50 h-10 w-10 rounded-full transition-colors"
                      >
                        <Info className="text-muted-foreground h-5 w-5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-muted-foreground/20 hover:border-primary/50 h-10 w-10 rounded-full transition-colors"
                          >
                            <MoreVertical className="text-muted-foreground h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-56 rounded-xl p-2"
                        >
                          <DropdownMenuItem
                            className="cursor-pointer rounded-lg py-2.5"
                            onClick={() => setShowMediaGallery(true)}
                          >
                            <Paperclip className="text-primary mr-3 h-4 w-4" />
                            Shared Files
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer rounded-lg py-2.5"
                            onClick={handleBlockUser}
                          >
                            <ShieldAlert
                              className={`${currentConversation.isBlocked ? "text-primary" : "text-warning"} mr-3 h-4 w-4`}
                            />
                            {currentConversation.isBlocked
                              ? "Unblock User"
                              : "Block User"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-lg py-2.5"
                            onClick={handleDeleteConversation}
                          >
                            <Trash2 className="mr-3 h-4 w-4" />
                            Delete Conversation
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages Body - Responsive Scroll Geometry */}
                <CardContent className="bg-muted/5 flex-1 overflow-hidden p-0 md:bg-transparent">
                  <ScrollArea className="h-[calc(100vh-140px)] px-4 md:h-[calc(100vh-380px)] md:px-12">
                    <div className="flex flex-col space-y-8 py-6 md:py-8 lg:px-6">
                      {/*  Date Separator */}
                      <div className="relative my-6 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                          <div className="border-border/40 w-full border-t"></div>
                        </div>
                        <span className="bg-background/80 border-border/60 text-muted-foreground/80 relative z-10 rounded-full border px-5 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase shadow-md backdrop-blur-sm">
                          Chat Started
                        </span>
                      </div>

                      <div className="space-y-4">
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

                          const senderName =
                            message.sender?.fullName ||
                            (isCurrentUser
                              ? "You"
                              : currentConversation.participantName);
                          const senderAvatar =
                            message.sender?.profile?.avatarUrl ||
                            (isCurrentUser
                              ? "/placeholder.svg"
                              : currentConversation.participantAvatar);

                          return (
                            <div
                              key={message.id}
                              className={`group flex w-full ${isCurrentUser ? "justify-end" : "justify-start"} ${isNewGroup ? "pt-4" : "pt-0.5"}`}
                            >
                              <div
                                className={`flex max-w-[90%] items-end space-x-2 md:max-w-[70%] md:space-x-4 ${
                                  isCurrentUser
                                    ? "flex-row-reverse space-x-reverse"
                                    : ""
                                }`}
                              >
                                {!isCurrentUser && (
                                  <div className="w-8 shrink-0">
                                    {isLastInGroup && (
                                      <Avatar className="ring-background ring-offset-border/10 h-8 w-8 shadow-lg ring-2 ring-offset-1">
                                        <AvatarImage
                                          src={senderAvatar}
                                          className="object-cover"
                                        />
                                        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-black">
                                          {senderName
                                            .split(" ")
                                            .map((n: string) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                    )}
                                  </div>
                                )}

                                <div
                                  className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}
                                >
                                  <div
                                    className={`group relative px-4 py-2.5 shadow-sm transition-all duration-300 hover:shadow-md md:px-5 md:py-3 ${
                                      isCurrentUser
                                        ? `bg-primary text-primary-foreground ${isNewGroup ? "rounded-t-2xl rounded-br-lg rounded-bl-2xl" : isLastInGroup ? "rounded-tl-2xl rounded-tr-lg rounded-b-2xl" : "rounded-2xl rounded-r-lg"}`
                                        : `bg-card border-border/60 text-foreground/90 border ${isNewGroup ? "rounded-t-2xl rounded-br-2xl rounded-bl-lg" : isLastInGroup ? "rounded-tl-lg rounded-tr-2xl rounded-b-2xl" : "rounded-2xl rounded-l-lg"}`
                                    }`}
                                  >
                                    {message.messageType === "IMAGE" ? (
                                      <div
                                        className="cursor-pointer space-y-2"
                                        onClick={() => {
                                          const idx = allImages.findIndex(
                                            (img: Message) =>
                                              img.id === message.id,
                                          );
                                          openLightbox(idx);
                                        }}
                                      >
                                        <div className="border-border/20 relative aspect-video w-full min-w-[200px] overflow-hidden rounded-lg border shadow-sm transition-opacity hover:opacity-90">
                                          <Image
                                            src={message.fileUrl || ""}
                                            alt={
                                              message.fileName || "Shared image"
                                            }
                                            fill
                                            className="object-cover"
                                            unoptimized={
                                              message.fileUrl?.startsWith(
                                                "data:",
                                              ) ||
                                              message.fileUrl?.startsWith(
                                                "blob:",
                                              )
                                            }
                                          />
                                        </div>
                                        <p className="text-[13px] font-medium opacity-90">
                                          {message.content}
                                        </p>
                                      </div>
                                    ) : message.messageType === "FILE" ? (
                                      <div className="bg-background/10 flex items-center gap-3 rounded-xl border border-white/10 p-2">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                                          <FileIcon className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0">
                                          <p className="max-w-[200px] truncate text-[13px] font-bold">
                                            {message.fileName}
                                          </p>
                                          <p className="text-[10px] opacity-70">
                                            {(message.fileSize! / 1024).toFixed(
                                              1,
                                            )}{" "}
                                            KB
                                          </p>
                                        </div>
                                        <a
                                          href={message.fileUrl}
                                          download
                                          className="rounded-full p-2 transition-colors hover:bg-white/20"
                                        >
                                          <DownloadIcon className="h-4 w-4" />
                                        </a>
                                      </div>
                                    ) : (
                                      <p className="text-[13px] leading-relaxed font-medium tracking-tight wrap-break-word whitespace-pre-wrap md:text-[14px]">
                                        {message.content}
                                      </p>
                                    )}
                                  </div>

                                  {isLastInGroup && (
                                    <span
                                      className={`mt-2 px-1 text-[9px] font-black tracking-widest uppercase opacity-60 md:text-[10px] ${isCurrentUser ? "text-primary/70" : "text-muted-foreground"}`}
                                    >
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
                    </div>
                  </ScrollArea>
                </CardContent>

                <div className="bg-background/80 md:bg-card/60 border-border/10 md:border-border/40 sticky bottom-0 z-10 border-t px-4 pt-4 pb-10 backdrop-blur-3xl md:p-8">
                  <div className="group bg-muted/40 md:bg-muted/40 border-border/40 md:border-border/40 focus-within:bg-muted/60 focus-within:ring-primary/5 focus-within:border-primary/20 rounded-3x relative mx-auto flex max-w-4xl items-center space-x-2 rounded-full border p-1.5 pl-4 transition-all duration-300 focus-within:ring-4 md:space-x-3 md:p-2.5 md:pl-6">
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
                      className="text-muted-foreground/50 hover:bg-primary/10 hover:text-primary h-9 w-9 shrink-0 rounded-full transition-all md:h-10 md:w-10"
                    >
                      <Paperclip
                        className={`h-5 w-5 ${isUploading ? "animate-spin" : ""}`}
                      />
                    </Button>
                    <Input
                      placeholder="Message..."
                      value={newMessage}
                      onChange={handleTyping}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="text-foreground h-10 flex-1 border-none bg-transparent px-0 text-sm font-semibold focus-visible:ring-0"
                    />
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground/60 hover:text-warning hidden h-10 w-10 rounded-full md:flex"
                      >
                        <Smile className="h-5 w-5" />
                      </Button>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="shadow-primary/20 bg-primary text-primary-foreground h-9 w-9 rounded-full p-0 shadow-xl transition-all hover:scale-110 active:scale-95 md:h-11 md:w-11"
                      >
                        <Send className="h-4.5 w-4.5 md:h-5 md:w-5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground/30 mt-2 hidden text-center text-[9px] font-bold tracking-[0.2em] uppercase md:block">
                    Press Enter to send
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="bg-muted/5 lg:bg-card flex h-full items-center justify-center border-none shadow-none lg:border lg:shadow-sm">
                <div className="max-w-sm px-6 text-center">
                  <div className="bg-primary/10 border-background mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 shadow-xl">
                    <Send className="text-primary h-10 w-10 animate-bounce" />
                  </div>
                  <h3 className="text-foreground mb-3 text-2xl font-bold tracking-tight">
                    Your Messages
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Select a conversation from the sidebar to view your message
                    history and start chatting.
                  </p>
                </div>
              </Card>
            )}
          </div>
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
    </div>
  );
};

export default MessageView;
