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
import {
  ArrowLeft,
  Info,
  MoreVertical,
  Paperclip,
  Send,
  ShieldAlert,
  Smile,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import ConversationSidebar from "../../components/main/message/ConversationSidebar";
import { MediaGallery } from "../../components/main/message/MediaGallery";
import ComingSoonAlert from "../../components/temp_components/ComingSoonAlert";
import MessageViewSkeleton from "../../skeleton/message/MessageViewSkeleton";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

const MessageView = () => {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showMediaGallery, setShowMediaGallery] = useState(false);

  // fake loading state for skeleton
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // fake data for conversations and messages
  const conversations: Conversation[] = [
    {
      id: "1",
      participantName: "Aisha Rahman",
      participantAvatar: "/avatars/aisha-rahman.png",
      participantRole: "HR Manager at NexGen Technologies",
      lastMessage:
        "We’d love to schedule an interview with you next week, Insha’Allah. Are you available?",
      lastMessageTime: "45 minutes ago",
      unreadCount: 1,
      isOnline: true,
      messages: [
        {
          id: "msg-1-1",
          senderId: "aisha",
          senderName: "Aisha Rahman",
          senderAvatar: "/avatars/aisha-rahman.png",
          content:
            "Assalamu Alaikum! I reviewed your resume and your MERN stack skills are quite impressive.",
          timestamp: "9:10 AM",
          isRead: true,
        },
        {
          id: "msg-1-2",
          senderId: "aisha",
          senderName: "Aisha Rahman",
          senderAvatar: "/avatars/aisha-rahman.png",
          content:
            "We'd love to schedule an interview with you next week, Insha'Allah. Are you available?",
          timestamp: "9:15 AM",
          isRead: false,
        },
        {
          id: "msg-1-3",
          senderId: "me",
          senderName: "You",
          senderAvatar: "/avatars/me.png",
          content:
            "Wa Alaikum Assalam! Thank you for reaching out. Yes, I'm available next week.",
          timestamp: "9:20 AM",
          isRead: true,
        },
        {
          id: "msg-1-4",
          senderId: "aisha",
          senderName: "Aisha Rahman",
          senderAvatar: "/avatars/aisha-rahman.png",
          content:
            "Great! How about Tuesday at 2 PM? We can do it via Google Meet.",
          timestamp: "9:25 AM",
          isRead: true,
        },
        {
          id: "msg-1-5",
          senderId: "me",
          senderName: "You",
          senderAvatar: "/avatars/me.png",
          content:
            "Tuesday at 2 PM works perfectly for me. Looking forward to it!",
          timestamp: "9:30 AM",
          isRead: true,
        },
        {
          id: "msg-1-6",
          senderId: "aisha",
          senderName: "Aisha Rahman",
          senderAvatar: "/avatars/aisha-rahman.png",
          content:
            "Perfect! I'll send you the meeting link shortly. Have a blessed day!",
          timestamp: "9:35 AM",
          isRead: true,
        },
        {
          id: "msg-1-7",
          senderId: "me",
          senderName: "You",
          senderAvatar: "/avatars/me.png",
          content: "JazakAllah Khair! You too.",
          timestamp: "9:40 AM",
          isRead: true,
        },
      ],
    },
    {
      id: "2",
      participantName: "Omar Farooq",
      participantAvatar: "/avatars/omar-farooq.png",
      participantRole: "Recruiter at CloudAxis Solutions",
      lastMessage:
        "Could you please share your GitHub link and a short project summary?",
      lastMessageTime: "3 hours ago",
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: "3",
          senderId: "omar",
          senderName: "Omar Farooq",
          senderAvatar: "/avatars/omar-farooq.png",
          content:
            "Salam Muzahid, we’re currently hiring a React Developer for our Dhaka team.",
          timestamp: "7:20 AM",
          isRead: true,
        },
        {
          id: "4",
          senderId: "omar",
          senderName: "Omar Farooq",
          senderAvatar: "/avatars/omar-farooq.png",
          content:
            "Could you please share your GitHub link and a short project summary?",
          timestamp: "7:25 AM",
          isRead: false,
        },
      ],
    },
    {
      id: "3",
      participantName: "Fatima Noor",
      participantAvatar: "/avatars/fatima-noor.png",
      participantRole: "Engineering Manager at CodeVista Labs",
      lastMessage:
        "JazakAllah khair for your time yesterday. We’ll follow up soon with feedback.",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: "5",
          senderId: "fatima",
          senderName: "Fatima Noor",
          senderAvatar: "/avatars/fatima-noor.png",
          content:
            "It was a pleasure talking about your full-stack experience yesterday. You have strong fundamentals.",
          timestamp: "Yesterday, 4:10 PM",
          isRead: true,
        },
        {
          id: "6",
          senderId: "fatima",
          senderName: "Fatima Noor",
          senderAvatar: "/avatars/fatima-noor.png",
          content:
            "JazakAllah khair for your time yesterday. We’ll follow up soon with feedback.",
          timestamp: "Yesterday, 4:15 PM",
          isRead: true,
        },
      ],
    },
    {
      id: "4",
      participantName: "Ahmad Khan",
      participantAvatar: "/avatars/ahmad-khan.png",
      participantRole: "CTO at Crescent Innovations",
      lastMessage:
        "Looking forward to reviewing your approach to our dashboard redesign test.",
      lastMessageTime: "2 days ago",
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: "7",
          senderId: "ahmad",
          senderName: "Ahmad Khan",
          senderAvatar: "/avatars/ahmad-khan.png",
          content:
            "Hi Muzahid, your UI portfolio is well-crafted — very clean and minimal.",
          timestamp: "2 days ago, 10:40 AM",
          isRead: true,
        },
        {
          id: "8",
          senderId: "ahmad",
          senderName: "Ahmad Khan",
          senderAvatar: "/avatars/ahmad-khan.png",
          content:
            "Looking forward to reviewing your approach to our dashboard redesign test.",
          timestamp: "2 days ago, 10:45 AM",
          isRead: true,
        },
      ],
    },
    {
      id: "5",
      participantName: "Maryam Siddiqui",
      participantAvatar: "/avatars/maryam-siddiqui.png",
      participantRole: "HR Executive at StellarSoft",
      lastMessage:
        "Your application has been shortlisted, Alhamdulillah. Our team will contact you soon.",
      lastMessageTime: "3 days ago",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: "9",
          senderId: "maryam",
          senderName: "Maryam Siddiqui",
          senderAvatar: "/avatars/maryam-siddiqui.png",
          content:
            "Hello! We received your application for the React Developer position at StellarSoft.",
          timestamp: "3 days ago, 1:50 PM",
          isRead: true,
        },
        {
          id: "10",
          senderId: "maryam",
          senderName: "Maryam Siddiqui",
          senderAvatar: "/avatars/maryam-siddiqui.png",
          content:
            "Your application has been shortlisted, Alhamdulillah. Our team will contact you soon.",
          timestamp: "3 days ago, 1:55 PM",
          isRead: true,
        },
      ],
    },
    {
      id: "6",
      participantName: "Yusuf Ali",
      participantAvatar: "/avatars/yusuf-ali.png",
      participantRole: "Product Manager at BrightPath Digital",
      lastMessage:
        "Can we schedule a short meeting tomorrow to discuss your project availability?",
      lastMessageTime: "4 days ago",
      unreadCount: 1,
      isOnline: false,
      messages: [
        {
          id: "11",
          senderId: "yusuf",
          senderName: "Yusuf Ali",
          senderAvatar: "/avatars/yusuf-ali.png",
          content:
            "Salam! Your Redux Toolkit experience is impressive. We might have a project match for you.",
          timestamp: "4 days ago, 4:30 PM",
          isRead: true,
        },
        {
          id: "12",
          senderId: "yusuf",
          senderName: "Yusuf Ali",
          senderAvatar: "/avatars/yusuf-ali.png",
          content:
            "Can we schedule a short meeting tomorrow to discuss your project availability?",
          timestamp: "4 days ago, 4:35 PM",
          isRead: false,
        },
      ],
    },
  ];

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const currentConversation = conversations.find(
    (conv) => conv.id === selectedConversation,
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
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

  if (isLoading) {
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
                    Active Now
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
                              .map((n) => n[0])
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
                            {currentConversation.participantRole}
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
                          <DropdownMenuItem className="cursor-pointer rounded-lg py-2.5">
                            <ShieldAlert className="text-warning mr-3 h-4 w-4" />
                            Block User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-lg py-2.5">
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
                          February 05, 2026
                        </span>
                      </div>

                      <div className="space-y-4">
                        {currentConversation.messages.map((message, index) => {
                          const isCurrentUser =
                            message.senderId === "current-user";
                          const nextMessage =
                            currentConversation.messages[index + 1];
                          const prevMessage =
                            currentConversation.messages[index - 1];

                          const isNewGroup =
                            !prevMessage ||
                            prevMessage.senderId !== message.senderId;
                          const isLastInGroup =
                            !nextMessage ||
                            nextMessage.senderId !== message.senderId;

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
                                {/* Grouped Avatars */}
                                {!isCurrentUser && (
                                  <div className="w-8 shrink-0">
                                    {isLastInGroup && (
                                      <Avatar className="ring-background ring-offset-border/10 h-8 w-8 shadow-lg ring-2 ring-offset-1">
                                        <AvatarImage
                                          src={
                                            message.senderAvatar ||
                                            "/placeholder.svg"
                                          }
                                          className="object-cover"
                                        />
                                        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-black">
                                          {message.senderName
                                            .split(" ")
                                            .map((n) => n[0])
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
                                    <p className="text-[13px] leading-relaxed font-medium tracking-tight wrap-break-word whitespace-pre-wrap md:text-[14px]">
                                      {message.content}
                                    </p>

                                    {/* Tick Status for Current User */}
                                    {isCurrentUser && (
                                      <div className="absolute -bottom-1.5 -left-1 opacity-0 transition-opacity group-hover:opacity-100">
                                        <div className="bg-success border-background h-3 w-3 rounded-full border-2 shadow-sm" />
                                      </div>
                                    )}
                                  </div>

                                  {isLastInGroup && (
                                    <span
                                      className={`mt-2 px-1 text-[9px] font-black tracking-widest uppercase opacity-60 md:text-[10px] ${isCurrentUser ? "text-primary/70" : "text-muted-foreground"}`}
                                    >
                                      {message.timestamp} • Delivered
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground/50 hover:bg-primary/10 hover:text-primary h-9 w-9 shrink-0 rounded-full transition-all md:h-10 md:w-10"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
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

      <ComingSoonAlert />

      {currentConversation && (
        <MediaGallery
          isOpen={showMediaGallery}
          onClose={() => setShowMediaGallery(false)}
          participantName={currentConversation.participantName}
        />
      )}
    </div>
  );
};

export default MessageView;
