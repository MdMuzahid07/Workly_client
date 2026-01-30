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
  Archive,
  ArrowLeft,
  Info,
  MoreVertical,
  Send,
  Star,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import ConversationSidebar from "../../components/main/message/ConversationSidebar";
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
          id: "1",
          senderId: "aisha",
          senderName: "Aisha Rahman",
          senderAvatar: "/avatars/aisha-rahman.png",
          content:
            "Assalamu Alaikum! I reviewed your resume and your MERN stack skills are quite impressive.",
          timestamp: "9:10 AM",
          isRead: true,
        },
        {
          id: "2",
          senderId: "aisha",
          senderName: "Aisha Rahman",
          senderAvatar: "/avatars/aisha-rahman.png",
          content:
            "We’d love to schedule an interview with you next week, Insha’Allah. Are you available?",
          timestamp: "9:15 AM",
          isRead: false,
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
    <div className="md:bg-primary/2 bg-background min-h-screen md:pt-20">
      {/* message header  */}
      <div className="border-border bg-card sticky top-0 z-50 flex w-full justify-start border-b md:hidden">
        <div className="max-w-6xl p-4">
          {showMobileChat && selectedConversation && currentConversation ? (
            <div className="flex items-center space-x-3 lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToConversations}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    currentConversation.participantAvatar || "/placeholder.svg"
                  }
                />
                <AvatarFallback>
                  {currentConversation.participantName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-foreground text-lg font-semibold">
                  {currentConversation.participantName}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {currentConversation.participantRole}
                </p>
              </div>
            </div>
          ) : (
            <h1 className="text-foreground text-2xl font-bold">Messages</h1>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid h-[calc(100vh-200px)] grid-cols-1 gap-6 lg:grid-cols-12">
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
            className={`lg:col-span-8 xl:col-span-9 ${!showMobileChat && selectedConversation ? "hidden lg:block" : showMobileChat || !selectedConversation ? "block" : "hidden lg:block"}`}
          >
            {selectedConversation && currentConversation ? (
              <Card className="flex h-full flex-col">
                {/* Chat Header */}
                <CardHeader className="border-border hidden border-b pb-3 lg:block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              currentConversation.participantAvatar ||
                              "/placeholder.svg"
                            }
                          />
                          <AvatarFallback>
                            {currentConversation.participantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {currentConversation.isOnline && (
                          <div className="bg-primary border-background absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2"></div>
                        )}
                      </div>
                      <div>
                        <h2 className="text-foreground font-semibold">
                          {currentConversation.participantName}
                        </h2>
                        <p className="text-muted-foreground text-sm">
                          {currentConversation.participantRole}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button> */}
                      <Button variant="ghost" size="sm">
                        <Info className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Star className="mr-2 h-4 w-4" />
                            Star Conversation
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[calc(100vh-280px)] p-4 lg:h-[calc(100vh-400px)]">
                    <div className="space-y-4">
                      {currentConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex max-w-[85%] items-start space-x-2 sm:max-w-[70%] ${
                              message.senderId === "current-user"
                                ? "flex-row-reverse space-x-reverse"
                                : ""
                            }`}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={message.senderAvatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {message.senderName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`rounded-lg px-4 py-2 ${
                                message.senderId === "current-user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              <p className="text-sm wrap-break-word">
                                {message.content}
                              </p>
                              <p
                                className={`mt-1 text-xs ${
                                  message.senderId === "current-user"
                                    ? "text-primary-foreground/70"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <div className="border-border border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Send className="text-muted-foreground h-8 w-8" />
                  </div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    Select a conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the sidebar to start messaging
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <ComingSoonAlert />
    </div>
  );
};

export default MessageView;
